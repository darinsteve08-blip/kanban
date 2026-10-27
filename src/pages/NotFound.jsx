import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <h2>404 — Página no encontrada</h2>
      <Link to="/">Ir al tablero</Link>
    </>
  );
}
