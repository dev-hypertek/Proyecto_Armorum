import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar, { SidebarContext } from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Component from "./pages/Component";
import Forms from "./pages/Forms";
import Tables from "./pages/Tables";
import Notifications from "./pages/Notifications";
import Typography from "./pages/Typography";
import Icons from "./pages/Icons";
import Footer from './pages/Footer';
import { useState } from "react";

// Importar los nuevos componentes de módulos
import ProcesamientoFacturas from "./pages/facturas/ProcesamientoFacturas";
import ValidacionTerceros from "./pages/terceros/ValidacionTerceros";

// Importar providers de contexto
import { FacturasProvider } from "./contexts/FacturasContext";
import { TercerosProvider } from "./contexts/TercerosContext";

const App = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  return (
    <Router>
      {/* Agregar providers para los contextos */}
      <FacturasProvider>
        <TercerosProvider>
          <SidebarContext.Provider value={{ isCollapsed: isSidebarCollapsed, setIsCollapsed: setIsSidebarCollapsed }}>
            <Navbar />
            <Sidebar />
            <div className={`transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'} pt-16`}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/components" element={<Component />} />
                <Route path="/forms" element={<Forms />} />
                <Route path="/tables" element={<Tables />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/typography" element={<Typography />} />
                <Route path="/icons" element={<Icons />} />
                
                {/* Agregar las nuevas rutas */}
                <Route path="/procesamiento-facturas" element={<ProcesamientoFacturas />} />
                <Route path="/validacion-terceros" element={<ValidacionTerceros />} />
              </Routes>
              {/* <Footer/> */}
            </div>
          </SidebarContext.Provider>
        </TercerosProvider>
      </FacturasProvider>
    </Router>
  );
};

export default App;