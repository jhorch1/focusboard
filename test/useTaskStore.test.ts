import { useTaskStore } from '../src/store/useTaskStore'
import type { Task } from '../src/types'

describe('useTaskStore actions', () => {
  beforeEach(() => {
    window.localStorage.clear()
    useTaskStore.setState({
      tasks: [],
      filterState: { search: '', priority: 'all', status: 'all' },
      timerState: {
        mode: 'work',
        secondsLeft: 25 * 60,
        isRunning: false,
        taskId: null,
      },
    })
  })

  it('addTask agrega una tarea con id único', () => {
    const newTask: Task = {
      id: '999',
      title: 'Tarea de prueba',
      description: 'Descripción de prueba',
      status: 'todo',
      priority: 'low',
      tags: ['test'],
      createdAt: Date.now(),
    }

    useTaskStore.getState().addTask(newTask)

    const tasks = useTaskStore.getState().tasks
    expect(tasks).toHaveLength(1)
    expect(tasks[0]).toEqual(newTask)
    expect(tasks.filter((task) => task.id === newTask.id)).toHaveLength(1)
  })

  it('deleteTask elimina la tarea correcta por id', () => {
    const taskA: Task = {
      id: 'a1',
      title: 'Tarea A',
      description: 'Primera tarea',
      status: 'todo',
      priority: 'medium',
      tags: [],
      createdAt: Date.now(),
    }
    const taskB: Task = {
      id: 'b2',
      title: 'Tarea B',
      description: 'Segunda tarea',
      status: 'todo',
      priority: 'medium',
      tags: [],
      createdAt: Date.now(),
    }

    useTaskStore.setState({ tasks: [taskA, taskB] })
    useTaskStore.getState().deleteTask('a1')

    expect(useTaskStore.getState().tasks).toEqual([taskB])
  })

  it('moveTask cambia el status de la tarea correctamente', () => {
    const task: Task = {
      id: 'c3',
      title: 'Tarea C',
      description: 'Tercera tarea',
      status: 'todo',
      priority: 'high',
      tags: [],
      createdAt: Date.now(),
    }

    useTaskStore.setState({ tasks: [task] })
    useTaskStore.getState().moveTask('c3', 'done')

    expect(useTaskStore.getState().tasks).toEqual([
      expect.objectContaining({ id: 'c3', status: 'done' }),
    ])
  })
})
