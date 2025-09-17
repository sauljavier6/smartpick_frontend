

export const getItems = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error al buscar productos');
  }

  return await res.json();
};


export const searchProveedores = async (proveedor: string) => {
  console.log('proveedor en la api',proveedor)
  const res = await fetch(`${import.meta.env.VITE_API_URL}/searshProveedores?proveedor=${proveedor}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error al buscar proveedores');
  }

  return await res.json();
};