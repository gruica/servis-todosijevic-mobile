import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PartnerLayout from '../components/PartnerLayout'
import { Package, TrendingUp, Calendar, FileText } from 'lucide-react'

function PartnerOverview() {
  const stats = [
    { name: 'Moji servisi', value: '156', change: '+23', icon: Package, color: 'bg-blue-500' },
    { name: 'Ovaj mjesec', value: '28', change: '+12%', icon: Calendar, color: 'bg-green-500' },
    { name: 'Prosječna ocjena', value: '4.8', change: '+0.2', icon: TrendingUp, color: 'bg-purple-500' },
    { name: 'Aktivni zahtjevi', value: '7', change: '+3', icon: FileText, color: 'bg-orange-500' }
  ]

  const myServices = [
    { id: '1', device: 'Frižider Beko RNE515E20DW', client: 'Marija Popović', status: 'completed', date: '2024-01-15', price: '€85' },
    { id: '2', device: 'Veš mašina Samsung WW80T4540TE', client: 'Petar Nikolić', status: 'in_progress', date: '2024-01-15', price: '€120' },
    { id: '3', device: 'Sudopera Bosch SMS25AW03E', client: 'Ana Jovanović', status: 'pending', date: '2024-01-14', price: '€95' }
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

      {/* Moji servisi */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">Moji servisi</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Novi zahtjev
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Uređaj
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Klijent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Datum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cijena
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {myServices.map((service) => (
                <tr key={service.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{service.device}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{service.client}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(service.status)}`}>
                      {getStatusText(service.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {service.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {service.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function PartnerServices() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Moji servisi</h2>
      <p className="text-gray-600">Detaljni pregled svih vaših servisa sa mogućnostima filtriranja.</p>
    </div>
  )
}

function PartnerRequests() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Zahtjevi za servis</h2>
      <p className="text-gray-600">Novi zahtjevi za servis koje možete prihvatiti.</p>
    </div>
  )
}

export default function PartnerDashboard() {
  return (
    <PartnerLayout>
      <Routes>
        <Route path="/" element={<PartnerOverview />} />
        <Route path="/services" element={<PartnerServices />} />
        <Route path="/requests" element={<PartnerRequests />} />
      </Routes>
    </PartnerLayout>
  )
}