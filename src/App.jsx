import { useState } from "react";
import Column from "./components/Column";
import TaskForm from "./components/TaskForm";
import { COLUMNS } from "./columns";
 
// Valor inicial del estado (incluye las tareas agregadas en los retos de la Clase 1)
const initialTasks = [
  { id: 1, title: "Diseñar la base de datos", status: "done", priority: "alta" },
  { id: 2, title: "Crear el login", status: "review", priority: "media" },
  { id: 3, title: "Escribir pruebas", status: "todo", priority: "baja" },
  { id: 4, title: "Preparar la demo", status: "todo", priority: "alta" },
  { id: 5, title: "Configurar el despliegue", status: "todo", priority: "media" },
  { id: 6, title: "Maquetar el dashboard", status: "doing", priority: "alta" },
  { id: 7, title: "Documentar la API", status: "done", priority: "baja" },
];
 
export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
 
  function addTask(title, priority) {
    const exists = tasks.some(
      (t) => t.title.trim().toLowerCase() === title.trim().toLowerCase()
    );
    if (exists) {
      return "Ya existe una tarea con ese título";
    }
    const newTask = { id: Date.now(), title, status: "todo", priority };
    setTasks([...tasks, newTask]);
    return null;
  }
 
  function moveTask(id, newStatus) {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
  }
 
  function removeTask(id) {
    setTasks(tasks.filter((t) => t.id !== id));
  }
 
  // Reto 4: editar el título de una tarea
  function editTask(id, newTitle) {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, title: newTitle } : t))
    );
  }
 
  // Reto 3: eliminar todas las tareas que tengan status === "done"
  function clearDoneTasks() {
    setTasks(tasks.filter((t) => t.status !== "done"));
  }
 
  return (
    <main>
      {/* Reto Clase 1: total de tareas (ahora se actualiza solo al agregar/eliminar) */}
      <h1>Kanban ({tasks.length} tareas)</h1>
      <TaskForm onAdd={addTask} />
      <div className="board">
        {COLUMNS.map((c) => (
          <Column
            key={c.id}
            id={c.id}
            title={c.title}
            tasks={tasks.filter((t) => t.status === c.id)}
            onMove={moveTask}
            onRemove={removeTask}
            onEdit={editTask}
            onClearDone={c.id === "done" ? clearDoneTasks : undefined}
          />
        ))}
      </div>
    </main>
  );
}
