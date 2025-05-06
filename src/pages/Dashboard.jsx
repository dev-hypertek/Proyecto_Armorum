import React from 'react'
import { Link } from 'react-router-dom'
import Slider from '../components/Dashboard/Slider'
import Balance from '../components/Dashboard/Balance'
import Charts from '../components/Dashboard/Charts'
import TableTaskContainer from '../components/Dashboard/TableTaskContainer'
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai'
import { RiFileList3Line } from 'react-icons/ri'
import { BsPersonVcardFill } from 'react-icons/bs'
import { useFacturas } from '../contexts/FacturasContext'
import { useTerceros } from '../contexts/TercerosContext'

const Dashboard = () => {
  const { lotes } = useFacturas();
  const { excepciones } = useTerceros();
  
  // Calcular estadísticas
  const totalLotes = lotes.length;
  const lotesCompletados = lotes.filter(lote => lote.estado === 'Completado').length;
  const lotesConError = lotes.filter(lote => lote.estado === 'Error').length;
  const lotesEnProceso = lotes.filter(lote => lote.estado === 'Procesando').length;
  
  const excepcionesPendientes = excepciones.filter(exc => 
    ['No Encontrado', 'Inconsistente'].includes(exc.estadoValidacion)
  ).length;

  // Tarjetas de estadísticas
  const statCards = [
    {
      title: "Lotes Procesados",
      value: totalLotes,
      change: lotesCompletados > 0 ? Math.round((lotesCompletados/totalLotes) * 100) : 0,
      changeText: "Completados",
      isPositive: true
    },
    {
      title: "Excepciones DIAN",
      value: excepciones.length,
      change: excepcionesPendientes,
      changeText: "Pendientes",
      isPositive: false
    },
    {
      title: "Errores",
      value: lotesConError,
      change: lotesConError > 0 ? Math.round((lotesConError/totalLotes) * 100) : 0,
      changeText: "De los lotes",
      isPositive: false
    },
    {
      title: "En Procesamiento",
      value: lotesEnProceso,
      change: lotesEnProceso > 0 ? Math.round((lotesEnProceso/totalLotes) * 100) : 0,
      changeText: "En progreso",
      isWarning: true
    }
  ];

  return (
    <div className="mt-4 p-4">
      <div className="px-6 mb-6">
        <h1 className="font-semibold text-2xl">Dashboard Armorum</h1>
        <p className="text-gray-500 text-sm">Plataforma de Registro de Facturas BMC</p>
      </div>
      
      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 px-6">
        {statCards.map((card, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="text-sm text-gray-400">{card.title}</div>
            <div className="text-2xl font-medium">{card.value}</div>
            <div className="flex gap-1 text-xs">
              <div className={`flex items-center ${card.isPositive ? 'text-green-500' : card.isWarning ? 'text-yellow-500' : 'text-red-500'}`}>
                {card.isPositive ? <AiOutlineArrowUp /> : card.isWarning ? '⏱️' : <AiOutlineArrowDown />}
                <span>{card.change}{typeof card.change === 'number' && card.change > 0 && '%'}</span>
              </div>
              <div className="text-gray-400">{card.changeText}</div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Gráficos y estadísticas */}
      <div className="px-6">
        <Charts />
      </div>
      
      {/* Tabla de lotes recientes */}
      <div className="px-6 mt-4">
        <h2 className="font-semibold text-lg mb-2">Lotes Recientes</h2>
        <TableTaskContainer />
      </div>
      
      {/* Accesos rápidos */}
      <div className="mt-8 px-6">
        <h2 className="text-lg font-semibold mb-4">Accesos Rápidos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link to="/procesamiento-facturas" className="flex items-center p-4 bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <RiFileList3Line className="text-blue-600 text-xl" />
            </div>
            <div>
              <h3 className="font-medium">Procesamiento de Facturas</h3>
              <p className="text-sm text-gray-500">Cargue y procese facturas para el registro BMC</p>
            </div>
          </Link>
          
          <Link to="/validacion-terceros" className="flex items-center p-4 bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <BsPersonVcardFill className="text-blue-600 text-xl" />
            </div>
            <div>
              <h3 className="font-medium">Validación de Terceros</h3>
              <p className="text-sm text-gray-500">Gestione excepciones de validación DIAN</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard