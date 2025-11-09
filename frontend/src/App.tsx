import { Routes, Route } from 'react-router-dom'
import { LandingPage } from './components/layout/LandingPage'
import { Dashboard } from './components/layout/Dashboard'
import { Header } from './components/layout/Header'
import { Login } from './components/auth/Login'
import { Signup } from './components/auth/Signup'
import { ProtectedRoute } from './components/auth/ProtectedRoute'

function App() {
  const handleAuthSuccess = () => {
    // Handle successful authentication
    console.log('Authentication successful')
  }

  return (
    <div className="bg-background-dark text-[#EAEAEA]">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login onLoginSuccess={handleAuthSuccess} />} />
        <Route path="/signup" element={<Signup onSignupSuccess={handleAuthSuccess} />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <div className="relative min-h-screen w-full flex flex-col items-center overflow-x-hidden p-4 sm:p-6 md:p-8">
              <Header />
              <Dashboard />
            </div>
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  )
}

export default App