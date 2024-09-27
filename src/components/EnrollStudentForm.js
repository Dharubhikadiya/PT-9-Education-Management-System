// src/components/EnrollmentForm.js
import React, { useState } from 'react';

const EnrollmentForm = ({ courses, onEnroll }) => {
    const [studentName, setStudentName] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');

    const handleEnroll = (e) => {
        e.preventDefault();
        onEnroll({ studentName, selectedCourse });
        setStudentName('');
        setSelectedCourse('');
    };

    return (
        <form onSubmit={handleEnroll} className="bg-white p-4 rounded">
            <input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="Student Name" className="border p-2 mb-2 w-full" required />
            <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)} className="border p-2 mb-2 w-full" required>
                <option value="">Select Course</option>
                {courses.map(course => <option key={course.title} value={course.title}>{course.title}</option>)}
            </select>
            <button type="submit" className="bg-green-500 text-white p-2 rounded w-full">Enroll Student</button>
        </form>
    );
};

export default EnrollmentForm;
