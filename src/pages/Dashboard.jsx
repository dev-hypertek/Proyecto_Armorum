import React from 'react'
import { Link } from 'react-router-dom'
import Charts from '../components/Dashboard/Charts'
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
    ['No_Encontrado', 'Inconsistente'].includes(exc.estadoValidacion)
  ).length;

  // Tarjetas de estadísticas
  const statCards = [
    {
      title: "Lotes Procesados",
      value: totalLotes,
      subtitle: `${lotesCompletados} completados`,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: "blue",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600"
    },
    {
      title: "Excepciones DIAN",
      value: excepciones.length,
      subtitle: `${excepcionesPendientes} pendientes`,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "yellow",
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-600"
    },
    {
      title: "Con Errores",
      value: lotesConError,
      subtitle: "Requieren revisión",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "red",
      bgColor: "bg-red-50",
      iconColor: "text-red-600"
    },
    {
      title: "En Procesamiento",
      value: lotesEnProceso,
      subtitle: "Activos ahora",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      color: "green",
      bgColor: "bg-green-50",
      iconColor: "text-green-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Dashboard Armorum
            </h1>
            <p className="text-xl text-gray-600">
              Plataforma de Registro de Facturas BMC
            </p>
          </div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{card.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{card.subtitle}</p>
                </div>
                <div className={`${card.bgColor} p-3 rounded-full`}>
                  <div className={card.iconColor}>
                    {card.icon}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Charts */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Tendencias de Procesamiento</h2>
          <Charts />
        </div>
        
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Acciones Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link 
              to="/procesamiento-facturas" 
              className="group flex items-center p-6 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors"
            >
              <div className="bg-blue-100 group-hover:bg-blue-200 p-4 rounded-full mr-4">
                <RiFileList3Line className="text-blue-600 text-2xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Procesar Facturas</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Cargar archivos y generar plantillas BMC
                </p>
              </div>
            </Link>
            
            <Link 
              to="/validacion-terceros" 
              className="group flex items-center p-6 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors"
            >
              <div className="bg-green-100 group-hover:bg-green-200 p-4 rounded-full mr-4">
                <BsPersonVcardFill className="text-green-600 text-2xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Validar Terceros</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Gestionar excepciones de validación DIAN
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard