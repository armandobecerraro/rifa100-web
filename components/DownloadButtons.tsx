'use client';

import { useEffect, useState } from 'react';
import { Apple, Download } from 'lucide-react';

export default function DownloadButtons() {
  const [platform, setPlatform] = useState<'ios' | 'android' | 'desktop'>('desktop');

  useEffect(() => {
    // Detectar plataforma
    const userAgent = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(userAgent)) {
      setPlatform('ios');
    } else if (/android/.test(userAgent)) {
      setPlatform('android');
    }
  }, []);

  const appStoreUrl = process.env.NEXT_PUBLIC_APP_STORE_URL || 'https://apps.apple.com/';
  const playStoreUrl = process.env.NEXT_PUBLIC_PLAY_STORE_URL || 'https://play.google.com/store/';

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      {/* iOS Button */}
      <a
        href={appStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`
          flex items-center gap-3 px-6 py-3 rounded-xl font-semibold
          transition-all duration-200 transform hover:scale-105 shadow-lg
          ${
            platform === 'ios'
              ? 'bg-white text-black ring-4 ring-white/50'
              : 'bg-black text-white hover:bg-gray-800'
          }
        `}
      >
        <Apple className="w-6 h-6" />
        <div className="text-left">
          <p className="text-xs opacity-80">Descargar en</p>
          <p className="text-base font-bold leading-tight">App Store</p>
        </div>
      </a>

      {/* Android Button */}
      <a
        href={playStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`
          flex items-center gap-3 px-6 py-3 rounded-xl font-semibold
          transition-all duration-200 transform hover:scale-105 shadow-lg
          ${
            platform === 'android'
              ? 'bg-white text-black ring-4 ring-white/50'
              : 'bg-black text-white hover:bg-gray-800'
          }
        `}
      >
        <Download className="w-6 h-6" />
        <div className="text-left">
          <p className="text-xs opacity-80">Descargar en</p>
          <p className="text-base font-bold leading-tight">Google Play</p>
        </div>
      </a>
    </div>
  );
}




