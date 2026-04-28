// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './index.css';

// const kpkDistricts = [
//   "Abbottabad", "Bajaur", "Bannu", "Battagram", "Buner", "Charsadda", 
//   "Chitral", "Dera Ismail Khan", "Hangu", "Haripur", "Karak", "Khaibar", 
//   "Kohat", "Kohistan", "Kurram", "Lakki Marwat", "Lower Dir", "Malakand", 
//   "Mansehra", "Mardan", "Mohmand", "North Waziristan", "Nowshera", 
//   "Orakzai", "Peshawar", "Shangla", "South Waziristan", "Swabi", 
//   "Swat", "Tank", "Upper Dir"
// ];
// <h1 className="text-5xl font-bold text-red-600 bg-yellow-300">TAILWIND TEST</h1>
// const formStyle = {
//   display: 'grid',
//   gridTemplateColumns: '1fr 1fr', // This creates two columns
//   gap: '15px',
//   padding: '20px',
//   backgroundColor: '#fff',
//   borderRadius: '8px',
//   marginBottom: '20px'
// };
// function App() {
//   const [students, setStudents] = useState([]);
//   // const [form, setForm] = useState({ name: '', age: '', qualifications: '', city: '', district: '' });
//   const [form, setForm] = useState({ 
//   name: '', 
//   father_name:'',
//   dob:'',
//   domocile:"",
//   city: '', 
//   // district: '' 
// });

// const [editingId, setEditingId] = useState(null);

//   const API_URL = "http://127.0.0.1:8000/students";

//   const fetchStudents = async () => {
//     try {
//       const res = await axios.get(API_URL);
//       setStudents(res.data);
//     } catch (err) { console.error("Error fetching data", err); }
//   };

//   useEffect(() => { fetchStudents(); }, []);

  

//   const saveStudent = async (e) => {
//     e.preventDefault();
    
//     // 1. Calculate age from the Date of Birth picker
//     if (!form.dob) {
//       alert("Please select a Date of Birth");
//       return;
//     }
//     const birthDate = new Date(form.dob);
//     const today = new Date();
//     let calculatedAge = today.getFullYear() - birthDate.getFullYear();
//     const m = today.getMonth() - birthDate.getMonth();
//     if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
//         calculatedAge--;
//     }

//     // 2. Prepare the data for the backend
//     const dataToSend = { 
//       name: form.name,
//       father_name: form.father_name,
//       age: calculatedAge, 
//       domocile: form.domocile,
//       city: form.city
//     };

//     try {
//       if (editingId) {
//         // UPDATE: This uses the ID we saved when clicking 'Edit'
//         await axios.put(`${API_URL}/${editingId}/`, dataToSend);
//         setEditingId(null); // Switch back to 'Add' mode
//       } else {
//         // CREATE: This adds a new student
//         await axios.post(`${API_URL}/`, dataToSend);
//       }
      
//       // 3. Refresh list and clear the form
//       fetchStudents();
//       setForm({ name: '', father_name: '', dob: '', domocile: '', city: '' });
//     } catch (error) {
//       console.error("Error saving student:", error);
//       alert("Something went wrong while saving.");
//     }
//   };


  
  
//   const deleteStudent = async (id) => {
//     // Add the / at the end of the URL here!
//     await axios.delete(`${API_URL}/${id}/`); 
//     fetchStudents();
//   };

//   const editStudent = (student) => {
//     setEditingId(student.id);
//     setForm({
//       name: student.name,
//       father_name: student.father_name,
//       dob: student.dob || '', 
//       domocile: student.domocile,
//       city: student.city
//     });
//     window.scrollTo(0, 0); 
//   };

//   return (
//     <div style={{ padding: '40px', fontFamily: 'Arial', maxWidth: '1000px', margin: '0 auto' }}>
//       <h2 style={{ textAlign: 'center', color: '#333' }}>Student Management System</h2>
      
//       <form onSubmit={saveStudent} style={formStyle}>
//         <input placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={inputStyle} />
        
//         <input placeholder="Father's Name" value={form.father_name} onChange={e => setForm({...form, father_name: e.target.value})} style={inputStyle} />

//         <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
//           <label style={{ fontSize: '11px', color: '#666', fontWeight: 'bold' }}>DATE OF BIRTH</label>
//           <input type="date" value={form.dob} onChange={e => setForm({...form, dob: e.target.value})} style={inputStyle} />
//         </div>

//         <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
//           <label style={{ fontSize: '11px', color: '#666', fontWeight: 'bold' }}>DOMICILE (KPK)</label>
//           <select value={form.domocile} onChange={e => setForm({...form, domocile: e.target.value})} style={inputStyle}>
//             <option value="">Select District</option>
//             {kpkDistricts.map(district => (
//               <option key={district} value={district}>{district}</option>
//             ))}
//           </select>
//         </div>

