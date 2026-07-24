import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import CitizenDashboard from './pages/CitizenDashboard.jsx';
import MPDashboard from './pages/MPDashboard.jsx';
import SubmitComplaintPage from './pages/SubmitComplaintPage.jsx';
import AnalyticsPage from './pages/AnalyticsPage.jsx';

// Protected Route wrapper component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    // Redirect based on actual role
    if (user?.role === 'Citizen') {
      return <Navigate to="/citizen-dashboard" replace />;
    } else if (user?.role === 'MP' || user?.role === 'Admin') {
      return <Navigate to="/mp-dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Citizen Routes */}
          <Route
            path="/citizen-dashboard"
            element={
              <ProtectedRoute allowedRoles={['Citizen']}>
                <CitizenDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/submit-complaint"
            element={
              <ProtectedRoute allowedRoles={['Citizen']}>
                <SubmitComplaintPage />
              </ProtectedRoute>
            }
          />

          {/* Protected MP / Admin Routes */}
          <Route
            path="/mp-dashboard"
            element={
              <ProtectedRoute allowedRoles={['MP', 'Admin']}>
                <MPDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute allowedRoles={['MP', 'Admin']}>
                <AnalyticsPage />
              </ProtectedRoute>
            }
          />

          {/* Fallback route redirection */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
