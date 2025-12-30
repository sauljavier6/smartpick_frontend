
export const printLabel = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/generator`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code: "1234567890", desc: "Producto prueba" }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error al imprimir');
  }

  return await res.json();
};

export const getOfertas = async (sucursal: string ) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/generator?sucursal=${sucursal}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error al imprimir');
  }

  return await res.json();
};

export const getOfertaByUpc = async (upc: string ) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/generator/upc?upc=${upc}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error al imprimir');
  }

  return await res.json();
};


interface Producto {
  item_code: string;
  DESCRIPCION: string;
  Fecha_Fin: Date;
  Fecha_Ini: Date;
  PRECIO_ESPECIAL: number;
  Precio_Venta: number;
  TIPO_PROMO: string;
  tecla: string;
  upc: string;
  nombreProveedor: string;
}

export const getProductsForPrint = async (ID_User: number ) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/generator/print/products?ID_User=${ID_User}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error al obtener lista de productos');
  }

  return await res.json();
};


export const getprintCenefa = async (ID_User: number ) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/generator/printcenefa/${ID_User}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error al obtener lista de productos');
  }

  return await res;
};

export const getprintPrecio = async (ID_User: number ) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/generator/printprecios/precio/${ID_User}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error al obtener lista de productos');
  }

  return await res;
};

export const postProductForPrint = async (data: Producto ) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/generator/print`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error al guardar el producto');
  }

  return await res.json();
};

export const deleteProductForPrint = async (ID_User: number ) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/generator/productforprint?ID_User=${ID_User}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error al obtener lista de productos');
  }

  return await res.json();
};



//post para mandar items a imprimir

export const postprintCenefabydata = async (Productos: Producto[] ) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/generator/printcenefa/bydata`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ Upc: Productos.map(p => p.upc) }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error');
  }

  return await res;
}; 


export const postprintPreciobydata = async (Productos: Producto[] ) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/generator/printprecio/precio/bydata`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ Upc: Productos.map(p => p.upc) }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error');
  }

  return await res;
};