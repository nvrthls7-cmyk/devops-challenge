import React, { useEffect, useState, useCallback } from 'react'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8085";
const API = `${BASE_URL}/api/tasks`;

function Column({ title, tasks, onDropTask, onDelete }) {
  return (
    <div
      className="flex-1 p-4 bg-slate-800/40 rounded-xl min-h-[320px] border border-slate-700"
      onDragOver={e => e.preventDefault()}
      onDrop={e => {
        const id = e.dataTransfer.getData('text/plain')
        if (!id) return
        onDropTask(Number(id))
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold">{title}</h3>
        <span className="text-xs text-slate-300 bg-white/3 px-2 py-0.5 rounded-full">{tasks.length}</span>
      </div>

      <div className="space-y-3">
        {tasks.map(t => (
          <article
            key={t.id}
            draggable
            onDragStart={e => e.dataTransfer.setData('text/plain', t.id)}
            className="bg-gradient-to-b from-slate-800 to-slate-700 p-4 rounded-lg shadow-lg border border-slate-700 card-grab"
          >
            <div className="flex items-start justify-between">
              <strong className="text-sm">{t.title}</strong>
              <button onClick={() => onDelete(t.id)} className="text-slate-300 text-sm hover:bg-white/3 p-1 rounded">✕</button>
            </div>
            <p className="text-xs text-slate-300 mt-2">{t.description}</p>
            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs text-slate-200 bg-white/3 px-2 py-0.5 rounded-full">{t.status}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default function App() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')

  useEffect(() => { fetchTasks() }, [])

  const fetchTasks = useCallback(() => {
    fetch(API).then(r => r.json()).then(setTasks).catch(console.error)
  }, [])

  function create() {
    if (!title.trim()) return
    const payload = { title, description: desc, status: 'TODO' }
    fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      .then(() => { setTitle(''); setDesc(''); fetchTasks() })
  }

  function moveById(id, newStatus) {
    const task = tasks.find(t => t.id === id)
    if (!task) return
    fetch(`${API}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...task, status: newStatus }) })
      .then(fetchTasks)
  }

  function remove(id) { fetch(`${API}/${id}`, { method: 'DELETE' }).then(fetchTasks) }

  const todo = tasks.filter(t => t.status === 'TODO')
  const inprogress = tasks.filter(t => t.status === 'IN_PROGRESS')
  const done = tasks.filter(t => t.status === 'DONE')

  return (
    <div className="max-w-[1200px] mx-auto p-4">
      <header className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-lg font-bold">Kanban Board</h1>
          <div className="text-sm text-slate-400">Simple • Fast • Clear</div>
        </div>
      </header>

      <section className="flex gap-3 mb-5">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Task title"
          className="flex-1 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm focus:outline-none" />
        <input value={desc} onChange={e => setDesc(e.target.value)} placeholder="Short description"
          className="flex-1 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm focus:outline-none" />
        <button onClick={create} className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg">Add Task</button>
      </section>

      <main className="flex gap-4">
        <Column title="To Do" tasks={todo} onDropTask={id => moveById(id, 'TODO')} onDelete={remove} />
        <Column title="In Progress" tasks={inprogress} onDropTask={id => moveById(id, 'IN_PROGRESS')} onDelete={remove} />
        <Column title="Done" tasks={done} onDropTask={id => moveById(id, 'DONE')} onDelete={remove} />
      </main>

      <footer className="text-center text-sm text-slate-400 mt-6">Drag cards between columns to change status • React + Spring Boot</footer>
    </div>
  )
}
