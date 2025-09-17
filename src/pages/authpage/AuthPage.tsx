import { useState } from "react";
import Login from "../../components/auth/Login";
//import Register from "../../components/auth/register/Register";

const SuppliersPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div>
    {/* Pasamos el término de búsqueda al componente de la lista */}
    {isRegistering ? (
    <div>Por el momento no hay registro desarrollado</div>
    //<Register onBack={() => setIsRegistering(false)} />
    ) : (
    <Login onRegister={() => setIsRegistering(true)} />
    )}
    </div>
  );
};

export default SuppliersPage;