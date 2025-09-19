import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/login`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 401) {
          setAuthenticated(false);
          return null;
        }
        if (res.ok) return res.json();
        throw new Error("Error en el servidor");
      })
      .then((data) => {
        if (data) setAuthenticated(true);
      })
      .catch(() => setAuthenticated(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authenticated === false) {
    setUser(null);
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
