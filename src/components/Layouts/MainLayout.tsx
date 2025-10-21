
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { logoutUser } from "../../api/auth/authApi";
import { getorderbyid } from "../../api/smartpick/orderTraslateApi";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [buscar, setBuscar] = useState('');
  const [orden, setOrden] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleAuthAction = async () => {
    try {
      if (user) {
        await logoutUser();

        setUser(null);

        navigate("/login");
      } else {
        navigate("/login");
      }
    } catch (error: any) {
      console.error('Error al cerrar sesión:', error.message);
    }
  };


  useEffect(() => {
    if (!buscar) {
      setOrden([]);
      return;
    }

    const handler = setTimeout(async () => {
      try {
        const data = await getorderbyid(buscar);
        setOrden(data ? [data] : []);
      } catch (err) {
        console.error(err);
        setOrden([]);
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [buscar]);


  const handleButtonClick = (tranid: string) => {
    navigate(`/smartpick/pick/${tranid}`);
  };

  const wrapperRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }

      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && sidebarOpen) {
        setSidebarOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  return (
    <div>
      <nav ref={wrapperRef} className="fixed top-0 z-50 w-full bg-blue-700 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
            <button
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <span className="sr-only">Open sidebar</span>
              <img className="w-8 h-8 bg-blue-700 dark:bg-gray-800" src="/menuhamburguesa.png" alt="menu" />
            </button>

            <img src="/Logo.png" className="hidden sm:block h-8 me-3 rounded" alt="Logo" />
            <span className="hidden sm:block self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-white">
                SMART & FINAL
            </span>
            </div>

            <div className="flex flex-1 justify-center px-4">
              <div className="relative w-full max-w-3xl">
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={buscar}
                  onChange={(e) => setBuscar(e.target.value)}
                  className="w-full px-10 py-2 rounded-3xl border border-gray-300 bg-white focus:outline-none focus:ring focus:ring-gray-400 placeholder-gray-400"
                />
                <img
                  src="/lupa.png"
                  alt="Buscar"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                />

                {orden.length > 0 && (
                  <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-xl mt-1 max-h-60 overflow-y-auto">
                    {orden.map((item) => (
                      <li
                        key={item.dep.tranid}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setOrden([]);
                          handleButtonClick(item.dep.tranid);
                        }}
                      >
                        {item.dep.tranid} - {item.dep.transferlocation}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>


            <div className="relative">
              <button
                type="button"
                className="flex text-sm rounded-full"
                onClick={() => setOpen(!open)}
              >
                <span className="sr-only">Open user menu</span>
                <img className="w-9 h-9 bg-blue-700 dark:bg-gray-800" src="/user.png" alt="user" />
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-48 z-50 text-base list-none bg-white divide-y divide-gray-100 rounded-sm shadow-sm dark:bg-gray-700 dark:divide-gray-600">
                  {open && (
                    <div className="px-4 py-3">
                      <p className="text-sm text-gray-900 dark:text-white">{user?.Name}</p>
                    </div>
                  )}
                  <ul className="py-1">
                    {user && (
                      <li>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                      </li>
                    )}
                      <li>
                      <button
                        onClick={handleAuthAction}
                        className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        {user ? "Sign out" : "Login"}
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <aside
        ref={sidebarRef}
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              <li>
                  <a href="/oc" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <img src="/Logo.png" alt="Home" className="w-5 h-5 object-contain" />
                    <span className="ms-3">Inicio</span>
                  </a>
              </li>

              <li>
                  <a href="/oc/orden" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <img src="/inventario.png" alt="productos" className="w-5 h-5 object-contain" />
                    <span className="flex-1 ms-3 whitespace-nowrap">Ordenes de compra</span>
                  </a>
              </li>
            </ul>
        </div>
      </aside>
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 sm:ml-56 p-0 sm:p-6">
       <div className="mt-16">
        <div className="rounded-none sm:rounded-xl bg-white dark:bg-gray-800 shadow-md p-4 sm:p-6 border border-gray-200 dark:border-gray-700 w-full">
         <Outlet />
        </div>
       </div>
      </div>
    </div>
  );
};

export default AdminLayout;