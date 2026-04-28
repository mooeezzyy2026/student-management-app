import React, { useState, useEffect } from 'react';
import axios from 'axios';

const kpkDistricts = [
  "Abbottabad", "Bajaur", "Bannu", "Battagram", "Buner", "Charsadda", 
  "Chitral", "Dera Ismail Khan", "Hangu", "Haripur", "Karak", "Khaibar", 
  "Kohat", "Kohistan", "Kurram", "Lakki Marwat", "Lower Dir", "Malakand", 
  "Mansehra", "Mardan", "Mohmand", "North Waziristan", "Nowshera", 
  "Orakzai", "Peshawar", "Shangla", "South Waziristan", "Swabi", 
  "Swat", "Tank", "Upper Dir"
];

const formStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr', // This creates two columns
  gap: '15px',
  padding: '20px',
  backgroundColor: '#fff',
  borderRadius: '8px',
  marginBottom: '20px'
};
function App() {
  const [students, setStudents] = useState([]);
  // const [form, setForm] = useState({ name: '', age: '', qualifications: '', city: '', district: '' });
  const [form, setForm] = useState({ 
  name: '', 
  father_name:'',
  dob:'',
  domocile:"",
  city: '', 
  district: '' 
});
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

    if (!form.dob) {
      alert("Please select Date of Birth");
      return;
    }

    // Calculate age from the Date Picker
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
      city: form.city,
      district: form.district
    };

    try {
      await axios.post(API_URL, dataToSend);
      setForm({ name: '', father_name: '', dob: '', domocile: '', city: '', district: '' });
      fetchStudents(); 
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };
  
  const deleteStudent = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchStudents();
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Student Management System</h2>
      
      <form onSubmit={saveStudent} style={formStyle}>
        <input placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={inputStyle} />
        
        <input placeholder="Father's Name" value={form.father_name} onChange={e => setForm({...form, father_name: e.target.value})} style={inputStyle} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <label style={{ fontSize: '11px', color: '#666', fontWeight: 'bold' }}>DATE OF BIRTH</label>
          <input type="date" value={form.dob} onChange={e => setForm({...form, dob: e.target.value})} style={inputStyle} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <label style={{ fontSize: '11px', color: '#666', fontWeight: 'bold' }}>DOMICILE (KPK)</label>
          <select value={form.domocile} onChange={e => setForm({...form, domocile: e.target.value})} style={inputStyle}>
            <option value="">Select District</option>
            {kpkDistricts.map(district => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
        </div>

        <input placeholder="City" value={form.city} onChange={e => setForm({...form, city: e.target.value})} style={inputStyle} />
        <input placeholder="District" value={form.district} onChange={e => setForm({...form, district: e.target.value})} style={inputStyle} />
        
        <button type="submit" style={{ gridColumn: 'span 2', padding: '12px', background: '#4A90E2', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>
          Save Student
        </button>
      </form>
  
      
     
      <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 2px 15px rgba(0,0,0,0.1)' }}>
        <thead>
          <tr style={{ backgroundColor: '#35495e', color: '#ffffff', textAlign: 'left' }}>
            <th style={thTdStyle}>Name</th>
            <th style={thTdStyle}>Father Name</th>
            <th style={thTdStyle}>Age</th>
            <th style={thTdStyle}>domocile</th>
            <th style={thTdStyle}>City</th>
            <th style={thTdStyle}>District</th>
            <th style={thTdStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={thTdStyle}>{s.name}</td>
              <td style={thTdStyle}>{s.father_name}</td>
              <td style={thTdStyle}>{s.age}</td>
              <td style={thTdStyle}>{s.domocile}</td>
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