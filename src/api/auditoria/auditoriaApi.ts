export interface ArticuloAuditoria {
  item_code: string;
  DESCRIPCION: string | null;
  Precio_Venta: number;
  PRECIO_ESPECIAL: number | null;
  PRECIO_FINAL: number;
  TIPO_PROMO: string | null;
  PROMOCION: string | null;
  Fecha_Ini: string | null;
  Fecha_Fin: string | null;
  TIENE_PROMOCION: number;
  tecla: string | null;
  upc: string;
  nombreProveedor: string | null;
}
export interface ArticulosRespuesta {
  data: ArticuloAuditoria[];
  total: number;
  pagina: number;
  limite: number;
}
export async function consultarArticulos(params: { buscar?: string; pagina?: number; limite?: number }): Promise<ArticulosRespuesta> {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') query.set(key, String(value));
  });
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auditoria/articulos?${query}`, { credentials: 'include' });
  if (!response.ok) throw new Error('No se pudieron consultar los artículos');
  return response.json();
}

export async function consultarArticuloExacto(codigo: string): Promise<ArticuloAuditoria | null> {
  const query = new URLSearchParams({ codigo });
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auditoria/articulos/consultar?${query}`, { credentials: 'include' });
  if (!response.ok) throw new Error('No se pudo consultar el precio');
  const resultado: { articulo: ArticuloAuditoria | null } = await response.json();
  return resultado.articulo;
}
