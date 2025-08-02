import PatientProfile from './PatientProfile';

type PatientPageProps = {
  params: {
    id: string;
  };
};

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ];
}

// This is a Server Component, so keep it `async` if you need data fetching
export default function PatientPage({ params }: PatientPageProps) {
  return <PatientProfile patientId={params.id} />;
}
