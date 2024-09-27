import React, { useState, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function StudentDashboard() {
    const { courses, assignments, addAssignment } = useAppContext();
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [assignmentTitle, setAssignmentTitle] = useState('');
    const [assignmentFile, setAssignmentFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        setAssignmentFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedCourse || !assignmentTitle || !assignmentFile) {
            alert('Please fill all fields');
            return;
        }
        const newAssignment = {
            courseId: selectedCourse.id,
            title: assignmentTitle,
            fileName: assignmentFile.name,
            fileUrl: URL.createObjectURL(assignmentFile),
            uploadDate: new Date().toISOString()
        };
        addAssignment(newAssignment);
        resetForm();
        alert('Assignment submitted successfully!');
    };

    const resetForm = () => {
        setAssignmentTitle('');
        setAssignmentFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // Helper function to format date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Student Dashboard</h1>
                <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                    <FaArrowLeft className="mr-2" />
                    Back to Home
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Enrolled Courses section */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Enrolled Courses</h2>
                    <ul className="space-y-2">
                        {courses.map(course => (
                            <li 
                                key={course.id}
                                className={`cursor-pointer p-2 rounded ${selectedCourse && selectedCourse.id === course.id ? 'bg-blue-100 text-blue-700' : 'text-blue-500 hover:text-blue-700'}`}
                                onClick={() => setSelectedCourse(course)}
                            >
                                {course.title}
                            </li>
                        ))}
                    </ul>
                </div>
                
                {/* Course Details section */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Course Details</h2>
                    {selectedCourse ? (
                        <div>
                            <h3 className="text-lg font-semibold">{selectedCourse.title}</h3>
                            <p className="mt-2">{selectedCourse.description}</p>
                            <p className="mt-2">Teacher: {selectedCourse.teacher}</p>
                            <p className="mt-2">Start Date: {formatDate(selectedCourse.startDate)}</p>
                            <p>End Date: {formatDate(selectedCourse.endDate)}</p>
                        </div>
                    ) : (
                        <p>Select a course to view details</p>
                    )}
                </div>
                
                {/* Submit Assignment section */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Submit Assignment</h2>
                    {selectedCourse ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                value={assignmentTitle}
                                onChange={(e) => setAssignmentTitle(e.target.value)}
                                placeholder="Assignment Title"
                                className="w-full p-2 border rounded"
                                required
                            />
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="w-full p-2 border rounded"
                                required
                                ref={fileInputRef}
                            />
                            <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
                                Submit Assignment
                            </button>
                        </form>
                    ) : (
                        <p>Select a course to submit assignments</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default StudentDashboard;