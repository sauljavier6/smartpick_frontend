

export const getOrderTraslate = async (idEstado:string, { page = 1, limit = 10 }) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/smartpick/${idEstado}?page=${page}&limit=${limit}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: "include",
  });

  if (!res.ok) throw new Error('Error al buscar ordenes de traslado');
  return await res.json();
};

export const getOrderTraslateWithItems = async (idEstado:string, idpicker:string) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/smartpick/pick/${idEstado}/${idpicker}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: "include",
  });

  if (!res.ok) throw new Error('Error al buscar ordenes de traslado');
  return await res.json(); 
};


export const assignpickerdepartment = async (id:string, idpicker:string, tranid: string) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/smartpick/${id}/${idpicker}/${tranid}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: "include",
  });

  if (!res.ok) throw new Error('Error al asignar departamento');
  return await res.json(); 
};


export const getmyorders = async (idpicker:number) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/smartpick/detallespick/${idpicker}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: "include",
  });

  if (!res.ok) throw new Error('Error al buscar ordenes de traslado');
  return await res.json(); 
};


export const getorderbyid = async (id:string) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/smartpick/buscar/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: "include",
  });

  if (!res.ok) throw new Error('Error al buscar orden de traslado');
  return await res.json(); 
};


export const completeddepartment = async (id:string, idpicker:string, tranid: string, items:any[]) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/smartpick/completeddep/${id}/${idpicker}/${tranid}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: "include",
    body: JSON.stringify({ items }),
  });

  if (!res.ok) throw new Error('Error al completar departamento');
  return await res.json(); 
};