# GitHub Issues — FocusBoard
# Copia cada bloque y pégalo en GitHub > Issues > New Issue

=====================================================================
ISSUE #1
Título: [DevOps] Inicializar repositorio y proteger rama main
Etiquetas: devops, setup
Asignado a: Integrante 1

Descripción:
- Crear repositorio público en GitHub con nombre `focusboard`
- Subir estructura inicial del proyecto (Vite + React + TS)
- Proteger la rama `main`: requerir PR aprobado antes de hacer merge
- Configurar regla: mínimo 1 revisor (Integrante 2)

Criterio de aceptación:
- [ ] Repo visible en GitHub con README
- [ ] Rama main protegida (branch protection rules activas)
- [ ] Estructura de carpetas subida
=====================================================================

=====================================================================
ISSUE #2
Título: [DevOps] Configurar deploy continuo en Netlify
Etiquetas: devops, ci-cd
Asignado a: Integrante 1

Descripción:
- Conectar repositorio de GitHub con Netlify
- Configurar build command: `npm run build`
- Configurar publish directory: `dist`
- Agregar archivo `netlify.toml` con redirección SPA (`/* → /index.html`)
- Verificar que cada push a `main` dispare un deploy automático

Criterio de aceptación:
- [ ] URL de producción en Netlify funcionando
- [ ] Deploy automático al hacer merge a main
- [ ] Redirecciones SPA funcionando (rutas no dan 404)
=====================================================================

=====================================================================
ISSUE #3
Título: [Setup] Configurar Tailwind CSS + PostCSS
Etiquetas: setup, frontend
Asignado a: Integrante 1

Descripción:
- Instalar tailwindcss, postcss, autoprefixer
- Configurar `tailwind.config.js` con paths de contenido
- Configurar `postcss.config.js`
- Agregar directivas `@tailwind` en `index.css`
- Verificar que clases de Tailwind funcionen en componentes

Criterio de aceptación:
- [ ] `npm run build` sin errores de CSS
- [ ] Clases de Tailwind aplicadas correctamente en al menos un componente
=====================================================================

=====================================================================
ISSUE #4
Título: [Setup] Configurar ESLint con TypeScript estricto
Etiquetas: setup, calidad
Asignado a: Integrante 1

Descripción:
- Instalar eslint, @typescript-eslint/parser, @typescript-eslint/eslint-plugin
- Configurar `.eslintrc.cjs` con reglas estrictas
- Regla `no-unused-vars` en error
- Regla `react-hooks/exhaustive-deps` activa
- Verificar que `npm run lint` pasa sin warnings en build

Criterio de aceptación:
- [ ] `npm run lint` pasa con 0 errores
- [ ] `npm run build` pasa sin errores de TypeScript
=====================================================================

=====================================================================
ISSUE #5
Título: [Performance] Implementar React.lazy en rutas
Etiquetas: performance
Asignado a: Integrante 1

Descripción:
- Convertir imports de páginas a lazy imports en `main.tsx`
- Envolver `<Routes>` con `<Suspense fallback={...}>`
- Crear componente `LoadingSpinner` como fallback
- Verificar en DevTools que cada ruta genera chunk separado en build

Criterio de aceptación:
- [ ] `npm run build` genera chunks separados por ruta (Dashboard, TaskDetail, NotFound)
- [ ] No hay salto visual al navegar (Suspense funciona)
=====================================================================

=====================================================================
ISSUE #6
Título: [Performance] Auditoría Lighthouse y optimizaciones finales
Etiquetas: performance, auditoria
Asignado a: Integrante 1

Descripción:
- Correr Lighthouse en la URL de producción de Netlify
- Captura de pantalla del reporte con scores
- Aplicar useMemo en listas filtradas de tareas
- Aplicar useCallback en handlers de eventos que se pasan como props
- Volver a correr Lighthouse y comparar scores

Criterio de aceptación:
- [ ] Score Performance ≥ 85 en Lighthouse
- [ ] Captura de pantalla del reporte incluida en el informe
- [ ] Al menos 2 usos documentados de useMemo/useCallback
=====================================================================

=====================================================================
ISSUE #7
Título: [Testing] Configurar entorno Vitest + React Testing Library
Etiquetas: testing, setup
Asignado a: Integrante 2

Descripción:
- Instalar vitest, @testing-library/react, @testing-library/jest-dom, jsdom
- Configurar `vite.config.ts` con environment jsdom
- Crear `setupTests.ts` con import de jest-dom
- Verificar que `npm test` corre sin errores

Criterio de aceptación:
- [ ] `npm test` corre y muestra suite vacía sin errores
=====================================================================

=====================================================================
ISSUE #8
Título: [Testing] Prueba unitaria: lógica del timer Pomodoro
Etiquetas: testing
Asignado a: Integrante 2

