
export const getUbicaciones = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/ubicaciones`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error al buscar estados');
  }

  return await res.json();
};