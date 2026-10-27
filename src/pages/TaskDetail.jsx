import { Link, useNavigate, useParams } from "react-router-dom";
import { COLUMNS } from "../columns";
import { useBoard } from "../context/BoardContext";

export default function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, loading, moveTask, removeTask } = useBoard();

  if (loading) return <p>Cargando...</p>;

  const task = tasks.find((t) => t.id === Number(id));

  if (!task) {
    return (
      <>
        <p>No existe una tarea con id {id}.</p>
        <Link to="/">Volver al tablero</Link>
      </>
    );
  }

  async function handleRemove() {
    const ok = await removeTask(task.id);
    if (ok) navigate("/");
  }

  return (
    <article className="detail">
      <Link to="/">← Volver al tablero</Link>
      <h2>{task.title}</h2>
      <p>Prioridad: {task.priority}</p>
      <label>
        Estado:{" "}
        <select
          value={task.status}
          onChange={(e) => moveTask(task.id, e.target.value)}
        >
          {COLUMNS.map((c) => (
            <option key={c.id} value={c.id}>{c.title}</option>
          ))}
        </select>
      </label>
      <button onClick={handleRemove}>Eliminar tarea</button>
    </article>
  );
}
