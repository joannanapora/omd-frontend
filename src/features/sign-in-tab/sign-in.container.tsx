import React, { useState } from 'react';

import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom'
import jwt_decode from "jwt-decode";

import { postSignIn } from '../../api'

import { Box, Form, FormField, MaskedInput, TextInput } from 'grommet';
import { Google, Facebook, MailOption, License } from 'grommet-icons';


import Notification, { Status } from '../../shared/custom-notification/custom-notification.component';
import CustomButton from '../../shared/custom-button/custom-button.component';
import { setCurrentUser } from '../../store/user';
import './sign-in.styles.scss';


const SignIn = ({ dispatchSetCurrentUser, history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showFailureNotification, setNotification] = useState(false);

    const redirectToUserLoggedIn = () => {
        if (history) history.push('/services');
    };

    const emailMask = [
        {
            regexp: /^[\w\-_.]+$/,
            placeholder: 'Email',
        },
        { fixed: '@' },
        {
            regexp: /^[\w]+$/,
            placeholder: 'gmail',
        },
        { fixed: '.' },
        {
            regexp: /^[\w]+$/,
            placeholder: 'com',
        },
    ];

    const handleSubmit = event => {
        event.preventDefault();

        postSignIn(email, password)
            .then((response) => {
                console.log(response)
                if (response) {
                    const decodedToken: any = jwt_decode(response.data.accessToken);
                    const user = {
                        email: email,
                        name: email,
                        userId: decodedToken.sub
                    };
                    setEmail('');
                    setPassword('');
                    dispatchSetCurrentUser(user);

                }
                if (response.data.accessToken) {
                    localStorage.setItem("accessToken", response.data.accessToken);
                    redirectToUserLoggedIn();

                };
            }).catch(error => {
                setNotification(true)
            });

    };

    const handleChange = (event) => {
        if (event.target.name === "email") {
            setEmail(event.target.value)
        } else {
            setPassword(event.target.value)
        }
    };



    return (
        <div className='sign-in'>
            <Form>
                <Box background="white" border={{ color: 'brand', size: 'medium' }} gap="small" pad="large" width="medium">
                    <h1>Login</h1>
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
                    <CustomButton primary onClick={handleSubmit} type='submit' label='Login' />
                    <CustomButton secondary icon={<Facebook />} onClick={handleSubmit} className='facebook-button' name='fb' type='submit' label="Log in with Facebook" />
                    <CustomButton secondary icon={<Google />} onClick={handleSubmit} className='google-button' name='google' type='submit' label="Log in with Google" />
                    <Link to='/register'><CustomButton icon={<MailOption />} secondary type='submit' label="Register with email" /></Link>
                </Box>
                {
                    showFailureNotification ?
                        <Notification
                            status={Status.FAILURE}
                            text={"Wrong email or password."}>
                        </Notification>
                        :
                        null
                }
            </Form>
        </div>
    )

}

const mapDispatchToProps = dispatch => ({
    dispatchSetCurrentUser: (user) => dispatch(setCurrentUser(user))
});

export default withRouter(connect(
    null,
    mapDispatchToProps)
    (SignIn));

