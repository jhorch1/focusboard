export type TaskStatus = 'todo' | 'in-progress' | 'done'

export type TaskPriority = 'low' | 'medium' | 'high'

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  tags: string[]
  createdAt: number
}

export interface TimerState {
  mode: 'work' | 'break'
  secondsLeft: number
  isRunning: boolean
  taskId: string | null
}

export interface FilterState {
  search: string
  priority: TaskPriority | 'all'
  status: TaskStatus | 'all'
}
