import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../components/Layouts/MainLayout';
import ProtectedRoute from "./ProtectedRoute";

import ProductsPage from '../pages/oc/ProductsPage/ProductsPage';
import AuthPage from '../pages/authpage/AuthPage';
import AuthLayout from '../components/Layouts/LoginLayout';
import SmartPickPage from '../pages/smartpick/SmartPick/SmartPickPage';
import SmartPickLayout from '../components/Layouts/SmartPickLayout';
import SmartHomePage from '../pages/smartpick/SmartHome/SmartHomePage';
import SmartListPage from '../pages/smartpick/SmartList/SmartListPage';
import InventoryPage from '../pages/generators/inventory/InventoryPage/InventoryPage';
import HomePage from '../pages/generators/home/HomePage';
import GeneratorLayout from '../components/Layouts/GeneratorLayout';
import QrGeneratorPage from '../pages/generators/qr/QrGeneratorpage/QrGeneratorPage';
import OcHomePage from '../pages/oc/OcHome/OcHomePage';

const AppRoutes = () => {

  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="login" element={<AuthPage />} />
      </Route>


      {/* Rutas protegidas */}
      <Route element={<ProtectedRoute />}>
        {/* OC / POS */}
        <Route path="/oc" element={<MainLayout />} >
          <Route index element={<OcHomePage />} />
          <Route path="orden" element={<ProductsPage />} />
        </Route>
        <Route path="/pos" element={<MainLayout />}>
          <Route index element={<ProductsPage />} />
        </Route>

        {/* SmartPick */}
        <Route path="/smartpick" element={<SmartPickLayout />}>
          <Route index element={<SmartHomePage />} />
          <Route path="pick" element={<SmartPickPage />} />
          <Route path="pick/:tranid" element={<SmartPickPage />} />
          <Route path="list" element={<SmartListPage />} />
        </Route>

        {/* Generator */}
        <Route path="/generator" element={<GeneratorLayout />}>
          <Route index element={<HomePage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="qr" element={<QrGeneratorPage />} />
        </Route>
      </Route>

      {/* Redirección */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default AppRoutes;