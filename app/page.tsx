'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Header from '../components/Layout/Header';
import { mockKPIs, mockPatients, mockAppointments, mockMedications, mockNotifications } from '../lib/mockData';

const dashboardVitalsData = [
  { date: '2024-01-10', bloodPressure: 145, heartRate: 82, glucose: 110 },
  { date: '2024-01-11', bloodPressure: 142, heartRate: 80, glucose: 108 },
  { date: '2024-01-12', bloodPressure: 140, heartRate: 78, glucose: 105 },
  { date: '2024-01-13', bloodPressure: 138, heartRate: 76, glucose: 103 },
  { date: '2024-01-14', bloodPressure: 135, heartRate: 75, glucose: 100 },
  { date: '2024-01-15', bloodPressure: 133, heartRate: 74, glucose: 98 },
  { date: '2024-01-16', bloodPressure: 130, heartRate: 72, glucose: 95 }
];

export default function Dashboard() {
  const upcomingAppointments = mockAppointments.slice(0, 3);
  const todaysMedications = mockMedications.filter(med => !med.administered).slice(0, 4);
  const urgentAlerts = mockNotifications.filter(notif => notif.priority === 'high' && !notif.read).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Monitor patient care and track health metrics</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Patients</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{mockKPIs.totalPatients}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <i className="ri-user-line text-blue-600 dark:text-blue-400 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Critical Alerts</p>
                <p className="text-3xl font-bold text-red-600 dark:text-red-400 mt-2">{mockKPIs.criticalAlerts}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                <i className="ri-alarm-warning-line text-red-600 dark:text-red-400 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Appointments Today</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">{mockKPIs.appointmentsToday}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <i className="ri-calendar-check-line text-green-600 dark:text-green-400 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Medications</p>
                <p className="text-3xl font-bold text-orange-600 dark:text-orange-400 mt-2">{mockKPIs.medicationTasksPending}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                <i className="ri-medicine-bottle-line text-orange-600 dark:text-orange-400 text-xl"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Blood Pressure Trend</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dashboardVitalsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip />
                  <Line type="monotone" dataKey="bloodPressure" stroke="#DC2626" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Heart Rate Trend</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dashboardVitalsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip />
                  <Line type="monotone" dataKey="heartRate" stroke="#3B82F6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Glucose Levels</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dashboardVitalsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip />
                  <Line type="monotone" dataKey="glucose" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Panels Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Appointments */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Upcoming Appointments</h3>
              <i className="ri-calendar-line text-gray-400"></i>
            </div>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">{appointment.patientName}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{appointment.doctor}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{appointment.time}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{appointment.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Medications */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Pending Medications</h3>
              <i className="ri-medicine-bottle-line text-gray-400"></i>
            </div>
            <div className="space-y-4">
              {todaysMedications.map((medication) => (
                <div key={medication.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">{medication.patientName}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{medication.medication} - {medication.dosage}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-orange-600 dark:text-orange-400">{medication.time}</p>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300">
                      Pending
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Urgent Alerts */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Urgent Alerts</h3>
              <i className="ri-alarm-warning-line text-red-500"></i>
            </div>
            <div className="space-y-4">
              {urgentAlerts.map((alert) => (
                <div key={alert.id} className="border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded-r-lg">
                  <p className="font-medium text-gray-900 dark:text-white text-sm">{alert.title}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{alert.message}</p>
                  <p className="text-xs text-red-600 dark:text-red-400 mt-2">{new Date(alert.timestamp).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}