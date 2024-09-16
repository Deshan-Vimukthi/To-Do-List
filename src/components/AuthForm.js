import React, {useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {Link} from "react-router-dom";
import './AuthFormStyle.css'
import icon from "../icon";

const AuthForm = ({ onSubmit, isLogin }) => {
    const [showPassword, setShowPassword] = useState(false);

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
        ...(isLogin ? {} : { name: Yup.string().required('Required') })
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='form-background'>
            <div className='auth-form-parent-container'>
                <div className='form-header'>
                    {isLogin?'Login':'Register'}
                </div>
                <div className="auth-form-container">
                    <Formik
                        initialValues={{ email: '', password: '', name: '' }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            onSubmit(values);
                        }}
                    >
                        {() => (
                            <Form>
                                {!isLogin && (
                                    <div>
                                        <label>Name</label>
                                        <Field name="name" type="text" />
                                        <div className='error-message'>
                                            <ErrorMessage name="name" component="div" />
                                        </div>
                                    </div>
                                )}
                                <div>
                                    <label>Email</label>
                                    <Field name="email" type="email" />
                                    <div className='error-message'>
                                        <ErrorMessage name="email" component="div" />
                                    </div>
                                </div>
                                <div className='password-field'>
                                    <label>Password</label>
                                    <div className='password-wrapper'>
                                        <div>
                                            <Field
                                                name="password"
                                                type={showPassword ? 'text' : 'password'}
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            className='password-toggle'
                                            onClick={togglePasswordVisibility}
                                        >
                                            {showPassword ? icon.not_visible : icon.visible}
                                        </button>
                                    </div>
                                    <div className='error-message'>
                                        <ErrorMessage name="password" component="div" />
                                    </div>
                                </div>
                                <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
                                {isLogin ?
                                    <button>
                                        <Link to={'/register'}>Create Account</Link>
                                    </button>
                                    :
                                    <button>
                                        <Link to={'/login'}>Login with existing Account</Link>
                                    </button>
                                }
                            </Form>
                        )}
                    </Formik>
                </div>
                </div>
            </div>

    );
};

export default AuthForm;
