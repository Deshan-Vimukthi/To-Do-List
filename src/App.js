import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Todos from './pages/Todos';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { user } = useAuth();
    return user ? <Component {...rest} /> : <Navigate to="/login" />;
};

function App() {
    return (
        <Router>
            <AuthProvider>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                <Routes>
                    <Route path="/" element={<PrivateRoute component={Todos} />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/todos" element={<PrivateRoute component={Todos} />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}


export default App;
