import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Dashboard from '../src/pages/Dashboard'

describe('Dashboard filters and search', () => {
  function renderDashboard() {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    )
  }

  it('El filtro por prioridad devuelve solo tareas de esa prioridad', async () => {
    renderDashboard()

    const prioritySelect = screen.getByLabelText(/Prioridad/i)
    await userEvent.selectOptions(prioritySelect, 'high')

    expect(screen.getByText('Definir flujo del dashboard')).toBeInTheDocument()
    expect(screen.getByText('Preparar datos mock')).toBeInTheDocument()
    expect(screen.queryByText('Revisar responsive mobile')).not.toBeInTheDocument()
    expect(screen.queryByText('Pulir paleta visual')).not.toBeInTheDocument()
  })

  it('La búsqueda por texto filtra correctamente por título', async () => {
    renderDashboard()

    const searchInput = screen.getByPlaceholderText(/Titulo, descripcion o etiqueta/i)
    await userEvent.type(searchInput, 'rutas')

    expect(screen.getByText('Conectar rutas dinamicas')).toBeInTheDocument()
    expect(screen.queryByText('Definir flujo del dashboard')).not.toBeInTheDocument()
    expect(screen.queryByText('Pulir paleta visual')).not.toBeInTheDocument()
  })

  it('Los filtros combinados (prioridad + búsqueda) funcionan juntos', async () => {
    renderDashboard()

    const searchInput = screen.getByPlaceholderText(/Titulo, descripcion o etiqueta/i)
    const prioritySelect = screen.getByLabelText(/Prioridad/i)

    await userEvent.type(searchInput, 'paleta')
    await userEvent.selectOptions(prioritySelect, 'low')

    expect(screen.getByText('Pulir paleta visual')).toBeInTheDocument()
    expect(screen.queryByText('Definir flujo del dashboard')).not.toBeInTheDocument()
    expect(screen.queryByText('Conectar rutas dinamicas')).not.toBeInTheDocument()
  })
})
