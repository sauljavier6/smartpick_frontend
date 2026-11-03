import { Link } from 'react-router-dom';
import { ClipboardList, ScanBarcode } from 'lucide-react';
export default function AuditoriaHome() {
  return <div><h1 className="text-2xl font-bold mb-2">Auditoría</h1><p className="text-slate-500 mb-6">Consulta artículos y verifica sus precios.</p><div className="grid md:grid-cols-2 gap-4">
    <Link to="/generator/auditoria/articulos" className="bg-white border rounded-xl p-6 hover:shadow-md"><ClipboardList className="text-red-700 mb-3"/><h2 className="font-semibold text-lg">Lista de artículos</h2><p className="text-slate-500">Catálogo, precios y promociones.</p></Link>
    <Link to="/generator/auditoria/precios" className="bg-white border rounded-xl p-6 hover:shadow-md"><ScanBarcode className="text-red-700 mb-3"/><h2 className="font-semibold text-lg">Checador de precios</h2><p className="text-slate-500">Escanea o captura un UPC.</p></Link>
  </div></div>;
}
