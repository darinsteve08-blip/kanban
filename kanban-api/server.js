import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN ?? "*" }));
app.use(express.json());

// Conexión a la base de datos con variables de entorno
const pool = mysql.createPool({
  host: process.env.DB_HOST ?? "localhost",
  port: Number(process.env.DB_PORT ?? 3306),
  user: process.env.DB_USER ?? "root",
  password: process.env.DB_PASSWORD ?? "",
  database: process.env.DB_NAME ?? "kanban_db",
});

const STATUS = ["todo", "doing", "review", "done"];
const PRIORITY = ["alta", "media", "baja"];

// Atrapa errores automáticamente para no repetir try/catch
const handle = (fn) => async (req, res) => {
  try {
    await fn(req, res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error del servidor" });
  }
};

// 1. OBTENER TODAS LAS TAREAS (GET)
app.get(
  "/api/tasks",
  handle(async (req, res) => {
    const [rows] = await pool.query(
      "SELECT id, title, status, priority FROM tasks ORDER BY id"
    );
    res.json(rows);
  })
);

// 2. CREAR TAREA (POST)
app.post(
  "/api/tasks",
  handle(async (req, res) => {
    const { title, priority = "media" } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ error: "El título es obligatorio" });
    }
    if (!PRIORITY.includes(priority)) {
      return res.status(400).json({ error: "Prioridad no válida" });
    }
    const [result] = await pool.query(
      "INSERT INTO tasks (title, priority) VALUES (?, ?)",
      [title.trim(), priority]
    );
    res.status(201).json({
      id: result.insertId,
      title: title.trim(),
      status: "todo",
      priority,
    });
  })
);

// 3. CAMBIAR ESTADO DE LA TAREA (PATCH)
app.patch(
  "/api/tasks/:id",
  handle(async (req, res) => {
    const { status } = req.body;
    if (!STATUS.includes(status)) {
      return res.status(400).json({ error: "Estado no válido" });
    }
    const [result] = await pool.query(
      "UPDATE tasks SET status = ? WHERE id = ?",
      [status, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }
    res.json({ id: Number(req.params.id), status });
  })
);

// 4. EDITAR TÍTULO Y PRIORIDAD DE LA TAREA (PUT)
app.put(
  "/api/tasks/:id",
  handle(async (req, res) => {
    const { title, priority } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ error: "El título es obligatorio" });
    }
    if (!PRIORITY.includes(priority)) {
      return res.status(400).json({ error: "Prioridad no válida" });
    }
    const [result] = await pool.query(
      "UPDATE tasks SET title = ?, priority = ? WHERE id = ?",
      [title.trim(), priority, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }
    res.json({ id: Number(req.params.id), title: title.trim(), priority });
  })
);

// 5. ELIMINAR TAREA (DELETE)
app.delete(
  "/api/tasks/:id",
  handle(async (req, res) => {
    const [result] = await pool.query("DELETE FROM tasks WHERE id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }
    res.status(204).end();
  })
);

// 6. VACIAR TAREAS HECHAS (DELETE)
app.delete(
  "/api/tasks/status/done",
  handle(async (req, res) => {
    await pool.query("DELETE FROM tasks WHERE status = 'done'");
    res.status(204).end();
  })
);

const PORT = process.env.PORT ?? 3001;
app.listen(PORT, () => console.log(`API en http://localhost:${PORT}`));
