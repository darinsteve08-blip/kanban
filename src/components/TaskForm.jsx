import { useState } from "react";
 
export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("media");
  const [error, setError] = useState(""); // Reto 1: mensaje de error
 
  function handleSubmit(e) {
    e.preventDefault();
    if (title.trim() === "") {
      setError("El título no puede estar vacío");
      return;
    }
    const addError = onAdd(title.trim(), priority);
    if (addError) {
      setError(addError);
      return;
    }
    setTitle("");
    setError("");
  }
 
  return (
    <>
      <form className="task-form" onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError(""); // al escribir, el error desaparece
          }}
          placeholder="Nueva tarea..."
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </select>
        <button>Agregar</button>
      </form>
      {error && <p className="form-error">{error}</p>}
    </>
  );
}
