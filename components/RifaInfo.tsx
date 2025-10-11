'use client';

import { Rifa } from '@/types/rifa';
import { CalendarDays, Gift, Phone, User, DollarSign } from 'lucide-react';

interface Props {
  rifa: Rifa;
}

export default function RifaInfo({ rifa }: Props) {
  const formatFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-MX', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatPrecio = (precio: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(precio);
  };

  return (
    <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-white">
      {/* Título */}
      <h1 className="text-3xl md:text-4xl font-bold mb-2">{rifa.titulo}</h1>
      
      {/* Premio destacado */}
      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Gift className="w-6 h-6" />
          <span className="text-sm font-medium opacity-90">Premio</span>
        </div>
        <p className="text-2xl md:text-3xl font-bold">{rifa.premio}</p>
      </div>

      {/* Grid de información */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Precio */}
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-3 rounded-lg">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm opacity-90">Precio por número</p>
            <p className="text-xl font-bold">{formatPrecio(rifa.precio)}</p>
          </div>
        </div>

        {/* Fecha de sorteo */}
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-3 rounded-lg">
            <CalendarDays className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm opacity-90">Sorteo</p>
            <p className="text-lg font-semibold">{formatFecha(rifa.fechaSorteo)}</p>
          </div>
        </div>

        {/* Organizador */}
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-3 rounded-lg">
            <User className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm opacity-90">Organizado por</p>
            <p className="text-lg font-semibold">{rifa.nombreOrganizador}</p>
          </div>
        </div>

        {/* Contacto */}
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-3 rounded-lg">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm opacity-90">Contacto</p>
            <p className="text-lg font-semibold">{rifa.telefonoOrganizador}</p>
          </div>
        </div>
      </div>

      {/* Estado de la rifa */}
      {rifa.estado === 'cerrada' && (
        <div className="mt-6 bg-red-500/30 backdrop-blur-sm border-2 border-red-300 rounded-xl p-4 text-center">
          <p className="text-lg font-bold">🔒 Esta rifa está cerrada</p>
          {rifa.numeroGanador !== undefined && (
            <p className="text-2xl font-bold mt-2">
              🏆 Número Ganador: {String(rifa.numeroGanador).padStart(2, '0')}
            </p>
          )}
        </div>
      )}
    </div>
  );
}




