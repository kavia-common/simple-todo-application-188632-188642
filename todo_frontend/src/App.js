import React, { useState, useEffect } from 'react';
import './App.css';

const API_BASE = 'http://localhost:3001';

// PUBLIC_INTERFACE
function App() {
  /** This is the Todo app UI which communicates with the FastAPI backend. */
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  // PUBLIC_INTERFACE
  async function fetchTodos() {
    /** Load all todos from backend. */
    setLoading(true);
    setErr('');
    try {
      const res = await fetch(`${API_BASE}/todos`);
      if (!res.ok) throw new Error(`Failed to load todos: ${res.status}`);
      const data = await res.json();
      setTodos(data);
    } catch (e) {
      setErr(e.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  }

  // PUBLIC_INTERFACE
  async function addTodo(e) {
    /** Create a new todo with provided title. */
    e.preventDefault();
    const title = newTitle.trim();
    if (!title) return;
    setLoading(true);
    setErr('');
    try {
      const res = await fetch(`${API_BASE}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });
      if (!res.ok) throw new Error('Failed to add todo');
      const created = await res.json();
      setTodos(prev => [created, ...prev]);
      setNewTitle('');
    } catch (e) {
      setErr(e.message || 'Failed to add');
    } finally {
      setLoading(false);
    }
  }

  // PUBLIC_INTERFACE
  async function toggleCompleted(todo) {
    /** Toggle completion status of a todo. */
    setErr('');
    try {
      const res = await fetch(`${API_BASE}/todos/${todo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !todo.completed }),
      });
      if (!res.ok) throw new Error('Failed to update todo');
      const updated = await res.json();
      setTodos(prev => prev.map(t => (t.id === updated.id ? updated : t)));
    } catch (e) {
      setErr(e.message || 'Failed to update');
    }
  }

  // PUBLIC_INTERFACE
  function startEdit(todo) {
    /** Begin inline editing of a todo title. */
    setEditingId(todo.id);
    setEditingTitle(todo.title);
  }

  // PUBLIC_INTERFACE
  async function saveEdit(todoId) {
    /** Save edited title. */
    const title = editingTitle.trim();
    if (!title) return;
    setErr('');
    try {
      const res = await fetch(`${API_BASE}/todos/${todoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });
      if (!res.ok) throw new Error('Failed to save changes');
      const updated = await res.json();
      setTodos(prev => prev.map(t => (t.id === updated.id ? updated : t)));
      setEditingId(null);
      setEditingTitle('');
    } catch (e) {
      setErr(e.message || 'Failed to save');
    }
  }

  // PUBLIC_INTERFACE
  function cancelEdit() {
    /** Cancel editing mode. */
    setEditingId(null);
    setEditingTitle('');
  }

  // PUBLIC_INTERFACE
  async function deleteTodo(todoId) {
    /** Delete a todo by id. */
    setErr('');
    try {
      const res = await fetch(`${API_BASE}/todos/${todoId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete todo');
      setTodos(prev => prev.filter(t => t.id !== todoId));
    } catch (e) {
      setErr(e.message || 'Failed to delete');
    }
  }

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="title">Todo List</h1>
        <p className="subtitle">Simple tasks with persistence</p>
      </header>

      <main className="content">
        <form onSubmit={addTodo} className="add-form" aria-label="Add todo form">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Add a new task..."
            className="input"
            aria-label="New todo title"
          />
          <button type="submit" className="btn primary" disabled={loading}>
            Add
          </button>
        </form>

        {loading && <div className="status info">Loading...</div>}
        {err && <div className="status error" role="alert">{err}</div>}

        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className={`todo-item ${todo.completed ? 'done' : ''}`}>
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleCompleted(todo)}
                  aria-label={`Toggle ${todo.title}`}
                />
                <span className="checkmark" />
              </label>

              {editingId === todo.id ? (
                <div className="edit-row">
                  <input
                    className="input edit"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') saveEdit(todo.id);
                      if (e.key === 'Escape') cancelEdit();
                    }}
                    autoFocus
                  />
                  <div className="actions">
                    <button type="button" className="btn success" onClick={() => saveEdit(todo.id)}>
                      Save
                    </button>
                    <button type="button" className="btn" onClick={cancelEdit}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <span
                    className="title-text"
                    onDoubleClick={() => startEdit(todo)}
                    title="Double-click to edit"
                  >
                    {todo.title}
                  </span>
                  <div className="actions">
                    <button type="button" className="btn" onClick={() => startEdit(todo)}>
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn danger"
                      onClick={() => deleteTodo(todo.id)}
                      aria-label={`Delete ${todo.title}`}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </main>

      <footer className="footer">
        <small>Todos persist in SQLite. Accents: #3b82f6 & #06b6d4</small>
      </footer>
    </div>
  );
}

export default App;
