import type { Step } from 'react-joyride';

export const tourSteps: Step[] = [
  {
    target: '#tour-step-1',
    content: '¡Bienvenido a Actas Digitales! Este es el menú principal donde puedes navegar a todas las secciones importantes.',
    placement: 'right',
    disableBeacon: true,
  },
  {
    target: '#tour-step-2',
    content: 'Usa esta barra de búsqueda para encontrar rápidamente sesiones, temas o expedientes.',
    placement: 'bottom',
  },
  {
    target: '#tour-step-3',
    content: 'Aquí tienes un resumen visual de la actividad del concejo, con las métricas más importantes a la vista.',
    placement: 'bottom',
  },
  {
    target: '#nav-participation',
    content: 'En la sección de Participación Ciudadana puedes solicitar la palabra, proponer iniciativas o seguir un referéndum.',
    placement: 'right',
  },
  {
    target: '#tour-step-4',
    content: 'Finalmente, desde aquí puedes acceder a tu perfil, la configuración o cerrar tu sesión. ¡Explora la plataforma!',
    placement: 'left',
  },
];
