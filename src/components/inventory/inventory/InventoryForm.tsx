import { useRef, useState } from "react";

export default function InventoryForm() {
  const printRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    product: "",
    code: "",
    quantity: 1,
    branch: "",
  });

  const doPrint = () => {
    if (!printRef.current) return;
    window.print();
  };

  // Tamaño fijo de etiqueta (3x2 pulgadas aprox)
  const size = { w: Math.round(3 * 96), h: Math.round(2 * 96) };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: name === "quantity" ? Number(value) : value }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-0 sm:p-6">
    <style>{`
      @page {
        size: letter; /* hoja carta */
        margin: 0;    /* sin márgenes */
      }

      @media print {
        body * {
          visibility: hidden;
        }

        #print-area, #print-area * {
          visibility: visible;
        }

        #print-area {
          position: absolute;
          inset: 0;
          margin: auto;

          /* Tamaño fijo: 1/4 de hoja carta */
          width: 408px;   /* 4.25in */
          height: 428px;  /* 5.5in */
          page-break-inside: avoid;
        }
      }
    `}</style>


      <h1 className="text-2xl font-bold tracking-tight mb-4">Imprimir etiqueta de inventario</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* FORM */}
        <div className="bg-white rounded-2xl shadow-sm border p-4 sm:p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Producto</label>
            <input
              name="product"
              value={form.product}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-red-500 p-2.5"
              placeholder="Ej. Croquetas 20kg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Código</label>
            <input
              name="code"
              value={form.code}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-red-500 p-2.5"
              placeholder="1234567890"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Cantidad por caja</label>
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              min={1}
              className="mt-1 w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-red-500 p-2.5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Sucursal</label>
            <input
              name="branch"
              value={form.branch}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-red-500 p-2.5"
              placeholder="Sucursal Central"
            />
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={doPrint}
              className="px-4 py-2 rounded-2xl bg-red-600 hover:bg-red-700 text-white shadow-sm"
            >
              Imprimir etiqueta
            </button>
            <button
              onClick={() => setForm({ product: "", code: "", quantity: 1, branch: "" })}
              className="px-4 py-2 rounded-2xl bg-gray-200 hover:bg-gray-300 text-gray-800"
            >
              Limpiar
            </button>
          </div>
        </div>

        {/* PREVIEW / PRINT AREA */}
        <div
          id="print-area"
          ref={printRef}
          className="bg-white rounded-2xl text-center shadow-sm border p-4 sm:p-6"
        >

          <h2 className="text-xl text-base font-bold mb-2">Papeleta de inventario</h2>

          <div className="text-md font-semibold mb-3 mt-5">
            {form.product || "Producto"}
          </div>

          <div className="text-2xl font-bold tracking-widest mb-3">
            {form.code || "00000"}
          </div>

          <div className="text-xl text-sm mb-6">
            Cantidad por caja
          </div>

          <div className="text-sm mt-15 text-[35px]">
            <span className="font-semibold">{form.quantity}</span>
          </div>

          <div className="border-t border-black pt-2 mt-6 text-xs mt-10">
            suc. {form.branch || "Sucursal"}
          </div>
        </div>
      </div>
    </div>
  );
}
