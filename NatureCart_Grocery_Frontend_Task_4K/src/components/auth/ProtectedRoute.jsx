import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';

export function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();
  const { showToast } = useNotification();
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      showToast('Please sign in to access your account.', 'warning');
    }
  }, [isLoggedIn, showToast]);

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}

export default ProtectedRoute;
