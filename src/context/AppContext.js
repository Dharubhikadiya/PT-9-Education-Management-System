import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [userRole, setUserRole] = useState(() => {
    const savedRole = localStorage.getItem('userRole');
    return savedRole || null;
  });

  const [courses, setCourses] = useState(() => {
    const savedCourses = localStorage.getItem('courses');
    return savedCourses ? JSON.parse(savedCourses) : [];
  });

  const [teachers, setTeachers] = useState(() => {
    const savedTeachers = localStorage.getItem('teachers');
    return savedTeachers ? JSON.parse(savedTeachers) : [];
  });

  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem('students');
    return savedStudents ? JSON.parse(savedStudents) : [];
  });

  const [assignments, setAssignments] = useState(() => {
    const savedAssignments = localStorage.getItem('assignments');
    return savedAssignments ? JSON.parse(savedAssignments) : [];
  });

  const [quizzes, setQuizzes] = useState(() => {
    const savedQuizzes = localStorage.getItem('quizzes');
    return savedQuizzes ? JSON.parse(savedQuizzes) : [];
  });

  useEffect(() => {
    localStorage.setItem('userRole', userRole || '');
    localStorage.setItem('courses', JSON.stringify(courses));
    localStorage.setItem('teachers', JSON.stringify(teachers));
    localStorage.setItem('students', JSON.stringify(students));
    localStorage.setItem('assignments', JSON.stringify(assignments));
    localStorage.setItem('quizzes', JSON.stringify(quizzes));
  }, [userRole, courses, teachers, students, assignments, quizzes]);

  const addCourse = (newCourse) => {
    setCourses(prevCourses => [...prevCourses, { ...newCourse, id: Date.now() }]);
  };

  const updateCourse = (updatedCourse) => {
    setCourses(prevCourses => prevCourses.map(course => 
      course.id === updatedCourse.id ? updatedCourse : course
    ));
  };

  const deleteCourse = (courseId) => {
    setCourses(prevCourses => prevCourses.filter(course => course.id !== courseId));
  };

  const addTeacher = (newTeacher) => {
    setTeachers(prevTeachers => [...prevTeachers, { ...newTeacher, id: Date.now() }]);
  };

  const updateTeacher = (updatedTeacher) => {
    setTeachers(prevTeachers => prevTeachers.map(teacher => 
      teacher.id === updatedTeacher.id ? updatedTeacher : teacher
    ));
  };

  const deleteTeacher = (teacherId) => {
    setTeachers(prevTeachers => prevTeachers.filter(teacher => teacher.id !== teacherId));
  };

  const addStudent = (newStudent) => {
    setStudents(prevStudents => [...prevStudents, { ...newStudent, id: Date.now() }]);
  };

  const updateStudent = (updatedStudent) => {
    setStudents(prevStudents => prevStudents.map(student => 
      student.id === updatedStudent.id ? updatedStudent : student
    ));
  };

  const deleteStudent = (studentId) => {
    setStudents(prevStudents => prevStudents.filter(student => student.id !== studentId));
  };

  const addAssignment = (newAssignment) => {
    setAssignments(prevAssignments => [...prevAssignments, { ...newAssignment, id: Date.now() }]);
  };

  const deleteAssignment = (assignmentId) => {
    setAssignments(prevAssignments => prevAssignments.filter(assignment => assignment.id !== assignmentId));
  };

  const addQuiz = (newQuiz) => {
    setQuizzes(prevQuizzes => [...prevQuizzes, { ...newQuiz, id: Date.now() }]);
  };

  const deleteQuiz = (quizId) => {
    setQuizzes(prevQuizzes => prevQuizzes.filter(quiz => quiz.id !== quizId));
  };

  return (
    <AppContext.Provider value={{ 
      userRole, 
      setUserRole, 
      courses, 
      addCourse, 
      updateCourse, 
      deleteCourse,
      teachers,
      addTeacher,
      updateTeacher,
      deleteTeacher,
      students,
      addStudent,
      updateStudent,
      deleteStudent,
      assignments,
      addAssignment,
      deleteAssignment,
      quizzes,
      addQuiz,
      deleteQuiz
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}