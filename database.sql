-- Base de datos para el proyecto Kanban
CREATE DATABASE IF NOT EXISTS kanban_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE kanban_db;

DROP TABLE IF EXISTS tasks;

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  status ENUM('todo','doing','review','done') NOT NULL DEFAULT 'todo',
  priority ENUM('alta','media','baja') NOT NULL DEFAULT 'media',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tasks (title, status, priority) VALUES
  ('Diseñar la base de datos', 'done', 'alta'),
  ('Crear el login', 'review', 'media'),
  ('Escribir pruebas', 'todo', 'baja'),
  ('Preparar la demo', 'todo', 'alta');
