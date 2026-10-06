export default function TaskCard({ title, priority }) {
  return (
    <article className={`card prio-${priority}`}>
      <strong>{title}</strong>
      <small>Prioridad: {priority}</small>
    </article>
  );
}
