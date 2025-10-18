import RifaLanding from '@/components/RifaLanding';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ numero?: string }>;
}

// Permitir rutas dinámicas no predefinidas
export const dynamicParams = true;

// Función requerida para exportación estática
export async function generateStaticParams() {
  // En desarrollo, retornar un array vacío para permitir rutas dinámicas
  if (process.env.NODE_ENV === 'development') {
    return [];
  }
  
  // En producción, definir las rifas que se van a pre-generar
  // TODO: Obtener lista de rifas activas desde la API
  return [
    { id: 'test-rifa-id' },
    // Agregar más IDs de rifas aquí cuando estén disponibles
  ];
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




