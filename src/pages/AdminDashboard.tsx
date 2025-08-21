import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import AdminLayout from '../components/AdminLayout'
import { 
  BarChart3, 
  Users, 
  Wrench, 
  Calendar, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Clock,
  Euro
} from 'lucide-react'

function AdminOverview() {
  const stats = [
    { name: 'Ukupno servisa', value: '1,247', change: '+12%', icon: Wrench, color: 'bg-blue-500' },
    { name: 'Aktivni serviseri', value: '23', change: '+2', icon: Users, color: 'bg-green-500' },
    { name: 'Mjesečni prihod', value: '€15,420', change: '+8%', icon: Euro, color: 'bg-purple-500' },
    { name: 'Prosječno vrijeme', value: '2.4h', change: '-15min', icon: Clock, color: 'bg-orange-500' }
  ]

  const recentServices = [
    { id: '1', client: 'Marija Popović', device: 'Frižider Beko', status: 'completed', technician: 'Stefan J.', date: '2024-01-15' },
    { id: '2', client: 'Petar Nikolić', device: 'Veš mašina Samsung', status: 'in_progress', technician: 'Ana M.', date: '2024-01-15' },
    { id: '3', client: 'Milica Jovanović', device: 'Sudopera Bosch', status: 'pending', technician: '-', date: '2024-01-14' },
    { id: '4', client: 'Nikola Đurić', device: 'Frižider LG', status: 'completed', technician: 'Marko P.', date: '2024-01-14' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'in_progress': return 'bg-blue-100 text-blue-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Završeno'
      case 'in_progress': return 'U toku'
      case 'pending': return 'Na čekanju'
      default: return status
    }
  }

  return (
    <div className="space-y-6">
      {/* Statistike */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <div className="flex items-center">
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  <span className="ml-2 text-sm font-medium text-green-600">{stat.change}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Grafikon i nedavni servisi */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grafikon */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Servisi po mjesecima</h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {[65, 78, 52, 89, 94, 76, 85, 92, 88, 95, 87, 91].map((height, index) => (
              <div key={index} className="flex-1 bg-blue-500 rounded-t" style={{ height: `${height}%` }} />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            {['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Avg', 'Sep', 'Okt', 'Nov', 'Dec'].map(month => (
              <span key={month}>{month}</span>
            ))}
          </div>
        </div>

        {/* Nedavni servisi */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Nedavni servisi</h3>
          <div className="space-y-4">
            {recentServices.map((service) => (
              <div key={service.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{service.client}</p>
                  <p className="text-sm text-gray-600">{service.device}</p>
                  <p className="text-xs text-gray-500">{service.technician}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(service.status)}`}>
                    {getStatusText(service.status)}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{service.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function AdminServices() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Upravljanje servisima</h2>
      <p className="text-gray-600">Ovdje će biti lista svih servisa sa mogućnostima filtriranja i pretrage.</p>
    </div>
  )
}

function AdminTechnicians() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Upravljanje serviserima</h2>
      <p className="text-gray-600">Ovdje će biti lista svih servisera sa njihovim performansama.</p>
    </div>
  )
}

function AdminReports() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Izvještaji</h2>
      <p className="text-gray-600">Detaljni izvještaji o poslovanju, prihodima i performansama.</p>
    </div>
  )
}

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminOverview />} />
        <Route path="/services" element={<AdminServices />} />
        <Route path="/technicians" element={<AdminTechnicians />} />
        <Route path="/reports" element={<AdminReports />} />
      </Routes>
    </AdminLayout>
  )
}