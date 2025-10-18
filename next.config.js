/** @type {import('next').NextConfig} */
const nextConfig = {
  // Solo usar export estático en producción
  ...(process.env.NODE_ENV === 'production' && { output: 'export' }),
  
  // Deshabilitar optimización de imágenes solo en export
  ...(process.env.NODE_ENV === 'production' && {
    images: {
      unoptimized: true,
    },
  }),
  
  // Trailing slash para mejor compatibilidad
  trailingSlash: true,
};

export default nextConfig;




