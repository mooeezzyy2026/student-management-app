import React, { useState } from 'react';
import axios from 'axios';
import { Lock, User, GraduationCap } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const url = isRegistering 
      ? "http://127.0.0.1:8001/register/" 
      : "http://127.0.0.1:8001/login/";

    // Normalize payload
    const payload = { 
        username: formData.username.trim(), 
        password: formData.password.trim() 
    };

    try {
      const res = await axios.post(url, payload);
      
      // FIX 1: Ensure we handle the role correctly
      const role = res.data.role;
      const user = res.data.user;

      // FIX 2: Objects must be stringified before saving to LocalStorage
      localStorage.setItem("role", role);
      localStorage.setItem("user", typeof user === 'object' ? JSON.stringify(user) : user);
      
      // FIX 3: Pass the role directly to App.js so it updates immediately
      onLogin(role);

    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      alert("Login failed. Check your username/password or ensure Django is running on port 8001.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-10 border border-slate-100">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-4 bg-indigo-600 rounded-3xl shadow-lg mb-6 text-white">
            <GraduationCap size={40} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            {isRegistering ? 'CREATE ACCOUNT' : 'WELCOME BACK'}
          </h2>
          <p className="text-slate-400 font-medium mt-2">KPK Education Management System</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Username"
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-[0.98] transition-all"
          >
            {isRegistering ? 'Register Now' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-indigo-600 font-bold text-sm hover:underline"
          >
            {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;