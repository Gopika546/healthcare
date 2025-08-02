'use client';

import { useState } from 'react';
import Header from '../../../components/Layout/Header';
import SearchFilterBar from '../../../components/ui/SearchFilterBar';

const mockMedications = [
  { id: '1', name: 'Lisinopril', category: 'ACE Inhibitor', dosage: '10mg', frequency: 'Once daily', sideEffects: 'Dry cough, dizziness', status: 'Active' },
  { id: '2', name: 'Metformin', category: 'Antidiabetic', dosage: '500mg', frequency: 'Twice daily', sideEffects: 'Nausea, stomach upset', status: 'Active' },
  { id: '3', name: 'Atorvastatin', category: 'Statin', dosage: '20mg', frequency: 'Once daily', sideEffects: 'Muscle pain, liver issues', status: 'Active' },
  { id: '4', name: 'Warfarin', category: 'Anticoagulant', dosage: '5mg', frequency: 'Once daily', sideEffects: 'Bleeding, bruising', status: 'Restricted' },
  { id: '5', name: 'Albuterol', category: 'Bronchodilator', dosage: '90mcg', frequency: 'As needed', sideEffects: 'Tremors, rapid heartbeat', status: 'Active' }
];

export default function AdminMedicationsPage() {
  const [medications, setMedications] = useState(mockMedications);
  const [filteredMedications, setFilteredMedications] = useState(mockMedications);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMedication, setEditingMedication] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    dosage: '',
    frequency: '',
    sideEffects: '',
    status: 'Active'
  });

  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredMedications(medications);
    } else {
      const filtered = medications.filter(med =>
        med.name.toLowerCase().includes(query.toLowerCase()) ||
        med.category.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMedications(filtered);
    }
  };

  const handleFilter = (filters: any) => {
    let filtered = medications;
    if (filters.category) {
      filtered = filtered.filter(med => med.category === filters.category);
    }
    if (filters.status) {
      filtered = filtered.filter(med => med.status === filters.status);
    }
    setFilteredMedications(filtered);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMedication) {
      const updatedMedications = medications.map(m => 
        m.id === editingMedication.id ? { ...m, ...formData } : m
      );
      setMedications(updatedMedications);
      setFilteredMedications(updatedMedications);
    } else {
      const newMedication = {
        id: `med-${Date.now()}`,
        ...formData
      };
      const updatedMedications = [...medications, newMedication];
      setMedications(updatedMedications);
      setFilteredMedications(updatedMedications);
    }
    resetForm();
  };

  const handleEdit = (medication: any) => {
    setEditingMedication(medication);
    setFormData({
      name: medication.name,
      category: medication.category,
      dosage: medication.dosage,
      frequency: medication.frequency,
      sideEffects: medication.sideEffects,
      status: medication.status
    });
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    const updatedMedications = medications.filter(m => m.id !== id);
    setMedications(updatedMedications);
    setFilteredMedications(updatedMedications);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      dosage: '',
      frequency: '',
      sideEffects: '',
      status: 'Active'
    });
    setEditingMedication(null);
    setShowAddForm(false);
  };

  const filterOptions = [
    {
      key: 'category',
      label: 'Category',
      options: [
        { value: 'ACE Inhibitor', label: 'ACE Inhibitor' },
        { value: 'Antidiabetic', label: 'Antidiabetic' },
        { value: 'Statin', label: 'Statin' },
        { value: 'Anticoagulant', label: 'Anticoagulant' },
        { value: 'Bronchodilator', label: 'Bronchodilator' }
      ]
    },
    {
      key: 'status',
      label: 'Status',
      options: [
        { value: 'Active', label: 'Active' },
        { value: 'Restricted', label: 'Restricted' },
        { value: 'Discontinued', label: 'Discontinued' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Medication Management</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Manage medications and assign to patients</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium whitespace-nowrap cursor-pointer"
          >
            <i className="ri-add-line mr-2"></i>Add Medication
          </button>
        </div>

        <SearchFilterBar
          onSearch={handleSearch}
          onFilter={handleFilter}
          filters={filterOptions}
          placeholder="Search medications..."
        />

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Medication</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Dosage</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Frequency</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredMedications.map((medication) => (
                  <tr key={medication.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                          <i className="ri-medicine-bottle-line text-purple-600 dark:text-purple-400"></i>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{medication.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{medication.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">{medication.dosage}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">{medication.frequency}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        medication.status === 'Active'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : medication.status === 'Restricted'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                      }`}>
                        {medication.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(medication)}
                          className="w-8 h-8 flex items-center justify-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 cursor-pointer"
                        >
                          <i className="ri-edit-line"></i>
                        </button>
                        <button
                          onClick={() => handleDelete(medication.id)}
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

        {/* Add/Edit Medication Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl mx-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                {editingMedication ? 'Edit Medication' : 'Add New Medication'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Medication Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Dosage</label>
                    <input
                      type="text"
                      value={formData.dosage}
                      onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Frequency</label>
                    <input
                      type="text"
                      value={formData.frequency}
                      onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
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
                      <option value="Restricted">Restricted</option>
                      <option value="Discontinued">Discontinued</option>
                    </select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Side Effects</label>
                    <textarea
                      value={formData.sideEffects}
                      onChange={(e) => setFormData({ ...formData, sideEffects: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
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
                    {editingMedication ? 'Update Medication' : 'Add Medication'}
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