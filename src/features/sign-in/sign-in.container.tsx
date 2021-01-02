import React, { useState } from 'react';

import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom'

import { postSignIn } from '../../api'

import { Box, Form, FormField, TextInput } from 'grommet';
import { Google, Facebook, MailOption } from 'grommet-icons';


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


    const handleSubmit = event => {
        event.preventDefault();

        postSignIn(email, password)
            .then((response) => {
                if (response) {
                    const user = {
                        email: email,
                        name: email
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
                <Box background="white" border gap="small" pad="large" width="medium">
                    <FormField>
                        <TextInput
                            onChange={handleChange}
                            value={email}
                            type='text'
                            name="email"
                            placeholder="Email"
                        ></TextInput>
                    </FormField>
                    <FormField>
                        <TextInput
                            onChange={handleChange}
                            value={password}
                            type='password'
                            name="password"
                            placeholder="Password"
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

