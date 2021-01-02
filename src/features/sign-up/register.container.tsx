import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import './register.container.scss';

import { validateEmail } from '../../shared/index';
import CustomButton from '../../shared/custom-button/custom-button.component';

import { Box, Form, FormField, TextInput } from 'grommet';

import { postSignUp } from '../../api';

const Register = ({ history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async event => {
        event.preventDefault();

        if (!validateEmail(email)) {
            alert("email is wrong");
            return;
        }

        if (password !== confirmPassword) {
            alert("passwords don't match");
            return;
        }

        postSignUp(email, password)
            .then((data) => {
                setEmail('')
                setPassword('')
                setConfirmPassword('')
                redirectToAccountCreated();
            })
            .catch(error => { alert("Something went wrong") })
    };


    const redirectToAccountCreated = () => {
        if (history) history.push('/confirmation')
    };


    const handleChange = (event) => {
        if (event.target.name === "email") {
            setEmail(event.target.value)
        }
        if (event.target.name === "password") {
            setPassword(event.target.value)
        }
        if (event.target.name === "confirmPassword") {
            setConfirmPassword(event.target.value)
        }
    };

    return (
        <div className='register'>
            <Form className='register-form' onSubmit={handleSubmit}>
                <Box className="register-box" background="white" border gap="large" pad="large" width="medium">
                    <h1>Create an account</h1>
                    <FormField htmlFor="enabled-id" name="enabled" label="">
                        <TextInput
                            onChange={(event) => handleChange(event)}
                            value={email}
                            className="form-input"
                            id="enabled-id"
                            name="email"
                            placeholder="Email"
                        ></TextInput>
                    </FormField>
                    <FormField htmlFor="enabled-id" name="enabled" label="">
                        <TextInput
                            onChange={(event) => handleChange(event)}
                            value={password}
                            type='password'
                            className="form-input"
                            id="enabled-id"
                            name="password"
                            placeholder="Password"
                        />
                    </FormField>
                    <FormField htmlFor="enabled-id" name="enabled" label="">
                        <TextInput
                            value={confirmPassword}
                            type='password'
                            className="form-input"
                            id="enabled-id"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            onChange={(event) => handleChange(event)}
                        />
                    </FormField>
                    <CustomButton
                        primary
                        disabled={!(email && password && confirmPassword)}
                        type='submit'>Submit</CustomButton>
                </Box>
            </Form>
        </div >
    )
};

export default withRouter(Register);

