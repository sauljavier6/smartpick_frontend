export const getUvaProducto = async (idProducto: string) => {
  console.log("idProducto", idProducto);
  const res = await fetch(`${import.meta.env.VITE_API_URL}/uva/${idProducto}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) throw new Error("Error al buscar producto");
  return await res.json();
};

export const postProduct = async (allImages: any) => {

  const formData = new FormData();

  allImages.forEach((img:any) => {
    formData.append("Imagenes", img.file);
  });

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/uva`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Error al crear producto");
    }

    const data = await res.json();
    console.log("Producto subido:", data);
  } catch (err) {
    console.error(err);
  }
};
