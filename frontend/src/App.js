import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserPlus, Trash2, Edit3, GraduationCap, Search, LogOut, Users } from 'lucide-react';
import './index.css';
import Login from './Login';

const BASE_URL = "http://127.0.0.1:8000";

const kpkDistricts = [
  "Abbottabad", "Bajaur", "Bannu", "Battagram", "Buner", "Charsadda", 
  "Chitral", "Dera Ismail Khan", "Hangu", "Haripur", "Karak", "Khaibar", 
  "Kohat", "Kohistan", "Kurram", "Lakki Marwat", "Lower Dir", "Malakand", 
  "Mansehra", "Mardan", "Mohmand", "North Waziristan", "Nowshera", 
  "Orakzai", "Peshawar", "Shangla", "South Waziristan", "Swabi", 
  "Swat", "Tank", "Upper Dir"
];

const TeacherDashboard = ({ teachers, subjects }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {teachers.length === 0 ? (
        <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300">
          <p className="text-slate-400 font-medium">No teachers found in database.</p>
        </div>
      ) : (
        teachers.map((teacher) => (
          <div key={teacher.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="bg-indigo-600 p-4">
              <h3 className="text-white font-bold text-lg">{teacher.name}</h3>
              <p className="text-indigo-100 text-sm">{teacher.specialization}</p>
            </div>
            <div className="p-4">
              <p className="text-xs font-bold text-slate-400 uppercase mb-2 tracking-widest">Assigned Subjects</p>
              <div className="flex flex-wrap gap-2">
                {subjects && subjects.filter(sub => sub.teacher === teacher.id).length > 0 ? (
                  subjects.filter(sub => sub.teacher === teacher.id).map(sub => (
                    <span key={sub.id} className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-bold uppercase">
                      {sub.name}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-400 text-xs italic">No subjects assigned</span>
                )}
              </div>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
               <span className="text-[10px] text-slate-500 font-medium">{teacher.email}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

function App() {
  const [activeTab, setActiveTab] = useState('students');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [form, setForm] = useState({ name: '', father_name: '', dob: '', domocile: '', city: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchData = async () => {
    try {
        const [studRes, teachRes, subRes] = await Promise.all([
            axios.get(`${BASE_URL}/students/`),
            axios.get(`${BASE_URL}/teachers/`),
            axios.get(`${BASE_URL}/subjects/`)
        ]);
        setStudents(studRes.data);
        setTeachers(teachRes.data);
        setSubjects(subRes.data);
    } catch (error) {
        console.error("Backend connection failed", error);
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
        setIsLoggedIn(true);
        fetchData();
    }
  }, []);

  const filteredStudents = students.filter(s => 
    (s.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.city || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const saveStudent = async (e) => {
    e.preventDefault();
    const birthDate = new Date(form.dob);
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const dataToSend = { ...form, age: calculatedAge };
    
    try {
      if (editingId) {
        await axios.put(`${BASE_URL}/students/${editingId}/`, dataToSend);
        setEditingId(null);
      } else {
        await axios.post(`${BASE_URL}/students/`, dataToSend);
      }
      fetchData();
      setForm({ name: '', father_name: '', dob: '', domocile: '', city: '' });
    } catch (error) { alert("Save failed."); }
  };

  const deleteStudent = async (id) => {
    if (window.confirm("Delete record?")) {
      await axios.delete(`${BASE_URL}/students/${id}/`);
      fetchData();
    }
  };

  if (!isLoggedIn) return <Login onLogin={(val) => { setIsLoggedIn(val); fetchData(); }} />;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Navigation Tabs */}
        <div className="flex justify-between items-center mb-8">
            <div className="flex gap-2 bg-white p-1 rounded-2xl shadow-sm border border-slate-100">
                <button 
                  onClick={() => setActiveTab('students')} 
                  className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'students' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400'}`}
                >
                    STUDENTS
                </button>
                <button 
                  onClick={() => setActiveTab('teachers')} 
                  className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'teachers' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400'}`}
                >
                    TEACHERS
                </button>
            </div>
            <button onClick={() => { localStorage.removeItem("user"); setIsLoggedIn(false); }} className="flex items-center gap-2 px-4 py-2 bg-white text-rose-500 rounded-xl font-bold text-xs shadow-sm border border-rose-100">
                <LogOut size={16} /> LOGOUT
            </button>
        </div>

        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-600 rounded-2xl shadow-lg mb-4 text-white">
            {activeTab === 'students' ? <GraduationCap size={40} /> : <Users size={40} />}
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            {activeTab === 'students' ? 'STUDENT ' : 'TEACHER '} 
            <span className="text-indigo-600">PORTAL</span>
          </h1>
        </div>

        {activeTab === 'students' ? (
          <>
            {/* Student Form Section */}
            <div className="bg-white rounded-[2rem] shadow-xl p-8 mb-12 border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
                <UserPlus className="text-indigo-600" /> {editingId ? "Edit Student" : "New Enrollment"}
              </h2>
              <form onSubmit={saveStudent} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 outline-none focus:border-indigo-500" placeholder="Student Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                <input className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 outline-none focus:border-indigo-500" placeholder="Father's Name" value={form.father_name} onChange={e => setForm({...form, father_name: e.target.value})} required />
                <input type="date" className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 outline-none focus:border-indigo-500" value={form.dob} onChange={e => setForm({...form, dob: e.target.value})} required />
                <select className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 outline-none focus:border-indigo-500" value={form.domocile} onChange={e => setForm({...form, domocile: e.target.value})} required>
                    <option value="">Select Domicile</option>
                    {kpkDistricts.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                <input className="md:col-span-2 p-4 rounded-xl border border-slate-200 bg-slate-50/50 outline-none focus:border-indigo-500" placeholder="City" value={form.city} onChange={e => setForm({...form, city: e.target.value})} required />
                <button type="submit" className="md:col-span-2 p-4 bg-indigo-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-indigo-100 active:scale-95 transition-all">
                  {editingId ? "Update Record" : "Save Record"}
                </button>
              </form>
            </div>

            {/* Student Table Section */}
            <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-900 text-white text-xs uppercase">
                        <tr>
                            <th className="p-5 text-left">Student</th>
                            <th className="p-5 text-left">Age</th>
                            <th className="p-5 text-left">Location</th>
                            <th className="p-5 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredStudents.map(s => (
                            <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                                <td className="p-5">
                                    <div className="font-bold text-slate-800">{s.name}</div>
                                    <div className="text-[10px] text-slate-400">S/O {s.father_name}</div>
                                </td>
                                <td className="p-5 text-slate-600 font-medium text-sm">{s.age} yrs</td>
                                <td className="p-5 text-sm">
                                    <div className="font-bold text-slate-700">{s.city}</div>
                                    <div className="text-[10px] text-indigo-500 font-black uppercase tracking-tighter">{s.domocile}</div>
                                </td>
                                <td className="p-5 text-center">
                                    <button onClick={() => {setEditingId(s.id); setForm({...s, dob:''});}} className="p-2 text-amber-500 hover:bg-amber-50 rounded-lg"><Edit3 size={18}/></button>
                                    <button onClick={() => deleteStudent(s.id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg"><Trash2 size={18}/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </>
        ) : (
          <TeacherDashboard teachers={teachers} subjects={subjects} />
        )}
      </div>
    </div>
  );
}

export default App;