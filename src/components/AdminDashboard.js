import React from 'react';
import { Link } from 'react-router-dom';
import CourseManagement from './CourseManagement';
import StudentManagement from './StudentManagement';
import TeacherManagement from './TeacherManagement';
import { useAppContext } from '../context/AppContext';

function AdminDashboard() {
  const { courses, teachers, students } = useAppContext();
//   const [students] = useState(['Student 1', 'Student 2', 'Student 3']); // Dummy data
//   const [teachers] = useState(['Teacher 1', 'Teacher 2', 'Teacher 3']); // Dummy data

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800">EMS Admin</h2>
        </div>
        <nav className="mt-6">
          <Link to="/" className="block py-2 px-4 text-gray-600 hover:bg-gray-200">Home</Link>
          <a href="#courses" className="block py-2 px-4 text-gray-600 hover:bg-gray-200">Courses</a>
          <a href="#students" className="block py-2 px-4 text-gray-600 hover:bg-gray-200">Students</a>
          <a href="#teachers" className="block py-2 px-4 text-gray-600 hover:bg-gray-200">Teachers</a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Back to Home
            </Link>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div id="courses" className="bg-white p-6 rounded-lg shadow">
          <CourseManagement />
        </div>
        <div id="teachers" className="bg-white p-6 rounded-lg shadow">
          <TeacherManagement />
        </div>
        <div id="students" className="bg-white p-6 rounded-lg shadow">
          <StudentManagement />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Manage Courses</h2>
        <ul>
          {Array.isArray(courses) && courses.map(course => (
            <li key={course.id} className="mb-2">{course.title}</li>
          ))}
        </ul>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Manage Students</h2>
        <ul>
          {Array.isArray(students) && students.map((student, index) => (
            <li key={index} className="mb-2">{student.name}</li>
          ))}
        </ul>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Manage Teachers</h2>
        <ul>
          {Array.isArray(teachers) && teachers.map((teacher, index) => (
            <li key={index} className="mb-2">{teacher.name}</li>
          ))}
        </ul>
      </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;