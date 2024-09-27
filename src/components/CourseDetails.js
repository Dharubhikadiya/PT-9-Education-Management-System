import React from 'react';

function CourseDetails({ course }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">{course.title}</h2>
      <p>{course.description}</p>
      <p>Start Date: {course.startDate}</p>
      <p>End Date: {course.endDate}</p>
      <p>Teacher: {course.teacher}</p>
      {/* You can add more details here, like assignments and quizzes */}
    </div>
  );
}

export default CourseDetails;