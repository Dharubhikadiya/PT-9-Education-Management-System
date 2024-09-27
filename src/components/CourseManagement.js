import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { FaEdit, FaTrash } from 'react-icons/fa';

function CourseManagement() {
  const { courses, addCourse, updateCourse, deleteCourse } = useAppContext();
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    teacher: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCourse) {
      updateCourse({ ...formData, id: editingCourse.id });
      setEditingCourse(null);
    } else {
      addCourse(formData);
    }
    setFormData({ title: '', description: '', teacher: '' });
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData(course);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      deleteCourse(id);
    }
  };

  return (
    <div className="p-6 bg-[#e9efec] min-h-screen">
      <h2 className="text-2xl font-semibold text-[#16423c] mb-6">Course Management</h2>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Course Title"
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#6a9c89]"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Course Description"
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#6a9c89]"
          required
        />
        <input
          type="text"
          name="teacher"
          value={formData.teacher}
          onChange={handleInputChange}
          placeholder="Teacher Name"
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#6a9c89]"
          required
        />
        <button type="submit" className="w-full bg-[#16423c] text-white p-3 rounded hover:bg-[#6a9c89] transition duration-200">
          {editingCourse ? 'Update Course' : 'Add Course'}
        </button>
      </form>

      <div className="mt-6 space-y-4">
        {courses.map(course => (
          <div key={course.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold text-[#16423c]">{course.title}</h3>
              <p>Description: {course.description}</p>
              <p>Teacher: {course.teacher}</p>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => handleEdit(course)}
                className="text-[#6a9c89] hover:text-[#16423c]"
              >
                <FaEdit size={20} />
              </button>
              <button 
                onClick={() => handleDelete(course.id)}
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

export default CourseManagement;
