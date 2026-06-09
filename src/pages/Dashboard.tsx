import { useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import TaskForm from '../components/TaskForm'
import { priorityLabels, statusLabels } from '../data/tasks'
import { useTaskStore } from '../store/useTaskStore'
import type { TaskPriority, TaskStatus } from '../types'

type PriorityFilter = TaskPriority | 'all'
type StatusFilter = TaskStatus | 'all'

const statuses: TaskStatus[] = ['todo', 'in-progress', 'done']
const priorities: PriorityFilter[] = ['all', 'high', 'medium', 'low']
const statusFilters: StatusFilter[] = ['all', ...statuses]

const priorityStyles = {
  low: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  medium: 'bg-amber-50 text-amber-700 ring-amber-200',
  high: 'bg-rose-50 text-rose-700 ring-rose-200',
}

export default function Dashboard() {
  const tasks = useTaskStore((state) => state.tasks)
  const [search, setSearch] = useState('')
  const [priority, setPriority] = useState<PriorityFilter>('all')
  const [status, setStatus] = useState<StatusFilter>('all')
  const [showForm, setShowForm] = useState(false)

  // useMemo: recalcula la lista filtrada solo cuando cambian los filtros o las tareas
  const filteredTasks = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()
    return tasks.filter((task) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        task.title.toLowerCase().includes(normalizedSearch) ||
        task.description.toLowerCase().includes(normalizedSearch) ||
        task.tags.some((tag) => tag.toLowerCase().includes(normalizedSearch))
      const matchesPriority = priority === 'all' || task.priority === priority
      const matchesStatus = status === 'all' || task.status === status
      return matchesSearch && matchesPriority && matchesStatus
    })
  }, [tasks, priority, search, status])

  // useCallback: evita recrear handlers en cada render
  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => setSearch(event.target.value), [])

  const handlePriorityChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => setPriority(event.target.value as PriorityFilter), [])

  const handleStatusChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => setStatus(event.target.value as StatusFilter), [])

  const handleToggleForm = useCallback(() => setShowForm((prev) => !prev), [])

  const handleFormSuccess = useCallback(() => setShowForm(false), [])

  return (
    <Layout title="Dashboard" subtitle="Organiza el trabajo por estado y prioridad.">

      {/* Botón nueva tarea + modal */}
      <div className="mb-6 flex justify-end">
        <button
          type="button"
          onClick={handleToggleForm}
          className="inline-flex h-11 items-center gap-2 rounded-lg bg-brand-600 px-5 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          <span className="text-lg leading-none">+</span>
          Nueva tarea
        </button>
      </div>

      {/* Modal formulario */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4">
          <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-950">Nueva tarea</h2>
              <button
                type="button"
                onClick={handleToggleForm}
                aria-label="Cerrar"
                className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50"
              >
                ✕
              </button>
            </div>
            <TaskForm onSuccess={handleFormSuccess} />
          </div>
        </div>
      )}

      {/* Filtros */}
      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 lg:grid-cols-[1fr_220px_220px]">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Buscar</span>
            <input
              value={search}
              onChange={handleSearchChange}
              placeholder="Titulo, descripcion o etiqueta"
              className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Prioridad</span>
            <select
              value={priority}
              onChange={handlePriorityChange}
              className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
            >
              {priorities.map((item) => (
                <option key={item} value={item}>
                  {item === 'all' ? 'Todas' : priorityLabels[item]}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Estado</span>
            <select
              value={status}
              onChange={handleStatusChange}
              className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
            >
              {statusFilters.map((item) => (
                <option key={item} value={item}>
                  {item === 'all' ? 'Todos' : statusLabels[item]}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      {/* Kanban */}
      <section className="mt-6 grid gap-4 xl:grid-cols-3">
        {statuses.map((columnStatus) => {
          const columnTasks = filteredTasks.filter((task) => task.status === columnStatus)
          return (
            <div key={columnStatus} className="rounded-lg border border-slate-200 bg-slate-100/70 p-3">
              <div className="flex items-center justify-between px-1 py-2">
                <h2 className="text-sm font-semibold uppercase tracking-normal text-slate-600">
                  {statusLabels[columnStatus]}
                </h2>
                <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-500">
                  {columnTasks.length}
                </span>
              </div>
              <div className="mt-2 space-y-3">
                {columnTasks.map((task) => (
                  <Link
                    key={task.id}
                    to={`/task/${task.id}`}
                    className="block rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-base font-semibold leading-6 text-slate-950">{task.title}</h3>
                      <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${priorityStyles[task.priority]}`}>
                        {priorityLabels[task.priority]}
                      </span>
                    </div>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">{task.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {task.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
                {columnTasks.length === 0 && (
                  <div className="rounded-lg border border-dashed border-slate-300 bg-white/70 p-4 text-sm text-slate-500">
                    No hay tareas con estos filtros.
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </section>
    </Layout>
  )
}
