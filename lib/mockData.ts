export const mockPatients = [
  {
    id: '1',
    name: 'Sarah Johnson',
    age: 45,
    gender: 'Female',
    condition: 'Hypertension',
    status: 'Stable',
    criticality: 'Low',
    bloodPressure: '140/90',
    heartRate: 78,
    glucose: 105,
    doctor: 'Dr. Smith',
    lastVisit: '2024-01-15',
    nextAppointment: '2024-01-22',
    room: '204A',
    admissionDate: '2024-01-10',
    phone: '(555) 123-4567',
    emergencyContact: 'John Johnson - (555) 987-6543'
  },
  {
    id: '2',
    name: 'Michael Chen',
    age: 62,
    gender: 'Male',
    condition: 'Diabetes',
    status: 'Critical',
    criticality: 'High',
    bloodPressure: '160/95',
    heartRate: 92,
    glucose: 180,
    doctor: 'Dr. Wilson',
    lastVisit: '2024-01-14',
    nextAppointment: '2024-01-20',
    room: '301B',
    admissionDate: '2024-01-12',
    phone: '(555) 234-5678',
    emergencyContact: 'Lisa Chen - (555) 876-5432'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    age: 34,
    gender: 'Female',
    condition: 'Asthma',
    status: 'Stable',
    criticality: 'Medium',
    bloodPressure: '120/80',
    heartRate: 68,
    glucose: 95,
    doctor: 'Dr. Brown',
    lastVisit: '2024-01-16',
    nextAppointment: '2024-01-25',
    room: '102C',
    admissionDate: '2024-01-08',
    phone: '(555) 345-6789',
    emergencyContact: 'Carlos Rodriguez - (555) 765-4321'
  }
];

export const mockVitalsHistory = {
  '1': [
    { date: '2024-01-10', bloodPressure: 145, heartRate: 82, glucose: 110 },
    { date: '2024-01-11', bloodPressure: 142, heartRate: 80, glucose: 108 },
    { date: '2024-01-12', bloodPressure: 140, heartRate: 78, glucose: 105 },
    { date: '2024-01-13', bloodPressure: 138, heartRate: 76, glucose: 103 },
    { date: '2024-01-14', bloodPressure: 135, heartRate: 75, glucose: 100 }
  ],
  '2': [
    { date: '2024-01-10', bloodPressure: 165, heartRate: 95, glucose: 190 },
    { date: '2024-01-11', bloodPressure: 162, heartRate: 93, glucose: 185 },
    { date: '2024-01-12', bloodPressure: 160, heartRate: 92, glucose: 180 },
    { date: '2024-01-13', bloodPressure: 158, heartRate: 90, glucose: 175 },
    { date: '2024-01-14', bloodPressure: 155, heartRate: 88, glucose: 170 }
  ]
};

export const mockMedications = [
  {
    id: '1',
    patientId: '1',
    patientName: 'Sarah Johnson',
    medication: 'Lisinopril',
    dosage: '10mg',
    time: '9:00 AM',
    frequency: 'Daily',
    administered: false,
    notes: 'Take with food'
  },
  {
    id: '2',
    patientId: '2',
    patientName: 'Michael Chen',
    medication: 'Metformin',
    dosage: '500mg',
    time: '12:00 PM',
    frequency: 'Twice daily',
    administered: true,
    notes: 'Monitor blood glucose'
  },
  {
    id: '3',
    patientId: '3',
    patientName: 'Emily Rodriguez',
    medication: 'Albuterol',
    dosage: '2 puffs',
    time: '6:00 PM',
    frequency: 'As needed',
    administered: false,
    notes: 'For asthma symptoms'
  }
];

export const mockAppointments = [
  {
    id: '1',
    patientId: '1',
    patientName: 'Sarah Johnson',
    doctor: 'Dr. Smith',
    date: '2024-01-22',
    time: '10:00 AM',
    type: 'Follow-up',
    status: 'Scheduled',
    notes: 'Blood pressure check'
  },
  {
    id: '2',
    patientId: '2',
    patientName: 'Michael Chen',
    doctor: 'Dr. Wilson',
    date: '2024-01-20',
    time: '2:00 PM',
    type: 'Consultation',
    status: 'Confirmed',
    notes: 'Diabetes management review'
  },
  {
    id: '3',
    patientId: '3',
    patientName: 'Emily Rodriguez',
    doctor: 'Dr. Brown',
    date: '2024-01-25',
    time: '11:30 AM',
    type: 'Check-up',
    status: 'Scheduled',
    notes: 'Routine asthma assessment'
  }
];

export const mockNotifications = [
  {
    id: '1',
    type: 'alert',
    title: 'Critical Blood Pressure',
    message: 'Michael Chen BP reading: 160/95 - requires immediate attention',
    timestamp: '2024-01-16 14:30',
    priority: 'high',
    read: false,
    patientId: '2'
  },
  {
    id: '2',
    type: 'medication',
    title: 'Medication Overdue',
    message: 'Sarah Johnson missed morning Lisinopril dose',
    timestamp: '2024-01-16 10:15',
    priority: 'medium',
    read: false,
    patientId: '1'
  },
  {
    id: '3',
    type: 'appointment',
    title: 'Upcoming Appointment',
    message: 'Emily Rodriguez appointment in 30 minutes',
    timestamp: '2024-01-16 11:00',
    priority: 'low',
    read: true,
    patientId: '3'
  }
];

export const mockDoctors = [
  {
    id: '1',
    name: 'Dr. Sarah Smith',
    specialization: 'Cardiology',
    patients: ['1'],
    phone: '(555) 111-2222',
    email: 'sarah.smith@hospital.com'
  },
  {
    id: '2',
    name: 'Dr. James Wilson',
    specialization: 'Endocrinology',
    patients: ['2'],
    phone: '(555) 333-4444',
    email: 'james.wilson@hospital.com'
  },
  {
    id: '3',
    name: 'Dr. Maria Brown',
    specialization: 'Pulmonology',
    patients: ['3'],
    phone: '(555) 555-6666',
    email: 'maria.brown@hospital.com'
  }
];

export const mockKPIs = {
  totalPatients: 156,
  criticalAlerts: 8,
  appointmentsToday: 12,
  medicationTasksPending: 23,
  lastSyncTime: '2024-01-16 15:30:00'
};