import { useState } from 'react'
import { useTaskStore } from '../store/useTaskStore'
import type { TaskPriority } from '../types'

export default function TaskForm() {
  const addTask = useTaskStore((state) => state.addTask)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<TaskPriority>('medium')
  const [error, setError] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!title.trim()) {
      setError('El título es obligatorio')
      return
    }

    setError('')
    addTask({
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      status: 'todo',
      priority,
      tags: [],
      createdAt: Date.now(),
    })

    setTitle('')
    setDescription('')
    setPriority('medium')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <p role="alert" className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {error}
        </p>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-slate-700">
          Título
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título de la tarea"
          className="mt-1 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-slate-700">
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción"
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
        />
      </div>

      <div>
        <label htmlFor="priority" className="block text-sm font-medium text-slate-700">
          Prioridad
        </label>
        <select
          id="priority"
          name="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value as TaskPriority)}
          className="mt-1 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
        >
          <option value="low">Baja</option>
          <option value="medium">Media</option>
          <option value="high">Alta</option>
        </select>
      </div>

      <button
        type="submit"
        className="h-11 w-full rounded-lg bg-brand-600 text-sm font-semibold text-white transition hover:bg-brand-700"
      >
        Agregar tarea
      </button>
    </form>
  )
}
