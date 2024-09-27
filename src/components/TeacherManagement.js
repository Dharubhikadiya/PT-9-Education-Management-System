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
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      deleteTeacher(id);
    }
  };

  return (
    <div className="min-h-screen bg-[#E9EFEC] p-4 sm:p-6 lg:p-8">
      <h2 className="text-2xl font-semibold text-[#16423C] mb-6">Teacher Management</h2>
      
      <form onSubmit={handleSubmit} className="bg-white p-4 sm:p-6 rounded-lg shadow-md space-y-4 mb-8">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Teacher Name"
          className="w-full p-3 border border-[#C4DAD2] rounded focus:outline-none focus:ring-2 focus:ring-[#6A9C89]"
          required
        />
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          placeholder="Subject"
          className="w-full p-3 border border-[#C4DAD2] rounded focus:outline-none focus:ring-2 focus:ring-[#6A9C89]"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          className="w-full p-3 border border-[#C4DAD2] rounded focus:outline-none focus:ring-2 focus:ring-[#6A9C89]"
          required
        />
        <button type="submit" className="w-full bg-[#16423C] text-white p-3 rounded hover:bg-[#6A9C89] transition duration-200">
          {editingTeacher ? 'Update Teacher' : 'Add Teacher'}
        </button>
      </form>

      <div className="mt-6 space-y-4">
        {teachers.map(teacher => (
          <div key={teacher.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold text-[#16423c]">{teacher.name}</h3>
              <p>Subject: {teacher.subject}</p>
              <p>Email: {teacher.email}</p>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => handleEdit(teacher)}
                className="text-[#6a9c89] hover:text-[#16423c]"
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
        ))}
      </div>
      
    </div>
  );
}

export default TeacherManagement;
