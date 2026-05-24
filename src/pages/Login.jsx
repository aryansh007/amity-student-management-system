import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css';

const Login = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (email, password,type) => {
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const success = await login(email, password,type);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid credentials for selected role');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    }
  };
  console.log("hiii login")
  return (
    <div className="login-parent">
    <div className="login-page">
      <h1>Login</h1>
      {error && <p className="error">{error}</p>}
      <div>
        <div style={{marginBottom:"16px"}}>
          <label style={{marginRight:"8px",color:"black"}}>Username</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div>
          <label style={{marginRight:"13px",color:"black"}}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>
      </div>
      <div className="login-options">
        <button 
          onClick={() => handleLogin(email, password,'student')}
          disabled={isLoading}
        >
          Login as Student
        </button>
        <button 
          onClick={() => handleLogin(email, password,'admin')}
          disabled={isLoading}
        >
          Login as Admin
        </button>
      </div>
    </div>
    </div>
  );
};

export default Login;
