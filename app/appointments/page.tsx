
'use client';

import { useState } from 'react';
import Header from '../../components/Layout/Header';
import SearchFilterBar from '../../components/ui/SearchFilterBar';
import { mockAppointments } from '../../lib/mockData';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState(mockAppointments);
  const [filteredAppointments, setFilteredAppointments] = useState(mockAppointments);
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    patientName: '',
    doctor: '',
    date: '',
    time: '',
    type: '',
    notes: ''
  });

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredAppointments(appointments);
      return;
    }

    const filtered = appointments.filter(apt =>
      apt.patientName.toLowerCase().includes(query.toLowerCase()) ||
      apt.doctor.toLowerCase().includes(query.toLowerCase()) ||
      apt.type.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredAppointments(filtered);
  };

  const handleFilter = (filters: any) => {
    let filtered = appointments;

    if (filters.doctor) {
      filtered = filtered.filter(apt => apt.doctor === filters.doctor);
    }

    if (filters.status) {
      filtered = filtered.filter(apt => apt.status === filters.status);
    }

    if (filters.type) {
      filtered = filtered.filter(apt => apt.type === filters.type);
    }

    setFilteredAppointments(filtered);
  };

  const addAppointment = () => {
    if (newAppointment.patientName && newAppointment.doctor && newAppointment.date && newAppointment.time) {
      const appointment = {
        id: String(appointments.length + 1),
        patientId: '1',
        ...newAppointment,
        status: 'Scheduled'
      };

      const updatedAppointments = [...appointments, appointment];
      setAppointments(updatedAppointments);
      setFilteredAppointments(updatedAppointments);
      setNewAppointment({
        patientName: '',
        doctor: '',
        date: '',
        time: '',
        type: '',
        notes: ''
      });
      setShowAddModal(false);
    }
  };

  const deleteAppointment = (id: string) => {
    const updatedAppointments = appointments.filter(apt => apt.id !== id);
    setAppointments(updatedAppointments);
    setFilteredAppointments(updatedAppointments);
  };

  const filterOptions = [
    {
      key: 'doctor',
      label: 'All Doctors',
      options: [
        { value: 'Dr. Smith', label: 'Dr. Smith' },
        { value: 'Dr. Wilson', label: 'Dr. Wilson' },
        { value: 'Dr. Brown', label: 'Dr. Brown' }
      ]
    },
    {
      key: 'status',
      label: 'All Statuses',
      options: [
        { value: 'Scheduled', label: 'Scheduled' },
        { value: 'Confirmed', label: 'Confirmed' },
        { value: 'Completed', label: 'Completed' }
      ]
    },
    {
      key: 'type',
      label: 'All Types',
      options: [
        { value: 'Follow-up', label: 'Follow-up' },
        { value: 'Consultation', label: 'Consultation' },
        { value: 'Check-up', label: 'Check-up' }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Confirmed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Completed': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Appointments</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Manage patient appointments and schedules</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 text-sm rounded whitespace-nowrap cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <i className="ri-list-unordered mr-1"></i> List
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`px-3 py-1 text-sm rounded whitespace-nowrap cursor-pointer ${
                  viewMode === 'calendar'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <i className="ri-calendar-line mr-1"></i> Calendar
              </button>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 whitespace-nowrap cursor-pointer"
            >
              <i className="ri-add-line mr-2"></i>Add Appointment
            </button>
          </div>
        </div>

        <SearchFilterBar
          onSearch={handleSearch}
          onFilter={handleFilter}
          filters={filterOptions}
          placeholder="Search appointments by patient, doctor, or type..."
        />

        {viewMode === 'list' ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Patient
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Doctor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredAppointments.map((appointment) => (
                    <tr key={appointment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {appointment.patientName}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">{appointment.doctor}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">{appointment.date}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{appointment.time}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">{appointment.type}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 cursor-pointer">
                            <i className="ri-edit-line"></i>
                          </button>
                          <button
                            onClick={() => deleteAppointment(appointment.id)}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 cursor-pointer"
                          >
                            <i className="ri-delete-bin-line"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                <i className="ri-calendar-line text-gray-400 text-2xl"></i>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Calendar View</h3>
              <p className="text-gray-600 dark:text-gray-400">Calendar view would be implemented here with a calendar library</p>
            </div>
          </div>
        )}

        {/* Add Appointment Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add New Appointment</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
                >
                  <i className="ri-close-line"></i>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Patient Name
                  </label>
                  <input
                    type="text"
                    value={newAppointment.patientName}
                    onChange={(e) => setNewAppointment({ ...newAppointment, patientName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Doctor
                  </label>
                  <input
                    type="text"
                    value={newAppointment.doctor}
                    onChange={(e) => setNewAppointment({ ...newAppointment, doctor: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      value={newAppointment.date}
                      onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Time
                    </label>
                    <input
                      type="time"
                      value={newAppointment.time}
                      onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Type
                  </label>
                  <input
                    type="text"
                    value={newAppointment.type}
                    onChange={(e) => setNewAppointment({ ...newAppointment, type: e.target.value })}
                    placeholder="e.g., Follow-up, Consultation, Check-up"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Notes
                  </label>
                  <textarea
                    value={newAppointment.notes}
                    onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
                    maxLength={500}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{newAppointment.notes.length}/500 characters</p>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 whitespace-nowrap cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={addAppointment}
                  disabled={!newAppointment.patientName || !newAppointment.doctor || !newAppointment.date || !newAppointment.time || newAppointment.notes.length > 500}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
                >
                  Add Appointment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
