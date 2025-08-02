'use client';

import { useState } from 'react';
import Header from '../../../components/Layout/Header';
import SearchFilterBar from '../../../components/ui/SearchFilterBar';

const mockDoctors = [
  { id: '1', name: 'Dr. Sarah Wilson', specialty: 'Cardiology', email: 'sarah.wilson@hospital.com', phone: '(555) 123-4567', patients: 24, status: 'Active' },
  { id: '2', name: 'Dr. Michael Chen', specialty: 'Internal Medicine', email: 'michael.chen@hospital.com', phone: '(555) 234-5678', patients: 31, status: 'Active' },
  { id: '3', name: 'Dr. Emily Rodriguez', specialty: 'Neurology', email: 'emily.rodriguez@hospital.com', phone: '(555) 345-6789', patients: 18, status: 'Active' },
  { id: '4', name: 'Dr. David Thompson', specialty: 'Endocrinology', email: 'david.thompson@hospital.com', phone: '(555) 456-7890', patients: 22, status: 'Inactive' },
  { id: '5', name: 'Dr. Lisa Park', specialty: 'Pulmonology', email: 'lisa.park@hospital.com', phone: '(555) 567-8901', patients: 27, status: 'Active' }
];

export default function AdminDoctorsPage() {
  const [doctors, setDoctors] = useState(mockDoctors);
  const [filteredDoctors, setFilteredDoctors] = useState(mockDoctors);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    email: '',
    phone: '',
    status: 'Active'
  });

  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredDoctors(doctors);
    } else {
      const filtered = doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(query.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredDoctors(filtered);
    }
  };

  const handleFilter = (filters: any) => {
    let filtered = doctors;
    if (filters.specialty) {
      filtered = filtered.filter(doctor => doctor.specialty === filters.specialty);
    }
    if (filters.status) {
      filtered = filtered.filter(doctor => doctor.status === filters.status);
    }
    setFilteredDoctors(filtered);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDoctor) {
      const updatedDoctors = doctors.map(d => 
        d.id === editingDoctor.id ? { ...d, ...formData } : d
      );
      setDoctors(updatedDoctors);
      setFilteredDoctors(updatedDoctors);
    } else {
      const newDoctor = {
        id: `doctor-${Date.now()}`,
        ...formData,
        patients: 0
      };
      const updatedDoctors = [...doctors, newDoctor];
      setDoctors(updatedDoctors);
      setFilteredDoctors(updatedDoctors);
    }
    resetForm();
  };

  const handleEdit = (doctor: any) => {
    setEditingDoctor(doctor);
    setFormData({
      name: doctor.name,
      specialty: doctor.specialty,
      email: doctor.email,
      phone: doctor.phone,
      status: doctor.status
    });
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    const updatedDoctors = doctors.filter(d => d.id !== id);
    setDoctors(updatedDoctors);
    setFilteredDoctors(updatedDoctors);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      specialty: '',
      email: '',
      phone: '',
      status: 'Active'
    });
    setEditingDoctor(null);
    setShowAddForm(false);
  };

  const filterOptions = [
    {
      key: 'specialty',
      label: 'Specialty',
      options: [
        { value: 'Cardiology', label: 'Cardiology' },
        { value: 'Internal Medicine', label: 'Internal Medicine' },
        { value: 'Neurology', label: 'Neurology' },
        { value: 'Endocrinology', label: 'Endocrinology' },
        { value: 'Pulmonology', label: 'Pulmonology' }
      ]
    },
    {
      key: 'status',
      label: 'Status',
      options: [
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Doctor Management</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Manage doctors and assign patients</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium whitespace-nowrap cursor-pointer"
          >
            <i className="ri-add-line mr-2"></i>Add Doctor
          </button>
        </div>

        <SearchFilterBar
          onSearch={handleSearch}
          onFilter={handleFilter}
          filters={filterOptions}
          placeholder="Search doctors..."
        />

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Doctor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Specialty</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Patients</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredDoctors.map((doctor) => (
                  <tr key={doctor.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                          <i className="ri-stethoscope-line text-blue-600 dark:text-blue-400"></i>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{doctor.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{doctor.specialty}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">{doctor.email}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{doctor.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{doctor.patients}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        doctor.status === 'Active'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                      }`}>
                        {doctor.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(doctor)}
                          className="w-8 h-8 flex items-center justify-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 cursor-pointer"
                        >
                          <i className="ri-edit-line"></i>
                        </button>
                        <button
                          onClick={() => handleDelete(doctor.id)}
                          className="w-8 h-8 flex items-center justify-center text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 cursor-pointer"
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

        {/* Add/Edit Doctor Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl mx-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                {editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Specialty</label>
                    <input
                      type="text"
                      value={formData.specialty}
                      onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-3 py-2 pr-8 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      required
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    {editingDoctor ? 'Update Doctor' : 'Add Doctor'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}