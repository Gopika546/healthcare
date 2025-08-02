'use client';

import { useState } from 'react';
import Header from '../../../components/Layout/Header';
import VitalsChart from '../../../components/VitalsChart';
import CollapsiblePanel from '../../../components/ui/CollapsiblePanel';
import { mockPatients, mockVitalsHistory } from '../../../lib/mockData';

interface PatientProfileProps {
  patientId: string;
}

export default function PatientProfile({ patientId }: PatientProfileProps) {
  const [newNote, setNewNote] = useState('');
  const patient = mockPatients.find(p => p.id === patientId);
  const vitalsData = mockVitalsHistory[patientId] || [];

  if (!patient) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-600 dark:text-gray-400">Patient not found</p>
        </div>
      </div>
    );
  }

  const mockMedicalHistory = [
    { date: '2024-01-10', condition: 'Hypertension diagnosis', doctor: 'Dr. Smith' },
    { date: '2023-12-15', condition: 'Annual physical exam', doctor: 'Dr. Johnson' },
    { date: '2023-08-20', condition: 'Blood pressure monitoring', doctor: 'Dr. Smith' }
  ];

  const mockPrescriptions = [
    { medication: 'Lisinopril', dosage: '10mg daily', prescribed: '2024-01-10', doctor: 'Dr. Smith' },
    { medication: 'Aspirin', dosage: '81mg daily', prescribed: '2024-01-10', doctor: 'Dr. Smith' }
  ];

  const mockDoctorNotes = [
    { date: '2024-01-15', doctor: 'Dr. Smith', note: 'Patient responding well to treatment. Blood pressure stabilizing.' },
    { date: '2024-01-10', doctor: 'Dr. Smith', note: 'Started on Lisinopril 10mg daily. Patient counseled on lifestyle modifications.' }
  ];

  const mockAppointmentLogs = [
    { date: '2024-01-15', type: 'Follow-up', doctor: 'Dr. Smith', status: 'Completed' },
    { date: '2024-01-10', type: 'Initial Consultation', doctor: 'Dr. Smith', status: 'Completed' }
  ];

  const addNote = () => {
    if (newNote.trim()) {
      console.log('Adding note:', newNote);
      setNewNote('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Patient Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-6">
              <div className="w-20 h-20 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                <i className="ri-user-line text-gray-600 dark:text-gray-300 text-2xl"></i>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{patient.name}</h1>
                <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Age:</span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white">{patient.age}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Gender:</span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white">{patient.gender}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Room:</span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white">{patient.room}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Doctor:</span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white">{patient.doctor}</span>
                  </div>
                </div>
                <div className="mt-3 flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    patient.status === 'Stable' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                      : patient.status === 'Critical'
                      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                  }`}>
                    {patient.status}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">•</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{patient.condition}</span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400">Admitted</p>
              <p className="font-medium text-gray-900 dark:text-white">{patient.admissionDate}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Next Appointment</p>
              <p className="font-medium text-gray-900 dark:text-white">{patient.nextAppointment}</p>
            </div>
          </div>
        </div>

        {/* Current Vitals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                <i className="ri-heart-pulse-line text-red-600 dark:text-red-400"></i>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Current</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{patient.bloodPressure}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Blood Pressure</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <i className="ri-heart-line text-blue-600 dark:text-blue-400"></i>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Current</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{patient.heartRate}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Heart Rate (bpm)</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <i className="ri-drop-line text-green-600 dark:text-green-400"></i>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Current</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{patient.glucose}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Glucose (mg/dL)</p>
          </div>
        </div>

        {/* Vitals Charts */}
        {vitalsData.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <VitalsChart 
              data={vitalsData} 
              metric="bloodPressure" 
              title="Blood Pressure History" 
              color="#DC2626" 
            />
            <VitalsChart 
              data={vitalsData} 
              metric="heartRate" 
              title="Heart Rate History" 
              color="#3B82F6" 
            />
            <VitalsChart 
              data={vitalsData} 
              metric="glucose" 
              title="Glucose History" 
              color="#10B981" 
            />
          </div>
        )}

        {/* Collapsible Panels */}
        <div className="space-y-6">
          <CollapsiblePanel title="Medical History" icon="history" defaultOpen>
            <div className="space-y-4">
              {mockMedicalHistory.map((entry, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-r-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{entry.condition}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Dr. {entry.doctor}</p>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{entry.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </CollapsiblePanel>

          <CollapsiblePanel title="Current Prescriptions" icon="medicine-bottle">
            <div className="space-y-4">
              {mockPrescriptions.map((prescription, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{prescription.medication}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{prescription.dosage}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">Prescribed by {prescription.doctor}</p>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{prescription.prescribed}</span>
                  </div>
                </div>
              ))}
            </div>
          </CollapsiblePanel>

          <CollapsiblePanel title="Doctor Notes" icon="file-text">
            <div className="space-y-4">
              {mockDoctorNotes.map((note, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-medium text-gray-900 dark:text-white">{note.doctor}</p>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{note.date}</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{note.note}</p>
                </div>
              ))}
              
              <div className="border-t border-gray-200 dark:border-gray-600 pt-4 mt-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Add New Note</h4>
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Enter your note here..."
                  maxLength={500}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none"
                  rows={3}
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{newNote.length}/500 characters</span>
                  <button
                    onClick={addNote}
                    disabled={!newNote.trim() || newNote.length > 500}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
                  >
                    Add Note
                  </button>
                </div>
              </div>
            </div>
          </CollapsiblePanel>

          <CollapsiblePanel title="Appointment History" icon="calendar">
            <div className="space-y-4">
              {mockAppointmentLogs.map((appointment, index) => (
                <div key={index} className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{appointment.type}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{appointment.doctor}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{appointment.date}</p>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      appointment.status === 'Completed' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CollapsiblePanel>
        </div>
      </div>
    </div>
  );
}