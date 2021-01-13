import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import { Box, MaskedInput, Form, FormField, TextInput } from 'grommet';
import { MailOption, License } from 'grommet-icons';

import CustomButton from '../../../shared/custom-button/custom-button.component';
import { emailMask } from '../../../shared/masked-input/masked-email';
import { validateEmail } from '../../../shared/index';
import './register.container.scss';

import { postSignUp } from '../../../api';

const Register = ({ history }) => {
    const [email, setEmail]: [string, any] = useState("");
    const [password, setPassword]: [string, any] = useState("");
    const [confirmPassword, setConfirmPassword]: [string, any] = useState("");

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
            .then(() => {
                setEmail('')
                setPassword('')
                setConfirmPassword('')
                redirectToAccountCreated();
            })
            .catch(error => { alert("Probobly password is too weak. Plese use at least 1 capital letter and 1 special character") })
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
                <Box className="register-box" background="white" border={{ color: 'brand', size: 'medium' }} gap="small" pad="large" width="medium">
                    <h1>Register</h1>
                    <FormField>
                        <MaskedInput
                            name='email'
                            reverse
                            icon={<MailOption />}
                            mask={emailMask}
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                        />
                    </FormField>
                    <FormField>
                        <TextInput
                            icon={<License />}
                            onChange={handleChange}
                            value={password}
                            type='password'
                            name="password"
                            reverse placeholder="Password"

                        />
                    </FormField>
                    <FormField>
                        <TextInput
                            icon={<License />}
                            onChange={handleChange}
                            value={confirmPassword}
                            type='password'
                            name="confirmPassword"
                            reverse placeholder="Confirm Password"

                        />
                    </FormField>
                    <CustomButton
                        label="Submit"
                        primary
                        type='submit' />
                </Box>
            </Form>
        </div >
    )
};

export default withRouter(Register);

