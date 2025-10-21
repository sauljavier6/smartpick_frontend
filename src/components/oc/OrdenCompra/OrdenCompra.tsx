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
  ventas4: string;
  ventas3: string;
  ventas2: string;
  ventas1: string;
  ventas5: string;
  ventas6: string;
  ventas7: string;
  Clasificación: string;
  Outlier4: string;
  Outlier3: string;
  Outlier2: string;
  Outlier1: string;   
  Outlier5: string;
  Outlier6: string;
  Outlier7: string;

  outnumber4: string;
  outnumber3: string;
  outnumber2: string;
  outnumber1: string;
  outnumber5: string;
  outnumber6: string;
  outnumber7: string;

  linealOutnumber4: string
  linealOutnumber3: string
  linealOutnumber2: string
  linealOutnumber1: string
  linealOutnumber5: string
  linealOutnumber6: string
  linealOutnumber7: string

  promedioLineal: number;

}

interface OrdenCompraProps {
  proveedor: string;
  leadtime: number;
}

export default function OrdenCompra({proveedor, leadtime}: OrdenCompraProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const { data } = useQuery({
    queryKey: ['dataprincipal', proveedor, leadtime],
    queryFn: () => getOC(Number(proveedor), leadtime),
  });

  console.log(data);

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
      <table className="min-w-full text-xs sm:text-sm text-left">
        <thead className="bg-gray-100 text-gray-700 uppercase">
          <tr>
            <th className="px-2 py-2">
              <input
                type="checkbox"
                checked={selectedIds.length === data?.length && data?.length > 0}
                onChange={handleSelectAll}
              />
            </th>
            <th className="px-3 sm:px-5 py-2">ID interno</th>
            <th className="px-3 sm:px-5 py-2">Ubicación</th>
            <th className="px-3 sm:px-5 py-2">Artículo</th>
            <th className="px-3 sm:px-5 py-2 hidden md:table-cell">Descripción</th>
            <th className="px-3 sm:px-5 py-2 hidden md:table-cell">Unidad de Empaque</th>
            <th className="px-3 sm:px-5 py-2">Proveedor</th>
            <th className="px-3 sm:px-5 py-2">Stock</th>

            <th className="px-3 sm:px-5 py-2">{new Date().getFullYear()}</th>
            <th className="px-3 sm:px-5 py-2">{new Date().getFullYear()}</th>
            <th className="px-3 sm:px-5 py-2">{new Date().getFullYear()}</th>
            <th className="px-3 sm:px-5 py-2">{new Date().getFullYear()}</th>
            <th className="px-3 sm:px-5 py-2">{new Date().getFullYear() - 1}</th>
            <th className="px-3 sm:px-5 py-2">{new Date().getFullYear() - 1}</th>
            <th className="px-3 sm:px-5 py-2">{new Date().getFullYear() - 1}</th>

            <th className="px-3 sm:px-5 py-2 hidden md:table-cell">Clasificación</th>

            <th className="px-3 sm:px-5 py-2">{new Date().getFullYear()}</th>
            <th className="px-3 sm:px-5 py-2">{new Date().getFullYear()}</th>
            <th className="px-3 sm:px-5 py-2">{new Date().getFullYear()}</th>
            <th className="px-3 sm:px-5 py-2">{new Date().getFullYear()}</th>
            <th className="px-3 sm:px-5 py-2">{new Date().getFullYear() - 1}</th>
            <th className="px-3 sm:px-5 py-2">{new Date().getFullYear() - 1}</th>
            <th className="px-3 sm:px-5 py-2">{new Date().getFullYear() - 1}</th>

            <th className="px-3 sm:px-5 py-2">{new Date().getFullYear()}</th>
            <th className="px-3 sm:px-5 py-2">{new Date().getFullYear()}</th>
            <th className="px-3 sm:px-5 py-2">{new Date().getFullYear()}</th>
            <th className="px-3 sm:px-5 py-2">{new Date().getFullYear()}</th>
            <th className="px-3 sm:px-5 py-2">{new Date().getFullYear() - 1}</th>
            <th className="px-3 sm:px-5 py-2">{new Date().getFullYear() - 1}</th>
            <th className="px-3 sm:px-5 py-2">{new Date().getFullYear() - 1}</th>

            <th className="px-3 sm:px-5 py-2">{new Date().getFullYear()}</th>
            <th className="px-3 sm:px-5 py-2">{new Date().getFullYear()}</th>
            <th className="px-3 sm:px-5 py-2">{new Date().getFullYear()}</th>
            <th className="px-3 sm:px-5 py-2">{new Date().getFullYear()}</th>
            <th className="px-3 sm:px-5 py-2">{new Date().getFullYear() - 1}</th>
            <th className="px-3 sm:px-5 py-2">{new Date().getFullYear() - 1}</th>
            <th className="px-3 sm:px-5 py-2">{new Date().getFullYear() - 1}</th>

            <th className="px-3 sm:px-5 py-2">Venta Diaria</th>
            <th className="px-3 sm:px-5 py-2 hidden md:table-cell">Unidad de Empaque</th>
            <th className="px-3 sm:px-5 py-2">Días</th>
            <th className="px-3 sm:px-5 py-2">Punto de Reorden</th>
            <th className="px-3 sm:px-5 py-2">Stock Preferido</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((item: Item, index: any) => (
            <tr key={index} className="border-t hover:bg-gray-50">
              <td className="px-2 py-2">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(item.ID_Interno)}
                  onChange={() => handleCheckboxChange(item.ID_Interno)}
                  onClick={(e) => e.stopPropagation()}
                />
              </td>
              <td className="px-3 sm:px-5 py-2">{item.ID_Interno}</td>
              <td className="px-3 sm:px-5 py-2">{item.Ubicación}</td>
              <td className="px-3 sm:px-5 py-2">{item.itemid}</td>
              <td className="px-3 sm:px-5 py-2 hidden md:table-cell">{item.Descripcion}</td>
              <td className="px-3 sm:px-5 py-2 hidden md:table-cell">{item.Unidad_de_Empaque}</td>
              <td className="px-3 sm:px-5 py-2">{item.Proveedor}</td>
              <td className="px-3 sm:px-5 py-2">{item.Stock_Disponible}</td>

              {/* Ventas (año actual) */}
              <td className="px-3 sm:px-5 py-2">{item.ventas4}</td>
              <td className="px-3 sm:px-5 py-2">{item.ventas3}</td>
              <td className="px-3 sm:px-5 py-2">{item.ventas2}</td>
              <td className="px-3 sm:px-5 py-2">{item.ventas1}</td>

              {/* Ventas (año pasado) */}
              <td className="px-3 sm:px-5 py-2">{item.ventas5}</td>
              <td className="px-3 sm:px-5 py-2">{item.ventas6}</td>
              <td className="px-3 sm:px-5 py-2">{item.ventas7}</td>
              <td className="px-3 sm:px-5 py-2 hidden md:table-cell">{item.Clasificación}</td>
              <td className="px-3 sm:px-5 py-2">{item.Outlier4}</td>
              <td className="px-3 sm:px-5 py-2">{item.Outlier3}</td>
              <td className="px-3 sm:px-5 py-2">{item.Outlier2}</td>
              <td className="px-3 sm:px-5 py-2">{item.Outlier1}</td>
              <td className="px-3 sm:px-5 py-2">{item.Outlier5}</td>
              <td className="px-3 sm:px-5 py-2">{item.Outlier6}</td>
              <td className="px-3 sm:px-5 py-2">{item.Outlier7}</td>


              <td className="px-3 sm:px-5 py-2">{item.outnumber4}</td>
              <td className="px-3 sm:px-5 py-2">{item.outnumber3}</td>
              <td className="px-3 sm:px-5 py-2">{item.outnumber2}</td>
              <td className="px-3 sm:px-5 py-2">{item.outnumber1}</td>
              <td className="px-3 sm:px-5 py-2">{item.outnumber5}</td>
              <td className="px-3 sm:px-5 py-2">{item.outnumber6}</td>
              <td className="px-3 sm:px-5 py-2">{item.outnumber7}</td>

              <td className="px-3 sm:px-5 py-2">{item.linealOutnumber4}</td>
              <td className="px-3 sm:px-5 py-2">{item.linealOutnumber3}</td>
              <td className="px-3 sm:px-5 py-2">{item.linealOutnumber2}</td>
              <td className="px-3 sm:px-5 py-2">{item.linealOutnumber1}</td>
              <td className="px-3 sm:px-5 py-2">{item.linealOutnumber5}</td>
              <td className="px-3 sm:px-5 py-2">{item.linealOutnumber6}</td>
              <td className="px-3 sm:px-5 py-2">{item.linealOutnumber7}</td>

              <td className="px-3 sm:px-5 py-2">{item.promedioLineal.toFixed(2)}</td>

              <td className="px-3 sm:px-5 py-2 hidden md:table-cell">{item.Unidad_de_Empaque}</td>

              <td className="px-3 sm:px-5 py-2">{leadtime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
