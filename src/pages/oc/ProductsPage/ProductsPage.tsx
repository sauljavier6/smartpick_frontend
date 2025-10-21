import { useEffect, useRef, useState } from "react";
import OrdenCompra from "../../../components/oc/OrdenCompra/OrdenCompra";
import { searchProveedores } from "../../../api/oc/itemApi";

export interface Proveedor {
  iv_vendor: string;
  v_altname: string;
  v_companyname: string;
}

export default function ProductsPage() {
  const [isSearch, setIsSearch] = useState<string>("");
  const [isLeadTime, setIsLeadTime] = useState<number>(0);
  const [idProveedor, setIdProveedor] = useState<string>("");
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (isSearch.trim() && !isSelected) {
      const fetchProduct = async () => {
        try {
          const data = await searchProveedores(isSearch);
          setProveedores(data);
        } catch (error) {
          console.error("Error cargando proveedores:", error);
        }
      };
      fetchProduct();
    } else {
      setProveedores([]);
    }
    setIsSelected(false);
  }, [isSearch]);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setProveedores([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <>
      <div className="p-4 bg-gray-50 rounded-lg flex flex-col gap-2 relative"  ref={wrapperRef}>
        {/* Buscador */}
        <div className="flex gap-5 relative">
          <div className="w-1/3 relative">
            <input
              type="text"
              value={isSearch}
              onChange={(e) => setIsSearch(e.target.value)}
              placeholder="Proveedor"
              className="w-full px-4 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300"
            />

            {proveedores.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto z-50">
                {proveedores.map((prov) => (
                  <div
                    key={prov.iv_vendor}
                    className="p-2 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                    onClick={() => {
                      setIsSearch(prov.v_companyname);
                      setIdProveedor(prov.iv_vendor);
                      setIsSelected(true);
                      setProveedores([]);
                    }}
                  >
                    <p className="font-medium">{prov.v_companyname}</p>
                    <p className="text-sm text-gray-500">{prov.v_altname}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <input
            type="number"
            placeholder="LeadTime"
            value={isLeadTime===0? "": isLeadTime}
            onChange={(e) => setIsLeadTime(Number(e.target.value))}
            className="w-1/3 px-4 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300"
          />
          
          <input
            type="text"
            placeholder="Perioricidad"
            className="w-1/3 px-4 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300"
          />
        </div>
      </div>

      <div className="p-4 bg-gray-50 rounded-lg mt-4">
        <OrdenCompra proveedor={idProveedor} leadtime={isLeadTime} />
      </div>
    </>
  );
}
