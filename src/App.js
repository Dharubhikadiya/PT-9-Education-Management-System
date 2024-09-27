import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import AdminDashboard from './components/AdminDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';
import Login from './components/Login';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route 
              path="/admin/*" 
              element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} 
            />
            <Route 
              path="/teacher/*" 
              element={<ProtectedRoute role="teacher"><TeacherDashboard /></ProtectedRoute>} 
            />
            <Route 
              path="/student/*" 
              element={<ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>} 
            />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

function ProtectedRoute({ children, role }) {
  const { userRole } = useAppContext();
  if (userRole !== role) {
    return <Navigate to="/" />;
  }
  return children;
}

export default App;