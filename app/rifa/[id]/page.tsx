import RifaLanding from '@/components/RifaLanding';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ numero?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  
  // TODO: Fetch rifa data from API
  return {
    title: 'Participa en esta Rifa | Rifa100',
    description: 'Elige tu número de la suerte y participa en esta rifa',
    openGraph: {
      title: 'Participa en esta Rifa',
      description: 'Elige tu número de la suerte',
      images: ['/og-image.png'],
    },
  };
}

export default async function RifaPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { numero } = await searchParams;

  return <RifaLanding rifaId={id} numeroPreseleccionado={numero} />;
}

