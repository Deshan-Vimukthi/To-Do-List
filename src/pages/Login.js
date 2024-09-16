import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import AuthForm from '../components/AuthForm';

const Login = () => {
    const { login } = useAuth();

    const handleLogin = (values) => {
        login(values.email, values.password);
    };

    return <AuthForm onSubmit={handleLogin} isLogin={true} />;
};

export default Login;
