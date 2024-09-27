import React, { useState } from 'react';
import CoursesTable from './CourseTable';
import { useAppContext } from '../context/AppContext';


function CourseManagement() {
    const { courses, addCourse, updateCourse, deleteCourse } = useAppContext();
    const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    teacher: ''
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
    setFormData({ title: '', description: '', startDate: '', endDate: '', teacher: '' });
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData(course);
  };

  const handleDelete = (id) => {
    deleteCourse(id);
  };


 


  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Course Management</h2>
      
      {/* Course Creation/Editing Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Course Title"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Course Description"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="teacher"
          value={formData.teacher}
          onChange={handleInputChange}
          placeholder="Assigned Teacher"
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        {editingCourse ? 'Update Course' : 'Create Course'}
      </button>
      </form>

      {/* Courses Table */}
      <CoursesTable
        courses={courses}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default CourseManagement;