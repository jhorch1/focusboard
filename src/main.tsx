import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

// React.lazy — lazy loading de todas las rutas (Performance Lead)
const Dashboard = lazy(() => import('./pages/Dashboard'))
const TaskDetail = lazy(() => import('./pages/TaskDetail'))
const NotFound   = lazy(() => import('./pages/NotFound'))

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/"           element={<Dashboard />} />
          <Route path="/task/:id"   element={<TaskDetail />} />
          <Route path="*"           element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>,
)
