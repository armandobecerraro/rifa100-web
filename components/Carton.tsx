'use client';

import { useEffect, useState } from 'react';
import { getNumeros } from '@/lib/api';
import { NumeroRifa } from '@/types/rifa';

interface Props {
  rifaId: string;
  numeroPreseleccionado?: string;
}

export default function Carton({ rifaId, numeroPreseleccionado }: Props) {
  const [numeros, setNumeros] = useState<NumeroRifa[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNumero, setSelectedNumero] = useState<number | null>(null);

  useEffect(() => {
    async function loadNumeros() {
      try {
        setLoading(true);
        const data = await getNumeros(rifaId);
        setNumeros(data);
        
        // Preseleccionar número si viene en la URL
        if (numeroPreseleccionado) {
          setSelectedNumero(parseInt(numeroPreseleccionado, 10));
        }
      } catch (error) {
        console.error('Error loading numeros:', error);
      } finally {
        setLoading(false);
      }
    }

    loadNumeros();
  }, [rifaId, numeroPreseleccionado]);

  const getNumeroEstado = (numero: number): 'disponible' | 'reservado' | 'vendido' => {
    const numeroData = numeros.find((n) => n.numero === numero);
    return numeroData?.estado || 'disponible';
  };

  const getNumeroColor = (numero: number): string => {
    const estado = getNumeroEstado(numero);
    const isSelected = numero === selectedNumero;

    if (isSelected) {
      return 'bg-blue-500 text-white border-blue-600 ring-4 ring-blue-300 scale-110';
    }

    switch (estado) {
      case 'disponible':
        return 'bg-green-100 text-green-800 border-green-300 hover:bg-green-200 hover:scale-105 cursor-pointer';
      case 'reservado':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'vendido':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const handleNumeroClick = (numero: number) => {
    const estado = getNumeroEstado(numero);
    if (estado === 'disponible') {
      setSelectedNumero(numero === selectedNumero ? null : numero);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  // Calcular estadísticas
  const disponibles = numeros.filter((n) => n.estado === 'disponible').length;
  const reservados = numeros.filter((n) => n.estado === 'reservado').length;
  const vendidos = numeros.filter((n) => n.estado === 'vendido').length;
  const porcentajeVendido = Math.round(((reservados + vendidos) / 100) * 100);

  return (
    <div>
      {/* Estadísticas */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex-1 bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-green-500 to-purple-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${porcentajeVendido}%` }}
            ></div>
          </div>
          <span className="text-sm font-bold text-gray-700">{porcentajeVendido}%</span>
        </div>

        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-2xl font-bold text-green-600">{disponibles}</p>
            <p className="text-xs text-green-700">Disponibles</p>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
            <p className="text-2xl font-bold text-orange-600">{reservados}</p>
            <p className="text-xs text-orange-700">Reservados</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-2xl font-bold text-red-600">{vendidos}</p>
            <p className="text-xs text-red-700">Vendidos</p>
          </div>
        </div>
      </div>

      {/* Cartón de números */}
      <div className="grid grid-cols-10 gap-1 md:gap-2 mb-6">
        {Array.from({ length: 100 }, (_, i) => i).map((numero) => (
          <button
            key={numero}
            onClick={() => handleNumeroClick(numero)}
            className={`
              aspect-square rounded-lg border-2 font-bold text-sm md:text-base
              transition-all duration-200 flex items-center justify-center
              ${getNumeroColor(numero)}
            `}
            disabled={getNumeroEstado(numero) !== 'disponible'}
          >
            {String(numero).padStart(2, '0')}
          </button>
        ))}
      </div>

      {/* Leyenda */}
      <div className="flex flex-wrap gap-4 justify-center text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-100 border-2 border-green-300 rounded"></div>
          <span>Disponible</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-100 border-2 border-orange-300 rounded"></div>
          <span>Reservado</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-100 border-2 border-red-300 rounded"></div>
          <span>Vendido</span>
        </div>
        {selectedNumero !== null && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 border-2 border-blue-600 rounded"></div>
            <span className="font-bold">Número {String(selectedNumero).padStart(2, '0')} seleccionado</span>
          </div>
        )}
      </div>
    </div>
  );
}

