import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: '', age: '', qualifications: '', city: '', district: '' });

  const API_URL = "http://127.0.0.1:8000/students";

  const fetchStudents = async () => {
    try {
      const res = await axios.get(API_URL);
      setStudents(res.data);
    } catch (err) { console.error("Error fetching data", err); }
  };

  useEffect(() => { fetchStudents(); }, []);

  const saveStudent = async (e) => {
    e.preventDefault();
    await axios.post(API_URL, form);
    setForm({ name: '', age: '', qualifications: '', city: '', district: '' });
    fetchStudents();
  };

  const deleteStudent = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchStudents();
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Student Management System</h2>
      
  
      <form onSubmit={saveStudent} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', background: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '30px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
        <input placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={inputStyle} />
        <input placeholder="Age" type="number" value={form.age} onChange={e => setForm({...form, age: e.target.value})} style={inputStyle} />
        <input placeholder="Qualifications" value={form.qualifications} onChange={e => setForm({...form, qualifications: e.target.value})} style={inputStyle} />
        <input placeholder="City" value={form.city} onChange={e => setForm({...form, city: e.target.value})} style={inputStyle} />
        <input placeholder="District" value={form.district} onChange={e => setForm({...form, district: e.target.value})} style={inputStyle} />
        <button type="submit" style={{ gridColumn: 'span 2', padding: '12px', background: '#4A90E2', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>Save Student</button>
      </form>

     
      <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 2px 15px rgba(0,0,0,0.1)' }}>
        <thead>
          <tr style={{ backgroundColor: '#35495e', color: '#ffffff', textAlign: 'left' }}>
            <th style={thTdStyle}>Name</th>
            <th style={thTdStyle}>Age</th>
            <th style={thTdStyle}>Qualifications</th>
            <th style={thTdStyle}>City</th>
            <th style={thTdStyle}>District</th>
            <th style={thTdStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={thTdStyle}>{s.name}</td>
              <td style={thTdStyle}>{s.age}</td>
              <td style={thTdStyle}>{s.qualifications}</td>
              <td style={thTdStyle}>{s.city}</td>
              <td style={thTdStyle}>{s.district}</td>
              <td style={thTdStyle}>
                <button onClick={() => deleteStudent(s.id)} style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const inputStyle = { padding: '10px', border: '1px solid #ddd', borderRadius: '4px' };
const thTdStyle = { padding: '12px 15px' };

export default App;