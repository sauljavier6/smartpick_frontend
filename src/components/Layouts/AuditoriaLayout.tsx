import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { logoutUser } from '../../api/auth/authApi';
import { ClipboardList, ScanBarcode, LogOut, House } from 'lucide-react';

export default function AuditoriaLayout() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const salir = async () => {
    await logoutUser();
    setUser(null);
    navigate('/');
  };
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-red-700 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3"><img src="/Logo.png" alt="" className="h-8" /><span className="font-semibold text-lg">SMART & FINAL · Auditoría</span></div>
        <div className="flex items-center gap-4"><span className="text-sm">{user?.Name}</span><button onClick={salir} className="flex items-center gap-2"><LogOut size={18}/> Salir</button></div>
      </header>
      <div className="flex flex-col md:flex-row">
        <nav className="md:w-64 bg-white border-r p-4 space-y-2">
          <Link className="flex gap-2 items-center p-3 hover:bg-slate-100 rounded-lg" to="/auditoria"><House size={18}/> Inicio</Link>
          <Link className="flex gap-2 items-center p-3 hover:bg-slate-100 rounded-lg" to="/auditoria/articulos"><ClipboardList size={18}/> Lista de artículos</Link>
          <Link className="flex gap-2 items-center p-3 hover:bg-slate-100 rounded-lg" to="/auditoria/precios"><ScanBarcode size={18}/> Checador de precios</Link>
        </nav>
        <main className="flex-1 min-w-0 p-4 md:p-8"><Outlet/></main>
      </div>
    </div>
  );
}
