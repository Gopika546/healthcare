import PatientProfile from './PatientProfile';

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' }
  ];
}

type PatientPageProps = {
  params: { id: string };
};

export default function PatientPage({ params }: PatientPageProps) {
  return <PatientProfile patientId={params.id} />;
}
