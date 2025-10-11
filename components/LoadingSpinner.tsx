export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
      <div className="text-center">
        {/* Spinner animado */}
        <div className="relative inline-block">
          <div className="w-20 h-20 border-8 border-white/30 border-t-white rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl">🎯</span>
          </div>
        </div>

        {/* Texto */}
        <p className="mt-6 text-white text-xl font-semibold animate-pulse">
          Cargando rifa...
        </p>
      </div>
    </div>
  );
}




