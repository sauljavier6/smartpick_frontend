import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      {/* Ilustración */}
      <svg
        className="w-72 mb-8"
        viewBox="0 0 500 500"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="250" cy="250" r="200" fill="#e5e7eb" />
        <text
          x="50%"
          y="52%"
          textAnchor="middle"
          fill="#9ca3af"
          fontSize="120px"
          fontWeight="bold"
        >
          404
        </text>
      </svg>

      {/* Título */}
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Página no encontrada
      </h1>

      {/* Descripción */}
      <p className="text-gray-500 text-center max-w-md mb-6">
        Parece que esta página no existe o ha sido movida.  
        Verifica la dirección o regresa al inicio.
      </p>

      {/* Botón */}
      <Link
        to="/"
        className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl shadow hover:bg-indigo-700 transition"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
