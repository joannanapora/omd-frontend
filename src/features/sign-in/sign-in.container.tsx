import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom'


import { Box, Form, FormField, TextInput } from 'grommet';
import { Google, Facebook, MailOption } from 'grommet-icons';


import Notification, { Status } from '../../shared/custom-notification/custom-notification.component';
import CustomButton from '../../shared/custom-button/custom-button.component';
import { setCurrentUser } from '../../store/user';
import './sign-in.container.scss';


class SignIn extends React.Component<{ dispatchSetCurrentUser, history },
    { showFailureNotification: boolean, password: any, email: any }> {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            showFailureNotification: false,
        }
    }
    redirectToUserLoggedIn = () => {
        const { history } = this.props;
        if (history) history.push('/services');
    }

    handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText)
        }
        return response;
    }
    handleSubmit = event => {
        event.preventDefault();

        axios.post('http://localhost:4000/auth/signin', {
            email: this.state.email,
            password: this.state.password,
        })
            .then((response) => {
                if (response) {
                    const user = {
                        email: this.state.email,
                        name: this.state.email
                    };
                    this.setState({ email: '', password: '' });
                    this.props.dispatchSetCurrentUser(user);
                }
                if (response.data.accessToken) {
                    localStorage.setItem("accessToken", response.data.accessToken);
                    this.redirectToUserLoggedIn();



                };
            }).catch(error => {
                this.setState({ showFailureNotification: true });

            });
    }
        ;

    handleChange = (event: { target: { value: string; name: string } }) => {
        type nameTypes = 'email';
        const { value, name }: { value: string, name: string } = event.target;
        const castName: nameTypes = name as nameTypes;

        this.setState({ [castName]: value });
    };



    render() {
        return (
            <div className='sign-in'>
                <Form className='form' onSubmit={this.handleSubmit}>
                    <Box className="sign-in-box" background="white" border gap="small" pad="medium" width="medium">
                        <FormField>
                            <TextInput
                                onChange={this.handleChange}
                                value={this.state.email}
                                type='text'
                                className="form-input"
                                name="email"
                                placeholder="Email"
                            ></TextInput>
                        </FormField>
                        <FormField>
                            <TextInput
                                onChange={this.handleChange}
                                value={this.state.password}
                                type='password'
                                className="form-input"
                                name="password"
                                placeholder="Password"
                            />
                        </FormField>
                        <CustomButton primary onChange={this.handleSubmit} type='submit' label='Log in' />
                        <CustomButton secondary icon={<Facebook />} onChange={this.handleSubmit} className='facebook-button' name='fb' type='submit' label="Log in with Facebook" />
                        <CustomButton secondary icon={<Google />} onChange={this.handleSubmit} className='google-button' name='google' type='submit' label="Log in with Google" />
                        <h1>or</h1>
                        <Link to='/register'><CustomButton icon={<MailOption />} onChange={this.handleSubmit} secondary type='submit' label="Register with email" /></Link>
                    </Box>
                    {
                        this.state.showFailureNotification ?
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

}

const mapDispatchToProps = dispatch => ({
    dispatchSetCurrentUser: (user) => dispatch(setCurrentUser(user))
});

export default withRouter(connect(
    null,
    mapDispatchToProps)
    (SignIn));

