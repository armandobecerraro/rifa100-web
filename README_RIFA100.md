# 🌐 Rifa100 Web - Landing Page

Landing page construida con **Next.js 15**, **TypeScript** y **Tailwind CSS** para mostrar rifas y redirigir a la app móvil.

## 🚀 Características

- ✅ **Landing page dinámica** para cada rifa
- ✅ **Visualización de cartón** de números en tiempo real
- ✅ **Detección automática** de plataforma (iOS/Android)
- ✅ **Deep Links** configurados (App Links + Universal Links)
- ✅ **SEO optimizado** con meta tags
- ✅ **Open Graph** para compartir en redes sociales
- ✅ **Responsive design** para móvil y desktop
- ✅ **TypeScript** para type safety
- ✅ **Tailwind CSS** para estilos

## 📋 Requisitos

- Node.js >= 18.x
- npm o yarn
- Backend API corriendo (rifa100-api)

## 🛠️ Instalación

```bash
# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env.local

# Configurar .env.local
# NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 🏃 Comandos

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Ejecutar build
npm start

# Lint
npm run lint
```

## 📁 Estructura

```
app/
├── rifa/[id]/page.tsx    # Página dinámica de rifa
├── layout.tsx            # Layout principal
└── page.tsx              # Página de inicio

components/
├── RifaLanding.tsx       # Componente principal de landing
├── RifaInfo.tsx          # Información de la rifa
├── Carton.tsx            # Cartón de números
├── DownloadButtons.tsx   # Botones de descarga
└── LoadingSpinner.tsx    # Spinner de carga

lib/
└── api.ts                # Cliente API

types/
└── rifa.ts               # Tipos TypeScript

public/
└── .well-known/
    ├── assetlinks.json                 # Android App Links
    └── apple-app-site-association      # iOS Universal Links
```

## 🔗 Deep Links

### Android App Links

Archivo: `public/.well-known/assetlinks.json`

**Obtener SHA256 fingerprint:**

```bash
# Debug keystore
keytool -list -v -keystore ~/.android/debug.keystore \
  -alias androiddebugkey \
  -storepass android \
  -keypass android | grep SHA256

# Release keystore
keytool -list -v -keystore /path/to/your/keystore.jks \
  -alias your-alias \
  -storepass your-password \
  -keypass your-key-password | grep SHA256
```

**Actualizar assetlinks.json:**
```json
{
  "sha256_cert_fingerprints": [
    "AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99..."
  ]
}
```

### iOS Universal Links

Archivo: `public/.well-known/apple-app-site-association`

**Obtener Team ID:**
1. Ir a https://developer.apple.com
2. Account > Membership
3. Copiar Team ID

**Actualizar apple-app-site-association:**
```json
{
  "appID": "TU_TEAM_ID.com.rifa100.app"
}
```

## 🌐 Configuración de URLs

### Variables de Entorno

```env
# Backend API
NEXT_PUBLIC_API_URL=http://localhost:3001

# App Store URLs
NEXT_PUBLIC_APP_STORE_URL=https://apps.apple.com/app/rifa100/id123456789
NEXT_PUBLIC_PLAY_STORE_URL=https://play.google.com/store/apps/details?id=com.rifa100.app
```

### Rutas

- `/` - Página principal
- `/rifa/[id]` - Landing page de rifa específica
- `/rifa/[id]?numero=42` - Landing con número preseleccionado

## 🚀 Deploy a Firebase Hosting

### 1. Instalar Firebase CLI

```bash
npm install -g firebase-tools
```

### 2. Login

```bash
firebase login
```

### 3. Inicializar

```bash
firebase init hosting

# Seleccionar:
# - Use an existing project
# - Public directory: out
# - Configure as SPA: No
# - Set up automatic builds: No
```

### 4. Configurar next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

### 5. Build y Deploy

```bash
# Build
npm run build

# Deploy
firebase deploy --only hosting
```

### 6. Configurar Dominio Custom (Opcional)

```bash
firebase hosting:channel:deploy production

# En Firebase Console:
# Hosting > Add custom domain
```

## 📊 Verificar Deep Links

### Android

```bash
# Verificar assetlinks.json
curl https://tu-dominio.com/.well-known/assetlinks.json | jq

# Verificar en dispositivo
adb shell am start -W -a android.intent.action.VIEW \
  -d "https://tu-dominio.com/rifa/test-id"
```

### iOS

```bash
# Verificar apple-app-site-association
curl https://tu-dominio.com/.well-known/apple-app-site-association | jq

# Verificar en Simulator
xcrun simctl openurl booted "https://tu-dominio.com/rifa/test-id"
```

## 🎨 Personalización

### Colores

Editar `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      primary: '#8B5CF6',
      secondary: '#EC4899',
    }
  }
}
```

### Meta Tags

Editar `app/rifa/[id]/page.tsx`:

```typescript
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: 'Tu título personalizado',
    description: 'Tu descripción',
    openGraph: {
      // ...
    },
  };
}
```

## 🧪 Testing

```bash
# Verificar tipos TypeScript
npx tsc --noEmit

# Lint
npm run lint

# Verificar build
npm run build
```

## 🐛 Troubleshooting

### Error: Cannot find module '@/...'

Verificar `tsconfig.json`:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Error: API connection refused

- Verificar que el backend esté corriendo
- Verificar `NEXT_PUBLIC_API_URL` en `.env.local`
- Verificar CORS en el backend

### Deep Links no funcionan

- Verificar archivos `.well-known/`
- Verificar que estén accesibles públicamente
- Verificar certificados (SHA256, Team ID)
- Verificar configuración en app móvil

## 📚 Recursos

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Android App Links](https://developer.android.com/training/app-links)
- [iOS Universal Links](https://developer.apple.com/ios/universal-links/)
- [Firebase Hosting](https://firebase.google.com/docs/hosting)

## 📄 Licencia

MIT

---

**Desarrollado con ❤️ para Rifa100**

