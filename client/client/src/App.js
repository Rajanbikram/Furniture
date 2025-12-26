import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/Authcontext';
import { RentalProvider } from './contexts/RentalContext'; 


import ProductsPage from './pages/ProductsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SellerDashboard from './pages/SellerDashboard';
import GuestBrowse from './pages/GuestBrowse';


import RentalHome from './pages/RentalHome';


const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <RentalProvider> {}
        <Router>
          <Routes>
            {}
            <Route path="/" element={<ProductsPage />} />
            <Route path="/browse" element={<GuestBrowse />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {}
            <Route path="/rental" element={<RentalHome />} />
            <Route path="/rental/browse" element={<RentalHome />} />
            
            {}
            <Route
              path="/seller/dashboard"
              element={
                <ProtectedRoute requiredRole="seller">
                  <SellerDashboard />
                </ProtectedRoute>
              }
            />
            
            {}
            <Route
              path="/rental/my-rentals"
              element={
                <ProtectedRoute>
                  <RentalHome />
                </ProtectedRoute>
              }
            />
            
            {}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </RentalProvider> {}
    </AuthProvider>
  );
}

export default App;
"
