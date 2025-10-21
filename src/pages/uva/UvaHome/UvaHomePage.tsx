import React, { useState, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";

interface ProductSummary {
  totalProductos: number;
  cumplen: number;
  pendientes: number;
  revision: number;
  noCumplen: number;
  porCategoria: { categoria: string; cumplen: number; total: number }[];
  porPais: { pais: string; porcentaje: number }[];
  historicoSemanal: { semana: string; cumplen: number }[];
}

const COLORS = ["#00C49F", "#FFBB28", "#0088FE", "#FF4C4C"];

const UvaHomePage: React.FC = () => {
  const [data, setData] = useState<ProductSummary | null>(null);

  useEffect(() => {
    // Mock data
    setData({
      totalProductos: 1280,
      cumplen: 912,
      pendientes: 210,
      revision: 158,
      noCumplen: 45,
      porCategoria: [
        { categoria: "Bebidas", cumplen: 120, total: 150 },
        { categoria: "Snacks", cumplen: 95, total: 200 },
        { categoria: "Cereal", cumplen: 65, total: 100 },
      ],
      porPais: [
        { pais: "EE.UU.", porcentaje: 45 },
        { pais: "Canadá", porcentaje: 25 },
        { pais: "México", porcentaje: 20 },
        { pais: "Otros", porcentaje: 10 },
      ],
      historicoSemanal: [
        { semana: "2025-09-22", cumplen: 820 },
        { semana: "2025-09-29", cumplen: 865 },
        { semana: "2025-10-06", cumplen: 912 },
      ],
    });
  }, []);

  if (!data) return <div className="text-center mt-10">Cargando dashboard...</div>;

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen rounded-2xl space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-700">Dashboard UVA</h1>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-gray-500">Total Productos</p>
          <p className="text-xl font-bold">{data.totalProductos}</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow text-center">
          <p className="text-gray-700">Cumplen NOM-051</p>
          <p className="text-xl font-bold">{data.cumplen}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow text-center">
          <p className="text-gray-700">Pendientes</p>
          <p className="text-xl font-bold">{data.pendientes}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded shadow text-center">
          <p className="text-gray-700">En revisión</p>
          <p className="text-xl font-bold">{data.revision}</p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Barra por categoría */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-2 text-gray-700">Cumplimiento por categoría</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data.porCategoria.map(c => ({ categoria: c.categoria, cumplen: c.cumplen, total: c.total }))}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="categoria" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="cumplen" fill="#0088FE" />
              <Bar dataKey="total" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie por país */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-2 text-gray-700">Distribución por país</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.porPais}
                dataKey="porcentaje"
                nameKey="pais"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {data.porPais.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabla de productos recientes */}
      <div className="bg-white p-4 rounded shadow overflow-x-auto">
        <h2 className="font-bold mb-2 text-gray-700">Productos recientes</h2>
        <table className="min-w-full table-auto border border-gray-200">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-3 py-2 text-left">Imagen</th>
              <th className="px-3 py-2 text-left">Descripción</th>
              <th className="px-3 py-2 text-left">SKU</th>
              <th className="px-3 py-2 text-left">Marca</th>
              <th className="px-3 py-2 text-left">País</th>
              <th className="px-3 py-2 text-left">Estado</th>
              <th className="px-3 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="text-center border-b hover:bg-gray-50 transition">
                <td className="px-2 py-1">
                  <img className="w-10 h-10 sm:w-12 sm:h-12 object-contain mx-auto" src="https://via.placeholder.com/40" alt="Producto" />
                </td>
                <td className="px-2 py-1 text-sm sm:text-base">Producto {i + 1}</td>
                <td className="px-2 py-1 text-sm sm:text-base">SKU-{1000 + i}</td>
                <td className="px-2 py-1 text-sm sm:text-base">Marca {i + 1}</td>
                <td className="px-2 py-1 text-sm sm:text-base">México</td>
                <td className="px-2 py-1 text-sm sm:text-base">Pendiente</td>
                <td className="px-2 py-1 flex justify-center gap-1">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded text-xs sm:text-sm">Ver</button>
                  <button className="bg-green-500 text-white px-2 py-1 rounded text-xs sm:text-sm">Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UvaHomePage;
