'use client'
import { useState, useRef, useEffect } from 'react'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onLoginSuccess: () => void
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const userInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setError(false)
      setUsername('')
      setPassword('')
      setTimeout(() => {
        userInputRef.current?.focus()
      }, 100)
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleLogin = () => {
    const ADMIN_USER = 'admin'
    const ADMIN_PASS = 'bah2025'

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      setError(false)
      onLoginSuccess()
    } else {
      setError(true)
      setPassword('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }

  return (
    <div className={`modal-overlay open`} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}>✕</button>
        <h2>Admin <em>Login</em></h2>
        <p>Enter your credentials to access the admin panel.</p>
        
        <div className={`login-error${error ? ' show' : ''}`}>
          Incorrect username or password.
        </div>

        <div className="form-group">
          <label htmlFor="loginUser">Username</label>
          <input
            type="text"
            id="loginUser"
            ref={userInputRef}
            placeholder="admin"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="form-group">
          <label htmlFor="loginPass">Password</label>
          <input
            type="password"
            id="loginPass"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <button className="btn-primary" style={{ width: '100%', marginTop: '0.5rem' }} onClick={handleLogin}>
          Sign In
        </button>
        
        <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--muted)', textAlign: 'center' }}>
          Default: admin / bah2025
        </p>
      </div>
    </div>
  )
}
