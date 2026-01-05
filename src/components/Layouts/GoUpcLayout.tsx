import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { logoutUser } from "../../api/auth/authApi";

const GoUpcLayout = () => {
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

        navigate("/");
      } else {
        navigate("/");
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
        className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"
      >
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <span className="sr-only">Open sidebar</span>
                <img
                  className="w-8 h-8 bg-white dark:bg-gray-800"
                  src="/menuhamburguesa.png"
                  alt="menu"
                />
              </button>

              <img
                src="/Logo.png"
                className="hidden sm:block h-8 me-3 rounded"
                alt="Logo"
              />
              <span className="hidden sm:block self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-black dark:text-white">
                SMART & FINAL
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-0 sm:p-6">
        <div className="mt-8">
          <div className="rounded-none sm:rounded-xl bg-white dark:bg-gray-800 shadow-md p-4 sm:p-4 border border-gray-200 dark:border-gray-700 w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoUpcLayout;
