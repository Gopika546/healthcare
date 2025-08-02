import PatientProfile from './PatientProfile';

interface PatientPageProps {
  params: {
    id: string;
  };
}

export function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ];
}

export default function PatientPage({ params }: PatientPageProps) {
  const { id } = params;
  return <PatientProfile patientId={id} />;
}
