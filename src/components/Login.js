import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); 
  const navigate = useNavigate();
  const { setUserRole } = useAppContext();

  const handleLogin = (e) => {
    e.preventDefault();
    setUserRole(role);
    if (role === 'admin') {
      navigate('/admin');
    } else if (role === 'teacher') {
      navigate('/teacher');
    } else {
      navigate('/student');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-16 px-8 sm:px-10 lg:px-12">
      <div className="max-w-lg w-full space-y-10 bg-white shadow-lg rounded-lg p-10">
        <div>
          <h2 className="text-center text-4xl font-bold text-primary">
            Sign in to your account
          </h2>
        </div>
        <form className="space-y-8" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm space-y-6">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 text-lg focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-lg"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 text-lg focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-lg"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-lg font-medium text-gray-700">
                Select Role
              </label>
              <select
                id="role"
                name="role"
                className="mt-1 block w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 text-lg rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-lg"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="admin">Admin</option>
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-6 border border-transparent text-lg font-semibold rounded-md text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
