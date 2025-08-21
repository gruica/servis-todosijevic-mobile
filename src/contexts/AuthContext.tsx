import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'partner' | 'technician'
  company?: string
  phone?: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Demo korisnici za testiranje
const DEMO_USERS: User[] = [
  {
    id: '1',
    name: 'Marko Petrović',
    email: 'admin@tehnoservis.me',
    role: 'admin',
    company: 'TehnoServis CG',
    phone: '+382 67 123 456'
  },
  {
    id: '2',
    name: 'Ana Nikolić',
    email: 'partner@elektro.me',
    role: 'partner',
    company: 'Elektro Centar',
    phone: '+382 69 987 654'
  },
  {
    id: '3',
    name: 'Stefan Jovanović',
    email: 'serviser@tehno.me',
    role: 'technician',
    company: 'TehnoServis CG',
    phone: '+382 68 555 777'
  }
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Provjeri da li je korisnik već ulogovan
    const savedUser = localStorage.getItem('tehnoservis_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        localStorage.removeItem('tehnoservis_user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    
    // Simulacija API poziva
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const foundUser = DEMO_USERS.find(u => u.email === email)
    
    if (!foundUser || password !== 'demo123') {
      setLoading(false)
      throw new Error('Neispravni podaci za prijavu')
    }

    setUser(foundUser)
    localStorage.setItem('tehnoservis_user', JSON.stringify(foundUser))
    setLoading(false)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('tehnoservis_user')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}