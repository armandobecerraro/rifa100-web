import { ApiResponse, NumeroRifa, Rifa } from '@/types/rifa';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const url = `${API_URL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.message || `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        errorData
      );
    }

    const data: ApiResponse<T> = await response.json();

    if (!data.success) {
      throw new ApiError(data.message || data.error || 'Error desconocido');
    }

    return data.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    // Error de red u otro tipo de error
    console.error('API Error:', error);
    throw new ApiError(
      error instanceof Error ? error.message : 'Error de conexión con el servidor'
    );
  }
}

/**
 * Obtener información de una rifa por ID
 */
export async function getRifaById(id: string): Promise<Rifa> {
  return fetchApi<Rifa>(`/api/rifas/${id}`);
}

/**
 * Obtener números de una rifa
 */
export async function getNumeros(rifaId: string): Promise<NumeroRifa[]> {
  return fetchApi<NumeroRifa[]>(`/api/rifas/${rifaId}/numeros`);
}

/**
 * Generar deep link para una rifa
 */
export async function generateDeepLink(
  rifaId: string,
  numeroPreseleccionado?: number
): Promise<{ deepLink: string }> {
  return fetchApi<{ deepLink: string }>(`/api/rifas/${rifaId}/deep-link`, {
    method: 'POST',
    body: JSON.stringify({ numeroPreseleccionado }),
  });
}

/**
 * Health check del API
 */
export async function healthCheck(): Promise<{ status: string; timestamp: string }> {
  return fetchApi<{ status: string; timestamp: string }>('/health');
}

