import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

export default function NotFound() {
  return (
    <Layout title="Pagina no encontrada" subtitle="La ruta solicitada no existe en FocusBoard.">
      <section className="flex min-h-[60vh] flex-col items-center justify-center rounded-lg border border-slate-200 bg-white p-6 text-center shadow-sm">
        <h2 className="text-7xl font-semibold text-brand-100">404</h2>
        <p className="mt-4 max-w-md text-slate-500">
          La pagina que intentas abrir no esta disponible. Puedes volver al tablero y seguir trabajando.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex h-11 items-center rounded-lg bg-brand-600 px-5 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          Volver al inicio
        </Link>
      </section>
    </Layout>
  )
}
