import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Task, TaskStatus, FilterState, TimerState } from '../types'
import { tasks as initialTasks } from '../data/tasks'

interface TaskStore {
  // Estado
  tasks: Task[]
  filterState: FilterState
  timerState: TimerState

  // Acciones de tareas
  addTask: (task: Task) => void
  editTask: (id: string, changes: Partial<Task>) => void
  deleteTask: (id: string) => void
  moveTask: (id: string, status: TaskStatus) => void

  // Acciones de filtros
  setFilter: (filter: Partial<FilterState>) => void

  // Acciones del timer
  setTimer: (timer: Partial<TimerState>) => void
  startTimer: () => void
  pauseTimer: () => void
  resetTimer: () => void
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      // Estado inicial
      tasks: initialTasks,
      filterState: {
        search: '',
        priority: 'all',
        status: 'all',
      },
      timerState: {
        mode: 'work',
        secondsLeft: 25 * 60,
        isRunning: false,
        taskId: null,
      },

      // Tareas
      addTask: (task) =>
        set((state) => ({ tasks: [...state.tasks, task] })),

      editTask: (id, changes) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...changes } : t)),
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),

      moveTask: (id, status) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, status } : t)),
        })),

      // Filtros
      setFilter: (filter) =>
        set((state) => ({
          filterState: { ...state.filterState, ...filter },
        })),

      // Timer
      setTimer: (timer) =>
        set((state) => ({
          timerState: { ...state.timerState, ...timer },
        })),

      startTimer: () =>
        set((state) => ({
          timerState: { ...state.timerState, isRunning: true },
        })),

      pauseTimer: () =>
        set((state) => ({
          timerState: { ...state.timerState, isRunning: false },
        })),

      resetTimer: () =>
        set((state) => ({
          timerState: {
            ...state.timerState,
            isRunning: false,
            secondsLeft: state.timerState.mode === 'work' ? 25 * 60 : 5 * 60,
          },
        })),
    }),
    {
      name: 'focusboard-storage', // clave en localStorage
      partialize: (state) => ({
        tasks: state.tasks,
        filterState: state.filterState,
        timerState: state.timerState,
      }),
    }
  )
)