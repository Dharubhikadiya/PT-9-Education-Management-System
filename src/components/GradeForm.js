// src/components/GradeForm.js
import React, { useState } from 'react';

const GradeForm = ({ students, onAssignGrade }) => {
    const [selectedStudent, setSelectedStudent] = useState('');
    const [grade, setGrade] = useState('');

    const handleAssignGrade = (e) => {
        e.preventDefault();
        onAssignGrade({ student: selectedStudent, grade });
        setSelectedStudent('');
        setGrade('');
    };

    return (
        <form onSubmit={handleAssignGrade} className="bg-white p-4 rounded">
            <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)} className="border p-2 mb-2 w-full" required>
                <option value="">Select Student</option>
                {students.map(student => <option key={student.name} value={student.name}>{student.name}</option>)}
            </select>
            <input type="text" value={grade} onChange={(e) => setGrade(e.target.value)} placeholder="Grade" className="border p-2 mb-2 w-full" required />
            <button type="submit" className="bg-purple-500 text-white p-2 rounded w-full">Assign Grade</button>
        </form>
    );
};

export default GradeForm;
