import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Login from './modules/Auth/Login';
import {
  MessCommiteeMeeting,
  TokenAllocation,
  Poll,
  Volunteers,
  Feedback,
  Complaint,
  MenuProcessing
} from './modules';
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('student'); // 'student', 'caretaker', 'warden'

  // Check for existing session
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedRole = localStorage.getItem('userRole');

    if (storedAuth === 'true') {
      setIsAuthenticated(true);
      if (storedRole) {
        setUserRole(storedRole);
      }
    }
  }, []);

  const handleLogin = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userRole', role);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('student');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/mess-committee" replace /> : <Login onLogin={handleLogin} />
        } />

        {/* Protected Routes */}
        <Route path="/*" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Layout userRole={userRole} onLogout={handleLogout}>
              <Routes>
                <Route path="/" element={<Navigate to="/mess-committee" replace />} />
                <Route path="/mess-committee" element={<MessCommiteeMeeting />} />
                <Route path="/token-allocation" element={<TokenAllocation />} />
                <Route path="/poll" element={<Poll />} />
                <Route path="/volunteers" element={<Volunteers />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/complaint" element={<Complaint />} />
                <Route path="/menu-processing" element={<MenuProcessing />} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
