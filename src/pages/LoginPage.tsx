import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Wrench, Shield, Users, Smartphone } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Greška pri prijavi')
    } finally {
      setLoading(false)
    }
  }

  const demoAccounts = [
    { email: 'admin@tehnoservis.me', role: 'Administrator', icon: Shield, color: 'bg-red-500' },
    { email: 'partner@elektro.me', role: 'Poslovni partner', icon: Users, color: 'bg-blue-500' },
    { email: 'serviser@tehno.me', role: 'Serviser', icon: Wrench, color: 'bg-green-500' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Logo i naslov */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-white rounded-full flex items-center justify-center mb-4">
            <Wrench className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">TehnoServis CG</h1>
          <p className="text-blue-100">Profesionalni servis bijele tehnike</p>
        </div>

        {/* Login forma */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email adresa
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="vaš@email.me"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Lozinka
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Prijavljivanje...' : 'Prijavite se'}
            </button>
          </form>

          {/* Demo računi */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-4 text-center">Demo računi za testiranje:</p>
            <div className="space-y-2">
              {demoAccounts.map((account) => (
                <button
                  key={account.email}
                  onClick={() => {
                    setEmail(account.email)
                    setPassword('demo123')
                  }}
                  className="w-full flex items-center space-x-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors text-left"
                >
                  <div className={`p-2 rounded-full ${account.color}`}>
                    <account.icon className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{account.role}</div>
                    <div className="text-sm text-gray-500">{account.email}</div>
                  </div>
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
              Lozinka za sve demo račune: <code className="bg-gray-100 px-1 rounded">demo123</code>
            </p>
          </div>
        </div>

        {/* Mobilna aplikacija info */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
          <Smartphone className="h-6 w-6 text-white mx-auto mb-2" />
          <p className="text-white text-sm">
            Serviseri koriste mobilnu aplikaciju za rad na terenu
          </p>
        </div>
      </div>
    </div>
  )
}