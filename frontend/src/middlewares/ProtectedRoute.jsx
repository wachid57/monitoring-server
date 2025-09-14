import { Navigate } from 'react-router'; // pastikan dari react-router-dom

const isAuthenticated = () => {
  // Contoh: cek token di localStorage
  return !!localStorage.getItem("token");
};

export default function ProtectedRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/auth/login" replace />;
}