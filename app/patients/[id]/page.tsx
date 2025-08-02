import PatientProfile from './PatientProfile';
import { Metadata } from 'next';

// ✅ Correct prop typing for App Router
type Props = {
  params: {
    id: string;
  };
};

export default function PatientPage({ params }: Props) {
  return <PatientProfile patientId={params.id} />;
}

// ✅ `generateStaticParams` must return { params: { id: string } }[]
export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' }
  ].map((patient) => ({
    params: {
      id: patient.id,
    },
  }));
}
