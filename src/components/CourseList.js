// src/components/CourseList.jsx
import React, { useState } from 'react';

const CourseList = ({ courses, onEdit, onDelete }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('title');

    const filteredCourses = courses.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedCourses = filteredCourses.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return -1;
        if (a[sortBy] > b[sortBy]) return 1;
        return 0;
    });

    return (
        <div className="mt-4">
            <h2 className="text-xl font-bold">Course List</h2>
            <input
                type="text"
                placeholder="Search Courses"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border p-2 mb-4 w-full"
            />
            <select onChange={(e) => setSortBy(e.target.value)} className="border p-2 mb-4">
                <option value="title">Sort by Title</option>
                <option value="startDate">Sort by Start Date</option>
                <option value="endDate">Sort by End Date</option>
            </select>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Title</th>
                        <th className="border px-4 py-2">Description</th>
                        <th className="border px-4 py-2">Start Date</th>
                        <th className="border px-4 py-2">End Date</th>
                        <th className="border px-4 py-2">Assigned Teacher</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedCourses.map((course, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">{course.title}</td>
                            <td className="border px-4 py-2">{course.description}</td>
                            <td className="border px-4 py-2">{course.startDate}</td>
                            <td className="border px-4 py-2">{course.endDate}</td>
                            <td className="border px-4 py-2">{course.assignedTeacher}</td>
                            <td className="border px-4 py-2">
                                <button onClick={() => onEdit(course)} className="bg-yellow-500 text-white p-1 rounded mr-2">Edit</button>
                                <button onClick={() => onDelete(index)} className="bg-red-500 text-white p-1 rounded">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CourseList;
