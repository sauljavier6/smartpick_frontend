import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Select from "react-select";
import { getOfertas, postprintCenefabydata, postprintPreciobydata } from "../../../api/generator/generatorApi";
import { toast } from "react-toastify";

interface Producto {
  item_code: string;
  DESCRIPCION: string;
  Fecha_Fin: Date;
  Fecha_Ini: Date;
  PRECIO_ESPECIAL: number;
  Precio_Venta: number;
  TIPO_PROMO: string;
  tecla: string;
  upc: string;
  nombreProveedor: string;
}

export default function CenefasForm() {
  const [seleccionados, setSeleccionados] = useState<Producto[]>([]);
  const [tamano, setTamano] = useState("");
  const [sucursal, setSucursal] = useState("");
  const [abierta, setAbierta] = useState<string | null>(null);

  const { data } = useQuery({
    queryKey: ["search", sucursal],
    queryFn: () => getOfertas(sucursal),
    enabled: sucursal.length > 0,
  });

  const categorias: string[] = Array.from(
    new Set(data?.data?.map((p: Producto) => p.tecla) || [])
  );

  const opciones = [
    { value: "", label: "Seleccione cenefa" },
    { value: "precio", label: "Precio" },
    { value: "especial", label: "Especial" },
  ];

  const sucursales = [
    { value: "", label: "Seleccione sucursal" },
    { value: "TODAS", label: "TODAS" },
    { value: "420", label: "420" },
    { value: "422", label: "422" },
    { value: "423", label: "423" },
    { value: "424", label: "424" },
    { value: "425", label: "425" },
    { value: "426", label: "426" },
    { value: "427", label: "427" },
    { value: "428", label: "428" },
    { value: "429", label: "429" },
    { value: "520", label: "520" },
    { value: "521", label: "521" },
    { value: "522", label: "522" },
    { value: "530", label: "530" },
    { value: "531", label: "531" },
    { value: "532", label: "532" },
    { value: "533", label: "533" },
    { value: "534", label: "534" },
    { value: "535", label: "535" },
  ];

  const handleImprimir = async () => {
    let response;

    if (seleccionados.length === 0) {
      toast.error("No hay productos seleccionados", {
        position: "top-right",
      });
      return;
    }

    if (tamano === "precio") {
      response = await postprintPreciobydata(seleccionados);
    } else if (tamano === "especial") {
      response = await postprintCenefabydata(seleccionados);
    }

    if (!response) {
      toast.error("No se pudo generar el archivo de impresión", {
        position: "top-right",
      });
      return;
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    window.open(url, "_blank");
  };

  return (
    <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white rounded-2xl shadow p-4 flex flex-col">
        <h2 className="text-xl font-semibold mb-2">Configuración</h2>

        <label className="text-sm font-medium mt-2">Sucursal</label>
        <Select
          options={sucursales}
          value={sucursales.find((o) => o.value === sucursal)}
          onChange={(e) => setSucursal(e?.value || "")}
        />

        <label className="text-sm font-medium mt-2">Tamaño cenefa</label>
        <Select
          options={opciones}
          value={opciones.find((o) => o.value === tamano)}
          onChange={(e) => setTamano(e?.value || "")}
        />

        <button
          onClick={handleImprimir}
          className="bg-blue-600 text-white rounded-xl py-2 px-4 hover:bg-blue-700 mt-3"
        >
          Imprimir seleccionados
        </button>
      </div>

      <div className="md:col-span-2 bg-white rounded-2xl shadow p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Cenefas</h1>

        {categorias?.map((cat, index) => (
          <div key={index} className="mb-3 border rounded-sm overflow-hidden">
            <button
              onClick={() => setAbierta(abierta === cat ? null : cat)}
              className="w-full text-left p-3 bg-gray-100 font-semibold flex justify-between items-center hover:bg-gray-200"
            >
              {cat.replace(/^\d+\s*/, "")}{" "}
              <span>{abierta === cat ? "▲" : "▼"}</span>
            </button>

            {abierta === cat && (
              <div className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse min-w-[600px]">
                    <thead className="bg-gray-50 border-t">
                      <tr className="hover:bg-gray-50 text-sm sm:text-base border-t">
                        <th className="text-center px-2 py-1">
                          <input
                            type="checkbox"
                            checked={data?.data
                              .filter((p: Producto) => p.tecla === cat)
                              .every((p: Producto) =>
                                seleccionados.some(
                                  (s) => s.item_code === p.item_code
                                )
                              )}
                            onChange={(e) => {
                              const productosCat =
                                data?.data.filter(
                                  (p: Producto) => p.tecla === cat
                                ) || [];

                              if (e.target.checked) {
                                setSeleccionados((prev) => [
                                  ...prev,
                                  ...productosCat.filter(
                                    (p: { item_code: string }) =>
                                      !prev.some(
                                        (s) => s.item_code === p.item_code
                                      )
                                  ),
                                ]);
                              } else {
                                setSeleccionados((prev) =>
                                  prev.filter((p) => p.tecla !== cat)
                                );
                              }
                            }}
                          />
                        </th>
                        <th className="p-2 text-left whitespace-nowrap">
                          Producto
                        </th>
                        <th className="p-2 text-center whitespace-nowrap">
                          UPC
                        </th>
                        <th className="p-2 text-center whitespace-nowrap">
                          Precio
                        </th>
                        <th className="p-2 whitespace-nowrap">Promo</th>
                      </tr>
                    </thead>

                    <tbody>
                      {data?.data
                        .filter((p: Producto) => p.tecla === cat)
                        .map((p: Producto) => (
                          <tr
                            key={p.item_code}
                            className="hover:bg-gray-50 text-sm sm:text-base border-t"
                          >
                            <td className="text-center px-2 py-1">
                              <input
                                type="checkbox"
                                checked={seleccionados.some(
                                  (s) => s.item_code === p.item_code
                                )}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSeleccionados((prev) => [...prev, p]);
                                  } else {
                                    setSeleccionados((prev) =>
                                      prev.filter(
                                        (s) => s.item_code !== p.item_code
                                      )
                                    );
                                  }
                                }}
                              />
                            </td>
                            <td className="p-2">{p.DESCRIPCION}</td>
                            <td className="p-2 text-center">{p.upc}</td>
                            <td className="p-2 text-center">
                              ${p.Precio_Venta?.toFixed(2)}
                            </td>
                            <td className="p-2 text-center text-red-600 font-bold">
                              ${p.PRECIO_ESPECIAL?.toFixed(2) || "-"}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
