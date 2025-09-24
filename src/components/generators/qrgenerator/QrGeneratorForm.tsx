import { useState } from "react";
import Barcode from "react-barcode";

export default function InventoryForm() {
  const [form, setForm] = useState({ quantity: "" });
  const [code, setCode] = useState<string[]>([]);
  const [log, setLog] = useState<string[]>([]);

  // Genera códigos únicos
  const generarCodigos = (quantity: number) => {
    const fecha = new Date();
    const pad = (n: number) => n.toString().padStart(2, "0");
    const base =
      fecha.getFullYear().toString() +
      pad(fecha.getMonth() + 1) +
      pad(fecha.getDate()) +
      pad(fecha.getHours()) +
      pad(fecha.getMinutes()) +
      pad(fecha.getSeconds());

    return Array.from({ length: quantity }, (_, i) => `${base}${i + 1}`);
  };

  const handleGenerarCodigos = () => {
    console.log('entro en dinamico')
    setLog([])
    const quantity = Number(form.quantity);
    if (!quantity || quantity <= 0) return;

    const nuevos = generarCodigos(quantity);
    setCode(nuevos);

    // Enviar array completo a Android
    if ((window as any).AndroidPrint) {
      (window as any).AndroidPrint.printLabels(JSON.stringify(nuevos));
      setLog((prev) => [...prev, `✅ ${nuevos.length} etiquetas enviadas a Android`]);
    } else {
      setLog((prev) => [...prev, "⚠️ AndroidPrint no disponible en navegador web"]);
    }
  };

  const handleGenerarCodigosEstatico = () => {
    console.log('entro en estatico')
    setLog([])

    const quantity = form.quantity;
    if (!quantity) return;

    setCode([quantity]);

    // Enviar array completo a Android
    if ((window as any).AndroidPrint) {
      (window as any).AndroidPrint.printLabels(JSON.stringify(quantity));
      setLog((prev) => [...prev, `✅ etiqueta enviada a Android`]);
    } else {
      setLog((prev) => [...prev, "⚠️ AndroidPrint no disponible en navegador web"]);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Generar etiquetas</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* FORM */}
        <div className="bg-white rounded-2xl shadow-sm border p-4 sm:p-6 space-y-4">
          <label className="block text-sm font-medium mb-1">Cantidad</label>
          <input
            type="text"
            value={form.quantity || ""}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            className="w-full border-2 border-gray-400 rounded-xl p-2.5"
          />

          <div className="flex gap-3 mt-2">
            <button
              onClick={handleGenerarCodigos}
              className="flex-1 bg-red-600 text-white py-2 rounded-xl"
            >
              Generar etiquetas y enviar a Android
            </button>
          </div>
          <div className="flex">
            <button
              onClick={handleGenerarCodigosEstatico}
              className="flex-1 bg-gray-500 text-white py-2 rounded-xl"
            >
              Generar etiquetas y enviar a Android
            </button>
          </div>

          <div className="mt-4 space-y-1">
            {log.map((l, idx) => (
              <div key={idx}>{l}</div>
            ))}
          </div>
        </div>

        {/* PREVIEW */}
        <div className="bg-white rounded-2xl shadow-sm border p-4 sm:p-6 flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-3 text-center">Vista previa</h2>
          <div className="flex flex-col items-center">
            {code.length > 0
              ? code.map((c, index) => (
                  <div
                    key={index}
                  >
                    <Barcode value={c} displayValue={true} height={60} />
                    <div
                      style={{
                        marginTop: "5mm",
                        fontSize: "14pt",
                        textAlign: "center",
                      }}
                    >
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}
