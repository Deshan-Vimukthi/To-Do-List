import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {Link} from "react-router-dom";
import './AuthFormStyle.css'
import Login from "../pages/Login";

const AuthForm = ({ onSubmit, isLogin }) => {
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
        ...(isLogin ? {} : { name: Yup.string().required('Required') })
    });




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
                                <div>
                                    <label>Password</label>
                                    <Field name="password" type="password" />
                                    <div className='error-message'>
                                        <ErrorMessage name="password" component="div" />
                                    </div>
                                </div>
                                <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
                                {isLogin?<button><Link to={'/register'}> Create Account </Link></button>:
                                    <button><Link to={'/login'}> Login with existing Account </Link></button>}
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>

        </div>

    );
};

export default AuthForm;
