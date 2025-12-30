import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Select from "react-select";
import {
  getOfertaByUpc,
  getprintCenefa,
  getprintPrecio,
} from "../../../api/generator/generatorApi";
import { useProductSync } from "../../../context/PrintContext";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-toastify";

interface Producto {
  ID_User: number;
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

export default function ScannerForm() {
  const [item, setItem] = useState<string>("");
  const [tamano, setTamano] = useState("");
  const { user } = useAuth();
  const ID_User = user?.ID_User;
  const { saveProduct, productlist, deleteAll } = useProductSync(ID_User);

  const { data } = useQuery({
    queryKey: ["search", item],
    queryFn: () => getOfertaByUpc(item),
    enabled: item.length > 0,
  });

  const { mutate } = useMutation({
    mutationFn: async (product: Producto) => {
      await saveProduct(product);
    },
    onError: (error: any) => {
      toast.error(`${error.message}`, { position: "top-right" });
    },
    onSuccess: async () => {
      toast.success("Producto guardado para impresion", {
        position: "top-right",
        progressClassName: "custom-progress",
      });
    },
  });

  const ahorro = data?.data?.Precio_Venta - data?.data?.PRECIO_ESPECIAL;

  const handleAgregarImprimir = () => {
    const productToSave: Producto = {
      ...data.data,
      ID_User: user?.ID_User,
    };

    mutate(productToSave);
  };

  const handleImprimir = async () => {
    let response;

    if (productlist?.length === 0) {
      toast.error("No hay productos seleccionados", {
        position: "top-right",
      });
      return;
    }

    if (!tamano) {
      toast.error("No se seleccionó tipo de impresión", {
        position: "top-right",
      });
      return;
    }

    const userId = Number(user?.ID_User);

    if (tamano === "precio") {
      response = await getprintPrecio(userId);
    } else if (tamano === "especial") {
      response = await getprintCenefa(userId);
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
    deleteAll();
  };

  const calcularPrecioFinal = (p: Producto) => {
    // Si es precio fijo
    if (p.TIPO_PROMO === "Precio Fijo") {
      return p.PRECIO_ESPECIAL ?? null;
    }

    // Si es porcentaje
    const precioVenta = Number(p.Precio_Venta) || 0;
    const porcentaje = Number(p.PRECIO_ESPECIAL) || 0;

    return precioVenta - (precioVenta * (porcentaje / 100));
  };

  const opciones = [
    { value: "", label: "Seleccione cenefa" },
    { value: "precio", label: "Precio" },
    { value: "especial", label: "Especial" },
  ];

  return (
    <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white rounded-2xl shadow p-4 flex flex-col border-l-8 border-red-500 transform hover:scale-[1.01] transition duration-500">
        <h2 className="text-xl font-semibold mb-2">Configuración</h2>

        <input
          type="text"
          onChange={(e) => {
            setItem(e.target.value);
          }}
          placeholder="Escanee aquí la etiqueta"
          className="border-1 border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 p-2 rounded outline-none transition-all"
        />

        <label className="text-sm font-medium mt-2">Tamaño cenefa</label>
        <Select
          options={opciones}
          value={opciones.find((o) => o.value === tamano)}
          onChange={(e) => setTamano(e?.value || "")}
        />

        <div className="flex flex-row space-x-2">
          <button
            disabled={!data?.data}
            onClick={handleAgregarImprimir}
            className={`w-full rounded-xl py-2 px-4 mt-3 font-semibold transition-all 
              ${!data?.data
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-red-500 text-white hover:bg-red-400 cursor-pointer shadow-md hover:shadow-lg"
              }
            `}
          >
            Agregar
          </button>

          <button
            disabled={!data?.data}
            onClick={handleImprimir}
            className={`w-full rounded-xl py-2 px-4 mt-3 font-semibold transition-all 
              ${!data?.data
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-400 cursor-pointer shadow-md hover:shadow-lg"
              }
            `}
          >
            Imprimir
          </button>
        </div>
      </div>

      <div className="md:col-span-2 bg-white rounded-2xl shadow-2xl p-6 border-l-8 border-red-500 transform hover:scale-[1.01] transition duration-500">
        <h1 className="text-3xl font-extrabold mb-5 text-center text-red-500 border-b-2 border-indigo-100 pb-3">
          Promoción
        </h1>

        {!data?.data && item.length > 0 && (
          <div className="w-full text-center py-10 text-gray-400 italic text-lg">
            No se encontró información para este UPC.
          </div>
        )}

        {!data?.data && item.length === 0 && (
          <div className="w-full text-center py-10 text-gray-400 italic text-lg">
            Escanee un código para mostrar información aquí.
          </div>
        )}

        {data?.data && (
          <div className="space-y-4 animate-fadeIn">
            <p className="text-2xl font-bold text-gray-900 leading-tight">
              {data.data.DESCRIPCION}
            </p>

            <span className="inline-block px-4 py-1 text-sm font-semibold tracking-wide text-indigo-700 bg-indigo-100 rounded-full">
              {data.data.TIPO_PROMO}
            </span>

            <div className="flex items-center space-x-3">
              <span className="text-base text-gray-500 line-through">
                Precio Regular: ${data.data.Precio_Venta}
              </span>
            </div>

            <div className="flex items-baseline space-x-2">
              <span className="text-lg font-medium text-red-500">Precio Final:</span>
              <span className="text-5xl font-extrabold text-red-700 animate-pulse">
                {(() => {
                  const precio = calcularPrecioFinal(data.data);
                  return precio ? `$${precio.toFixed(2)}` : "-";
                })()}
              </span>
            </div>

            <div className="pt-3">
              <p className="text-xl font-extrabold text-white bg-red-500 p-3 rounded-xl shadow-lg text-center">
                Usted Ahorra: ${ahorro.toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </div>


    </div>
  );
}
