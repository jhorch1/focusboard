import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

interface LayoutProps {
  children: React.ReactNode
  title: string
  subtitle?: string
}

const navigation = [
  { to: '/', label: 'Dashboard' },
  { to: '/task/102', label: 'Tarea activa' },
]

export default function Layout({ children, title, subtitle }: LayoutProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-slate-200 bg-white px-5 py-6 shadow-xl shadow-slate-200/60 transition-transform duration-200 lg:translate-x-0 lg:shadow-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-600 text-lg font-semibold text-white">
              F
            </span>
            <div>
              <p className="text-lg font-semibold leading-tight">FocusBoard</p>
              <p className="text-sm text-slate-500">Gestion de tareas</p>
            </div>
          </Link>
          <button
            type="button"
            aria-label="Cerrar menu"
            className="relative h-9 w-9 rounded-lg border border-slate-200 text-slate-600 lg:hidden"
            onClick={() => setIsOpen(false)}
          >
            <span className="absolute left-1/2 top-1/2 h-0.5 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-current" />
            <span className="absolute left-1/2 top-1/2 h-0.5 w-4 -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full bg-current" />
          </button>
        </div>

        <nav className="mt-8 space-y-2">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block rounded-lg px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-900">Sprint UI</p>
          <p className="mt-1 text-sm leading-6 text-slate-500">
            Rutas, filtros y tablero Kanban listos para conectar a datos reales.
          </p>
        </div>
      </aside>

      {isOpen && (
        <button
          type="button"
          aria-label="Cerrar menu lateral"
          className="fixed inset-0 z-30 bg-slate-950/35 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Abrir menu"
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-slate-200 text-slate-700 lg:hidden"
              onClick={() => setIsOpen(true)}
            >
              <span className="h-0.5 w-5 rounded-full bg-current" />
              <span className="h-0.5 w-5 rounded-full bg-current" />
              <span className="h-0.5 w-5 rounded-full bg-current" />
            </button>
            <div>
              <h1 className="text-xl font-semibold tracking-normal text-slate-950 sm:text-2xl">
                {title}
              </h1>
              {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
            </div>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  )
}
