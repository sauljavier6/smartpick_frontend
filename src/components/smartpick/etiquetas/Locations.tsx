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
  ID_ArticuloActual: number | null;
  State: boolean;
}

interface LocationProps {
  zonas: any;
  zonaSeleccionada: string[];
  seleccionadas: number[];
}


export default function Locations({ zonas, zonaSeleccionada, seleccionadas }: LocationProps) {


  const handleImprimir = (u: any) => {

    u.forEach((ubicacion: Ubicaciones) => {
      seleccionadas.forEach((nivel) => {
        if (ubicacion.NivelRack === nivel) {
          console.log(
            `- Imprimiendo etiqueta para ${ubicacion.Codigo} (Nivel ${nivel})`
          );
        }
      });
    });
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {Object.keys(zonas)
        .filter((zona) => zonaSeleccionada.includes(zona))
        .map((zona) => (
          <div key={zona} className="mb-2">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              📍 {zona}
            </h2>

            {/* Contenedor de pasillos en paralelo */}
            <div className="flex gap-3">
              {Object.keys(zonas[zona]).map((pasillo) => (
                <div key={pasillo} className="p-2 flex-1">
                  <h3 className="font-semibold text-lg mb-2">
                    Pasillo {pasillo}
                  </h3>

                  {/* Caras dentro del pasillo */}
                  <div className="grid grid-cols-2 gap-3">
                    {["A", "B"].map((cara) => {
                      const caraData = zonas[zona][Number(pasillo)][cara];
                      if (!caraData) return null;
                      return (
                        <div key={cara}>
                          <div className="space-x-1">
                            {Object.keys(caraData).map((rack) => {
                              const niveles = caraData[Number(rack)];
                              if (!niveles) return null;

                              const codigo = niveles[0].Codigo; // "REF-P1-A1-N1"
                              const baseCodigo = codigo.substring(
                                0,
                                codigo.lastIndexOf("-")
                              ); // "REF-P1-A1"

                              return (
                                <button
                                  key={rack}
                                  onClick={() => handleImprimir(niveles)}
                                  className={`text-xs text-white rounded-xl font-semibold shadow-md transition-all duration-200 
                                          active:scale-95 flex items-center justify-center
                                          h-20 w-10
                                          ${
                                            zona === "Refrigerados"
                                              ? "bg-blue-600 hover:bg-blue-700"
                                              : zona === "Secos"
                                              ? "bg-amber-600 hover:bg-amber-700"
                                              : zona === "Mascotas"
                                              ? "bg-pink-600 hover:bg-pink-700"
                                              : zona === "Abarrotes"
                                              ? "bg-green-600 hover:bg-green-700"
                                              : zona === "Hogar"
                                              ? "bg-indigo-600 hover:bg-indigo-700"
                                              : "bg-gray-600 hover:bg-gray-700"
                                          }`}
                                  style={{
                                    writingMode: "vertical-rl",
                                    textOrientation: "mixed",
                                  }}
                                >
                                  {baseCodigo}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}
