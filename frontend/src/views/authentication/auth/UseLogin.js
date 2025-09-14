import { useState } from 'react';
import { BACKEND_URL, API_PREFIX } from 'src/config/constants';

export default function useLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e, onSuccess) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(BACKEND_URL + API_PREFIX + '/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        if (onSuccess) {
          onSuccess('/dashboard/modern');
        }
      } else {
        setError(data.error || 'Login gagal');
      }
    } catch {
      setError('Login gagal');
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    error,
    handleLogin,
  };
}