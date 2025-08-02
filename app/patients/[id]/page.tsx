import PatientProfile from './PatientProfile';
import { Metadata } from 'next';
import { type FC } from 'react';

interface PageProps {
  params: {
    id: string;
  };
}

// ✅ Dynamic route page component
const PatientPage: FC<PageProps> = ({ params }) => {
  return <PatientProfile patientId={params.id} />;
};

export default PatientPage;

// ✅ Static params for SSG (used by App Router)
export function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' }
  ];
}
