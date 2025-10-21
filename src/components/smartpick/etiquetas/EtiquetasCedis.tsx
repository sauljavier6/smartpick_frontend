import { useState, useMemo } from "react";
import { getUbicaciones } from "../../../api/smartpick/ubicacionApi";
import { useQuery } from "@tanstack/react-query";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import Locations from "./Locations";
import LocationLP from "./LocationLP";

interface Ubicaciones {
  ID_Ubicacion: number;
  Codigo: string;
  Descripcion: string;
  Zona: string;
  Pasillo: number;
  CaraRack: string;
  NumRack: number;
  NivelRack: number;
  Tipo: string;
  CapacidadPeso: string;
  CapacidadVolumen: string;
  Ocupada: boolean;
  ID_LP: number | null;
  State: boolean;
}

interface FormValues {
  etiqueta: string;
  zonas: string[];
}

export default function EtiquetasCedis() {
  const [etiqueta, setEtiqueta] = useState("");
  const [seleccionadas, setSeleccionadas] = useState<number[]>([1]);
  const [zonaSeleccionada, setzonaSeleccionada] = useState<string[]>([]);
  const [generarlp, setGenerarlp] = useState(false);

  const { control, handleSubmit, register, setValue, watch } =
    useForm<FormValues>({
      defaultValues: { etiqueta: "", zonas: [] },
    });

  const onSubmit = (data: FormValues) => {
    console.log("Formulario:", data);
  };

  const { data } = useQuery({
    queryKey: ["ubicaciones"],
    queryFn: getUbicaciones,
  });

  const zonasUnicas = useMemo(() => {
    if (!data) return [];
    // Extrae las zonas y elimina duplicados
    const zonas = data.map((u: Ubicaciones) => u.Zona).filter(Boolean);
    return Array.from(new Set(zonas));
  }, [data]);

  const zonas = useMemo(() => {
    if (!data) return {};

    const grouped: Record<
      string,
      Record<number, Record<string, Record<number, Ubicaciones[]>>>
    > = {};

    data.forEach((u: Ubicaciones) => {
      const zona = u.Zona || "SinZona";
      const pasillo = Number(u.Pasillo) || 0;
      const cara = u.CaraRack || "A";
      const rack = Number(u.NumRack) || 0;

      if (!grouped[zona]) grouped[zona] = {};
      if (!grouped[zona][pasillo]) grouped[zona][pasillo] = {};
      if (!grouped[zona][pasillo][cara]) grouped[zona][pasillo][cara] = {};
      if (!grouped[zona][pasillo][cara][rack])
        grouped[zona][pasillo][cara][rack] = [];

      grouped[zona][pasillo][cara][rack].push(u);
    });

    // Ordena todo
    Object.keys(grouped).forEach((zona) => {
      Object.keys(grouped[zona])
        .sort((a, b) => Number(a) - Number(b))
        .forEach((pasillo) => {
          Object.keys(grouped[zona][Number(pasillo)]).forEach((cara) => {
            Object.keys(grouped[zona][Number(pasillo)][cara])
              .sort((a, b) => Number(a) - Number(b))
              .forEach((rack) => {
                grouped[zona][Number(pasillo)][cara][Number(rack)].sort(
                  (a, b) => Number(a.NivelRack) - Number(b.NivelRack)
                );
              });
          });
        });
    });

    return grouped;
  }, [data]);

  const toggleEtiqueta = (num: number) => {
    if (seleccionadas.includes(num)) {
      setSeleccionadas(seleccionadas.filter((n) => n !== num));
    } else {
      setSeleccionadas([...seleccionadas, num]);
    }
  };

  const opciones = [
    { value: "Lp", label: "Lp" },
    { value: "Ubicaciones", label: "Ubicaciones" },
  ];

  return (
    <div className="w-full min-h-screen mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white rounded-2xl shadow p-4 flex flex-col">
        <h2 className="text-xl font-semibold mb-2">Configuración</h2>

        <label className="text-sm font-medium mt-2">Tipo de etiqueta</label>
        <Select
          options={opciones}
          value={opciones.find((o) => o.value === etiqueta)}
          onChange={(opcion) => setEtiqueta(opcion?.value || "")}
        />

        {etiqueta === "Ubicaciones" ? (
          <>
            <label className="text-sm font-medium mt-2">Zona</label>
            <Select
              isMulti
              options={zonasUnicas.map((z) => ({
                value: String(z),
                label: String(z),
              }))}
              value={zonaSeleccionada.map((z) => ({ value: z, label: z }))}
              onChange={(selected) =>
                setzonaSeleccionada(selected.map((s) => s.value))
              }
            />

            <label className="text-sm font-medium mt-2">Nivel del Rack</label>
            <div className="grid grid-cols-4 gap-3 mb-4">
              {[1, 2, 3, 4].map((num) => (
                <button
                  key={num}
                  onClick={() => toggleEtiqueta(num)}
                  className={`w-full p-3 rounded-lg font-semibold shadow-md text-white transition-all duration-200
                hover:scale-105 active:scale-95
                ${
                  seleccionadas.includes(num)
                    ? "bg-blue-600"
                    : "bg-blue-400 hover:bg-blue-500"
                }
              `}
                >
                  Nivel {num}
                </button>
              ))}
            </div>
          </>
        ) : etiqueta === "Lp" ? (
          <>
            <label className="text-sm font-medium mt-2">Escanee Etiqueta</label>
            <input
              {...register("etiqueta")}
              type="text"
              placeholder="Escanee aquí la etiqueta"
              className="border-1 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-2 rounded outline-none transition-all"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  const nuevaEtiqueta = watch("etiqueta").trim();
                  if (
                    nuevaEtiqueta &&
                    !zonaSeleccionada.includes(nuevaEtiqueta)
                  ) {
                    setValue("zonas", [...zonaSeleccionada, nuevaEtiqueta]);
                  }
                  setValue("etiqueta", "");
                }
              }}
            />

            <button
              onClick={() => setGenerarlp(!generarlp)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition mt-2"
            >
              Generar Nueva LP
            </button>
          </>
        ) : null}
      </div>

      {data ? (
        <div className="md:col-span-2 bg-white rounded-2xl shadow p-4">
          <h1 className="text-2xl font-bold mb-4 text-center">{etiqueta}</h1>

          {etiqueta === "Ubicaciones" ? (
            <Locations
              zonas={zonas}
              zonaSeleccionada={zonaSeleccionada}
              seleccionadas={seleccionadas}
            />
          ) : etiqueta === "Lp" ? (
            <LocationLP generar={generarlp} />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
