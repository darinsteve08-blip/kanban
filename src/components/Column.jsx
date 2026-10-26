import TaskCard from "./TaskCard";
import { useBoard } from "../context/BoardContext";

export default function Column({ id, title, tasks }) {
  const { clearDoneTasks } = useBoard();

  return (
    <section className="column">
      <div className="column-header">
        <h2>{title} ({tasks.length})</h2>
        {id === "done" && tasks.length > 0 && (
          <button className="btn-clear" onClick={clearDoneTasks}>
            Vaciar columna
          </button>
        )}
      </div>
      {tasks.length === 0 && <p>Sin tareas</p>}
      {tasks.map((t) => (
        <TaskCard key={t.id} task={t} />
      ))}
    </section>
  );
}
