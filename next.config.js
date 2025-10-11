/** @type {import('next').NextConfig} */
const nextConfig = {
  // Para Firebase Hosting (export estático)
  output: 'export',
  
  // Deshabilitar optimización de imágenes para export
  images: {
    unoptimized: true,
  },
  
  // Trailing slash para mejor compatibilidad
  trailingSlash: true,
};

export default nextConfig;




