import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { Mail, Lock, User, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName });
      
      // Save user to Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        uid: userCredential.user.uid,
        email,
        displayName,
        role: 'member',
        joinedAt: serverTimestamp()
      });

      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to register');
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
          <h2 className="font-serif text-4xl font-bold italic uppercase text-editorial-fg tracking-tight">Register</h2>
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-editorial-fg/40">Apply for the Club</p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-editorial-accent/5 border-l-2 border-editorial-accent text-editorial-accent text-[10px] uppercase font-bold tracking-widest leading-loose">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleRegister}>
          <div className="space-y-6">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold tracking-widest text-editorial-fg/60">Full Name</label>
              <input
                type="text"
                required
                className="w-full bg-editorial-bg border-b border-editorial-fg/20 py-3 px-4 focus:outline-none focus:border-editorial-accent text-sm transition-all rounded-none"
                placeholder="Marcus Thorne"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>

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
              <label className="text-[10px] uppercase font-bold tracking-widest text-editorial-fg/60">Password</label>
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
            className="w-full bg-editorial-fg text-white py-4 mt-8 text-[10px] font-bold uppercase tracking-[0.3em] shadow-xl shadow-editorial-fg/20 hover:bg-editorial-accent transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin h-4 w-4 mx-auto" /> : 'Create Identity'}
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-editorial-fg/5 text-center">
          <p className="text-[10px] opacity-40 uppercase tracking-widest mb-4 font-bold">Already part of the Club?</p>
          <Link to="/login" className="text-[10px] font-bold uppercase tracking-widest border-b border-editorial-fg hover:text-editorial-accent hover:border-editorial-accent transition-all">
             Sign In to Portal
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
