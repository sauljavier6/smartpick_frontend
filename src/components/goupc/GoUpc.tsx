import Barcode from "react-barcode";

export default function GoUpc() {
  return (
    <div className="w-full min-h-screen mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex items-center justify-center">
        <div className="w-full max-w-sm">
          <h1 className="text-black text-2xl font-bold mb-4 text-center">
            GoUPC Component
          </h1>

          <input
            type="text"
            placeholder="Ingresar UPCs"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="w-full max-w-xl">
          <div className="flex flex-col items-center">
            <img
              src="/goupc-image.png"
              alt="GoUPC Illustration"
              className="w-full max-w-sm h-auto mb-4"
            />

            <Barcode
              value="016000170032"
              format="UPC"
              width={2}
              height={60}
              displayValue={true}
              background="transparent"
              lineColor="#373737ff"
            />
          </div>
          <h1 className="text-black text-2xl font-bold mb-4 text-center">
            Introduzca número de código de barras:
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Ingresar UPCs"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Go
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
