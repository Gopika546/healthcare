'use client';

import Link from 'next/link';

interface PatientCardProps {
  patient: {
    id: string;
    name: string;
    age: number;
    condition: string;
    status: string;
    criticality: string;
    bloodPressure: string;
    heartRate: number;
    room: string;
  };
}

export default function PatientCard({ patient }: PatientCardProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'stable': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'warning': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getCriticalityIcon = (criticality: string) => {
    switch (criticality.toLowerCase()) {
      case 'high': return 'ri-error-warning-line text-red-500';
      case 'medium': return 'ri-alert-line text-yellow-500';
      case 'low': return 'ri-information-line text-green-500';
      default: return 'ri-information-line text-gray-500';
    }
  };

  return (
    <Link href={`/patients/${patient.id}`}>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-200 cursor-pointer">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{patient.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Age: {patient.age} • Room: {patient.room}</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 flex items-center justify-center">
              <i className={getCriticalityIcon(patient.criticality)}></i>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
              {patient.status}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Condition</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">{patient.condition}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-heart-pulse-line text-red-500"></i>
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400">BP</span>
              </div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{patient.bloodPressure}</p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-heart-line text-blue-500"></i>
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400">HR</span>
              </div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{patient.heartRate} bpm</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}