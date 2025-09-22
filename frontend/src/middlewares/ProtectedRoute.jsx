import { Navigate } from 'react-router'; // pastikan dari react-router-dom
import { isAuthenticated } from '../utils/auth';

export default function ProtectedRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/auth/login" replace />;
}