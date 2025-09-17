export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      
      {/* Encabezado */}
      <h1 className="text-3xl sm:text-4xl font-bold text-red-600 mb-4 text-center">
        Bienvenido a tu sección de Etiquetas & QR
      </h1>

      {/* Descripción */}
      <p className="text-center text-gray-700 max-w-xl mb-6">
        Aquí puedes generar papeletas de inventario y códigos QR para tus productos. 
        Mantén tu inventario organizado y listo para imprimir o escanear.
      </p>

      {/* Icono decorativo */}
      <div className="text-red-600 text-7xl sm:text-9xl mb-6">
        📦🔲
      </div>

      {/* Mensaje secundario */}
      <p className="text-center text-gray-500 max-w-lg">
        Navega a las secciones correspondientes desde el menú para crear nuevas etiquetas, 
        imprimir papeletas o visualizar tus códigos QR activos.
      </p>
      
    </div>
  );
}
