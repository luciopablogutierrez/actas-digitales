
import type { Step } from 'react-joyride';

export const tourSteps: Step[] = [
  {
    target: '#tour-step-1',
    content: '¡Bienvenido a Actas Digitales! Este es el menú principal donde puedes navegar a todas las secciones importantes.',
    placement: 'right',
    disableBeacon: true,
    title: 'Paso 1 de 9',
  },
  {
    target: '#nav-dashboard',
    content: 'El Dashboard te ofrece un resumen visual de la actividad del concejo con las métricas más importantes.',
    placement: 'right',
    title: 'Paso 2 de 9',
  },
  {
    target: '#nav-sessions',
    content: 'Aquí puedes consultar todas las sesiones pasadas, presentes y futuras, y generar actas con IA.',
    placement: 'right',
    title: 'Paso 3 de 9',
  },
  {
    target: '#nav-participation',
    content: 'En Participación Ciudadana puedes solicitar la palabra, proponer iniciativas o seguir un referéndum.',
    placement: 'right',
    title: 'Paso 4 de 9',
  },
    {
    target: '#nav-profile',
    content: 'Consulta tu perfil de concejal, tus estadísticas de asistencia y tu historial de votaciones.',
    placement: 'right',
    title: 'Paso 5 de 9',
  },
  {
    target: '#nav-settings',
    content: 'Personaliza tu experiencia, gestiona notificaciones y cambia la apariencia de la aplicación.',
    placement: 'right',
    title: 'Paso 6 de 9',
  },
  {
    target: '#tour-step-2',
    content: 'Usa esta barra de búsqueda para encontrar rápidamente sesiones, temas o expedientes.',
    placement: 'bottom',
    title: 'Paso 7 de 9',
  },
  {
    target: '#tour-step-notifications',
    content: 'Mantente al día con las últimas convocatorias a sesiones y nuevas iniciativas ciudadanas desde aquí.',
    placement: 'bottom',
    title: 'Paso 8 de 9',
  },
  {
    target: '#tour-step-account',
    content: 'Finalmente, desde aquí puedes acceder a tu perfil, la configuración o cerrar tu sesión. ¡Explora la plataforma!',
    placement: 'left',
    title: 'Paso 9 de 9',
  },
];
