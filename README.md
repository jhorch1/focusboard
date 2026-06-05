# FocusBoard

Tablero Kanban con timer Pomodoro integrado. MVP académico desarrollado con React + TypeScript + Tailwind CSS.

## Stack

- React 18 + TypeScript (strict)
- React Router v6 (rutas dinámicas)
- Zustand (estado global)
- Tailwind CSS (Mobile-First)
- Vite (bundler)
- Vitest + React Testing Library (pruebas)
- Netlify (deploy continuo)

## Instalación

```bash
npm install
npm run dev
```

## Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run lint` | Verificar calidad de código |
| `npm test` | Correr pruebas unitarias |

## Flujo de trabajo Git

1. Cada tarea tiene su **Issue** en GitHub
2. Crear rama desde `main`: `git checkout -b feat/nombre-tarea`
3. Hacer commits con mensajes descriptivos
4. Abrir **Pull Request** vinculado al issue: `Closes #N`
5. El Integrante 2 (QA) revisa y aprueba
6. Merge a `main` → deploy automático en Netlify

## Estructura del proyecto

```
src/
├── components/   # Componentes reutilizables
├── pages/        # Dashboard, TaskDetail, NotFound
├── store/        # Zustand store
├── hooks/        # Custom hooks
├── types/        # Tipos TypeScript
└── utils/        # Funciones utilitarias
```

## Equipo

| Integrante | Rol |
|---|---|
| Integrante 1 | DevOps & Git Flow + Performance & Audit |
| Integrante 2 | QA Engineer + Testing Lead |
| Integrante 3 | UI/UX Frontend + Interacciones |
| Integrante 4 | State & Logic Engineer |
