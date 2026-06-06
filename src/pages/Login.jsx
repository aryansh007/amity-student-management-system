import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // react-icons use kiya hai
import '../styles/auth.css';

const Login = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Visibility state
  const [error, setError] = useState('');

  const handleLogin = async (email, password, type) => {
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const success = await login(email, password, type);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid credentials for selected role');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="login-parent">
      <div className="login-page">
        <h1>Login</h1>
        {error && <p className="error">{error}</p>}
        <div>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ marginRight: "8px", color: "black" }}>Username</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          
          <div>
            <label style={{ marginRight: "13px", color: "black" }}>Password</label>
            {/* Relative parent taaki icon isi ke andar rhe */}
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                style={{ paddingRight: "16px" }} // Pura text icon ke peeche na chupe
              />
              {/* Yeh rha tumhara ekdum simple, bina border wala icon */}
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                  color: '#666',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </span>
            </div>
          </div>
        </div>
        
        <div className="login-options">
          <button 
            onClick={() => handleLogin(email, password, 'student')}
            disabled={isLoading}
          >
            Login as Student
          </button>
          <button 
            onClick={() => handleLogin(email, password, 'admin')}
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