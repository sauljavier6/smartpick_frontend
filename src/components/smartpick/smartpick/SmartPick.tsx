// components/PickingList.tsx
import { useEffect, useState } from "react";
import { assignpickerdepartment, completeddepartment, getOrderTraslateWithItems } from "../../../api/smartpick/orderTraslateApi";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

interface orden {
  tranid: number;
  trandate: string;
  transferlocation: string;
  useitemcostastransfercost: string;
  firmed: string;
  Completed?: string
}

interface item {
  item: string;
  memo: string;
  quantity: number;
  upccode: string;
  departamento: string;
  categoria: string;
  custitem_nso_codigo_citadel: string;
}

interface departamentoproducto {
  iddepartamento: string;
  departamento: string;
}


export default function SmartPick() {
  const [orden, setorden] = useState<orden>();
  const [items, setitems] = useState<item[]>([]);
  const [departamento, setDepartamento] = useState<departamentoproducto[]>([]);
  const [recolectados, setRecolectados] = useState<item[]>([]);
  const [selectedDep, setSelectedDep] = useState("");
  const [saltados, setSaltados] = useState<item[]>([]);
  const [listaSaltados, setListaSaltados] = useState<item[]>([]);
  const { tranid } = useParams<{ tranid: string }>();
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentItemModal, setCurrentItemModal] = useState<item | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(saltados.length / itemsPerPage);
  const paginatedItems = saltados.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

    useEffect(() => {
      setListaSaltados([...saltados]);
    }, [saltados]);

    const fetchProduct = async () => {
      if (!tranid) return;

      if (!user?.ID_User) {
        console.error("Faltan datos de usuario");
        return;
      }

      try {
        setLoading(true);

        const data = await getOrderTraslateWithItems(tranid, user.ID_User);
        console.log('data',data)
        setorden(data?.data || null);
        setDepartamento(data?.departamento || []);

      } catch (error) {
        console.error("Error cargando orden de traslado:", error);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      if (tranid && user?.ID_User) {
        fetchProduct();
      }
    }, [tranid, user]);



    const [index, setIndex] = useState(0);
    const [isReviewingSaltados, setIsReviewingSaltados] = useState(false);

    const handleRecolectar = () => {
      const item = !isReviewingSaltados ? items[index] : saltados[index];
      setCurrentItemModal(item);
      setModalOpen(true);
    };

    const handleSaltar = () => {
      if (!isReviewingSaltados) {
        setSaltados((prev) => [...prev, items[index]]);
        avanzar(items, setIsReviewingSaltados, saltados.length);
      } else {
        avanzar(saltados, setIsReviewingSaltados, 0);
      }
    };

    const avanzar = (
      lista: item[],
      setReviewing: React.Dispatch<React.SetStateAction<boolean>>,
      saltadosCount: number
    ) => {
      setIndex((prev) => {
        if (prev + 1 < lista.length) {
          return prev + 1;
        } else {
          if (!isReviewingSaltados && saltadosCount > 0) {
            setReviewing(true);
            return 0;
          }
          return prev;
        }
      });
    };

    const currentItem = !isReviewingSaltados ? items[index] : saltados[index];


    const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
      const depId = e.target.value;
      setSelectedDep(depId);

      const confirmado = window.confirm(`¿Está seguro de tomar el departamento?`);
      if (!confirmado) return;

      if (!user?.ID_User || !orden?.tranid) {
        console.error("Faltan datos para asignar picker");
        return;
      }

      try {
        const dep = await assignpickerdepartment(depId, user.ID_User, orden.tranid.toString());
        console.log('dep',dep)
        setitems(dep.items)
        alert(`Departamento asignado`);
      } catch (error) {
        console.error(error);
        alert("No se pudo asignar el picker");
      }
    };


    const confirmarStock = (isSameStock: boolean) => {
      if (currentItemModal) {
        if (isSameStock) {
          setRecolectados((prev) => [...prev, currentItemModal]);
        } else {
          
          setRecolectados((prev) => [...prev, { ...currentItemModal, stockDiferente: true }]);
        }

        if (!isReviewingSaltados) {
          avanzar(items, setIsReviewingSaltados, saltados.length);
        } else {
          avanzar(saltados, setIsReviewingSaltados, 0);
        }
      }

      setModalOpen(false);
      setCurrentItemModal(null);
    };

    const handleCompletarDepartamento = async () => {
      if (!user?.ID_User || !orden?.tranid) {
        console.error("Faltan datos para completar");
        return;
      }

      try {
        const confirmado = window.confirm(`¿Está seguro de completar el departamento?`);
        if (!confirmado) return;
        const data = await completeddepartment(selectedDep, user.ID_User, orden.tranid.toString(), recolectados);
        console.log(data)
        setitems([])
        setRecolectados([])
        setSelectedDep('')
        setSaltados([])
        setDepartamento((prev) => prev.filter((dep) => dep.iddepartamento !== selectedDep));
        setCurrentItemModal(null)
        await fetchProduct();
        alert(`Departamento completado`);
      } catch (error) {
        console.error(error);
        alert("No se pudo completar");
      }
    };

  const handleImprimir = (tranid: string) => {
    window.open(`${import.meta.env.VITE_API_URL}/smartpick/pdf/${tranid}`, "_blank");
  };

  const handleExcel = (tranid: string) => {
    window.open(`${import.meta.env.VITE_API_URL}/smartpick/excel/${tranid}`, "_blank");
  };


    
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 flex justify-center items-center">
        <p className="text-gray-600 text-lg">Cargando orden...</p>
      </div>
    );
  }

  return (
    <>
    <div className="flex flex-col gap-2">
    <div className="bg-white rounded-xl shadow-md p-4 overflow-x-auto">
    <select
      name="departamento"
      id="departamento"
      value={selectedDep}
      onChange={handleChange}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-700 dark:border-red-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
    >
      <option value="" disabled hidden>Selecciona un departamento</option>
      {departamento?.map((dep) => (
        <option key={dep.iddepartamento} value={dep.iddepartamento}>
          {dep.departamento}
        </option>
      ))}
    </select>
    </div>

    <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
      <h1 className="text-xl font-bold text-gray-800"># Orden: {orden?.tranid}</h1>
      
      <div className="text-sm text-gray-600 space-y-1">
        <p>
          <span className="font-semibold">Fecha:</span>{" "}
          {orden?.trandate &&
            new Date(orden.trandate).toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
        </p>
        <p>
          <span className="font-semibold">Sucursal:</span> {orden?.transferlocation}
        </p>
      </div>

      <div>
        <p className="text-sm text-gray-600 mb-2">
          Progreso: {recolectados.length} de {items.length} productos recolectados
        </p>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-red-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${(recolectados.length / items.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {orden?.Completed && (
      <> 
      <button
        onClick={() => handleImprimir(tranid!)}
        className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md"
      >
        ✅ Descargar reporte
      </button>
      <button
        onClick={() => handleExcel(tranid!)}
        className="mt-1 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md"
      >
        ✅ Descargar Layout
      </button> 
      </>
      )}
    </div>


    {currentItem ? (
    <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
        <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 sm:w-30 sm:h-30 bg-gray-200 flex items-center justify-center rounded-lg">
            <img
            src="/pedigree.jpg"
            alt="Producto"
            className="max-w-full max-h-full object-contain"
            />
        </div>

        <div className="flex flex-col gap-1">
            <p className="text-gray-600 text-sm sm:text-base">
            Sku: <span className="font-medium">{currentItem.upccode}</span>
            </p>
            <p className="text-gray-600 text-sm sm:text-base">
            Stock: <span className="font-medium">productoActual.cantidad</span>
            </p>
        </div>
        </div>

        <div className="flex flex-col justify-left gap-2 mb-4">
            <p className="text-gray-600 text-sm sm:text-base">
            Productos: <span className="font-medium">{currentItem.memo}</span>
            </p>
            <p className="text-gray-600 text-sm sm:text-base">
            Ubicación: <span className="font-medium">{currentItem.departamento}/{currentItem.categoria}</span>
            </p>
            <p className="text-gray-600 text-sm sm:text-base">
            Cantidad: <span className="font-medium">{currentItem.quantity}</span>
            </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleSaltar}
              disabled={items.length === 1 || isReviewingSaltados || recolectados.length === items.length}
              className={`
                flex-1 py-3 px-4 rounded-xl shadow text-sm sm:text-base
                ${items.length === 1 || isReviewingSaltados || recolectados.length === items.length
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-500 hover:bg-gray-400 text-white'}
              `}
            >
              Saltar
            </button>
            <button
              onClick={handleRecolectar}
              disabled={recolectados.length >= items.length}
              className={`
                flex-1 py-3 px-4 rounded-xl shadow text-sm sm:text-base transition
                ${recolectados.length >= items.length 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-red-700 hover:bg-red-600 text-white'}
              `}
            >
              Recolectar
            </button>
            <button
              onClick={handleCompletarDepartamento}
              disabled={recolectados.length < items.length}
              className={`
                flex-1 py-3 px-4 rounded-xl shadow text-sm sm:text-base transition
                ${recolectados.length < items.length 
                  ? 'bg-green-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-700 hover:bg-green-600 text-white'}
              `}
            >
              Guardar
            </button>
        </div>
    </div>
    ) : (
      <p className="text-center text-gray-600">¡Todos los items han sido procesados! 🎉</p>
    )}
    {listaSaltados.length > 0 && (
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Productos saltados</h3>

        <div className="space-y-4">
          {paginatedItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md p-4 flex flex-col sm:flex-row gap-4 items-start"
            >
              <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gray-100 flex items-center justify-center rounded-lg">
                <img
                  src="/pedigree.jpg"
                  alt="Producto"
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              <div className="flex-1 flex flex-col gap-1">
                <p className="text-gray-600 text-sm sm:text-base">
                  Sku: <span className="font-medium">{item.upccode}</span>
                </p>
                <p className="text-gray-600 text-sm sm:text-base">
                  Productos: <span className="font-medium">{item.memo}</span>
                </p>
                <p className="text-gray-600 text-sm sm:text-base">
                  Ubicación: <span className="font-medium">{item.departamento}/{item.categoria}</span>
                </p>
                <p className="text-gray-600 text-sm sm:text-base">
                  Cantidad: <span className="font-medium">{item.quantity}</span>
                </p>
              </div>

              <button
                onClick={() => {setListaSaltados(prev => prev.filter(s => s !== item)), handleRecolectar()}}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl font-medium text-sm sm:text-base transition"
              >
                Recolectar
              </button>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            <button
              onClick={() => setPage(prev => Math.max(prev - 1, 0))}
              disabled={page === 0}
              className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              {"<"}
            </button>
            <span className="px-2 py-1 text-gray-700">
              {page + 1} / {totalPages}
            </span>
            <button
              onClick={() => setPage(prev => Math.min(prev + 1, totalPages - 1))}
              disabled={page === totalPages - 1}
              className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              {">"}
            </button>
          </div>
        )}
      </div>
    )}



    </div>
    {modalOpen && currentItemModal && (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white rounded-xl p-6 w-96 text-center shadow-lg">
        <h2 className="text-lg font-bold mb-4">¿El stock es correcto?</h2>
        <p className="mb-2">Producto: {currentItemModal.memo}</p>
        <div className="flex items-center justify-center gap-2 mb-4">
          <label htmlFor="cantidad" className="font-medium">Cantidad:</label>
          <input
            id="cantidad"
            type="number"
            min={0}
            value={currentItemModal.quantity}
            onChange={(e) =>
              setCurrentItemModal({ ...currentItemModal, quantity: Number(e.target.value) })
            }
            className="w-20 text-center border border-gray-300 rounded-lg p-1"
          />
        </div>
        <button
          onClick={() => confirmarStock(true)}
          className="px-6 py-2 bg-red-700 text-white rounded-xl hover:bg-red-600 transition"
        >
          Confirmar
        </button>
      </div>
    </div>
    )}
    </>
  );
}
