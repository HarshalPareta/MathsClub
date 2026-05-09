import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { Mail, Lock, Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-editorial-bg px-4 py-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-md w-full bg-white p-12 border border-editorial-fg/10 shadow-2xl shadow-editorial-fg/5"
      >
        <div className="space-y-2 mb-10">
          <h2 className="font-serif text-4xl font-bold italic uppercase text-editorial-fg tracking-tight">Sign In</h2>
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-editorial-fg/40">Access the Member Portal</p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-editorial-accent/5 border-l-2 border-editorial-accent text-editorial-accent text-[10px] uppercase font-bold tracking-widest leading-loose">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="space-y-6">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold tracking-widest text-editorial-fg/60">Email Address</label>
              <input
                type="email"
                required
                className="w-full bg-editorial-bg border-b border-editorial-fg/20 py-3 px-4 focus:outline-none focus:border-editorial-accent text-sm transition-all rounded-none"
                placeholder="m.thorne@medicaps.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-[10px] uppercase font-bold tracking-widest text-editorial-fg/60">Password</label>
                <Link to="/forgot-password" size="tiny" className="text-[9px] uppercase font-bold text-editorial-fg/40 hover:text-editorial-accent transition-colors">Forgot?</Link>
              </div>
              <input
                type="password"
                required
                className="w-full bg-editorial-bg border-b border-editorial-fg/20 py-3 px-4 focus:outline-none focus:border-editorial-accent text-sm transition-all rounded-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-editorial-accent text-white py-4 mt-8 text-[10px] font-bold uppercase tracking-[0.3em] shadow-xl shadow-editorial-accent/20 hover:bg-neutral-900 transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin h-4 w-4 mx-auto" /> : 'Authenticate'}
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-editorial-fg/5 text-center">
          <p className="text-[10px] opacity-40 uppercase tracking-widest mb-4 font-bold">New to the Club?</p>
          <Link to="/register" className="text-[10px] font-bold uppercase tracking-widest border-b border-editorial-fg hover:text-editorial-accent hover:border-editorial-accent transition-all">
             Apply for Membership
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
