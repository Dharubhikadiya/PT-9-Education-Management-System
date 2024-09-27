import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { FaEdit, FaTrash } from 'react-icons/fa';

function TeacherManagement() {
  const { teachers, addTeacher, updateTeacher, deleteTeacher } = useAppContext();
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    email: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTeacher) {
      updateTeacher({ ...formData, id: editingTeacher.id });
      setEditingTeacher(null);
    } else {
      addTeacher(formData);
    }
    setFormData({ name: '', subject: '', email: '' });
  };

  const handleEdit = (teacher) => {
    setEditingTeacher(teacher);
    setFormData(teacher);
  };

  const handleDelete = (id) => {
    deleteTeacher(id);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Teacher Management</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Teacher Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          placeholder="Subject"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          {editingTeacher ? 'Update Teacher' : 'Add Teacher'}
        </button>
      </form>

      <div className="space-y-4">
        {Array.isArray(teachers) ? teachers.map(teacher => (
          <div key={teacher.id} className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-semibold">{teacher.name}</h3>
            <p>Subject: {teacher.subject}</p>
            <p>Email: {teacher.email}</p>
            <div className="flex space-x-2">
              <button 
                onClick={() => handleEdit(teacher)}
                className="text-yellow-500 hover:text-yellow-600"
              >
                <FaEdit size={20} />
              </button>
              <button 
                onClick={() => handleDelete(teacher.id)}
                className="text-red-500 hover:text-red-600"
              >
                <FaTrash size={20} />
              </button>
            </div>
          </div>
        )) : <p>No teachers available</p>}
      </div>
    </div>
  );
}

export default TeacherManagement;