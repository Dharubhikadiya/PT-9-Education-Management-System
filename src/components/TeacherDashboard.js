import React, { useState, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { FaTrash, FaFile, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function TeacherDashboard() {
  const { courses, assignments, addAssignment, deleteAssignment, quizzes, addQuiz, deleteQuiz } = useAppContext();
  const [selectedAssignmentCourse, setSelectedAssignmentCourse] = useState('');
  const [selectedQuizCourse, setSelectedQuizCourse] = useState('');
  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [assignmentFile, setAssignmentFile] = useState(null);
  const [quizTitle, setQuizTitle] = useState('');
  const [quizQuestions, setQuizQuestions] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAssignmentFile(file);
    }
  };

  const handleAssignmentSubmit = (e) => {
    e.preventDefault();
    if (!selectedAssignmentCourse || !assignmentTitle || !assignmentFile) {
      alert('Please fill all fields for the assignment');
      return;
    }
    const newAssignment = {
      courseId: selectedAssignmentCourse,
      title: assignmentTitle,
      fileName: assignmentFile.name,
      fileUrl: URL.createObjectURL(assignmentFile),
      uploadDate: new Date().toISOString(),
    };
    addAssignment(newAssignment);
    resetAssignmentForm();
  };

  const handleQuizSubmit = (e) => {
    e.preventDefault();
    if (!selectedQuizCourse || !quizTitle || !quizQuestions) {
      alert('Please fill all fields for the quiz');
      return;
    }
    const newQuiz = {
      courseId: selectedQuizCourse,
      title: quizTitle,
      questions: quizQuestions,
      creationDate: new Date().toISOString(),
    };
    addQuiz(newQuiz);
    resetQuizForm();
  };

  const resetAssignmentForm = () => {
    setSelectedAssignmentCourse('');
    setAssignmentTitle('');
    setAssignmentFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const resetQuizForm = () => {
    setSelectedQuizCourse('');
    setQuizTitle('');
    setQuizQuestions('');
  };

  const handleDeleteAssignment = (assignmentId) => {
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      deleteAssignment(assignmentId);
    }
  };

  const handleDeleteQuiz = (quizId) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      deleteQuiz(quizId);
    }
  };


  return (
    <div className="p-6 bg-[#16423c] text-[#e9efec] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
        <Link
          to="/"
          className="bg-[#6a9c89] hover:bg-[#5a8877] text-white font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <FaArrowLeft className="mr-2" />
          Back to Home
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Assignment Upload Section */}
        <div className="bg-[#e9efec] p-6 rounded-lg shadow text-[#16423c]">
          <h2 className="text-xl font-semibold mb-4">Upload Assignment</h2>
          <form onSubmit={handleAssignmentSubmit} className="space-y-4">
            <select
              value={selectedAssignmentCourse}
              onChange={(e) => setSelectedAssignmentCourse(e.target.value)}
              className="w-full p-2 border rounded text-[#16423c]"
              required
            >
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={assignmentTitle}
              onChange={(e) => setAssignmentTitle(e.target.value)}
              placeholder="Assignment Title"
              className="w-full p-2 border rounded text-[#16423c]"
              required
            />
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-2 border rounded text-[#16423c]"
              required
              ref={fileInputRef}
            />
            <button
              type="submit"
              className="w-full bg-[#6a9c89] text-white p-2 rounded hover:bg-[#5a8877]"
            >
              Upload Assignment
            </button>
          </form>
        </div>

        {/* Quiz Creation Section */}
        <div className="bg-[#e9efec] p-6 rounded-lg shadow text-[#16423c]">
          <h2 className="text-xl font-semibold mb-4">Create Quiz</h2>
          <form onSubmit={handleQuizSubmit} className="space-y-4">
            <select
              value={selectedQuizCourse}
              onChange={(e) => setSelectedQuizCourse(e.target.value)}
              className="w-full p-2 border rounded text-[#16423c]"
              required
            >
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={quizTitle}
              onChange={(e) => setQuizTitle(e.target.value)}
              placeholder="Quiz Title"
              className="w-full p-2 border rounded text-[#16423c]"
              required
            />
            <textarea
              value={quizQuestions}
              onChange={(e) => setQuizQuestions(e.target.value)}
              placeholder="Enter quiz questions (one per line)"
              className="w-full p-2 border rounded text-[#16423c]"
              rows="4"
              required
            />
            <button
              type="submit"
              className="w-full bg-[#6a9c89] text-white p-2 rounded hover:bg-[#5a8877]"
            >
              Create Quiz
            </button>
          </form>
        </div>

        {/* Uploaded Assignments Section */}
        <div className="bg-[#e9efec] p-6 rounded-lg shadow text-[#16423c]">
          <h2 className="text-xl font-semibold mb-4">Uploaded Assignments</h2>
          {assignments.length > 0 ? (
            <ul className="space-y-4">
              {assignments.map((assignment) => (
                <li
                  key={assignment.id}
                  className="flex items-center justify-between p-2 border rounded"
                >
                  <div className="flex items-center">
                    {assignment.fileUrl ? (
                      <img
                        src={assignment.fileUrl}
                        alt={assignment.title}
                        className="w-10 h-10 object-cover mr-2"
                      />
                    ) : (
                      <FaFile className="w-10 h-10 mr-2 text-gray-500" />
                    )}
                    <span>
                      {assignment.title} - {assignment.fileName}
                    </span>
                  </div>
                  <button
                  onClick={() => handleDeleteAssignment(assignment.id)}
                  className="text-red-500 hover:text-red-600"
                >
                    <FaTrash />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No assignments uploaded yet.</p>
          )}
        </div>

        {/* Created Quizzes Section */}
        <div className="bg-[#e9efec] p-6 rounded-lg shadow text-[#16423c]">
          <h2 className="text-xl font-semibold mb-4">Created Quizzes</h2>
          {quizzes.length > 0 ? (
            <ul className="space-y-4">
              {quizzes.map((quiz) => (
                <li
                  key={quiz.id}
                  className="flex items-center justify-between p-2 border rounded"
                >
                  <span>{quiz.title}</span>
                  <button
                  onClick={() => handleDeleteQuiz(quiz.id)}
                  className="text-red-500 hover:text-red-600"
                >
                    <FaTrash />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No quizzes created yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;
