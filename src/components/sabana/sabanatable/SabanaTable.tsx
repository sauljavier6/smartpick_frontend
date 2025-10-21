import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface Reporte {
  id: number;
  fechaInicio: string;
  fechaFin: string;
  totalDisponibles: number;
  totalEnUso: number;
  totalLavanderia: number;
  totalGeneral: number;
  creadoPor: string;
  fechaCreacion: string;
}

export default function SabanaTable() {

  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");


  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Reportes de Sábanas</h1>

        {/* Filtros */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
          <div>
            <label className="text-gray-600 text-sm">Fecha inicio</label>
            <input
              type="date"
              className="border rounded-lg px-3 py-2 w-full"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
            />
          </div>
          <div>
            <label className="text-gray-600 text-sm">Fecha fin</label>
            <input
              type="date"
              className="border rounded-lg px-3 py-2 w-full"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
            />
          </div>
          <button
            //onClick={handleGenerar}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md"
          >
            Generar Reporte
          </button>
        </div>
      </div>

      {/* Tabla de reportes */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Sabana</h2>

        <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm">
            <thead className="bg-gray-100">
            <tr>
                <th className="px-4 py-2 text-left">Numero Empl.</th>
                <th className="px-4 py-2 text-left">Nombre de Empleado</th>
                <th className="px-4 py-2 text-left">Total Moneda M.N+ 91´s(Retiro)</th>
                <th className="px-4 py-2 text-left">Total DLLS + 91´s(Retiro)</th>
                <th className="px-4 py-2 text-left">Cheques</th>
                <th className="px-4 py-2 text-left">Caja Chica</th>
                <th className="px-4 py-2 text-left">Tarjeta de Credito(retiro)</th>
                <th className="px-4 py-2 text-left">Tarjeta de Debito(retiro)</th>
                <th className="px-4 py-2 text-left">Tarjeta de Credito+Debito off(retiro)</th>
                <th className="px-4 py-2 text-left">Vales calimax</th>
                <th className="px-4 py-2 text-left">Transferencias</th>
                <th className="px-4 py-2 text-left">Venta Neta(Total Retiro)</th>
                <th className="px-4 py-2 text-left">Venta Sobre registro(Total Medios)</th>
                <th className="px-4 py-2 text-left">T. Diferencia</th>
                <th className="px-4 py-2 text-left">Venta a Credito</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td className="px-4 py-2 border">1001</td>
                <td className="px-4 py-2 border">Juan Pérez</td>
                <td className="px-4 py-2 border">2000</td>
                <td className="px-4 py-2 border">500</td>
                <td className="px-4 py-2 border">100</td>
                <td className="px-4 py-2 border">50</td>
                <td className="px-4 py-2 border">300</td>
                <td className="px-4 py-2 border">200</td>
                <td className="px-4 py-2 border">150</td>
                <td className="px-4 py-2 border">100</td>
                <td className="px-4 py-2 border">400</td>
                <td className="px-4 py-2 border">2500</td>
                <td className="px-4 py-2 border">2450</td>
                <td className="px-4 py-2 border">50</td>
                <td className="px-4 py-2 border">100</td>
            </tr>
            </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
