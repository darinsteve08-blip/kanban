import { COLUMNS } from "../columns";
 
export default function TaskCard({ task, onMove, onRemove }) {
  return (
    <article className={`card prio-${task.priority}`}>
      <strong>{task.title}</strong>
      <small>Prioridad: {task.priority}</small>
      <div className="card-actions">
        <select
          value={task.status}
          onChange={(e) => onMove(task.id, e.target.value)}
        >
          {COLUMNS.map((c) => (
            <option key={c.id} value={c.id}>{c.title}</option>
          ))}
        </select>
        <button onClick={() => onRemove(task.id)}>Eliminar</button>
      </div>
    </article>
  );
}