//         {/* <input placeholder="City" value={form.city} onChange={e => setForm({...form, city: e.target.value})} style={inputStyle} /> */}
//         <input  placeholder="City" value={form.city} onChange={e => setForm({...form, city: e.target.value})} style={{ ...inputStyle, gridColumn: 'span 2' }} // This fills the empty gap
// />
//         {/* <input placeholder="District" value={form.district} onChange={e => setForm({...form, district: e.target.value})} style={inputStyle} /> */}
        
//         <button 
//           type="submit" 
//           style={{ 
//             gridColumn: 'span 2', 
//             padding: '12px', 
//             background: editingId ? '#27ae60' : '#4A90E2', // Green if editing, Blue if saving
//             color: 'white', 
//             border: 'none', 
//             borderRadius: '4px', 
//             cursor: 'pointer', 
//             fontSize: '16px', 
//             fontWeight: 'bold' 
//           }}
//         >
//           {editingId ? "Update Student" : "Save Student"}
//         </button>
//       </form>
  
      
     
//       <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 2px 15px rgba(0,0,0,0.1)' }}>
//         <thead>
//           <tr style={{ backgroundColor: '#35495e', color: '#ffffff', textAlign: 'left' }}>
//             <th style={thTdStyle}>Name</th>
//             <th style={thTdStyle}>Father Name</th>
//             <th style={thTdStyle}>Age</th>
//             <th style={thTdStyle}>domocile</th>
//             <th style={thTdStyle}>City</th>
//             {/* <th style={thTdStyle}>District</th> */}
//             <th style={thTdStyle}>Action</th>
//           </tr>
//         </thead>
        
//         <tbody>
//   {students.map((s) => (
//     <tr key={s.id} style={{ borderBottom: '1px solid #ddd' }}>
//       {/* 1. Name Column */}
//       <td style={thTdStyle}>{s.name}</td>
      
//       {/* 2. Father Name Column */}
//       <td style={thTdStyle}>{s.father_name}</td>
      
//       {/* 3. Age Column */}
//       <td style={thTdStyle}>{s.age}</td>
      
//       {/* 4. Domicile Column */}
//       <td style={thTdStyle}>{s.domocile}</td>
      
//       {/* 5. City Column */}
//       <td style={thTdStyle}>{s.city}</td>
      
//       {/* 6. Action Column (Buttons live here) */}
//       <td style={thTdStyle}>
//         <button 
//           onClick={() => editStudent(s)} 
//           style={{ background: '#f39c12', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', marginRight: '5px' }}
//         >
//           Edit
//         </button>
//         <button 
//           onClick={() => deleteStudent(s.id)} 
//           style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
//         >
//           Delete
//         </button>
//       </td>
//     </tr>
//   ))}
// </tbody>
        
//       </table>
//     </div>
//   );
// }

// const inputStyle = { padding: '10px', border: '1px solid #ddd', borderRadius: '4px' };
// const thTdStyle = { padding: '12px 15px' };

// export default App;






import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserPlus, Trash2, Edit3, MapPin, GraduationCap, Calendar, User } from 'lucide-react';
import './index.css';

