import React from 'react';
import { Link } from 'react-router-dom';
import CourseManagement from './CourseManagement';
import StudentManagement from './StudentManagement';
import TeacherManagement from './TeacherManagement';
import { useAppContext } from '../context/AppContext';

function AdminDashboard() {
  const { courses, teachers, students } = useAppContext();

  return (
    <div className="flex min-h-screen bg-[#e9efec]">
      <div className="w-64 bg-[#16423c] shadow-lg fixed h-full overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-[#e9efec]">EMS Admin</h2>
        </div>
        <nav className="mt-6">
          <Link to="/" className="block py-2 px-4 text-[#c4dad2] hover:bg-[#6a9c89] hover:text-white transition">Home</Link>
          <a href="#courses" className="block py-2 px-4 text-[#c4dad2] hover:bg-[#6a9c89] hover:text-white transition">Courses</a>
          <a href="#students" className="block py-2 px-4 text-[#c4dad2] hover:bg-[#6a9c89] hover:text-white transition">Students</a>
          <a href="#teachers" className="block py-2 px-4 text-[#c4dad2] hover:bg-[#6a9c89] hover:text-white transition">Teachers</a>
        </nav>
      </div>

      <div className="flex-1 ml-64">
        <header className="bg-[#16423c] shadow-lg sticky top-0 left-0 right-0 z-10">
          <div className="max-w-8xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-[#e9efec]">Admin Dashboard</h1>
            <Link to="/" className="bg-[#6a9c89] hover:bg-[#16423c] text-white font-bold py-2 px-4 rounded">
              Back to Home
            </Link>
          </div>
        </header>
        <main className="max-w-8xl mx-auto py-6 sm:px-6 lg:px-8 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div id="courses" className="bg-white p-6 rounded-lg shadow-lg">
              <CourseManagement />
            </div>
            <div id="teachers" className="bg-white p-6 rounded-lg shadow-lg">
              <TeacherManagement />
            </div>
            <div id="students" className="bg-white p-6 rounded-lg shadow-lg">
              <StudentManagement />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-[#16423c]">Manage Courses</h2>
              <ul>
                {Array.isArray(courses) && courses.map((course) => (
                  <li key={course.id} className="mb-2">{course.title}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-[#16423c]">Manage Teachers</h2>
              <ul>
                {Array.isArray(teachers) && teachers.map((teacher, index) => (
                  <li key={index} className="mb-2">{teacher.name}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-[#16423c]">Manage Students</h2>
              <ul>
                {Array.isArray(students) && students.map((student, index) => (
                  <li key={index} className="mb-2">{student.name}</li>
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
