'use client';

import { useState } from 'react';
import Header from '../../components/Layout/Header';
import SearchFilterBar from '../../components/ui/SearchFilterBar';
import { mockMedications } from '../../lib/mockData';

export default function MedicationsPage() {
  const [medications, setMedications] = useState(mockMedications);
  const [filteredMedications, setFilteredMedications] = useState(mockMedications);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredMedications(medications);
      return;
    }
    
    const filtered = medications.filter(med =>
      med.patientName.toLowerCase().includes(query.toLowerCase()) ||
      med.medication.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMedications(filtered);
  };

  const handleFilter = (filters: any) => {
    let filtered = medications;

    if (filters.time) {
      filtered = filtered.filter(med => med.time === filters.time);
    }
    
    if (filters.status) {
      const isAdministered = filters.status === 'administered';
      filtered = filtered.filter(med => med.administered === isAdministered);
    }

    setFilteredMedications(filtered);
  };

  const markAsAdministered = (id: string) => {
    const updatedMedications = medications.map(med =>
      med.id === id ? { ...med, administered: !med.administered } : med
    );
    setMedications(updatedMedications);
    setFilteredMedications(updatedMedications);
  };

  const filterOptions = [
    {
      key: 'time',
      label: 'Time',
      options: [
        { value: '9:00 AM', label: '9:00 AM' },
        { value: '12:00 PM', label: '12:00 PM' },
        { value: '6:00 PM', label: '6:00 PM' }
      ]
    },
    {
      key: 'status',
      label: 'Status',
      options: [
        { value: 'administered', label: 'Administered' },
        { value: 'pending', label: 'Pending' }
      ]
    }
  ];

  const timeSlots = ['9:00 AM', '12:00 PM', '6:00 PM'];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Medication Tracker</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Track and manage patient medication schedules</p>
        </div>

        <SearchFilterBar
          onSearch={handleSearch}
          onFilter={handleFilter}
          filters={filterOptions}
          placeholder="Search medications by patient name or medication..."
        />

        {/* Time-based Grid View */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {timeSlots.map(timeSlot => {
            const slotMedications = filteredMedications.filter(med => med.time === timeSlot);
            
            return (
              <div key={timeSlot} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{timeSlot}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {slotMedications.filter(m => m.administered).length}/{slotMedications.length}
                    </span>
                    <div className="w-4 h-4 flex items-center justify-center">
                      <i className="ri-time-line text-gray-400"></i>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {slotMedications.map(medication => (
                    <div
                      key={medication.id}
                      className={`p-4 rounded-lg border transition-all duration-200 ${
                        medication.administered
                          ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                          : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">{medication.patientName}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{medication.medication}</p>
                        </div>
                        <button
                          onClick={() => markAsAdministered(medication.id)}
                          className={`w-6 h-6 flex items-center justify-center rounded cursor-pointer ${
                            medication.administered
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-200 dark:bg-gray-600 text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-500'
                          }`}
                        >
                          <i className="ri-check-line"></i>
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Dosage:</span>
                          <span className="ml-1 font-medium text-gray-900 dark:text-white">{medication.dosage}</span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Frequency:</span>
                          <span className="ml-1 font-medium text-gray-900 dark:text-white">{medication.frequency}</span>
                        </div>
                      </div>
                      
                      {medication.notes && (
                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            <span className="font-medium">Note:</span> {medication.notes}
                          </p>
                        </div>
                      )}
                      
                      <div className="mt-3 flex items-center justify-between">
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                          medication.administered
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                            : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
                        }`}>
                          {medication.administered ? 'Administered' : 'Pending'}
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  {slotMedications.length === 0 && (
                    <div className="text-center py-8">
                      <div className="w-12 h-12 mx-auto bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-3">
                        <i className="ri-medicine-bottle-line text-gray-400"></i>
                      </div>
                      <p className="text-gray-500 dark:text-gray-400">No medications scheduled</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Medications</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{medications.length}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <i className="ri-medicine-bottle-line text-blue-600 dark:text-blue-400"></i>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Administered</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-2">
                  {medications.filter(m => m.administered).length}
                </p>
              </div>
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <i className="ri-check-line text-green-600 dark:text-green-400"></i>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400 mt-2">
                  {medications.filter(m => !m.administered).length}
                </p>
              </div>
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                <i className="ri-time-line text-orange-600 dark:text-orange-400"></i>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completion Rate</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-2">
                  {Math.round((medications.filter(m => m.administered).length / medications.length) * 100)}%
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <i className="ri-bar-chart-line text-blue-600 dark:text-blue-400"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}