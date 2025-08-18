# Documentación del Sistema: Actas Digitales

Este documento detalla la arquitectura, funcionalidades y flujos de trabajo de la aplicación "Actas Digitales", una plataforma diseñada para modernizar y transparentar la gestión del Concejo Deliberante Municipal.

## 1. Core Features (Características Principales)

### 1.1. Dashboard de Visualización
- **Ubicación:** `/dashboard`
- **Descripción:** Es la página principal de la aplicación. Ofrece una vista rápida y consolidada de la actividad del concejo.
- **Componentes:**
    - **Tarjetas de Métricas:** Indicadores clave como Asistencia Promedio, Temas Pendientes y Aprobados, y la Próxima Sesión programada.
    - **Gráfico de Asistencia:** Un gráfico de barras que muestra el porcentaje de asistencia de cada concejal a las últimas sesiones.
    - **Tabla de Próximas Sesiones:** Un listado de las sesiones futuras con su estado (Confirmada, Pendiente, Cancelada, o Sesión Activa).

### 1.2. Gestión de Sesiones
- **Ubicación:** `/sessions` y `/sessions/[id]`
- **Descripción:** Permite administrar y consultar toda la información relativa a las sesiones del concejo.
- **Funcionalidades:**
    - **Listado de Sesiones:** Muestra una tabla con todas las sesiones, su fecha, estado y acciones rápidas como "Ver" o "Generar Acta".
    - **Detalle de Sesión:** Una vista completa de una sesión individual que incluye:
        - **Asistencia:** Listado de concejales presentes y ausentes.
        - **Temas Tratados:** Tabla con los expedientes discutidos, su presentador, y el resultado (Aprobado, Rechazado, Pendiente).
    - **Generación de Actas por IA:**
        - Una herramienta integrada que utiliza IA para generar un resumen y el acta completa de la sesión basándose en los datos registrados (asistentes, temas, resultados).

### 1.3. Plataforma de Participación Ciudadana
- **Ubicación:** `/participation`
- **Descripción:** Un espacio dedicado a la interacción entre los ciudadanos y el concejo. Se divide en dos secciones principales:
    - **Banca Ciudadana:** Permite a los ciudadanos solicitar un turno para exponer sus temas en las sesiones.
    - **Iniciativas Populares:** Un foro donde los ciudadanos pueden proponer, apoyar y seguir el estado de las iniciativas presentadas por la comunidad.

### 1.4. Perfil de Concejal
- **Ubicación:** `/profile`
- **Descripción:** Una página de perfil personal para cada concejal.
- **Información mostrada:**
    - **Datos Personales:** Nombre, partido y avatar.
    - **Estadísticas Clave:** Porcentaje de asistencia total, total de votos emitidos y temas presentados.
    - **Historial de Votaciones:** Una tabla con el registro de cómo ha votado el concejal en los diferentes temas tratados.

### 1.5. Configuración de la Aplicación
- **Ubicación:** `/settings`
- **Descripción:** Permite a los usuarios personalizar su experiencia en la aplicación.
- **Opciones:**
    - **Edición de Perfil:** Modificar nombre, partido y cambiar el avatar.
    - **Gestión de Notificaciones:** Activar o desactivar alertas sobre nuevas sesiones o iniciativas.
    - **Apariencia:** Cambiar entre el tema visual "Claro" y "Oscuro".

### 1.6. Buscador Global
- **Descripción:** Una herramienta de búsqueda accesible desde el encabezado de la aplicación.
- **Funcionalidad:** Permite buscar y encontrar rápidamente:
    - **Sesiones:** Por título.
    - **Temas y Expedientes:** Por título o número de expediente.
- Los resultados se muestran en un diálogo con enlaces directos a la página de detalle correspondiente.

---

## 2. Sistema de Banca Participativa Ciudadana

A continuación, se detalla el proceso y las reglas para la gestión de turnos de la Banca Participativa.

### 2.1. Instrucciones para el Sistema
- **Funcionalidad:** Gestión de turnos para Banca Participativa ciudadana.
- **Parámetros obligatorios:**
    - **Duración:** 15 minutos máximo por participación.
    - **Modalidad:** Tema libre (cualquier asunto de interés municipal).
    - **Anticipación:** La solicitud debe realizarse con un mínimo de 48 horas antes de la sesión.

### 2.2. Proceso Automatizado

**1. Registro de Solicitud**
Cuando un ciudadano solicite turno para Banca Participativa, el sistema debe:
- Registrar datos personales completos del solicitante (Nombre y Apellido).
- Solicitar título/tema a tratar (máximo 100 caracteres).
- Requerir resumen del tema (máximo 300 palabras).
- Asignar fecha y horario disponible (simulado en el prototipo, se selecciona una fecha).
- Generar número de turno único (a implementar en backend).

**2. Notificación a Concejales (Flujo Teórico)**
El sistema debe enviar automáticamente 48 horas antes:
- **ASUNTO:** Nueva Banca Participativa - [FECHA SESIÓN]
- **SOLICITANTE:** [Nombre y apellido]
- **TEMA:** [Título del tema]
- **RESUMEN:** [Descripción proporcionada]
- **DURACIÓN:** 15 minutos máximos
- **TURNO N°:** [Número]

**3. Recordatorio al Ciudadano (Flujo Teórico)**
Enviar 24 horas antes:
> Estimado/a [NOMBRE]:
> Su turno de Banca Participativa está confirmado para:
> - Fecha: [DD/MM/AAAA]
> - Hora aproximada: [HH:MM]
> - Tema registrado: [TÍTULO]
> - Duración máxima: 15 minutos
> - Turno N°: [NÚMERO]
>
> Recuerde presentarse 15 minutos antes del horario asignado.

### 2.3. Funciones Adicionales

**Para Concejales:**
- **Panel de visualización de temas próximos:** Disponible en `/participation`, muestra los próximos turnos agendados.
- **Historial de participaciones por ciudadano:** A implementar.
- **Estadísticas de temas más frecuentes:** A implementar.
- **Opción de solicitar información adicional al ciudadano:** A implementar.

**Para Ciudadanos:**
- **Estado del trámite (confirmado/en espera/reprogramado):** A implementar.
- **Posibilidad de adjuntar documentos de apoyo:** A implementar.
- **Opción de cancelar o reprogramar (hasta 24hs antes):** A implementar.

**Para Secretaría:**
- **Control de tiempo durante la sesión:** A implementar.
- **Registro de asistencia efectiva:** A implementar.
- **Generación de actas con participaciones ciudadanas:** La IA puede incorporar estas participaciones en el acta final.

### 2.4. Validaciones del Sistema

- ✅ Máximo 12 turnos por ciudadano por mes (3 por semana).
- ✅ Verificar que el tema no sea repetitivo del mismo solicitante.
- ✅ Confirmar datos de contacto válidos.
- ✅ Respetar orden cronológico de solicitudes.
- ✅ Limitar participaciones por sesión según tiempo disponible.

*Nota: Estas validaciones se aplicarían en la lógica de negocio del backend en una implementación de producción.*

### 2.5. Objetivo del Sistema
Garantizar que los concejales conozcan anticipadamente los temas ciudadanos, permitiendo una mejor preparación y respuesta informada durante las sesiones deliberativas.
