interface IUser {
  iduser: string;
  email: string;
}

export const login = async (data: IUser) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error al iniciar sesión');
  }
  console.log('res',res)
  return await res.json();
};


export const fetchUserData = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'No se pudo obtener la información del usuario');
  }

  return res.json();
};

export const logoutUser = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/login/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error al cerrar sesión');
  }

  return await res.json();
};
