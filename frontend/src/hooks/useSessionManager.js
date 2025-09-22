import { useState, useEffect } from 'react';
import { BACKEND_URL, API_PREFIX } from 'src/config/constants';

export default function useSessionManager() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchSessions = async () => {
    setLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Anda tidak terautentikasi');
        return;
      }

      const res = await fetch(BACKEND_URL + API_PREFIX + '/auth/sessions', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await res.json();

      if (res.ok) {
        setSessions(data.sessions || []);
      } else {
        setError(data.error || data.message || 'Gagal mengambil data session');
      }
    } catch (err) {
      console.error('Fetch sessions error:', err);
      setError('Terjadi kesalahan saat mengambil data session');
    } finally {
      setLoading(false);
    }
  };

  const revokeSession = async (sessionId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Anda tidak terautentikasi');
        return;
      }

      const res = await fetch(BACKEND_URL + API_PREFIX + '/auth/revoke-session', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ session_id: sessionId })
      });

      const data = await res.json();

      if (res.ok) {
        // Remove revoked session from list
        setSessions(prev => prev.filter(session => session.session_id !== sessionId));
      } else {
        setError(data.error || data.message || 'Gagal merevoke session');
      }
    } catch (err) {
      console.error('Revoke session error:', err);
      setError('Terjadi kesalahan saat merevoke session');
    }
  };

  const getCurrentSession = () => {
    const currentSessionId = localStorage.getItem('sessionId');
    return sessions.find(session => session.session_id === currentSessionId);
  };

  const getActiveSessionsCount = () => {
    return sessions.length;
  };

  const formatLastActivity = (lastActivity) => {
    if (!lastActivity) return 'Unknown';
    
    try {
      const date = new Date(lastActivity);
      const now = new Date();
      const diff = now - date;
      
      const minutes = Math.floor(diff / (1000 * 60));
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      
      if (minutes < 1) return 'Just now';
      if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
      if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } catch (err) {
      return 'Unknown';
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  return {
    sessions,
    loading,
    error,
    fetchSessions,
    revokeSession,
    getCurrentSession,
    getActiveSessionsCount,
    formatLastActivity
  };
}
