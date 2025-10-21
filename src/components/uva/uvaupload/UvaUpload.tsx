import { useState, type ChangeEvent, type DragEvent } from "react";
import { Upload, X, CheckCircle } from "lucide-react";
import { postProduct } from "../../../api/uva/uvaApi";
import { useMutation } from '@tanstack/react-query';
import { toast } from "react-toastify";

interface UploadedImage {
  name: string;
  url: string;
  file: File;
}

const UvaUpload = () => {
  const [images1, setImages1] = useState<UploadedImage[]>([]);
  const [dragActive1, setDragActive1] = useState(false);

  const [images2, setImages2] = useState<UploadedImage[]>([]);
  const [dragActive2, setDragActive2] = useState(false);


  const { mutate } = useMutation({
    mutationFn: postProduct,
    onError: (error) => {
        toast.error(`${error.message}`, {
        position: "top-right",
        });
    },
    onSuccess: () => {
      setImages1([])
      setImages2([])
        toast.success("Imagenes cargadas con exito", {
        position: "top-right",
        progressClassName: "custom-progress",
        });
    },
  });

  const handleFiles = (files: FileList, setImages: any, single = false) => {
    const newImages: UploadedImage[] = Array.from(files).map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
      file,
    }));

    if (single) {
      setImages([newImages[0]]);
    } else {
      setImages((prev: UploadedImage[]) => [...prev, ...newImages]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, setImages: any, single = false) => {
    if (!e.target.files || e.target.files.length === 0) return;
    handleFiles(e.target.files, setImages, single);
  };


  const handleDrag = (
    e: DragEvent<HTMLDivElement>,
    setDragActive: any
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (
    e: DragEvent<HTMLDivElement>,
    setDragActive: any,
    setImages: any,
    single = false
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files) handleFiles(e.dataTransfer.files, setImages, single);
  };


  const handleRemove = (name: string, setImages: any) => {
    setImages((prev: UploadedImage[]) => prev.filter((img) => img.name !== name));
  };



  const handleUpload = async () => {
    const allImages = [...images1, ...images2];

    if (allImages.length === 0) return alert("No hay imágenes para subir");

    mutate(allImages)
  };



  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 p-6 rounded-2xl">
      <div className="w-full bg-white rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          📦 Carga de etiquetas UVA
        </h1>
      </div>

      <div className="w-full bg-white shadow-2xl rounded-2xl p-6 mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          className={`border-2 border-dashed rounded-2xl p-8 text-center transition ${
            dragActive1
              ? "border-green-500 bg-green-50"
              : "border-gray-300 hover:border-green-400"
          }`}
          onDragEnter={(e) => handleDrag(e, setDragActive1)}
          onDragOver={(e) => handleDrag(e, setDragActive1)}
          onDragLeave={(e) => handleDrag(e, setDragActive1)}
          onDrop={(e) => handleDrop(e, setDragActive1, setImages1, true)}
        >
          {images1.length > 0 && (
            <div className="grid grid-cols-1 gap-4 mt-4">
              {images1.map((img) => (
                <div
                  key={img.name}
                  className="relative rounded-lg overflow-hidden transition"
                >
                  <img
                    src={img.url}
                    alt={img.name}
                    className="w-full h-auto"
                  />
                  <button
                    onClick={() => handleRemove(img.name, setImages1)}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 shadow"
                  >
                    <X size={14} />
                  </button>
                  <p className="text-xs text-center p-1 truncate">{img.name}</p>
                </div>
              ))}
            </div>
          )}
          {images1.length === 0 && (
          <> 
          <Upload className="mx-auto text-gray-400 mb-3" size={40} />
          <p className="text-gray-700 font-medium mb-2">
            Arrastra tus etiquetas aquí o haz clic para seleccionarlas
          </p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, setImages1, true)}
            className="hidden"
            id="fileInput1"
          />
          <label
            htmlFor="fileInput1"
            className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-700 transition"
          >
            Seleccionar archivos
          </label>
          </>
          )}
        </div>

        <div
          className={`border-2 border-dashed rounded-2xl p-8 text-center transition md:col-span-2 min-h-[400px] ${
            dragActive2
              ? "border-green-500 bg-green-50"
              : "border-gray-300 hover:border-green-400"
          }`}
          onDragEnter={(e) => handleDrag(e, setDragActive2)}
          onDragOver={(e) => handleDrag(e, setDragActive2)}
          onDragLeave={(e) => handleDrag(e, setDragActive2)}
          onDrop={(e) => handleDrop(e, setDragActive2, setImages2)}
        >
          {images2.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 object-cover">
              {images2.map((img) => (
                <div
                  key={img.name}
                  className="relative rounded-lg overflow-hidden transition"
                >
                  <img
                    src={img.url}
                    alt={img.name}
                    className="w-full h-40"
                  />
                  <button
                    onClick={() => handleRemove(img.name, setImages2)}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 shadow"
                  >
                    <X size={14} />
                  </button>
                  <p className="text-xs text-center p-1 truncate">{img.name}</p>
                </div>
              ))}
            </div>
          )}

          <Upload className="mx-auto text-gray-400 mb-3" size={40} />
          <p className="text-gray-700 font-medium mb-2">
            Arrastra tus etiquetas aquí o haz clic para seleccionarlas
          </p>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleFileChange(e, setImages2)}
            className="hidden"
            id="fileInput2"
          />
          <label
            htmlFor="fileInput2"
            className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-700 transition"
          >
            Seleccionar archivos
          </label>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={handleUpload}
          className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition"
        >
          <CheckCircle size={18} />
          Subir imágenes
        </button>
      </div>
    </div>
  );
};

export default UvaUpload;
