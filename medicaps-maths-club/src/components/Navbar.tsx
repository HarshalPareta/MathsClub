import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { LogOut, User, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <nav className="bg-editorial-bg border-b border-editorial-fg/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-10">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <img 
                src="https://res.cloudinary.com/dqfrytgl5/image/upload/v1778328897/medi_logo_nkuocv.jpg" 
                alt="Medicaps Logo" 
                className="w-12 h-12 object-contain transition-transform group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <span className="text-editorial-fg font-serif font-black text-2xl tracking-tighter leading-none italic">Medicaps</span>
                <span className="text-editorial-fg/40 text-[10px] uppercase font-bold tracking-widest leading-none mt-1">Maths Club</span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10 text-[10px] uppercase font-bold tracking-[0.2em]">
            <a href="#hero" className="text-editorial-fg hover:opacity-80 transition-all">Home</a>
            <a href="#council" className="text-editorial-fg/50 hover:text-editorial-fg transition-all">Council</a>
            {user ? (
              <div className="flex items-center space-x-8 pl-8 border-l border-editorial-fg/10">
                <div className="flex items-center space-x-2 text-editorial-fg italic font-serif text-sm lowercase">
                  <span>{user.email?.split('@')[0]}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-editorial-accent hover:opacity-80 transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-8 pl-8 border-l border-editorial-fg/10">
                <Link to="/login" className="text-editorial-fg/50 hover:text-editorial-fg">Login</Link>
                <Link
                  to="/register"
                  className="bg-editorial-fg text-white px-6 py-2 rounded-sm transition-all hover:bg-editorial-accent"
                >
                  Join
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-indigo-900 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-4 text-[10px] uppercase font-bold tracking-widest">
          <a href="#hero" onClick={() => setIsOpen(false)} className="block text-gray-600">Home</a>
          <a href="#council" onClick={() => setIsOpen(false)} className="block text-gray-600">Council</a>
          {user ? (
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <div className="text-sm text-gray-500">{user.email}</div>
              <button
                onClick={() => { handleLogout(); setIsOpen(false); }}
                className="w-full text-left text-red-600 font-medium"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <Link to="/login" onClick={() => setIsOpen(false)} className="block text-gray-600 font-medium">Login</Link>
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="block bg-indigo-900 text-white text-center px-4 py-2 rounded-lg font-medium"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
