import type { Task } from '../types'

export const tasks: Task[] = [
  {
    id: '101',
    title: 'Definir flujo del dashboard',
    description:
      'Crear una vista clara para organizar tareas por estado, con busqueda y filtros rapidos para el equipo.',
    status: 'todo',
    priority: 'high',
    tags: ['UI', 'planning'],
    createdAt: Date.UTC(2026, 5, 5),
  },
  {
    id: '102',
    title: 'Conectar rutas dinamicas',
    description:
      'Permitir navegar desde cada tarjeta al detalle usando React Router y mostrar el identificador de la tarea.',
    status: 'in-progress',
    priority: 'medium',
    tags: ['routing', 'frontend'],
    createdAt: Date.UTC(2026, 5, 6),
  },
  {
    id: '103',
    title: 'Revisar responsive mobile',
    description:
      'Validar que el menu hamburguesa, el tablero y el detalle mantengan buena lectura en pantallas pequenas.',
    status: 'todo',
    priority: 'medium',
    tags: ['responsive', 'qa'],
    createdAt: Date.UTC(2026, 5, 7),
  },
  {
    id: '104',
    title: 'Pulir paleta visual',
    description:
      'Aplicar los colores base de FocusBoard con estados, bordes y tarjetas consistentes en toda la interfaz.',
    status: 'done',
    priority: 'low',
    tags: ['design-system'],
    createdAt: Date.UTC(2026, 5, 4),
  },
  {
    id: '105',
    title: 'Preparar datos mock',
    description:
      'Centralizar tareas de prueba para que Dashboard y TaskDetail rendericen sin depender de un backend.',
    status: 'done',
    priority: 'high',
    tags: ['mock', 'data'],
    createdAt: Date.UTC(2026, 5, 3),
  },
]

export const statusLabels = {
  todo: 'Por hacer',
  'in-progress': 'En progreso',
  done: 'Hecho',
} as const

export const priorityLabels = {
  low: 'Baja',
  medium: 'Media',
  high: 'Alta',
} as const
