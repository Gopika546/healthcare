'use client';

import { useState } from 'react';
import Header from '../../components/Layout/Header';
import PatientCard from '../../components/PatientCard';
import SearchFilterBar from '../../components/ui/SearchFilterBar';
import { mockPatients } from '../../lib/mockData';

export default function PatientsPage() {
  const [filteredPatients, setFilteredPatients] = useState(mockPatients);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredPatients(mockPatients);
      return;
    }
    
    const filtered = mockPatients.filter(patient =>
      patient.name.toLowerCase().includes(query.toLowerCase()) ||
      patient.condition.toLowerCase().includes(query.toLowerCase()) ||
      patient.doctor.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPatients(filtered);
  };

  const handleFilter = (filters: any) => {
    let filtered = mockPatients;

    if (filters.condition) {
      filtered = filtered.filter(patient => patient.condition === filters.condition);
    }
    
    if (filters.status) {
      filtered = filtered.filter(patient => patient.status === filters.status);
    }
    
    if (filters.criticality) {
      filtered = filtered.filter(patient => patient.criticality === filters.criticality);
    }

    setFilteredPatients(filtered);
  };

  const filterOptions = [
    {
      key: 'condition',
      label: 'Condition',
      options: [
        { value: 'Hypertension', label: 'Hypertension' },
        { value: 'Diabetes', label: 'Diabetes' },
        { value: 'Asthma', label: 'Asthma' }
      ]
    },
    {
      key: 'status',
      label: 'Status',
      options: [
        { value: 'Stable', label: 'Stable' },
        { value: 'Critical', label: 'Critical' },
        { value: 'Warning', label: 'Warning' }
      ]
    },
    {
      key: 'criticality',
      label: 'Priority',
      options: [
        { value: 'High', label: 'High' },
        { value: 'Medium', label: 'Medium' },
        { value: 'Low', label: 'Low' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Patient Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">View and manage all patient records</p>
        </div>

        <SearchFilterBar
          onSearch={handleSearch}
          onFilter={handleFilter}
          filters={filterOptions}
          placeholder="Search patients by name, condition, or doctor..."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div>

        {filteredPatients.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <i className="ri-user-search-line text-gray-400 text-2xl"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No patients found</h3>
            <p className="text-gray-600 dark:text-gray-400">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}