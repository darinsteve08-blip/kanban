import { useEffect, useState } from "react";
export function useLocalStorage(key, initialValue) {
  // Inicialización perezosa: lee de localStorage solo al cargar por primera vez
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });
  // Cada vez que cambie 'value' o 'key', guarda automáticamente en el navegador
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}