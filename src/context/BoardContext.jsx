import { createContext, useContext, useEffect, useReducer, useState } from "react";
import * as api from "../api";

const BoardContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case "set":
      return action.tasks;
    case "add":
      return [...state, action.task];
    case "move":
      return state.map((t) =>
        t.id === action.id ? { ...t, status: action.status } : t
      );
    case "edit":
      return state.map((t) =>
        t.id === action.id ? { ...t, title: action.title } : t
      );
    case "remove":
      return state.filter((t) => t.id !== action.id);
    case "clearDone":
      return state.filter((t) => t.status !== "done");
    default:
      return state;
  }
}

export function BoardProvider({ children }) {
  const [tasks, dispatch] = useReducer(reducer, []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carga inicial desde MySQL
  useEffect(() => {
    api
      .getTasks()
      .then((data) => dispatch({ type: "set", tasks: data }))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function addTask(title, priority) {
    try {
      setError(null);
      const task = await api.createTask(title, priority);
      dispatch({ type: "add", task });
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }

  async function moveTask(id, status) {
    try {
      setError(null);
      await api.updateStatus(id, status);
      dispatch({ type: "move", id, status });
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }

  async function editTask(id, title) {
    try {
      setError(null);
      await api.updateTitle(id, title);
      dispatch({ type: "edit", id, title });
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }

  async function removeTask(id) {
    try {
      setError(null);
      await api.deleteTask(id);
      dispatch({ type: "remove", id });
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }

  async function clearDoneTasks() {
    try {
      setError(null);
      await api.clearDone();
      dispatch({ type: "clearDone" });
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }

  return (
    <BoardContext.Provider
      value={{
        tasks,
        loading,
        error,
        addTask,
        moveTask,
        editTask,
        removeTask,
        clearDoneTasks,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}

export function useBoard() {
  const ctx = useContext(BoardContext);
  if (!ctx) throw new Error("useBoard debe usarse dentro de BoardProvider");
  return ctx;
}
