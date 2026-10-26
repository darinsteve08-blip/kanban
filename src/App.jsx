import { useEffect, useMemo, useState } from "react";
import Column from "./components/Column";
import TaskForm from "./components/TaskForm";
import { COLUMNS } from "./columns";
import { useBoard } from "./context/BoardContext";

export default function App() {
  const { tasks, loading, error } = useBoard();
  const [query, setQuery] = useState("");

  useEffect(() => {
    document.title = `Kanban (${tasks.length} tareas)`;
  }, [tasks]);

  const filteredTasks = useMemo(
    () =>
      tasks.filter((t) =>
        t.title.toLowerCase().includes(query.toLowerCase())
      ),
    [tasks, query]
  );

  return (
    <main>
      <h1>Kanban ({tasks.length} tareas)</h1>
      <TaskForm />
      <input
        className="search"
        placeholder="Buscar tareas..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {error && <p className="error">{error}</p>}

      {loading ? (
        <p>Cargando tareas...</p>
      ) : (
        <div className="board">
          {COLUMNS.map((c) => (
            <Column
              key={c.id}
              id={c.id}
              title={c.title}
              tasks={filteredTasks.filter((t) => t.status === c.id)}
            />
          ))}
        </div>
      )}
    </main>
  );
}