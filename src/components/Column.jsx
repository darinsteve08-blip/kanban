import TaskCard from "./TaskCard";
 
export default function Column({ title, tasks, onMove, onRemove, onClearDone }) {
  return (
    <section className="column">
      <div className="column-header">
        <h2>{title} ({tasks.length})</h2>
        {onClearDone && tasks.length > 0 && (
          <button className="btn-clear" onClick={onClearDone}>
            Vaciar columna
          </button>
        )}
      </div>
      {tasks.length === 0 && <p>Sin tareas</p>}
      {tasks.map((t) => (
        <TaskCard key={t.id} task={t} onMove={onMove} onRemove={onRemove} />
      ))}
    </section>
  );
}
