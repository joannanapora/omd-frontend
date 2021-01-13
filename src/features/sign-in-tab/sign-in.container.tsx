import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

import { Box, Form, FormField, MaskedInput, TextInput } from 'grommet';
import { Google, Facebook, MailOption, License } from 'grommet-icons';

import Notification, { Status } from '../../shared/custom-notification/custom-notification.component';
import CustomButton from '../../shared/custom-button/custom-button.component';
import { emailMask } from '../../shared/masked-input/masked-email';
import Spinner from '../../shared/spinner/spinner.component';
import { setCurrentUser } from '../../store/user';
import './sign-in.styles.scss';

import { postSignIn } from '../../api'
import jwt_decode from "jwt-decode";


const SignIn = ({ dispatchSetCurrentUser, history }) => {
    const [email, setEmail]: [string, any] = useState("");
    const [loading, setLoading]: [boolean, any] = useState(false);
    const [password, setPassword]: [string, any] = useState("");
    const [showErrorNotification, setNotification]: [boolean, any] = useState(false);
    const [workinProgress, setWorkInProgress]: [boolean, any] = useState(false)

    const redirectToUserLoggedIn = () => {
        if (history) history.push('/all-dogs');
    };

    const handleSubmit = event => {
        event.preventDefault();
        setLoading(true);
        postSignIn(email, password)
            .then((response) => {
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
                    setLoading(false);
                }
                if (response.data.accessToken) {
                    localStorage.setItem("accessToken", response.data.accessToken);
                    redirectToUserLoggedIn();
                    setLoading(false);

                };
            }).catch(error => {
                setNotification(true)
                setLoading(false);
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
                    {loading ? <Spinner /> :
                        <div>
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
                        </div>}
                    <CustomButton primary onClick={handleSubmit} type='submit' label='Login' disabled={loading} />
                    <CustomButton secondary icon={<Facebook />} onClick={() => setWorkInProgress(true)} className='facebook-button' name='fb' type='submit' label="Log in with Facebook" />
                    <CustomButton secondary icon={<Google />} onClick={() => setWorkInProgress(true)} className='google-button' name='google' type='submit' label="Log in with Google" />
                    <Link to='/register'><CustomButton icon={<MailOption />} secondary type='submit' disabled={loading} label="Register with email" /></Link>
                </Box>
                {
                    workinProgress ?
                        <Notification
                            status={Status.FAILURE}
                            text={"I'm sorry, we are working on it!"} />
                        :
                        null
                }
                {
                    showErrorNotification ?
                        <Notification
                            status={Status.FAILURE}
                            text={"Wrong email or password."} />
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

