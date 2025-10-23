import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../components/Layouts/MainLayout';
import UvaLayout from '../components/Layouts/UvaLayout';
import AuthLayout from '../components/Layouts/LoginLayout';
import GeneratorLayout from '../components/Layouts/GeneratorLayout';
import SabanasLayout from '../components/Layouts/SabanasLayout';

import ProtectedRoute from "./ProtectedRoute";

import ProductsPage from '../pages/oc/ProductsPage/ProductsPage';
import AuthPage from '../pages/authpage/AuthPage';
import SmartPickPage from '../pages/smartpick/SmartPick/SmartPickPage';
import SmartPickLayout from '../components/Layouts/SmartPickLayout';
import SmartHomePage from '../pages/smartpick/SmartHome/SmartHomePage';
import SmartListPage from '../pages/smartpick/SmartList/SmartListPage';
import InventoryPage from '../pages/generators/inventory/InventoryPage/InventoryPage';
import HomePage from '../pages/generators/home/HomePage';
import QrGeneratorPage from '../pages/generators/qr/QrGeneratorpage/QrGeneratorPage';
import OcHomePage from '../pages/oc/OcHome/OcHomePage';
import CenefasPage from '../pages/generators/cenefas/CenefasPage';
import HomePagez from '../pages/Sabanas/homepage/HomePage';
import SabanaTable from '../components/sabana/sabanatable/SabanaTable';
import CedisPage from '../pages/generators/cedis/CedisPage';
import UvaHomePage from '../pages/uva/UvaHome/UvaHomePage';
import UvaPrintPage from '../pages/uva/UvaPrint/UvaPrintPage';
import UvaUploadPage from '../pages/uva/UvaUpload/UvaUploadPage';


const AppRoutes = () => {

  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<AuthPage />} />
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
          <Route path="print" element={<CedisPage />} />
        </Route>

        {/* Generator */}
        <Route path="/generator" element={<GeneratorLayout />}>
          <Route index element={<HomePage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="qr" element={<QrGeneratorPage />} />
          <Route path="cenefas" element={<CenefasPage />} />
        </Route>
 
        {/* Zabanas */}
        <Route path="/sabanas" element={<SabanasLayout />}>
          <Route index element={<HomePagez />} />
          <Route path="sabanas" element={<SabanaTable />} />
        </Route>


        {/* Uva */}
        <Route path="/uva" element={<UvaLayout />}>
          <Route index element={<UvaHomePage />} />
          <Route path="print" element={<UvaPrintPage />} />   
          <Route path="upload" element={<UvaUploadPage />} />   
        </Route>
      </Route>

      {/* Redirección */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default AppRoutes;