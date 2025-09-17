import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getmyorders } from '../../../api/smartpick/orderTraslateApi';


interface Orden {
  tranid: string;
  location: string;
  trandate: string;
  transferlocation: string;
  status: string;
}


export default function SmartHomePage() {
  const navigate = useNavigate();

  //cambiar dinamico
  const stored = localStorage.getItem("user");
  
  if (!stored) {
    return
  }
  const parsed = JSON.parse(stored) as { ID_User: number; email: string };
  const { data } = useQuery({
    queryKey: ['ordertraslate', parsed?.ID_User],
    queryFn: () => getmyorders(parsed?.ID_User),
    placeholderData: (prev) => prev,
  });


  const handlenavigateorders = () => {
    navigate(`/smartpick/list/`);
  };

  return (
    <div className="p-0 sm:p-6 bg-gray-50 min-h-screen">
      {/* Bienvenida */}
      <div className="bg-white rounded-none sm:rounded-xl shadow-md p-4 sm:p-6 mb-6 flex flex-col md:flex-row items-center justify-between gap-4 w-full">
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">¡Bienvenido, Picker!</h1>
          <p className="text-gray-600 text-sm sm:text-base">Aquí puedes ver el resumen de las órdenes y empezar la recolección.</p>
        </div>
        <img src="/pallet.png" alt="Warehouse" className="w-24 h-24 md:w-32 md:h-32" />
      </div>

      {/* Resumen rápido */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 sm:gap-4 mb-6">
        {[
          { label: "Departamentos pendientes", value: data?.deppendientes, color: "text-red-600" },
          { label: "Órdenes completadas", value: data?.orderCompleted, color: "text-green-600" },
          { label: "Órdenes en proceso", value: data?.enProceso, color: "text-yellow-500" },
          { label: "Órdenes asignadas hoy", value: data?.ordasignadas, color: "text-blue-600" },
        ].map((item, index) => (
          <div key={index} className="bg-white rounded-none sm:rounded-xl shadow-md p-4 flex flex-col items-center w-full">
            <p className="text-gray-500 text-sm sm:text-base">{item.label}</p>
            <span className={`text-2xl sm:text-3xl font-bold mt-2 ${item.color}`}>{item.value}</span>
          </div>
        ))}
      </div>

      {/* Acciones rápidas */}
      <div className="flex flex-col sm:flex-row gap-0 sm:gap-4 mb-6 w-full">
        <button onClick={() => handlenavigateorders()} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-none sm:rounded-xl shadow-md transition text-sm sm:text-base w-full">
          Ver todas las órdenes
        </button>
        <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-none sm:rounded-xl shadow-md transition text-sm sm:text-base w-full">
          Iniciar recolección
        </button>
      </div>

      {/* Últimas órdenes */}
      <div className="bg-white rounded-none sm:rounded-xl shadow-md p-4 overflow-x-auto w-full">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">Últimas órdenes completadas</h2>
        <table className="min-w-full divide-y divide-gray-200 text-sm sm:text-base">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-gray-500">ID Orden</th>
              <th className="px-4 py-2 text-left text-gray-500">Tienda</th>
              <th className="px-4 py-2 text-left text-gray-500">Fecha</th>
              <th className="px-4 py-2 text-left text-gray-500">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data?.latestOrders.map((order:Orden) => (
              <tr key={order.tranid}>
                <td className="px-4 py-2">{order.tranid}</td>
                <td className="px-4 py-2">{order.transferlocation}</td>
                <td className="px-4 py-2">{order.trandate}</td>
                <td className={`px-4 py-2 font-semibold text-green-500`}>Completada</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
