export const getOC = async (idProveedor: number) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/ordencompra?idproveedor=${idProveedor}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error al buscar OC');
  }

  return await res.json();
};
