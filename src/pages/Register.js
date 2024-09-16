import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import AuthForm from '../components/AuthForm';

const Register = () => {
    const { register } = useAuth();

    const handleRegister = (values) => {
        register(values.email, values.password, values.name);
    };

    return <AuthForm onSubmit={handleRegister} isLogin={false} />;
};

export default Register;
