import React, { useState } from 'react';

function AssignmentSubmission({ courseId }) {
  const [submission, setSubmission] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement assignment submission logic
    console.log(`Submitting assignment for course ${courseId}: ${submission}`);
    setSubmission('');
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Submit Assignment</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={submission}
          onChange={(e) => setSubmission(e.target.value)}
          placeholder="Enter your assignment submission"
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
          Submit Assignment
        </button>
      </form>
    </div>
  );
}

export default AssignmentSubmission;