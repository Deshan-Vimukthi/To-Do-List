import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const getUsersFromLocalStorage = () => {
        return JSON.parse(localStorage.getItem('users')) || [];
    };

    const saveUserToLocalStorage = (users) => {
        localStorage.setItem('users', JSON.stringify(users));
    };

    const login = (email, password) => {
        const users = getUsersFromLocalStorage();
        const foundUser = users.find(
            (user) => user.email === email && user.password === password
        );

        if (foundUser) {
            setUser({ email: foundUser.email, name: foundUser.name });
            alert('Login successful!');
            navigate('/todos'); // Navigate to /todos on successful login
        } else {
            alert('Invalid email or password.');
        }
    };

    const register = (email, password, name) => {
        const users = getUsersFromLocalStorage();
        const existingUser = users.find((user) => user.email === email);

        if (existingUser) {
            alert('User already exists with this email.');
            return;
        }

        const newUser = { email, password, name };
        users.push(newUser);
        saveUserToLocalStorage(users);

        setUser({ email, name });
        alert('Registration successful!');
        navigate('/todos'); // Navigate to /todos on successful registration
    };

    const logout = () => {
        setUser(null);
        alert('Logout successful!');
        navigate('/login'); // Navigate to login page on logout
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
