import React, { useState } from 'react';
import axios from 'axios';
import { GraduationCap } from 'lucide-react';

function Login({ onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '', email: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Ensure the URL matches your Django server port
    const url = isRegistering ? "http://127.0.0.1:8000/register/" : "http://127.0.0.1:8000/login/";
    
    try {
      const res = await axios.post(url, formData);
      if (isRegistering) {
        alert("Account created! Please sign in.");
        setIsRegistering(false);
      } else {
        // Use res.data.user to match your Django view response
        localStorage.setItem("user", res.data.user);
        onLogin(true);
      }
    } catch (err) {
      // Log the full error to the browser console for debugging
      console.error("Login Error:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Something went wrong. Check credentials or server.");
    }
  };

  return (
    <div className="min-h-screen bg-[#e9ecef] flex flex-col items-center justify-center font-sans">
      <div className="mb-6 flex items-center gap-2">
         <GraduationCap className="text-indigo-600" size={40} />
         <span className="text-3xl font-light text-slate-800">Admin</span>
         <span className="text-3xl font-black text-slate-900 tracking-tighter">LTE</span>
      </div>

      <div className="w-full max-w-md px-4">
        <div className="bg-white rounded-lg shadow-lg border-t-4 border-indigo-600 p-8">
          <p className="text-center text-slate-600 font-medium mb-8">
            {isRegistering ? "Register a new membership" : "Sign in to start your session"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input 
                type="text" placeholder="Username" required
                className="w-full pl-4 pr-12 py-3 border border-slate-200 rounded outline-none focus:border-indigo-500"
                onChange={(e) => setFormData({...formData, username: e.target.value})}
              />
            </div>

            {isRegistering && (
              <div className="relative">
                <input 
                  type="email" placeholder="Email" required
                  className="w-full pl-4 pr-12 py-3 border border-slate-200 rounded outline-none focus:border-indigo-500"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            )}

            <div className="relative">
              <input 
                type="password" placeholder="Password" required
                className="w-full pl-4 pr-12 py-3 border border-slate-200 rounded outline-none focus:border-indigo-500"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded shadow-md hover:bg-indigo-700 transition-all">
              {isRegistering ? "REGISTER" : "SIGN IN"}
            </button>
          </form>

          <button 
            onClick={() => setIsRegistering(!isRegistering)}
            className="mt-6 text-sm text-indigo-600 hover:underline w-full text-center"
          >
            {isRegistering ? "Already have a membership?" : "Register a new membership"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;