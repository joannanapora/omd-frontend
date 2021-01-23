import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import { Box, MaskedInput, Form, FormField, TextInput } from 'grommet';
import { MailOption, License } from 'grommet-icons';

import Notification, { Status } from '../../../shared/custom-notification/custom-notification.component';
import CustomButton from '../../../shared/custom-button/custom-button.component';
import { emailMask } from '../../../shared/masked-input/masked-email';
import { validatePassword } from '../../../shared/index';
import { validateEmail } from '../../../shared/index';
import './register.container.scss';

import { postSignUp } from '../../../api';

const Register = ({ history }) => {
    const [email, setEmail]: [string, any] = useState("");
    const [password, setPassword]: [string, any] = useState("");
    const [confirmPassword, setConfirmPassword]: [string, any] = useState("");
    const [tooWeakNotification, showTooWeakNotification]: [boolean, any] = useState(false);
    const [tooShortNotification, showTooShortNotification]: [boolean, any] = useState(false);
    const [dontMatchNotification, showDontMatchNotification]: [boolean, any] = useState(false);
    const [wrongEmail, showWrongEmail]: [boolean, any] = useState(false);

    const handleSubmit = async event => {
        event.preventDefault();

        if (!validateEmail(email)) {
            showWrongEmail(true);
            return;
        }

        if (password !== confirmPassword) {
            showDontMatchNotification(true);
            return;
        }

        if (password.length < 8) {
            showTooShortNotification(true);
            return;
        }

        if (!validatePassword(password)) {
            showTooWeakNotification(true);
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
        if (tooWeakNotification) {
            showTooWeakNotification(false)
        };
        if (dontMatchNotification) {
            showDontMatchNotification(false)
        };
        if (tooShortNotification) {
            showTooShortNotification(false)
        };
        if (wrongEmail) {
            showWrongEmail(false)
        };

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
            {
                wrongEmail ?
                    <Notification
                        status={Status.FAILURE}
                        text={"Email is wrong"} />
                    :
                    null
            }
            {
                tooWeakNotification ?
                    <Notification
                        status={Status.FAILURE}
                        text={"Password is too weak"} />
                    :
                    null
            }
            {
                tooShortNotification ?
                    <Notification
                        status={Status.FAILURE}
                        text={"Password is too short"} />
                    :
                    null
            }
            {
                dontMatchNotification ?
                    <Notification
                        status={Status.FAILURE}
                        text={"Passwords don't match"} />
                    :
                    null
            }
        </div >
    )
};

export default withRouter(Register);

