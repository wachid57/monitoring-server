import { useState } from 'react';
import { BACKEND_URL, API_PREFIX } from 'src/config/constants';

export default function useLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e, onSuccess) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const res = await fetch(BACKEND_URL + API_PREFIX + '/auth/login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      
      const data = await res.json();
      
      if (res.ok && data.token) {
        // Store enhanced login data
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('sessionId', data.session_id);
        localStorage.setItem('expiresIn', data.expires_in);
        localStorage.setItem('loginTime', new Date().toISOString());
        
        if (onSuccess) {
          onSuccess('/dashboards/modern');
        }
      } else {
        setError(data.error || data.message || 'Login gagal');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Terjadi kesalahan saat login');
    } finally {
      setLoading(false);
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    error,
    loading,
    handleLogin,
  };
}