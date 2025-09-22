import { useState } from 'react';
import { BACKEND_URL, API_PREFIX } from 'src/config/constants';

export default function useRegister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return 'Password harus minimal 8 karakter';
    }
    if (!hasUpperCase) {
      return 'Password harus mengandung huruf besar';
    }
    if (!hasLowerCase) {
      return 'Password harus mengandung huruf kecil';
    }
    if (!hasDigit) {
      return 'Password harus mengandung angka';
    }
    if (!hasSpecialChar) {
      return 'Password harus mengandung karakter khusus';
    }
    return null;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = async (e, onSuccess) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!name.trim()) {
      setError('Nama diperlukan');
      return;
    }

    if (!username.trim()) {
      setError('Username diperlukan');
      return;
    }

    if (username.length < 3) {
      setError('Username harus minimal 3 karakter');
      return;
    }

    if (!email.trim()) {
      setError('Email diperlukan');
      return;
    }

    if (!validateEmail(email)) {
      setError('Format email tidak valid');
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (password !== confirmPassword) {
      setError('Konfirmasi password tidak cocok');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(BACKEND_URL + API_PREFIX + '/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name.trim(),
          username: username.trim(),
          email: email.trim(),
          password: password
        })
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess('Registrasi berhasil! Silakan login dengan akun yang baru dibuat.');
        // Clear form
        setName('');
        setEmail('');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        
        if (onSuccess) {
          // Redirect to login after 2 seconds
          setTimeout(() => {
            onSuccess('/auth/login');
          }, 2000);
        }
      } else {
        setError(data.error || data.message || 'Registrasi gagal');
      }
    } catch (err) {
      console.error('Register error:', err);
      setError('Terjadi kesalahan saat registrasi');
    } finally {
      setLoading(false);
    }
  };

  return {
    name,
    setName,
    email,
    setEmail,
    username,
    setUsername,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    success,
    loading,
    handleRegister,
    validatePassword
  };
}
