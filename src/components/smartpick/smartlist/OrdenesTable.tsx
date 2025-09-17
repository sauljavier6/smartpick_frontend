// components/OrdenesTable.tsx
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getOrderTraslate } from "../../../api/smartpick/orderTraslateApi";
import { getTranStatus } from "../../../api/smartpick/tranStatusApi";
import { useNavigate } from 'react-router-dom';

interface Orden {
  tranid: string;
  location: string;
  trandate: string;
  transferlocation: string;
  status: string;
}

interface Orden {
  id: string;
  fullname: string;
  name: string;
}

export default function OrdenesTable() {
  const [idEstado, setIdEstado] = useState("A");
  const [page, setPage] = useState(1);
  const limit = 10;
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ['ordertraslate', idEstado, page, limit],
    queryFn: () => getOrderTraslate(idEstado, { page, limit }),
    placeholderData: (prev) => prev,
  });

  const { data: transtatus } = useQuery({
    queryKey: ['transtatus'],
    queryFn: getTranStatus,
  });

  const handleButtonClick = (tranid: string) => {
    navigate(`/smartpick/pick/${tranid}`);
  };


  return (
    <>
    <div className="bg-white rounded-xl shadow-md p-4 overflow-x-auto">
      <div className="flex flex-col sm:flex-row items-center sm:justify-between mb-4 gap-4 p-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 text-center sm:text-left">
          Órdenes de Compra
        </h2>
        <select
          className="border border-gray-300 rounded px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring focus:ring-blue-200"
          value={idEstado}
          onChange={(e) => setIdEstado(e.target.value)}
        >
          {transtatus?.map((estado: Orden) => (
            <option key={estado.id} value={estado.id}>{estado.name}</option>
          ))}
        </select>
      </div>


      <table className="min-w-full divide-y divide-gray-200 text-sm sm:text-base">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-gray-500">ID Orden</th>
            <th className="px-4 py-2 text-left text-gray-500">Tienda</th>
            <th className="px-4 py-2 text-left text-gray-500">Fecha</th>
            <th className="px-4 py-2 text-left text-gray-500">Estado</th>
            <th className="px-4 py-2 text-left text-gray-500"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data?.data?.map((order: Orden) => (
            <tr key={order.tranid}>
              <td className="px-4 py-2">{order.tranid}</td>
              <td className="px-4 py-2">{order.transferlocation}</td>
              <td className="px-4 py-2">
                {new Date(order.trandate).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </td>
              <td className="px-4 py-2 font-semibold">{order.status}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleButtonClick(order.tranid)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Recolectar
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>

    <div className="flex justify-end items-center mt-4 space-x-2">
      <button
        disabled={page === 1}
        onClick={() => setPage((old) => Math.max(old - 1, 1))}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 flex items-center justify-center"
      >
        <img src="/flecha.png" alt="Anterior" className="w-4 h-4 rotate-90" />
      </button>

      {data && data.totalPages >= 1 && (
        <>
          {(() => {
            const maxButtons = 5;
            let start = Math.max(1, page - Math.floor(maxButtons / 2));
            let end = start + maxButtons - 1;

            if (end > data.totalPages) {
              end = data.totalPages;
              start = Math.max(1, end - maxButtons + 1);
            }

            return Array.from({ length: end - start + 1 }, (_, i) => start + i).map((num) => (
              <button
                key={num}
                onClick={() => setPage(num)}
                className={`px-3 py-1 rounded ${
                  page === num
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {num}
              </button>
            ));
          })()}
        </> 
      )}

      <button
        disabled={page >= (data?.totalPages || 1)}
        onClick={() => setPage((old) => old + 1)}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 flex items-center justify-center"
      >
        <img src="/flecha.png" alt="Siguiente" className="w-4 h-4 rotate-270" />
      </button>
    </div>
    </>
  );
}
