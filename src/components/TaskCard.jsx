import { useState } from "react";
import { COLUMNS } from "../columns";
 
export default function TaskCard({ task, onMove, onRemove, onEdit }) {
  // Reto 4: modo edición con doble clic
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
 
  function handleSave() {
    if (editTitle.trim() !== "") {
      onEdit(task.id, editTitle.trim());
    } else {
      setEditTitle(task.title); // restaurar si lo dejó vacío
    }
    setIsEditing(false);
  }
 
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setEditTitle(task.title);
      setIsEditing(false);
    }
  }
 
  return (
    <article className={`card prio-${task.priority}`}>
      {isEditing ? (
        <input
          className="edit-input"
          value={editTitle}
          autoFocus
          onChange={(e) => setEditTitle(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <strong
          onDoubleClick={() => setIsEditing(true)}
          title="Doble clic para editar el título"
          className="card-title"
        >
          {task.title}
        </strong>
      )}
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
