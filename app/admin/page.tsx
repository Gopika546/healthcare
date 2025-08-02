'use client';

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Header from '../../components/Layout/Header';
import { mockPatients, mockKPIs, mockNotifications } from '../../lib/mockData';

const systemStatsData = [
  { date: '2024-01-10', activePatients: 245, alerts: 12, appointments: 34 },
  { date: '2024-01-11', activePatients: 248, alerts: 8, appointments: 42 },
  { date: '2024-01-12', activePatients: 251, alerts: 15, appointments: 38 },
  { date: '2024-01-13', activePatients: 253, alerts: 6, appointments: 45 },
  { date: '2024-01-14', activePatients: 256, alerts: 11, appointments: 39 },
  { date: '2024-01-15', activePatients: 258, alerts: 9, appointments: 41 },
  { date: '2024-01-16', activePatients: 262, alerts: 7, appointments: 43 }
];

const patientStatusData = [
  { name: 'Stable', value: 180, color: '#10B981' },
  { name: 'Monitoring', value: 65, color: '#F59E0B' },
  { name: 'Critical', value: 17, color: '#EF4444' }
];

export default function AdminDashboard() {
  const activePatients = mockPatients.filter(p => p.status === 'Stable' || p.status === 'Monitoring').length;
  const criticalPatients = mockPatients.filter(p => p.status === 'Critical').length;
  const totalAlerts = mockNotifications.length;
  const unreadAlerts = mockNotifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">System overview and management controls</p>
        </div>

        {/* System Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Patients</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{mockPatients.length}</p>
                <p className="text-sm text-green-600 dark:text-green-400 mt-1">+12 this week</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <i className="ri-user-line text-blue-600 dark:text-blue-400 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Profiles</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">{activePatients}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{criticalPatients} critical</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <i className="ri-user-heart-line text-green-600 dark:text-green-400 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">System Alerts</p>
                <p className="text-3xl font-bold text-orange-600 dark:text-orange-400 mt-2">{totalAlerts}</p>
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">{unreadAlerts} unread</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                <i className="ri-alarm-warning-line text-orange-600 dark:text-orange-400 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Last Synced</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white mt-2" suppressHydrationWarning={true}>
                  {new Date().toLocaleTimeString()}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400 mt-1">All systems operational</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <i className="ri-refresh-line text-purple-600 dark:text-purple-400 text-xl"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">System Activity Trends</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={systemStatsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip />
                  <Line type="monotone" dataKey="activePatients" stroke="#3B82F6" strokeWidth={2} name="Active Patients" />
                  <Line type="monotone" dataKey="alerts" stroke="#EF4444" strokeWidth={2} name="Alerts" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Patient Status Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={patientStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {patientStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-6 mt-4">
              {patientStatusData.map((item) => (
                <div key={item.name} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-3">
                <i className="ri-user-add-line text-blue-600 dark:text-blue-400 text-xl"></i>
              </div>
              <span className="text-sm font-medium text-blue-900 dark:text-blue-300 whitespace-nowrap">Add Patient</span>
            </button>

            <button className="flex flex-col items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-3">
                <i className="ri-stethoscope-line text-green-600 dark:text-green-400 text-xl"></i>
              </div>
              <span className="text-sm font-medium text-green-900 dark:text-green-300 whitespace-nowrap">Add Doctor</span>
            </button>

            <button className="flex flex-col items-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-3">
                <i className="ri-medicine-bottle-line text-purple-600 dark:text-purple-400 text-xl"></i>
              </div>
              <span className="text-sm font-medium text-purple-900 dark:text-purple-300 whitespace-nowrap">Add Medication</span>
            </button>

            <button className="flex flex-col items-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-3">
                <i className="ri-settings-3-line text-orange-600 dark:text-orange-400 text-xl"></i>
              </div>
              <span className="text-sm font-medium text-orange-900 dark:text-orange-300 whitespace-nowrap">System Settings</span>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent System Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <i className="ri-user-add-line text-green-600 dark:text-green-400 text-sm"></i>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">New patient registered</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Sarah Johnson added to system</p>
                </div>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">2 min ago</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <i className="ri-heart-pulse-line text-blue-600 dark:text-blue-400 text-sm"></i>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">Vital signs updated</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Michael Chen - BP monitoring</p>
                </div>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">5 min ago</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                  <i className="ri-alarm-warning-line text-red-600 dark:text-red-400 text-sm"></i>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">Critical alert triggered</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Emma Wilson - High blood pressure</p>
                </div>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">12 min ago</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <i className="ri-medicine-bottle-line text-purple-600 dark:text-purple-400 text-sm"></i>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">Medication administered</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">David Lee - Morning dose completed</p>
                </div>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">18 min ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}