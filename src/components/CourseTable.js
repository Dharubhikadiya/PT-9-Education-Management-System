import React, { useState, useMemo } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

function CoursesTable({ courses, onEdit, onDelete }) {
  const [sortField, setSortField] = useState('title');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filterText, setFilterText] = useState('');

  const sortedAndFilteredCourses = useMemo(() => {
    return courses
      .filter(course => 
        course.title.toLowerCase().includes(filterText.toLowerCase()) ||
        course.teacher.toLowerCase().includes(filterText.toLowerCase())
      )
      .sort((a, b) => {
        if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
  }, [courses, sortField, sortDirection, filterText]);

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Filter by title or teacher"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th 
              className="p-2 border cursor-pointer"
              onClick={() => handleSort('title')}
            >
              Title {sortField === 'title' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
            <th 
              className="p-2 border cursor-pointer"
              onClick={() => handleSort('startDate')}
            >
              Start Date {sortField === 'startDate' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
            <th 
              className="p-2 border cursor-pointer"
              onClick={() => handleSort('endDate')}
            >
              End Date {sortField === 'endDate' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
            <th 
              className="p-2 border cursor-pointer"
              onClick={() => handleSort('teacher')}
            >
              Teacher {sortField === 'teacher' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedAndFilteredCourses.map(course => (
            <tr key={course.id}>
              <td className="p-2 border">{course.title}</td>
              <td className="p-2 border">{course.startDate}</td>
              <td className="p-2 border">{course.endDate}</td>
              <td className="p-2 border">{course.teacher}</td>
              <td className="p-2 border">
               
                <div className="flex space-x-2">
              <button 
              onClick={() => onEdit(course)}
                className="text-yellow-500 hover:text-yellow-600"
              >
                <FaEdit size={20} />
              </button>
              <button 
              onClick={() => onDelete(course.id)}
                className="text-red-500 hover:text-red-600"
              >
                <FaTrash size={20} />
              </button>
            </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CoursesTable;