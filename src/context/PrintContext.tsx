import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteProductForPrint,
  getProductsForPrint,
  postProductForPrint,
} from "../api/generator/generatorApi";

interface Producto {
  ID_User: number;
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

const getCurrentProduct = async (ID_User: number) => {
  return await getProductsForPrint(ID_User);
};

const saveProduct = async (newProduct: Producto) => {
  return await postProductForPrint(newProduct);
};

const deleteProducts = async (ID_User: number) => {
  return await deleteProductForPrint(ID_User);
};

export const useProductSync = (ID_User?: any) => {
  const queryClient = useQueryClient();
  const QUERY_KEY = ["currentProduct", ID_User];

  // ---------- GET LISTA ----------
  const {
    data: productlist,
    isLoading,
    isError,
  } = useQuery<Producto[]>({
    queryKey: QUERY_KEY,
    queryFn: () => getCurrentProduct(ID_User as number),
    enabled: !!ID_User,
  });

  // ---------- GUARDAR ----------
  const { mutate: mutateProduct, isPending: isSaving } = useMutation({
    mutationFn: saveProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });

  // ---------- BORRAR ----------
  const { mutate: deleteAll } = useMutation({
    mutationFn: () => deleteProducts(ID_User as number),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });

  return {
    productlist,
    isLoading,
    isError,

    saveProduct: mutateProduct,
    isSaving,

    deleteAll,
  };
};
