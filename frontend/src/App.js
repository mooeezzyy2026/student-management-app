import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './Login';
import { LogOut, GraduationCap } from 'lucide-react';

const BASE_URL = "http://127.0.0.1:8001";

function App() {
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("role"));
  const [students, setStudents] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/students/`);
      setStudents(res.data);
    } catch (err) {
      console.error("Connection to Django failed", err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) fetchData();
  }, [isLoggedIn]);

  const handleLoginSuccess = (userRole) => {
    setRole(userRole);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setRole(null);
  };

  if (!isLoggedIn) return <Login onLogin={handleLoginSuccess} />;

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <GraduationCap className="text-indigo-600" size={32} />
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">KPK PORTAL</h1>
          </div>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-rose-500 text-white rounded-xl font-bold text-xs hover:bg-rose-600 transition-colors"
          >
            LOGOUT
          </button>
        </div>

        {role === 'teacher' ? (
          <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-slate-100">
            <div className="p-8 bg-indigo-600 text-white">
              <h2 className="text-3xl font-bold">Teacher Dashboard</h2>
              <p className="opacity-80 mt-1">Manage and view all {students.length} registered students.</p>
            </div>
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest border-b">
                <tr>
                  <th className="p-6">Student Name</th>
                  <th className="p-6">Age</th>
                  <th className="p-6">City</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students.map(s => (
                  <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-6 font-bold text-slate-700">{s.name}</td>
                    <td className="p-6 text-slate-500">{s.age} yrs</td>
                    <td className="p-6 text-slate-500">{s.city}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white p-20 rounded-[2rem] shadow-sm text-center border border-slate-100">
            <h2 className="text-3xl font-black text-slate-800">Student Access</h2>
            <p className="text-slate-500 mt-2">Welcome! You are logged in as a student.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;