
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