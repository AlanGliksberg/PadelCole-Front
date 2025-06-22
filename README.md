# 🎾 PadelCole Frontend

Una aplicación móvil desarrollada con **React Native** y **Expo** que conecta jugadores de pádel en Argentina, facilitando la organización de partidos y la búsqueda de compañeros de juego.

## 📋 Descripción

PadelCole es la plataforma que está creando la comunidad más grande de pádel en Argentina. La aplicación permite a los usuarios:

- **Crear partidos**: Organizar encuentros de pádel con especificaciones detalladas
- **Buscar jugadores**: Encontrar compañeros de juego según nivel, género y posición
- **Gestionar partidos**: Administrar partidos creados y ver su estado
- **Perfil personalizado**: Configurar preferencias y nivel de juego

## ✨ Funcionalidades Principales

### 🏠 **Home**

- Vista principal con información general de la aplicación
- Acceso rápido a las funcionalidades principales

### 🎯 **Quiero Jugar**

- Buscar partidos disponibles cerca de tu ubicación
- Filtrar por nivel, género y categoría
- Unirse a partidos existentes

### 👥 **Me Falta Alguien**

- Crear nuevos partidos con especificaciones detalladas
- Gestionar partidos creados
- Ver estado de los partidos (pendientes, en curso, completados)
- Agregar/eliminar jugadores de los equipos

### 👤 **Perfil**

- Configurar información personal
- Establecer nivel de juego y preferencias
- Ver historial de partidos

## 🛠️ Tecnologías Utilizadas

- **React Native** (0.79.4) - Framework principal
- **Expo** (53.0.12) - Plataforma de desarrollo
- **TypeScript** - Tipado estático
- **React Navigation** - Navegación entre pantallas
- **React Hook Form** - Manejo de formularios
- **Yup** - Validación de esquemas
- **Axios** - Cliente HTTP
- **AsyncStorage** - Almacenamiento local
- **Expo Router** - Enrutamiento basado en archivos

## 📱 Compatibilidad

- **iOS**: Soporte para iPhone y iPad
- **Android**: Compatible con dispositivos Android
- **Web**: Versión web disponible

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js (versión recomendada: 18+)
- npm, yarn o pnpm
- Expo CLI
- Android Studio (para desarrollo Android)
- Xcode (para desarrollo iOS, solo macOS)

### Pasos de instalación

1. **Clonar el repositorio**

   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd PadelCole-Front
   ```

2. **Instalar dependencias**

   ```bash
   pnpm install
   # o
   npm install
   # o
   yarn install
   ```

3. **Configurar variables de entorno**

   ```bash
   # Crear archivo .env basado en .env.example
   cp .env.example .env
   ```

4. **Ejecutar la aplicación**

   ```bash
   # Desarrollo
   pnpm start

   # Con túnel (para probar en dispositivo físico)
   pnpm tunnel

   # Plataformas específicas
   pnpm android
   pnpm ios
   pnpm web
   ```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── ui/             # Componentes de interfaz base
│   ├── MatchBox/       # Componente de partido
│   ├── MatchForm/      # Formulario de creación
│   ├── Modals/         # Modales de la aplicación
│   └── PlayersList/    # Lista de jugadores
├── screens/            # Pantallas principales
│   ├── Home/           # Pantalla principal
│   ├── CrearPartido/   # Creación de partidos
│   ├── MeFaltaAlguien/ # Gestión de partidos
│   ├── QuieroJugar/    # Búsqueda de partidos
│   └── Perfil/         # Perfil de usuario
├── navigation/         # Configuración de navegación
├── services/           # Servicios de API
├── contexts/           # Contextos de React
├── hooks/              # Hooks personalizados
├── types/              # Definiciones de TypeScript
├── theme/              # Configuración de estilos
└── utils/              # Utilidades y helpers
```

## 🔧 Scripts Disponibles

- `pnpm start` - Inicia el servidor de desarrollo
- `pnpm tunnel` - Inicia con túnel para dispositivos físicos
- `pnpm android` - Ejecuta en emulador/dispositivo Android
- `pnpm ios` - Ejecuta en simulador/dispositivo iOS
- `pnpm web` - Ejecuta versión web
- `pnpm lint` - Ejecuta el linter
- `pnpm reset-project` - Resetea el proyecto

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia [MIT](LICENSE).

---

**¡Únete a la comunidad más grande de pádel en Argentina! 🎾🇦🇷**
