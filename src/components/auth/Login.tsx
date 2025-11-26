import { useEffect, useState } from 'react';
import { fetchUserData, login } from '../../api/auth/authApi';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  onRegister?: (register: boolean) => void;
}

export default function Login({ onRegister }: LoginProps) {
  const [formData, setFormData] = useState({ email: '', iduser: '' });
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    if (user.ID_Rol === 'ANALISTA' || user.ID_Rol === '') navigate('/oc');
    else if (user.ID_Rol === '') navigate('/smartpick');
    else if (user.ID_Rol === 'PROGRAMADOR ANALISTA' || user.ID_Rol === 'SUPERVISOR' || user.ID_Rol === 'AUXILIAR') navigate('/generator');
  }, [user, navigate]);

  const { mutate } = useMutation({
    mutationFn: login,
    onError: (error: any) => {
      toast.error(`${error.message}`, { position: "top-right" });
    },
    onSuccess: async () => {
      const userdata = await fetchUserData();
      console.log('login con datos delbackend', userdata)
      setUser(userdata);
      toast.success("Usuario logeado con éxito", { position: "top-right", progressClassName: "custom-progress" });
    },
  });

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-6">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white p-6 sm:p-8 rounded-xl shadow-lg"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">Iniciar Sesión</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm sm:text-base font-medium text-gray-700">Correo electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="mt-1 w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm sm:text-base"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="iduser" className="block text-sm sm:text-base font-medium text-gray-700">Número de empleado</label>
          <input
            type="text"
            id="iduser"
            name="iduser"
            value={formData.iduser}
            onChange={(e) => setFormData({ ...formData, iduser: e.target.value })}
            required
            className="mt-1 w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm sm:text-base"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 sm:py-3 rounded-lg text-sm sm:text-base transition"
        >
          Iniciar Sesión
        </button>

        <p className="mt-4 text-center text-sm sm:text-base text-gray-600">
          ¿No tienes cuenta?{" "}
          <span className="text-blue-600 hover:underline cursor-pointer" onClick={() => onRegister?.(true)}>
            Registrarse
          </span>
        </p>
      </form>
    </div>
  );
}