const kpkDistricts = [
  "Abbottabad", "Bajaur", "Bannu", "Battagram", "Buner", "Charsadda", 
  "Chitral", "Dera Ismail Khan", "Hangu", "Haripur", "Karak", "Khaibar", 
  "Kohat", "Kohistan", "Kurram", "Lakki Marwat", "Lower Dir", "Malakand", 
  "Mansehra", "Mardan", "Mohmand", "North Waziristan", "Nowshera", 
  "Orakzai", "Peshawar", "Shangla", "South Waziristan", "Swabi", 
  "Swat", "Tank", "Upper Dir"
];

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ 
    name: '', 
    father_name: '',
    dob: '',
    domocile: '',
    city: '', 
  });
  const [editingId, setEditingId] = useState(null);

  const API_URL = "http://127.0.0.1:8000/students";

  const fetchStudents = async () => {
    try {
      const res = await axios.get(API_URL);
      setStudents(res.data);
    } catch (err) { 
      console.error("Error fetching data", err); 
    }
  };

  useEffect(() => { 
    fetchStudents(); 
  }, []);

  const saveStudent = async (e) => {
    e.preventDefault();
    if (!form.dob) {
      alert("Please select a Date of Birth");
      return;
    }

    // Age Calculation Logic
    const birthDate = new Date(form.dob);
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
    }

    const dataToSend = { 
      name: form.name,
      father_name: form.father_name,
      age: calculatedAge, 
      domocile: form.domocile,
      city: form.city
    };

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}/`, dataToSend);
        setEditingId(null);
      } else {
        await axios.post(`${API_URL}/`, dataToSend);
      }
      fetchStudents();
      setForm({ name: '', father_name: '', dob: '', domocile: '', city: '' });
    } catch (error) {
      console.error("Error saving student:", error);
      alert("Something went wrong while saving.");
    }
  };

  const deleteStudent = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await axios.delete(`${API_URL}/${id}/`); 
        fetchStudents();
      } catch (err) {
        console.error("Delete failed", err);
      }
    }
  };

  const editStudent = (student) => {
    setEditingId(student.id);
    setForm({
      name: student.name,
      father_name: student.father_name,
      dob: student.dob || '', 
      domocile: student.domocile,
      city: student.city
    });
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200 mb-4 text-white">
            <GraduationCap size={40} />
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">STUDENT <span className="text-indigo-600">PORTAL</span></h1>
          <p className="text-slate-500 font-medium mt-2">Khyber Pakhtunkhwa (KP)</p>
        </div>

        {/* Registration Form Card */}
        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200 border border-slate-100 p-8 mb-12">
          <div className="flex items-center gap-3 mb-8">
            <UserPlus className="text-indigo-600" size={28} />
            <h2 className="text-2xl font-bold text-slate-800">
              {editingId ? "Edit Student Details" : "New Enrollment"}
            </h2>
          </div>

          <form onSubmit={saveStudent} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
              <input 
                className="w-full p-4 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all bg-slate-50/50"
                placeholder="Student Name"
                value={form.name} 
                onChange={e => setForm({...form, name: e.target.value})} 
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Father's Name</label>
              <input 
                className="w-full p-4 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all bg-slate-50/50"
                placeholder="Guardian Name"
                value={form.father_name} 
                onChange={e => setForm({...form, father_name: e.target.value})} 
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Date of Birth</label>
              <input 
                type="date"
                className="w-full p-4 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all bg-slate-50/50 text-slate-600"
                value={form.dob} 
                onChange={e => setForm({...form, dob: e.target.value})} 
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Domicile District</label>
              <select 
                className="w-full p-4 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all bg-slate-50/50 text-slate-600"
                value={form.domocile} 
                onChange={e => setForm({...form, domocile: e.target.value})}
                required
              >
                <option value="">Select District</option>
                {kpkDistricts.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">City</label>
              <input 
                className="w-full p-4 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all bg-slate-50/50"
                placeholder="Current City"
                value={form.city} 
                onChange={e => setForm({...form, city: e.target.value})} 
                required
              />
            </div>

            <button 
              type="submit" 
              className={`md:col-span-2 p-4 rounded-xl text-white font-bold text-lg shadow-lg transform transition-all active:scale-[0.98] ${editingId ? 'bg-emerald-500 shadow-emerald-200' : 'bg-indigo-600 shadow-indigo-200'}`}
            >
              {editingId ? "Update Student" : "Save Record"}
            </button>
          </form>
        </div>

        {/* Table List Section */}
        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200 border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="p-5 font-semibold text-sm uppercase tracking-wider">Student & Father</th>
                  <th className="p-5 font-semibold text-sm uppercase tracking-wider">Age</th>
                  <th className="p-5 font-semibold text-sm uppercase tracking-wider">Location</th>
                  <th className="p-5 font-semibold text-sm uppercase tracking-wider text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                          <User size={20} />
                        </div>
                        <div>
                          <div className="font-bold text-slate-800">{s.name}</div>
                          <div className="text-xs text-slate-400 font-medium">S/O {s.father_name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="flex items-center gap-2 text-slate-600 font-semibold">
                        <Calendar size={16} className="text-slate-400" />
                        {s.age} yrs
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="flex flex-col">
                        <span className="text-slate-700 font-bold flex items-center gap-1">
                          <MapPin size={14} className="text-indigo-500" /> {s.city}
                        </span>
                        <span className="text-[10px] text-indigo-400 font-black uppercase tracking-tighter ml-4">{s.domocile}</span>
                      </div>
                    </td>
                    <td className="p-5 text-center">
                      <div className="flex justify-center gap-3">
                        <button 
                          onClick={() => editStudent(s)}
                          className="p-2 text-amber-500 hover:bg-amber-50 rounded-lg transition-all"
                          title="Edit"
                        >
                          <Edit3 size={20} />
                        </button>
                        <button 
                          onClick={() => deleteStudent(s.id)}
                          className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                          title="Delete"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {students.length === 0 && (
            <div className="p-20 text-center text-slate-400 italic">
              No student records found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;