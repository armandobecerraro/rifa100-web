'use client';

import { getRifaById } from '@/lib/api';
import { Rifa } from '@/types/rifa';
import { useEffect, useState } from 'react';
import Cartón from './Carton';
import DownloadButtons from './DownloadButtons';
import LoadingSpinner from './LoadingSpinner';
import RifaInfo from './RifaInfo';

interface Props {
  rifaId: string;
  numeroPreseleccionado?: string;
}

export default function RifaLanding({ rifaId, numeroPreseleccionado }: Props) {
  const [rifa, setRifa] = useState<Rifa | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadRifa() {
      try {
        setLoading(true);
        const data = await getRifaById(rifaId);
        setRifa(data);
      } catch (err) {
        console.error('Error loading rifa:', err);
        setError('No se pudo cargar la rifa');
      } finally {
        setLoading(false);
      }
    }

    loadRifa();
  }, [rifaId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !rifa) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">😞</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Rifa no encontrada</h1>
          <p className="text-gray-600 mb-6">
            {error || 'La rifa que buscas no existe o fue eliminada'}
          </p>
          <DownloadButtons />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-4">
      <div className="max-w-4xl mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
            🎯 ¡Participa en esta Rifa!
          </h1>
          <p className="text-white/90 text-lg">
            Elige tu número de la suerte
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Rifa Info */}
          <RifaInfo rifa={rifa} />

          {/* Cartón de Números */}
          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Números Disponibles
            </h2>
            <Cartón rifaId={rifaId} numeroPreseleccionado={numeroPreseleccionado} />
          </div>

          {/* Download Section */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Descarga la App para Participar
            </h2>
            <p className="text-white/90 mb-6">
              Elige tu número, reserva y recibe tu comprobante
            </p>
            <DownloadButtons />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-white/80">
          <p>Powered by Rifa100 © 2025</p>
        </div>
      </div>
    </div>
  );
}




