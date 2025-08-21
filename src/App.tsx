import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import LoginPage from './pages/LoginPage'
import AdminDashboard from './pages/AdminDashboard'
import PartnerDashboard from './pages/PartnerDashboard'
import TechnicianApp from './pages/TechnicianApp'
import LoadingSpinner from './components/LoadingSpinner'

function AppRoutes() {
  const { user, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  if (!user) {
    return <LoginPage />
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${user.role}`} replace />} />
      <Route 
        path="/admin/*" 
        element={user.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />} 
      />
      <Route 
        path="/partner/*" 
        element={user.role === 'partner' ? <PartnerDashboard /> : <Navigate to="/" />} 
      />
      <Route 
        path="/technician/*" 
        element={user.role === 'technician' ? <TechnicianApp /> : <Navigate to="/" />} 
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <AppRoutes />
      </div>
    </AuthProvider>
  )
}

export default App