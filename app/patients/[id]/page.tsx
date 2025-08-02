import PatientProfile from './PatientProfile';
import type { Metadata } from 'next';

// This must be a regular (non-async) function or must return a resolved Promise
export function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' }
  ];
}

interface PatientPageProps {
  params: {
    id: string;
  };
}

export default function PatientPage({ params }: PatientPageProps) {
  return <PatientProfile patientId={params.id} />;
}
