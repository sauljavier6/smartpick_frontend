import { useState, useRef, useEffect } from "react";
import JsBarcode from "jsbarcode";

interface LocationLPValues {
  generar: boolean;
}

export default function LocationLP({ generar }: LocationLPValues) {
  const [lpCode, setLpCode] = useState("");
  const barcodeRef = useRef<SVGSVGElement>(null);
  const smallBarcodeRef = useRef<SVGSVGElement>(null);

  // Generar una LP única
  const generarLP = () => {
    const fecha = new Date();
    const yyyy = fecha.getFullYear();
    const mm = String(fecha.getMonth() + 1).padStart(2, "0");
    const dd = String(fecha.getDate()).padStart(2, "0");
    const rand = Math.floor(Math.random() * 9999)
      .toString()
      .padStart(4, "0");
    const code = `LP${yyyy}${mm}${dd}-${rand}`;
    setLpCode(code);
  };

  useEffect(() => {
    if (generar) generarLP();
  }, [generar]);

  useEffect(() => {
    if (!lpCode) return;

    // 🔹 Código de barras principal (con texto)
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, lpCode, {
        format: "CODE128",
        displayValue: true, // ✅ Muestra el texto debajo
        lineColor: "#111",
        width: 2,
        height: 80,
        fontSize: 14,
        margin: 10,
      });
    }

    // 🔹 Código pequeño (sin texto)
    if (smallBarcodeRef.current) {
      JsBarcode(smallBarcodeRef.current, lpCode, {
        format: "CODE128",
        displayValue: false,
        lineColor: "#555",
        width: 1,
        height: 30,
        margin: 0,
      });
    }
  }, [lpCode]);

  return (
    <div className="relative flex flex-col items-center bg-gray-100 p-6 sm:p-8 md:p-12 w-full min-h-screen">
      <div className="relative flex flex-col items-center gap-8 sm:gap-10 bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-300 w-full max-w-md sm:max-w-lg md:max-w-xl">
        {lpCode && (
          <div className="absolute top-4 right-4 sm:top-5 sm:right-5">
            <svg
              ref={smallBarcodeRef}
              className="w-28 sm:w-32 md:w-36 h-10 sm:h-12 md:h-14"
            ></svg>
          </div>
        )}

        {lpCode && (
          <div className="flex flex-col items-center gap-3 sm:gap-4 mt-10 sm:mt-12 w-full">
            <svg
              ref={barcodeRef}
              className="w-full max-w-xs sm:max-w-md md:max-w-lg h-20 sm:h-24 md:h-28"
            ></svg>
          </div>
        )}
      </div>
    </div>
  );
}
