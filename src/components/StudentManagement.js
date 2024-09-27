import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { FaEdit, FaTrash } from 'react-icons/fa';

function StudentManagement() {
  const { students, addStudent, updateStudent, deleteStudent } = useAppContext();
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    grade: '',
    email: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingStudent) {
      updateStudent({ ...formData, id: editingStudent.id });
      setEditingStudent(null);
    } else {
      addStudent(formData);
    }
    setFormData({ name: '', grade: '', email: '' });
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setFormData(student);
  };

  const handleDelete = (id) => {
    deleteStudent(id);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Student Management</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Student Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="grade"
          value={formData.grade}
          onChange={handleInputChange}
          placeholder="Grade"
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
          {editingStudent ? 'Update Student' : 'Add Student'}
        </button>
      </form>

      <div className="space-y-4">
        {students.map(student => (
          <div key={student.id} className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-semibold">{student.name}</h3>
            <p>Grade: {student.grade}</p>
            <p>Email: {student.email}</p>
            
            <div className="flex space-x-2">
              <button 
                onClick={() => handleEdit(student)}
                className="text-yellow-500 hover:text-yellow-600"
              >
                <FaEdit size={20} />
              </button>
              <button 
                onClick={() => handleDelete(student.id)}
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

export default StudentManagement;