import { useState } from 'react';
import { consultarArticuloExacto, type ArticuloAuditoria } from '../../api/auditoria/auditoriaApi';
const moneda = (valor: number | null) => valor == null ? '—' : Number(valor).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
export default function ChecadorPreciosPage() {
  const [upc, setUpc] = useState('');
  const [articulo, setArticulo] = useState<ArticuloAuditoria | null>(null);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const buscar = async (e: React.FormEvent) => {
    e.preventDefault(); setCargando(true); setArticulo(null); setMensaje('');
    try {
      const encontrado = await consultarArticuloExacto(upc.trim());
      setArticulo(encontrado || null);
      if (!encontrado) setMensaje('No se encontró el artículo.');
    } catch { setMensaje('No fue posible consultar el precio.'); }
    finally { setCargando(false); }
  };
  return <section className="max-w-3xl mx-auto">
    <h1 className="text-2xl font-bold mb-2">Checador de precios</h1>
    <p className="text-slate-500 mb-6">Escanea el código de barras o captura el UPC y presiona Enter.</p>
    <form onSubmit={buscar} className="bg-white border rounded-xl p-5 flex flex-wrap gap-3">
      <input autoFocus required className="border rounded-lg p-3 flex-1 min-w-48" placeholder="Código UPC o artículo" value={upc} onChange={e => setUpc(e.target.value)}/>
      <button disabled={cargando} className="bg-red-700 text-white px-6 rounded-lg disabled:opacity-50">{cargando ? 'Buscando...' : 'Consultar'}</button>
    </form>
    {mensaje && <p className="mt-5 text-red-700">{mensaje}</p>}
    {articulo && <div className="bg-white border rounded-xl mt-6 p-6">
      <div className="text-slate-500 text-sm">{articulo.item_code} · UPC {articulo.upc}</div>
      <h2 className="text-xl font-semibold mt-2">{articulo.DESCRIPCION || 'Artículo sin descripción disponible'}</h2>
      <p className="text-slate-500">{articulo.nombreProveedor}</p>
      <p className="mt-6 text-slate-500">Precio normal: {moneda(articulo.Precio_Venta)}</p>
      <p className="text-5xl font-bold text-red-700 my-3">{moneda(articulo.PRECIO_FINAL)}</p>
      <p className="text-sm">{articulo.TIENE_PROMOCION ? `Promoción: ${articulo.PROMOCION || articulo.TIPO_PROMO}` : 'Precio regular · Sin promoción'}</p>
    </div>}
  </section>;
}
