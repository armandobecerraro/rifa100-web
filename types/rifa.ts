export interface Rifa {
  id: string;
  titulo: string;
  premio: string;
  precio: number;
  fechaSorteo: string;
  nombreOrganizador: string;
  telefonoOrganizador: string;
  ownerId: string;
  estado: 'activa' | 'cerrada';
  numeroGanador?: number;
  createdAt: string;
  updatedAt: string;
}

export interface NumeroRifa {
  id: string;
  numero: number;
  estado: 'disponible' | 'reservado' | 'pagado';
  contacto?: Contacto;
  reservadoAt?: string;
  pagadoAt?: string;
  metodoPago?: string;
  referenciaPago?: string;
}

export interface Contacto {
  id: string;
  nombre: string;
  apodo?: string;
  telefono: string;
  email?: string;
  aceptaTerminos: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  message?: string;
}




