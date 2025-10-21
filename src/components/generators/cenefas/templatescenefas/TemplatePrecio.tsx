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

export const TemplatePrecio = async (seleccionados: Producto[]) => {
  if (seleccionados.length === 0)
    return alert("Selecciona al menos un producto");

  const lotes = [];
  for (let i = 0; i < seleccionados.length; i += seleccionados.length) {
    lotes.push(seleccionados.slice(i, i + seleccionados.length));
  }

  lotes.forEach((productosLote, loteIndex) => {
    setTimeout(() => {
      const iframe = document.createElement("iframe");
      iframe.style.position = "fixed";
      iframe.style.width = "0";
      iframe.style.height = "0";
      iframe.style.border = "none";
      document.body.appendChild(iframe);

      const htmlContent = `
        <html>
          <head>
            <title>Impresión de Cenefas</title>
            <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.6/dist/JsBarcode.all.min.js"></script>
            <style>
              @page { size: Letter; margin: 0; padding: 15mm 10mm 20mm 10mm; }
              .page { width: 100%; height:100%; display: flex; justify-content: flex-start; align-items: flex-start; page-break-after: always; break-after: page; }
              
              .container {
                display: grid;
                grid-template-columns: repeat(4, auto);
                grid-template-rows: repeat(8, auto);
                box-sizing: border-box;
              }

              .row {
                width: 45mm;
                height: 26mm;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                box-sizing: border-box;
                padding: 4mm 4mm 4mm 1.5mm;
                margin-top: 1mm;
                margin-bottom: 1mm;
                margin-left: 0;
                margin-right: 0;
              }
                
              .info-small {
                padding: 0;
                margin: 0;
                display: flex;
                justify-content: center;
                align-items: flex-start;
              }

              .info-small p {
                padding: 0;
                margin: 0;
                color: #333;
                font-size: 4px;
                line-height: 1;
              }

              h2 {
                padding: 0;
                margin: 0;
                font-size: 5px;
                font-weight: bold;
                text-transform: uppercase;
                text-align: center;
              }

              svgdiv {
                padding: 0;
                margin: 0;
                margin-top: -5px;
                display: flex;
                justify-content: flex-start;
                align-items: flex-start;
                width: 150px;
                height: 40px;
              }

              svg {
                padding: 0;
                margin: 0;
                width: 150px;
                height: 40px;
              }


              .info-precio {
                display: flex;
                justify-content: center;
                align-items: flex-start;
                gap: 0;
              }

              .fila-superior {
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                font-weight: bold;
                font-size: 25px;
              }

              .fila-superior p {
                margin: 0;
                padding: 0;
              }

              .fila-inferior {
                margin: 0;
                padding: 0;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: flex-end;
                font-weight: bold;
                font-size: 7px;
                gap: 0;
              }

              .fila-inferior p {
                margin: 0;
                padding: 0;
              }

              @media print { .page { page-break-after: always; } .page:last-child { page-break-after: auto; } body { -webkit-print-color-adjust: exact; } }
            </style>
          </head>
          <body>
            ${(() => {
              const pages = [];
              for (let i = 0; i < productosLote.length; i += 32) {
                const slice = productosLote.slice(i, i + 32);
                pages.push(`
                  <div class="page">
                    <div class="container">
                      ${slice
                        .map(
                          (p, idx) => `
                        <div class="row">
                          <div class="info-small">
                            <p>${p.nombreProveedor}</p>
                          </div>
                          <h2>${p.DESCRIPCION}</h2>
                          <div class="svgdiv">
                            <svg id="barcode-${i + idx}"></svg>
                          </div>
                          <div class="info-precio">
                            <div class="fila-superior">
                                <p><b>${p.Precio_Venta.toFixed(2)}</b></p>
                            </div>
                            <div class="fila-inferior">
                              <p><b>${p.upc}</b></p>
                              <p><b>${p.item_code}</b></p>
                            </div>
                          </div>
                        </div>
                      `
                        )
                        .join("")}
                    </div>
                  </div>
                `);
              }
              return pages.join("");
            })()}
          </body>
        </html>`;

      const doc = iframe.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(htmlContent);
        doc.close();

        iframe.onload = () => {
          const productos = productosLote;
          const win = iframe.contentWindow!;
          const JsBarcodeFn = (win as any).JsBarcode;

          const interval = setInterval(() => {
            if (typeof JsBarcodeFn === "function") {
              clearInterval(interval);
              productos.forEach((p, index) => {
                const svg = win.document.getElementById("barcode-" + index);
                if (svg && p.upc) {
                  JsBarcodeFn(svg, p.upc.toString(), {
                    format: "CODE128",
                    lineColor: "#000",
                    width: 1.5,
                    height: 40,
                    displayValue: false,
                  });
                }
              });
              win.focus();
              win.print();
              setTimeout(() => document.body.removeChild(iframe), 2000);
            }
          }, 300);
        };
      }
    }, loteIndex * 3000);
  });
};
