import Column from "./components/Column";
 
const COLUMNS = [
  { id: "todo", title: "Por hacer" },
  { id: "doing", title: "En progreso" },
  { id: "review", title: "Revisión" }, // Reto 3: nueva columna
  { id: "done", title: "Hecho" },
];
 
const tasks = [
  { id: 1, title: "Diseñar la base de datos", status: "done", priority: "alta" },
  // Reto 2: antes estaba en "doing", ahora se mueve a "Revisión"
  { id: 2, title: "Crear el login", status: "review", priority: "media" },
  { id: 3, title: "Escribir pruebas", status: "todo", priority: "baja" },
  { id: 4, title: "Preparar la demo", status: "todo", priority: "alta" },
  // Reto 1: 3 tareas nuevas
  { id: 5, title: "Configurar el despliegue", status: "todo", priority: "media" },
  { id: 6, title: "Maquetar el dashboard", status: "doing", priority: "alta" },
  { id: 7, title: "Documentar la API", status: "done", priority: "baja" },
];
 
export default function App() {
  return (
    <main>
      {/* Reto 4: total de tareas en el título */}
      <h1>Kanban ({tasks.length} tareas)</h1>
      <div className="board">
        {COLUMNS.map((c) => (
          <Column
            key={c.id}
            title={c.title}
            tasks={tasks.filter((t) => t.status === c.id)}
          />
        ))}
      </div>
    </main>
  );
}

