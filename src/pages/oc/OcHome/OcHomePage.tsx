// pages/Home.tsx
import { Link } from "react-router-dom";
import { FaClipboardList, FaBoxes } from "react-icons/fa"; 

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Bienvenido a Smart & Final</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Gestiona tus órdenes de compra, inventario y envíos de manera rápida y segura.
        </p>
      </header>

      {/* Tarjetas de acceso */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Link
          to=""
          className="flex items-center p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition"
        >
          <div className="bg-blue-100 text-blue-600 p-4 rounded-full mr-4">
            <FaClipboardList size={32} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Órdenes de Compra</h2>
            <p className="text-gray-500 mt-1">Revisa y administra tus órdenes pendientes y completadas.</p>
          </div>
        </Link>

        <Link
          to=""
          className="flex items-center p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition"
        >
          <div className="bg-green-100 text-green-600 p-4 rounded-full mr-4">
            <FaBoxes size={32} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Inventario</h2>
            <p className="text-gray-500 mt-1">Consulta el stock de tus productos y controla entradas/salidas.</p>
          </div>
        </Link>
      </div>

      {/* Imagen o ilustración */}
      <div className="mt-12 text-center">
        <img
          src="/images/dashboard-illustration.svg"
          alt="Dashboard ilustrativo"
          className="w-72 sm:w-96 mx-auto"
        />
      </div>
    </div>
  );
}
