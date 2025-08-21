import React from 'react'
import { Wrench } from 'lucide-react'

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent mx-auto mb-4"></div>
        <div className="flex items-center justify-center space-x-2 text-white">
          <Wrench className="h-5 w-5" />
          <span className="text-lg font-medium">TehnoServis CG</span>
        </div>
        <p className="text-blue-100 mt-2">Učitava aplikaciju...</p>
      </div>
    </div>
  )
}