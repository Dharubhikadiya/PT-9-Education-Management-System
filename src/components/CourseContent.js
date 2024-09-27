import React, { useState } from 'react';

function CourseContent({ courseId }) {
  const [assignment, setAssignment] = useState('');
  const [quiz, setQuiz] = useState('');

  const handleAssignmentUpload = (e) => {
    e.preventDefault();
    // TODO: Implement assignment upload logic
    console.log(`Uploading assignment for course ${courseId}: ${assignment}`);
    setAssignment('');
  };

  const handleQuizUpload = (e) => {
    e.preventDefault();
    // TODO: Implement quiz upload logic
    console.log(`Uploading quiz for course ${courseId}: ${quiz}`);
    setQuiz('');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Course Content Management</h2>
      
      {/* Assignment Upload Form */}
      <form onSubmit={handleAssignmentUpload} className="space-y-4">
        <textarea
          value={assignment}
          onChange={(e) => setAssignment(e.target.value)}
          placeholder="Enter assignment details"
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
          Upload Assignment
        </button>
      </form>

      <form onSubmit={handleQuizUpload} className="space-y-4">
        <textarea
          value={quiz}
          onChange={(e) => setQuiz(e.target.value)}
          placeholder="Enter quiz details"
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-600">
          Upload Quiz
        </button>
      </form>
    </div>
  );
}

export default CourseContent;