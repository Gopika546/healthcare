import PatientProfile from './PatientProfile';

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ];
}

export default function PatientPage({ params }: { params: { id: string } }) {
  return <PatientProfile patientId={params.id} />;
}