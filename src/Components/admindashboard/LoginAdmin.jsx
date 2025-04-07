import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginAdmin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username === 'admin' && password === 'qwerty') {
      navigate('/adminpropertyacess')
    } else {
      setError('Invalid username or password')
    }
  }

  return (
    <div className="container mt-5" 
   
    >
      <div className="row justify-content-center"  style={{
      margin:'8rem 0px',
    }}>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center">Admin Login</h3>
            </div>
            <div className="card-body" style={{
              height:'30vh'
            }}> 
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginAdmin