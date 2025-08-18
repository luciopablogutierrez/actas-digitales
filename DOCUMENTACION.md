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

---

## 3. Sistema de Referéndum Revocatorio

A continuación, se detallan las especificaciones para la gestión del proceso de referéndum revocatorio del intendente municipal.

### 3.1. Instrucciones para el Sistema
- **Funcionalidad:** Gestión completa del proceso de referéndum revocatorio del intendente municipal según Ley Provincial de Buenos Aires.
- **Autoridad Competente:** Junta Electoral de la Provincia de Buenos Aires.

### 3.2. Requisitos Iniciales del Sistema

#### 1. Condiciones Habilitantes
El sistema debe verificar automáticamente:
- ✅ Intendente debe haber cumplido más de 12 meses desde asunción del cargo.
- ✅ Deben restar más de 6 meses para finalizar el mandato.
- ✅ No puede haber otra petición por las mismas causales y hechos en el mismo período.
- ✅ Solo ciudadanos habilitados para votar pueden iniciar el proceso.

#### 2. Iniciación del Proceso
- **Derecho Ciudadano:** Cualquier ciudadano puede iniciar el procedimiento.
- **Motivo:** Incumplimiento del programa de gobierno o acciones contrarias al mismo.
- **Presentación ante:** Junta Electoral de la Provincia.
- **Modalidad:** Iniciativa popular.

### 3.3. Etapas del Proceso

#### Etapa 1: Presentación del Petitorio
- **Ante:** Junta Electoral de la Provincia de Buenos Aires.
- **Contenido obligatorio del escrito:**
    - Identificación completa de los peticionarios.
    - Expresión clara de los incumplimientos del programa de gobierno.
    - Detalle específico de acciones contrarias al programa.
    - Fundamentación legal de la solicitud.
    - Designación de hasta 3 representantes.

#### Etapa 2: Recolección de Adhesiones
- **Requisitos Específicos:**
    - **Objetivo:** Mínimo 10% de electores inscriptos en padrón municipal.
    - **Plazo máximo:** 12 meses para recolección.
    - **Firmas:** Deben estar autenticadas.
    - **Padrón base:** Vigente a las últimas elecciones municipales.
- **Funciones del sistema:**
    - Cálculo automático del 10% del padrón electoral municipal.
    - Registro de recolectores autorizados.
    - Control de avance de adhesiones autenticadas.
    - Verificación contra padrón electoral vigente.
    - Contador público en tiempo real.
    - Alertas de vencimiento de plazo.

#### Etapa 3: Verificación de Firmas
- **Autoridad:** Junta Electoral Provincial.
- **Plazo:** 20 días para verificación de legitimidad y validez.
- **Proceso automatizado:**
    - Validación cruzada con padrón electoral.
    - Eliminación de duplicados.
    - Control de autenticidad de firmas.
    - Cálculo final de porcentaje alcanzado.
    - Generación de resolución automática.

#### Etapa 4: Convocatoria a Referéndum
- **Si se valida el 10% mínimo:**
    - **Cronograma Obligatorio:**
        - **Convocatoria:** Inmediata tras validación positiva.
        - **Plazo para referéndum:** Entre 30 y 60 días desde convocatoria.
        - **Modalidad:** Voto obligatorio.
        - **Padrón:** El vigente a las últimas elecciones municipales.
    - **Pregunta Oficial Obligatoria:**
        > "¿Está usted de acuerdo con revocar el mandato del Intendente Municipal [NOMBRE COMPLETO] de San Antonio de Areco por incumplimiento del programa de gobierno?"
        > □ SÍ, revoco el mandato
        > □ NO, no revoco el mandato

### 3.4. Funcionalidades del Sistema por Panel

#### Panel Público (Ciudadanos)
- Cálculo automático del 10% del padrón requerido.
- Estado actual del proceso y días restantes.
- Contador de adhesiones válidas en tiempo real.
- Información sobre puntos de autenticación de firmas.
- Cronograma de etapas y plazos legales.
- Acceso a programa de gobierno original del intendente.

#### Panel Administrativo (Junta Electoral)
- Interface para validación masiva de firmas.
- Control de autenticidad documental.
- Generación automática de padrones electorales.
- Configuración de mesas y circuitos electorales.
- Sistema de acreditación de fiscales.
- Reportes para Junta Electoral Provincial.

#### Panel Peticionarios
- Carga de adhesiones recolectadas.
- Estado de validación por lotes.
- Gestión de recolectores autorizados.
- Comunicaciones oficiales con Junta Electoral.
- Descarga de formularios oficiales.
- Designación de fiscales para el acto electoral.

#### Panel Fiscalización
- Acreditación de fiscales (peticionarios y partidos políticos).
- Acceso a información del proceso electoral.
- Reportes de irregularidades.
- Seguimiento del escrutinio.

### 3.5. Resultados y Efectos

- **Cálculo según Ley Provincial:**
    - **Umbral requerido:** Más del 50% de los electores inscriptos en el padrón total (NO sobre votos emitidos).
    - **Cálculo:** `(Votos SÍ / Total electores inscriptos) × 100`
- **Efectos Legales Automáticos:**
    - **Si se aprueba:** Cese inmediato del intendente, notificación al Gobierno Provincial, y activación de protocolo de sucesión.
    - **Si no se aprueba:** El mandato continúa y se archiva el expediente.

### 3.6. Salvaguardias y Transparencia
- **Control de Unicidad:** Verificación de una sola petición por mismas causales.
- **Fiscalización Electoral:** Acreditación de fiscales para peticionarios y partidos.
- **Transparencia Obligatoria:** Publicación de programa de gobierno, incumplimientos, estadísticas y resoluciones.

### 3.7. Objetivo
Implementar un sistema que cumpla estrictamente con la Ley Provincial de Buenos Aires sobre revocatoria de mandato, garantizando transparencia, legalidad y eficiencia en el proceso democrático de control ciudadano sobre el cumplimiento del programa de gobierno del intendente de San Antonio de Areco.
