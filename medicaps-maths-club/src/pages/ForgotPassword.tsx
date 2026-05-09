import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { Mail, CheckCircle, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email');
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
        <div className="text-center mb-10">
          <Link to="/login" className="inline-flex items-center text-[10px] uppercase font-bold tracking-widest text-editorial-fg/40 hover:text-editorial-fg mb-8 transition-colors">
            <ArrowLeft className="w-3 h-3 mr-2" />
            Back to Portal
          </Link>
          <h2 className="font-serif text-4xl font-bold italic uppercase text-editorial-fg tracking-tight">Recovery</h2>
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-editorial-fg/40 mt-2">Restore member access</p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-editorial-accent/5 border-l-2 border-editorial-accent text-editorial-accent text-[10px] uppercase font-bold tracking-widest">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-8 p-4 bg-green-50 border-l-2 border-green-500 text-green-700 text-[10px] uppercase font-bold tracking-widest">
            Check your inbox for reset link.
          </div>
        )}

        {!success ? (
          <form className="space-y-8" onSubmit={handleReset}>
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

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-editorial-fg text-white py-4 text-[10px] font-bold uppercase tracking-[0.3em] shadow-xl shadow-editorial-fg/20 hover:bg-editorial-accent transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin h-4 w-4 mx-auto" /> : 'Request Reset'}
            </button>
          </form>
        ) : (
          <div className="text-center pt-4">
             <Link to="/login" className="inline-block bg-editorial-fg text-white px-10 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-900 transition-all">
               Return to Portal
             </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}
