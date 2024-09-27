// src/components/CourseForm.js
import React, { useState } from 'react';

const CourseForm = ({ onSave }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [assignedTeacher, setAssignedTeacher] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const course = { title, description, startDate, endDate, assignedTeacher };
        onSave(course);
        setTitle('');
        setDescription('');
        setStartDate('');
        setEndDate('');
        setAssignedTeacher('');
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded">
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Course Title" className="border p-2 mb-2 w-full" required />
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="border p-2 mb-2 w-full" required />
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border p-2 mb-2 w-full" required />
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border p-2 mb-2 w-full" required />
            <input type="text" value={assignedTeacher} onChange={(e) => setAssignedTeacher(e.target.value)} placeholder="Assigned Teacher" className="border p-2 mb-2 w-full" required />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Save Course</button>
        </form>
    );
};

export default CourseForm;
