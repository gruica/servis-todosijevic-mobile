import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import TechnicianLayout from '../components/TechnicianLayout'
import { 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Phone, 
  Navigation,
  Camera,
  FileText,
  Wrench
} from 'lucide-react'

function TechnicianHome() {
  const [currentService, setCurrentService] = useState({
    id: '1',
    client: 'Marija Popović',
    phone: '+382 67 123 456',
    address: 'Njegoševa 15, Podgorica',
    device: 'Frižider Beko RNE515E20DW',
    issue: 'Ne hladi dovoljno, čujan je neobičan zvuk',
    priority: 'high',
    scheduledTime: '14:30',
    status: 'on_way'
  })

  const todayServices = [
    { id: '1', client: 'Marija Popović', time: '14:30', device: 'Frižider Beko', status: 'on_way', address: 'Njegoševa 15' },
    { id: '2', client: 'Petar Nikolić', time: '16:00', device: 'Veš mašina Samsung', status: 'scheduled', address: 'Bulevar Sv. Petra 22' },
    { id: '3', client: 'Ana Jovanović', time: '17:30', device: 'Sudopera Bosch', status: 'scheduled', address: 'Moskovska 8' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on_way': return 'bg-blue-100 text-blue-800'
      case 'in_progress': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'scheduled': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'on_way': return 'Na putu'
      case 'in_progress': return 'U toku'
      case 'completed': return 'Završeno'
      case 'scheduled': return 'Zakazano'
      default: return status
    }
  }

  return (
    <div className="space-y-4">
      {/* Trenutni servis */}
      <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Trenutni servis</h2>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(currentService.status)}`}>
            {getStatusText(currentService.status)}
          </span>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold">MP</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">{currentService.client}</p>
              <p className="text-sm text-gray-600">{currentService.device}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-gray-600">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{currentService.address}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-gray-600">
            <Clock className="h-4 w-4" />
            <span className="text-sm">Zakazano za {currentService.scheduledTime}</span>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-700">
              <strong>Problem:</strong> {currentService.issue}
            </p>
          </div>
          
          <div className="flex space-x-2 pt-2">
            <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>Pozovi</span>
            </button>
            <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
              <Navigation className="h-4 w-4" />
              <span>Navigacija</span>
            </button>
            <button className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors">
              <Wrench className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Današnji servisi */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Današnji servisi</h3>
        <div className="space-y-3">
          {todayServices.map((service) => (
            <div key={service.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">
                    {service.client.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{service.client}</p>
                  <p className="text-sm text-gray-600">{service.device}</p>
                  <p className="text-xs text-gray-500">{service.address}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{service.time}</p>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(service.status)}`}>
                  {getStatusText(service.status)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Brze akcije */}
      <div className="grid grid-cols-2 gap-4">
        <button className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
          <Camera className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <p className="text-sm font-medium text-gray-900">Fotografiši</p>
        </button>
        <button className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
          <FileText className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <p className="text-sm font-medium text-gray-900">Izvještaj</p>
        </button>
      </div>
    </div>
  )
}

function TechnicianServices() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Moji servisi</h2>
      <p className="text-gray-600">Pregled svih dodijeljenih servisa.</p>
    </div>
  )
}

function TechnicianReports() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Izvještaji</h2>
      <p className="text-gray-600">Kreiranje i pregled izvještaja o obavljenim servisima.</p>
    </div>
  )
}

export default function TechnicianApp() {
  return (
    <TechnicianLayout>
      <Routes>
        <Route path="/" element={<TechnicianHome />} />
        <Route path="/services" element={<TechnicianServices />} />
        <Route path="/reports" element={<TechnicianReports />} />
      </Routes>
    </TechnicianLayout>
  )
}