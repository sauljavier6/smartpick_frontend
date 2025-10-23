import { useNavigate } from 'react-router-dom';
//import { getResumenSabanas, getUltimosMovimientos } from '../../../api/sabanasApi';

interface Movimiento {
  id: number;
  fecha: string;
  tipo: string;
  cantidad: number;
  usuario: string;
}

interface ResumenSabanas {
  disponibles: number;
  enUso: number;
  lavanderia: number;
  total: number;
}

export default function HomePage() {
  const navigate = useNavigate();

  /*const { data: resumen } = useQuery<ResumenSabanas>({
    queryKey: ['resumenSabanas'],
    queryFn: getResumenSabanas,
    placeholderData: (prev) => prev,
  });

  const { data: movimientos } = useQuery<Movimiento[]>({
    queryKey: ['movimientosSabanas'],
    queryFn: getUltimosMovimientos,
    placeholderData: (prev) => prev,
  });*/

  // 🔹 Mock data por si aún no tienes API
  const resumenMock: ResumenSabanas = {
    disponibles: 320,
    enUso: 150,
    lavanderia: 100,
    total: 570,
  };

  const movimientosMock: Movimiento[] = [
    { id: 1, fecha: "2025-09-25", tipo: "Ingreso", cantidad: 50, usuario: "Juan Pérez" },
    { id: 2, fecha: "2025-09-25", tipo: "Salida", cantidad: 30, usuario: "Ana López" },
    { id: 3, fecha: "2025-09-24", tipo: "Salida", cantidad: 20, usuario: "Carlos Ruiz" },
    { id: 4, fecha: "2025-09-23", tipo: "Ingreso", cantidad: 40, usuario: "María Torres" },
  ];

  return (
    <div className="p-0 sm:p-6 bg-gray-50 min-h-screen">
      {/* Bienvenida */}
      <div className="bg-white rounded-none sm:rounded-xl shadow-md p-4 sm:p-6 mb-6 flex flex-col md:flex-row items-center justify-between gap-4 w-full">
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Módulo de Sábanas</h1>
          <p className="text-gray-600 text-sm sm:text-base">Control y seguimiento de inventario de sábanas.</p>
        </div>
        <img src="/bed.png" alt="Sábanas" className="w-24 h-24 md:w-32 md:h-32" />
      </div>

      {/* Resumen rápido */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 sm:gap-4 mb-6">
        {[
          { label: "Disponibles", value: resumenMock.disponibles, color: "text-green-600" },
          { label: "En uso", value: resumenMock.enUso, color: "text-blue-600" },
          { label: "En lavandería", value: resumenMock.lavanderia, color: "text-yellow-500" },
          { label: "Total", value: resumenMock.total, color: "text-gray-800" },
        ].map((item, index) => (
          <div key={index} className="bg-white rounded-none sm:rounded-xl shadow-md p-4 flex flex-col items-center w-full">
            <p className="text-gray-500 text-sm sm:text-base">{item.label}</p>
            <span className={`text-2xl sm:text-3xl font-bold mt-2 ${item.color}`}>{item.value}</span>
          </div>
        ))}
      </div>

      {/* Acciones rápidas */}
      <div className="flex flex-col sm:flex-row gap-0 sm:gap-4 mb-6 w-full">
        <button onClick={() => navigate('/sabanas/asignar')} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-none sm:rounded-xl shadow-md transition text-sm sm:text-base w-full">
          Asignar Sábanas
        </button>
        <button onClick={() => navigate('/sabanas/lavanderia')} className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-3 px-4 rounded-none sm:rounded-xl shadow-md transition text-sm sm:text-base w-full">
          Enviar a Lavandería
        </button>
        <button onClick={() => navigate('/sabanas/reportar')} className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-none sm:rounded-xl shadow-md transition text-sm sm:text-base w-full">
          Reportar Daño
        </button>
      </div>

      {/* Últimos movimientos */}
      <div className="bg-white rounded-none sm:rounded-xl shadow-md p-4 overflow-x-auto w-full">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">Últimos movimientos</h2>
        <table className="min-w-full divide-y divide-gray-200 text-sm sm:text-base">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-gray-500">Fecha</th>
              <th className="px-4 py-2 text-left text-gray-500">Tipo</th>
              <th className="px-4 py-2 text-left text-gray-500">Cantidad</th>
              <th className="px-4 py-2 text-left text-gray-500">Usuario</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {(movimientosMock).map((mov: Movimiento) => (
              <tr key={mov.id}>
                <td className="px-4 py-2">{mov.fecha}</td>
                <td className="px-4 py-2">{mov.tipo}</td>
                <td className="px-4 py-2">{mov.cantidad}</td>
                <td className="px-4 py-2">{mov.usuario}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
