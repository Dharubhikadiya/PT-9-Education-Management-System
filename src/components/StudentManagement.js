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

  const validateForm = () => {
    const { name, grade, email } = formData;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return name && grade && emailPattern.test(email) && !isNaN(grade) && grade >= 0 && grade <= 100;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("Please enter valid details!");
      return;
    }
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
    if (window.confirm("Are you sure you want to delete this student?")) {
      deleteStudent(id);
    }
  };

  return (
    <div className="min-h-screen bg-[#E9EFEC] p-4 sm:p-6 lg:p-8">
      <h2 className="text-2xl font-semibold text-[#16423C] mb-6">Student Management</h2>
      
      <form onSubmit={handleSubmit} className="bg-white p-4 sm:p-6 rounded-lg shadow-md space-y-4 mb-8">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Student Name"
          className="w-full p-3 border border-[#C4DAD2] rounded focus:outline-none focus:ring-2 focus:ring-[#6A9C89]"
          required
        />
        <input
          type="text"
          name="grade"
          value={formData.grade}
          onChange={handleInputChange}
          placeholder="Grade"
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
          {editingStudent ? 'Update Student' : 'Add Student'}
        </button>
      </form>

      <div className="mt-6 space-y-4">
        {students.map(student => (
          <div key={student.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold text-[#16423c]">{student.name}</h3>
              <p>Grade: {student.grade}</p>
              <p>Email: {student.email}</p>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => handleEdit(student)}
                className="text-[#6a9c89] hover:text-[#16423c]"
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
