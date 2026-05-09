import React, { ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthProvider';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) return null;
  if (!user) return <Navigate to="/login" />;
  
  return <>{children}</>;
}

function AppContent() {
  return (
    <Router>
      <div className="min-h-screen bg-editorial-bg flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </main>
        <footer className="bg-editorial-fg text-white py-12">
          <div className="max-w-7xl mx-auto px-10 flex flex-col items-center text-center">
            <div className="flex flex-col items-center space-y-4">
              <img 
                src="/assets/medi_logo.jpeg" 
                alt="Medicaps Logo" 
                className="w-16 h-16 object-contain rounded-full bg-white p-1"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-1">
                <h4 className="font-serif text-2xl font-black italic tracking-tighter">Medicaps University</h4>
                <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-500">Indore, Madhya Pradesh</p>
              </div>
            </div>
            <div className="border-t border-white/5 mt-10 pt-8 w-full flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.3em] text-gray-600 font-bold">
              <span>© {new Date().getFullYear()} Medicaps Maths Club</span>
              <span className="mt-4 md:mt-0 italic font-serif lowercase tracking-normal text-xs">All Rights Reserved — MMXXIV</span>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
