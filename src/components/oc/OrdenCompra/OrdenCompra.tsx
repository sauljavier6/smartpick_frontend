import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getOC } from "../../../api/oc/ordenCompraApi";

export interface User {
  ID_User: number;
  Name: string;
}

export interface Item {
  ID_Interno: string;
  Ubicación: string;
  itemid: string;
  Descripcion: string;
  Unidad_de_Empaque: string;
  Proveedor: string;
  Stock_Disponible: string;
  ventas1: string;
  ventas2: string;
  ventas3: string;
  ventas4: string;
  ventas5: string;
}

export default function OrdenCompra() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const { data } = useQuery({
    queryKey: ['dataprincipal', 1327],
    queryFn: () => getOC(1327),
  });

  console.log('data',data)

  const handleCheckboxChange = (ID_Interno: string) => {
    setSelectedIds((prev) =>
      prev.includes(ID_Interno)
        ? prev.filter((item) => item !== ID_Interno)
        : [...prev, ID_Interno]
    );
  };

  const handleSelectAll = () => {
    if (!data) return;

    if (selectedIds.length === data.length) {
      setSelectedIds([]);
    } else {
      const allIds = data.map((Item: Item) => Item.ID_Interno);
      setSelectedIds(allIds);
    }
  };

  return (
    <div className="overflow-x-auto border rounded-md shadow-sm">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-700 uppercase">
          <tr>
            <th className="px-2 py-2">
              <input
                type="checkbox"
                checked={selectedIds.length === data?.length && data?.length > 0}
                onChange={handleSelectAll}
              />
            </th>
            <th className="px-5 py-2">ID interno</th>
            <th className="px-5 py-2">Ubicación</th>
            <th className="px-5 py-2">Artículo</th>
            <th className="px-5 py-2">Descripción</th>
            <th className="px-5 py-2">Unidad de Empaque</th>
            <th className="px-5 py-2">Proveedor</th>
            <th className="px-5 py-2">Stock_Disponible</th>
            <th className="px-5 py-2">1</th>
            <th className="px-5 py-2">2</th>
            <th className="px-5 py-2">3</th>
            <th className="px-5 py-2">4</th>
            <th className="px-5 py-2">5</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item: Item) => (
            <tr key={item.ID_Interno} className="border-t">
              <td className="px-2 py-2">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(item.ID_Interno)}
                  onChange={() => handleCheckboxChange(item.ID_Interno)}
                  onClick={(e) => e.stopPropagation()}
                />
              </td>
              <td className="px-5 py-2">{item.ID_Interno}</td>
              <td className="px-5 py-2">{item.Ubicación}</td>
              <td className="px-5 py-2">{item.itemid}</td>
              <td className="px-5 py-2">{item.Descripcion}</td>
              <td className="px-5 py-2">{item.Unidad_de_Empaque}</td>
              <td className="px-5 py-2">{item.Proveedor}</td>
              <td className="px-5 py-2">{item.Stock_Disponible}</td>
              <td className="px-5 py-2">{item.ventas1}</td>
              <td className="px-5 py-2">{item.ventas2}</td>
              <td className="px-5 py-2">{item.ventas3}</td>
              <td className="px-5 py-2">{item.ventas4}</td>
              <td className="px-5 py-2">{item.ventas5}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
