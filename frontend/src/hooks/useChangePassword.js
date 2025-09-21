import { useState } from 'react';
import { BACKEND_URL, API_PREFIX } from 'src/config/constants';

export default function useChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
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

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate passwords
    if (!currentPassword) {
      setError('Password saat ini diperlukan');
      return;
    }

    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Konfirmasi password tidak cocok');
      return;
    }

    if (currentPassword === newPassword) {
      setError('Password baru harus berbeda dari password saat ini');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Anda tidak terautentikasi');
        return;
      }

      const res = await fetch(BACKEND_URL + API_PREFIX + '/auth/change-password', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword
        })
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess('Password berhasil diubah');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setError(data.error || data.message || 'Gagal mengubah password');
      }
    } catch (err) {
      console.error('Change password error:', err);
      setError('Terjadi kesalahan saat mengubah password');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    setSuccess('');
  };

  return {
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    success,
    loading,
    handleChangePassword,
    reset,
    validatePassword
  };
}
