import React, { useEffect, useState, useCallback } from 'react'

const BASE_URL = "/api";
const API = `${BASE_URL}/api/tasks`;

function Column({ title, tasks, onDropTask, onDelete }) {
  return (
    <div
      className="flex-1 min-w-0 p-3 sm:p-4 bg-slate-800/40 rounded-lg sm:rounded-xl min-h-[300px] sm:min-h-[400px] border border-slate-700"
      onDragOver={e => e.preventDefault()}
      onDrop={e => {
        const id = e.dataTransfer.getData('text/plain')
        if (!id) return
        onDropTask(Number(id))
      }}
    >
      <div className="flex items-center justify-between mb-3 gap-2">
        <h3 className="text-xs sm:text-sm font-semibold truncate">{title}</h3>
        <span className="text-xs text-slate-300 bg-white/3 px-2 py-0.5 rounded-full flex-shrink-0">{tasks.length}</span>
      </div>

      <div className="space-y-2 sm:space-y-3">
        {tasks.map(t => (
          <article
            key={t.id}
            draggable
            onDragStart={e => e.dataTransfer.setData('text/plain', t.id)}
            className="bg-gradient-to-b from-slate-800 to-slate-700 p-3 sm:p-4 rounded-lg shadow-lg border border-slate-700 card-grab break-words"
          >
            <div className="flex items-start justify-between gap-2">
              <strong className="text-xs sm:text-sm break-words flex-1">{t.title}</strong>
              <button onClick={() => onDelete(t.id)} className="text-slate-300 text-sm hover:bg-white/3 p-1 rounded flex-shrink-0">✕</button>
            </div>
            <p className="text-xs text-slate-300 mt-2 break-words">{t.description}</p>
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
    <div className="min-h-screen flex flex-col bg-slate-900">
      <div className="flex-1 max-w-[1400px] mx-auto w-full p-3 sm:p-4 md:p-6">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-2">
          <div className="w-full sm:w-auto">
            <h1 className="text-2xl sm:text-3xl font-bold">Kanban Board</h1>
            <div className="text-xs sm:text-sm text-slate-400">Simple • Fast • Clear</div>
          </div>
        </header>

        <section className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4 sm:mb-6">
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Task title"
            className="flex-1 px-3 sm:px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm focus:outline-none focus:border-indigo-500 transition" />
          <input value={desc} onChange={e => setDesc(e.target.value)} placeholder="Short description"
            className="flex-1 px-3 sm:px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm focus:outline-none focus:border-indigo-500 transition" />
          <button onClick={create} className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg whitespace-nowrap transition w-full sm:w-auto">Add Task</button>
        </section>

        <main className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Column title="To Do" tasks={todo} onDropTask={id => moveById(id, 'TODO')} onDelete={remove} />
          <Column title="In Progress" tasks={inprogress} onDropTask={id => moveById(id, 'IN_PROGRESS')} onDelete={remove} />
          <Column title="Done" tasks={done} onDropTask={id => moveById(id, 'DONE')} onDelete={remove} />
        </main>
      </div>

      <footer className="text-center text-xs sm:text-sm text-slate-400 mt-6 pb-4 px-3">Drag cards between columns to change status • React + Spring Boot</footer>
    </div>
  )
}
