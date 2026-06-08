import { Link, useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import { priorityLabels, statusLabels, tasks } from '../data/tasks'

export default function TaskDetail() {
  const { id } = useParams<{ id: string }>()
  const task = tasks.find((item) => item.id === id)

  if (!task) {
    return (
      <Layout title="Tarea no encontrada" subtitle={`No existe una tarea con id ${id ?? 'desconocido'}.`}>
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-slate-600">Revisa el identificador o vuelve al tablero principal.</p>
          <Link
            to="/"
            className="mt-5 inline-flex h-11 items-center rounded-lg bg-brand-600 px-4 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            Volver
          </Link>
        </div>
      </Layout>
    )
  }

  const formattedDate = new Intl.DateTimeFormat('es-CO', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(task.createdAt))

  return (
    <Layout title={task.title} subtitle={`Detalle de tarea #${task.id}`}>
      <article className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-brand-700">ID: {task.id}</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950">{task.title}</h2>
            </div>
            <Link
              to="/"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
            >
              Volver
            </Link>
          </div>

          <div className="mt-6 rounded-lg bg-slate-50 p-4">
            <h3 className="text-sm font-semibold uppercase tracking-normal text-slate-500">
              Descripcion
            </h3>
            <p className="mt-3 text-base leading-7 text-slate-700">{task.description}</p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {task.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-brand-50 px-3 py-1.5 text-sm font-medium text-brand-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-base font-semibold text-slate-950">Informacion</h3>
          <dl className="mt-5 space-y-4">
            <div>
              <dt className="text-sm text-slate-500">Estado</dt>
              <dd className="mt-1 font-semibold text-slate-900">{statusLabels[task.status]}</dd>
            </div>
            <div>
              <dt className="text-sm text-slate-500">Prioridad</dt>
              <dd className="mt-1 font-semibold text-slate-900">{priorityLabels[task.priority]}</dd>
            </div>
            <div>
              <dt className="text-sm text-slate-500">Creada</dt>
              <dd className="mt-1 font-semibold text-slate-900">{formattedDate}</dd>
            </div>
          </dl>
        </aside>
      </article>
    </Layout>
  )
}
