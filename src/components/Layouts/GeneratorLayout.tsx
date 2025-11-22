import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { logoutUser } from "../../api/auth/authApi";

const AdminLayout = () => {
  const [isCenefasOpen, setIsCenefasOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  const wrapperRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }

      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        sidebarOpen
      ) {
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
      <nav
        ref={wrapperRef}
        className="fixed top-0 z-50 w-full bg-red-700 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"
      >
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <span className="sr-only">Open sidebar</span>
                <img
                  className="w-8 h-8 bg-red-700 dark:bg-gray-800"
                  src="/menuhamburguesa.png"
                  alt="menu"
                />
              </button>

              <img
                src="/Logo.png"
                className="hidden sm:block h-8 me-3 rounded"
                alt="Logo"
              />
              <span className="hidden sm:block self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-white">
                SMART & FINAL
              </span>
            </div>

            <div className="relative">
              <button
                type="button"
                className="flex text-sm rounded-full"
                onClick={() => setOpen(!open)}
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-9 h-9 bg-red-700 dark:bg-gray-800"
                  src="/user.png"
                  alt="user"
                />
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-48 z-50 text-base list-none bg-white divide-y divide-gray-100 rounded-sm shadow-sm dark:bg-gray-700 dark:divide-gray-600">
                  {open && (
                    <div className="px-4 py-3">
                      <p className="text-sm text-gray-900 dark:text-white">
                        {user?.Name}
                      </p>
                    </div>
                  )}
                  <ul className="py-1">
                    {user && (
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Settings
                        </a>
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
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0`}
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="/generator/"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <img
                  src="/Logo.png"
                  alt="Home"
                  className="w-5 h-5 object-contain"
                />
                <span className="ms-3">Inicio</span>
              </a>
            </li>
            <li>
              <a
                href="/generator/inventory"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <img
                  src="/inventario.png"
                  alt="productos"
                  className="w-5 h-5 object-contain"
                />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Etiquetas de inventario
                </span>
              </a>
            </li>
            <li>
              <a
                href="/generator/qr"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <img
                  src="/codigobarras.png"
                  alt="productos"
                  className="w-5 h-5 object-contain"
                />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Generador de etiquetas
                </span>
              </a>
            </li>
            <li>
              <button
                type="button"
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-cenefas"
                data-collapse-toggle="dropdown-cenefas"
                onClick={() => setIsCenefasOpen(!isCenefasOpen)}
              >
                <img
                  src="/cenefas.png"
                  alt="productos"
                  className="w-5 h-5 object-contain"
                />
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Impresión
                </span>

                <svg
                  className={`w-3 h-3 transition-transform duration-200 ${
                    isCenefasOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              <ul id="dropdown-cenefas" className={`${isCenefasOpen ? '' : 'hidden'} py-2 space-y-2`}>
                <li>
                  <a
                    href="/generator/cenefas"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Cenefas
                  </a>
                </li>
                <li>
                  <a
                    href="/generator/scanner"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Scanner
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </aside>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 sm:ml-66 p-0 sm:p-6">
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
