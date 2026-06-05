import { useParams } from 'react-router-dom'

// Placeholder — el Integrante 3 implementará esta página
export default function TaskDetail() {
  const { id } = useParams<{ id: string }>()
  return (
    <main className="min-h-screen p-6">
      <h1 className="text-2xl font-semibold">Tarea #{id}</h1>
      <p className="text-gray-500 mt-2">Detalle — en construcción</p>
    </main>
  )
}
