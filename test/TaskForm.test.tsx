import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TaskForm from '../src/components/TaskForm.tsx'
import { useTaskStore } from '../src/store/useTaskStore'

describe('TaskForm component', () => {
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

  it('muestra error si se envía vacío', async () => {
    render(<TaskForm />)
    const button = screen.getByRole('button', { name: /agregar/i })
    await userEvent.click(button)
    expect(screen.getByRole('alert').textContent).toBe('El título es obligatorio')
  })

  it('al completar y enviar llama a addTask con los datos correctos y limpia campos', async () => {
    render(<TaskForm />)

    const titleInput = screen.getByPlaceholderText(/Título de la tarea/i)
    const descInput = screen.getByPlaceholderText(/Descripción/i)
    const prioritySelect = screen.getByLabelText(/Prioridad/i)
    const button = screen.getByRole('button', { name: /agregar/i })

    await userEvent.type(titleInput, 'Nueva tarea')
    await userEvent.type(descInput, 'Detalle de la tarea')
    await userEvent.selectOptions(prioritySelect, 'high')

    await userEvent.click(button)

    const tasks = useTaskStore.getState().tasks
    expect(tasks).toHaveLength(1)
    expect(tasks[0].title).toBe('Nueva tarea')
    expect(tasks[0].description).toBe('Detalle de la tarea')
    expect(tasks[0].priority).toBe('high')

    expect((titleInput as HTMLInputElement).value).toBe('')
    expect((descInput as HTMLTextAreaElement).value).toBe('')
    expect((prioritySelect as HTMLSelectElement).value).toBe('medium')
  })
})