Descripción:
Escribir prueba que valide:
- El timer inicia en 25:00 (1500 segundos) en modo work
- El timer cambia a modo break (5 min) al llegar a 0
- El estado `isRunning` cambia correctamente al pausar/reanudar

Criterio de aceptación:
- [ ] Prueba pasa en verde con `npm test`
=====================================================================

=====================================================================
ISSUE #9
Título: [Testing] Prueba unitaria: mutación del estado global Zustand
Etiquetas: testing
Asignado a: Integrante 2

Descripción:
Escribir prueba que valide:
- addTask agrega una tarea con id único
- deleteTask elimina la tarea correcta por id
- moveTask cambia el status de la tarea correctamente

Criterio de aceptación:
- [ ] Prueba pasa en verde con `npm test`
=====================================================================

=====================================================================
ISSUE #10
Título: [Testing] Prueba unitaria: filtros y búsqueda
Etiquetas: testing
Asignado a: Integrante 2

Descripción:
Escribir prueba que valide:
- El filtro por prioridad devuelve solo tareas de esa prioridad
- La búsqueda por texto filtra correctamente por título
- Los filtros combinados (prioridad + búsqueda) funcionan juntos

Criterio de aceptación:
- [ ] Prueba pasa en verde con `npm test`
=====================================================================

=====================================================================
ISSUE #11
Título: [Testing] Prueba unitaria: componente formulario de tareas
Etiquetas: testing
Asignado a: Integrante 2

Descripción:
Escribir prueba que valide:
- El formulario muestra error si se envía vacío
- Al completar y enviar el formulario, llama a addTask con los datos correctos
- Los campos se limpian luego de agregar una tarea

Criterio de aceptación:
- [ ] Prueba pasa en verde con `npm test`
=====================================================================

=====================================================================
ISSUE #12
Título: [UI] Maquetar layout base responsivo con Tailwind
Etiquetas: frontend, ui
Asignado a: Integrante 3

Descripción:
- Crear componente Layout con sidebar y área de contenido
- Mobile-First: en móvil sidebar colapsa a menú hamburguesa
- En desktop: sidebar fija a la izquierda, contenido en el resto
- Aplicar fuentes DM Sans y paleta de colores definida

Criterio de aceptación:
- [ ] Layout funciona en móvil (375px) y escritorio (1280px)
=====================================================================

=====================================================================
ISSUE #13
Título: [UI] Configurar React Router con rutas dinámicas
Etiquetas: frontend, routing
Asignado a: Integrante 3

Descripción:
- Confirmar rutas: `/` (Dashboard), `/task/:id` (Detalle), `*` (404)
- Navegación entre páginas con `<Link>` de React Router
- Ruta `/task/:id` extrae el id con `useParams`

Criterio de aceptación:
- [ ] Navegar a `/task/123` muestra el id en pantalla
- [ ] Ruta inexistente muestra página 404
=====================================================================

=====================================================================
ISSUE #14
Título: [UI] Construir vistas Dashboard y TaskDetail
Etiquetas: frontend, ui
Asignado a: Integrante 3

Descripción:
- Dashboard: 3 columnas Kanban (Por hacer / En progreso / Hecho)
- Dashboard: barra de búsqueda + filtros de prioridad y estado
- TaskDetail: datos completos de la tarea con botón volver
- Diseño responsivo en ambas vistas

Criterio de aceptación:
- [ ] Ambas vistas renderizan sin errores con datos mock
=====================================================================

=====================================================================
ISSUE #15
Título: [State] Implementar store Zustand con tipos estrictos
Etiquetas: estado, logica
Asignado a: Integrante 4

Descripción:
- Crear `src/store/useTaskStore.ts` con Zustand
- Estado: tasks[], filterState, timerState
- Acciones: addTask, editTask, deleteTask, moveTask, setFilter
- Persistencia automática en localStorage con middleware persist

Criterio de aceptación:
- [ ] Store importable desde cualquier componente
- [ ] Estado persiste al recargar la página
=====================================================================

=====================================================================
ISSUE #16
Título: [State] Implementar lógica del timer Pomodoro
Etiquetas: estado, logica
Asignado a: Integrante 4

Descripción:
- Timer de 25 min (work) y 5 min (break)
- Acciones: startTimer, pauseTimer, resetTimer
- Al llegar a 0 cambia de modo automáticamente
- Alerta de sonido (Web Audio API o Audio element) al terminar sesión
- Estado del timer persiste en localStorage

Criterio de aceptación:
- [ ] Timer cuenta regresivamente en tiempo real
- [ ] Sonido suena al llegar a 0
- [ ] Estado persiste al recargar
=====================================================================
