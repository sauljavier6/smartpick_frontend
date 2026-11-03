import { useEffect, useState } from 'react';
import { consultarArticulos, type ArticuloAuditoria } from '../../api/auditoria/auditoriaApi';

const moneda = (valor: number | null) => valor == null ? '—' : Number(valor).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
export default function ListaArticulosPage() {
  const [buscar, setBuscar] = useState('');
  const [filtro, setFiltro] = useState('');
  const [sucursal, setSucursal] = useState('TODAS');
  const [pagina, setPagina] = useState(1);
  const [datos, setDatos] = useState<ArticuloAuditoria[]>([]);
  const [total, setTotal] = useState(0);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    let activo = true;
    setCargando(true);
    consultarArticulos({ buscar: filtro, sucursal, pagina, limite: 25 }).then(r => {
      if (activo) { setDatos(r.data); setTotal(r.total); setError(''); }
    }).catch(() => { if (activo) setError('Error al consultar el catálogo'); }).finally(() => { if (activo) setCargando(false); });
    return () => { activo = false; };
  }, [filtro, sucursal, pagina]);
  return <section>
    <h1 className="text-2xl font-bold mb-1">Lista de artículos</h1>
    <p className="text-slate-500 mb-5">Artículos con y sin promoción · {total.toLocaleString('es-MX')} resultados</p>
    <form onSubmit={e => { e.preventDefault(); setPagina(1); setFiltro(buscar); }} className="flex flex-wrap gap-3 mb-5">
      <input className="border rounded-lg p-3 flex-1 min-w-52" placeholder="Buscar por UPC o artículo" value={buscar} onChange={e => setBuscar(e.target.value)}/>
      <input className="border rounded-lg p-3 w-36" aria-label="Sucursal" placeholder="Sucursal" value={sucursal} onChange={e => { setSucursal(e.target.value.toUpperCase()); setPagina(1); }}/>
      <button className="bg-red-700 text-white px-5 rounded-lg" type="submit">Buscar</button>
    </form>
    {error && <p className="text-red-700 mb-4">{error}</p>}
    <div className="overflow-x-auto bg-white border rounded-xl">
      <table className="w-full text-sm text-left"><thead className="bg-slate-100"><tr>{['Artículo','UPC','Descripción','Proveedor','Precio normal','Precio final','Promoción'].map(h => <th key={h} className="p-3 whitespace-nowrap">{h}</th>)}</tr></thead>
      <tbody>{datos.map((a, i) => <tr key={String(a.item_code) + i} className="border-t">
        <td className="p-3">{a.item_code}</td><td className="p-3">{a.upc}</td><td className="p-3">{a.DESCRIPCION || 'Sin descripción'}</td><td className="p-3">{a.nombreProveedor || '—'}</td>
        <td className="p-3 whitespace-nowrap">{moneda(a.Precio_Venta)}</td><td className="p-3 font-semibold whitespace-nowrap">{moneda(a.PRECIO_FINAL)}</td>
        <td className="p-3">{a.TIENE_PROMOCION ? <span className="text-green-700">{a.PROMOCION || 'Promoción'}</span> : 'Sin promoción'}</td>
      </tr>)}</tbody></table>
      {!cargando && datos.length === 0 && <p className="p-5 text-slate-500">No se encontraron artículos.</p>}
      {cargando && <p className="p-5">Cargando...</p>}
    </div>
    <div className="flex gap-4 items-center justify-end mt-4">
      <button disabled={pagina === 1 || cargando} className="border rounded-lg px-4 py-2 disabled:opacity-40" onClick={() => setPagina(p => p - 1)}>Anterior</button>
      <span>Página {pagina} de {Math.max(1, Math.ceil(total / 25))}</span>
      <button disabled={cargando || pagina * 25 >= total} className="border rounded-lg px-4 py-2 disabled:opacity-40" onClick={() => setPagina(p => p + 1)}>Siguiente</button>
    </div>
  </section>;
}
