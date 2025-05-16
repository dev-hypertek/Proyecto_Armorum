import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar, { SidebarContext } from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import { useState } from "react";

// Importar los módulos específicos de Armorum
import ProcesamientoFacturas from "./pages/facturas/ProcesamientoFacturas";
import ValidacionTerceros from "./pages/terceros/ValidacionTerceros";
import HomologacionProductos from "./pages/productos/HomologacionProductos";

// Importar providers de contexto
import { FacturasProvider } from "./contexts/FacturasContext";
import { TercerosProvider } from "./contexts/TercerosContext";
import { ProductosProvider } from "./contexts/ProductosContext";

const App = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  return (
    <Router>
      <FacturasProvider>
        <TercerosProvider>
          <ProductosProvider>
            <SidebarContext.Provider value={{ isCollapsed: isSidebarCollapsed, setIsCollapsed: setIsSidebarCollapsed }}>
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <Sidebar />
              <div className={`transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'} pt-16`}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/procesamiento-facturas" element={<ProcesamientoFacturas />} />
                  <Route path="/validacion-terceros" element={<ValidacionTerceros />} />
                  <Route path="/homologacion-productos" element={<HomologacionProductos />} />
                </Routes>
              </div>
            </div>
          </SidebarContext.Provider>
            </ProductosProvider>
            </TercerosProvider>
            </FacturasProvider>
    </Router>
  );
};

export default App;