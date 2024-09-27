// src/context/UserContext.js
import React, { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [userRole, setUserRole] = useState(null);
    const [courses, setCourses] = useState([]);
    
    return (
        <UserContext.Provider value={{ userRole, setUserRole, courses, setCourses }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
