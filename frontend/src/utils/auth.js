// Authentication utility functions
export const getToken = () => {
  return localStorage.getItem('token');
};

export const getUserInfo = () => {
  const userData = localStorage.getItem('user');
  if (userData) {
    try {
      return JSON.parse(userData);
    } catch (err) {
      console.error('Error parsing user data:', err);
      return null;
    }
  }
  return null;
};

export const getSessionId = () => {
  return localStorage.getItem('sessionId');
};

export const getExpiresIn = () => {
  return localStorage.getItem('expiresIn');
};

export const getLoginTime = () => {
  const loginTime = localStorage.getItem('loginTime');
  return loginTime ? new Date(loginTime) : null;
};

export const isTokenExpired = () => {
  const loginTime = getLoginTime();
  const expiresIn = getExpiresIn();
  
  if (!loginTime || !expiresIn) return true;
  
  const expirationTime = new Date(loginTime.getTime() + parseInt(expiresIn) * 1000);
  return new Date() > expirationTime;
};

export const isAuthenticated = () => {
  const token = getToken();
  return token && !isTokenExpired();
};

export const clearAuthData = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('sessionId');
  localStorage.removeItem('expiresIn');
  localStorage.removeItem('loginTime');
};

export const getAuthHeaders = () => {
  const token = getToken();
  return token ? {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  } : {
    'Content-Type': 'application/json'
  };
};

export const handleAuthError = (error) => {
  if (error.status === 401 || error.status === 403) {
    clearAuthData();
    window.location.href = '/auth/login';
  }
};

export const formatTimeRemaining = () => {
  const loginTime = getLoginTime();
  const expiresIn = getExpiresIn();
  
  if (!loginTime || !expiresIn) return 'Unknown';
  
  const expirationTime = new Date(loginTime.getTime() + parseInt(expiresIn) * 1000);
  const now = new Date();
  const remaining = expirationTime - now;
  
  if (remaining <= 0) return 'Expired';
  
  const hours = Math.floor(remaining / (1000 * 60 * 60));
  const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
};
