import { useState } from "react";
import { getUvaProducto } from "../../../api/uva/uvaApi";

interface ProductData {
  ID_Product: number;
  Description: string;
  ID_Categoria: number;
  SKU: string;
  Marca: string;
  Pais: string;
  Imagen: string;
  Sellos: string[];
  State: boolean;
}

export default function UvaPrint() {
  const [scanCode, setScanCode] = useState("");
  const [product, setProduct] = useState<ProductData | null>(null);

  const handleScan = async () => {
    if (!scanCode.trim()) return;
    if (product && product.SKU === scanCode) return;
    try {
      const res = await getUvaProducto(scanCode);
      if (!res.data) return alert("Producto no encontrado");
      setProduct(res.data);
    } catch (err) {
      console.error(err);
      alert("Error al obtener el producto");
    }
  };


  const handlePrint = () => {
    if (!product || !product.SKU) return;

    const baseUrl = import.meta.env.VITE_API_URL_IMAGES;
    const sku = product.SKU;

    const suffixes = ["", "O", "E1", "E2", "E3", "E4", "E5"];

    const imageUrls = suffixes.map(suffix => `${baseUrl}${sku}${suffix}.webp`);

    const printWindow = window.open("", "_blank", "width=900,height=700");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Imprimir Etiquetas</title>
          <style>
            body {
              margin: 0;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: flex-start;
              gap: 10px;
              padding: 10px;
            }
            img {
              max-width: 95%;
              height: auto;
              page-break-after: always;
            }
          </style>
        </head>
        <body>
    `);

    imageUrls.forEach(url => {
      printWindow.document.write(`<img src="${url}" onerror="this.style.display='none'" />`);
    });

    printWindow.document.write(`
        <script>
          window.onload = () => {
            window.print();
            window.close();
          };
        </script>
        </body>
      </html>
    `);

    printWindow.document.close();
  };


  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full rounded-2xl">
      <div className="bg-white p-4 rounded shadow mb-2">
        <h1 className="text-2xl font-bold mb-6">Módulo de Impresión UVA</h1>
        <div className="mb-4 w-full">
          <input
            type="text"
            placeholder="Escanea el código del producto"
            value={scanCode}
            onChange={(e) => setScanCode(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleScan();
                setScanCode("");
              }
            }}
            onBlur={() => {
              if (scanCode.trim() !== "") handleScan();
            }}
            className="border rounded p-2 w-full md:w-1/3"
          />
        </div>
      </div>

      {product && (
        <> 
        <div className="bg-white p-4 rounded shadow ">
          <div className="flex items-center mb-4">
            <img
              src={`${import.meta.env.VITE_API_URL_IMAGES}${product.SKU}.webp`}
              onError={(e) => {
                e.currentTarget.src = "/no-image.webp";
              }}
              alt={product.Description}
              className="w-20 h-20 mr-4 object-contain"
            />

            <div>
              <p className="font-bold text-lg">{product.Description}</p>
              <p>SKU: {product.SKU}</p>
              <p>Marca: {product.Marca}</p>
              <p>País: {product.Pais}</p>
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            {product?.Sellos?.map((s, i) => (
              <div key={i} className="bg-red-500 text-white px-2 py-1 rounded">
                {s}
              </div>
            ))}
          </div>

          <div className="p-4 flex justify-center items-center">
            <button
              onClick={handlePrint}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Imprimir Etiquetas
            </button>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow mt-2">
          <div className="flex flex-wrap items-center gap-4">
            {["", "O", "E1", "E2", "E3", "E4", "E5"].map((suffix) => {
              const imgUrl = `${import.meta.env.VITE_API_URL_IMAGES}${product.SKU}${suffix}.webp`;

              return (
                <img
                  key={suffix}
                  src={imgUrl}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                  alt={`${product.Description} ${suffix}`}
                  className="w-40 h-40 object-contain rounded"
                />
              );
            })}
          </div>
        </div>
        </>
      )}
    </div>
  );
}
