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

export const TemplateCenefa = async (seleccionados: Producto[]) => {
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
              @page { size: Letter landscape; margin: 0; padding: 16mm 22mm;}
              .page { display: flex; justify-content: flex-start; align-items: flex-start; page-break-after: always; break-after: page; }
              
              .container {
                display: grid;
                grid-template-columns: repeat(3, auto);
                grid-template-rows: repeat(2, auto);
                box-sizing: border-box;
              }

              .row {
                height: 67mm;
                width: 58mm;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                padding: 0 4mm 0 2mm;
                box-sizing: border-box;
              }

              .info-container {
                padding: 0;
                margin: 0;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                height: 8mm;
              }

              .info-small {
                padding: 0;
                margin: 0;
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
              }

              .info-small p {
                padding: 0;
                margin: 0;
                color: #333;
                font-size: 9px;
                line-height: 1;
              }

              h2 {
                padding: 0;
                margin: 0;
                font-size: 9px;
                font-weight: bold;
                text-transform: uppercase;
              }

              .info-precio {
                margin-top: -25px;
              }

              .fila-superior {
                margin-left: 5mm;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-weight: bold;
                font-size: 30px;
                gap: 3mm;
              }

              svg {
                width: 70px;
                height: 22px;
              }

              .cont-barcode {
                padding: 0;
                margin: 0;
                display: flex;
                flex-direction: column;
                align-items: center;
                font-size: 9px;
              }

              .cont-barcode p {
                padding: 0;
                margin: 0;
                font-size: 9px;
              }

              .promo {
                color: black;
                font-weight: bold;
                font-size: 30px;
                margin-top: 14mm;
                text-align: center;
                padding: 0;
              }

              .vigencia {
                text-align: center;
                font-size: 10px;
                font-weight: bold;
              }
              
              @media print { .page { page-break-after: always; } .page:last-child { page-break-after: auto; } body { -webkit-print-color-adjust: exact; } }
            </style>
          </head>
          <body>
            ${(() => {
              const pages = [];
              for (let i = 0; i < productosLote.length; i += 6) {
                const slice = productosLote.slice(i, i + 6);
                pages.push(`
                  <div class="page">
                    <div class="container">
                      ${slice
                        .map(
                          (p, idx) => `
                        <div class="row">
                          <div class="info-container">
                            <div class="info-small">
                              <p>${p.nombreProveedor}</p>
                            </div>
                            <h2>${p.DESCRIPCION}</h2>
                          </div>

                          <div class="info-precio">
                            <div class="fila-superior">
                              <p><b>$${p.Precio_Venta.toFixed(2)}</b></p>
                              <div class="cont-barcode">
                                <svg id="barcode-${i + idx}"></svg>
                                <p>${p.upc}</p>
                              </div>
                            </div>
                          </div>

                          <p class="promo"><b>$${
                            p.PRECIO_ESPECIAL || "-"
                          }</b></p>
                          <div class="vigencia">
                            Vigencia del: ${p.Fecha_Ini} al ${p.Fecha_Fin}
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
                    width: 4,
                    height: 80,
                    displayValue: false,
                    fontSize: 12,
                    textMargin: 4
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