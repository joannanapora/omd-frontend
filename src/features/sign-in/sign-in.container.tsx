import React from 'react';
import './sign-in.container.scss';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Box, Form, FormField, TextInput } from 'grommet';

import CustomButton from '../../shared/custom-button/custom-button.component';
import { setCurrentUser } from '../../store/user';
import { connect } from 'react-redux';

class SignIn extends React.Component<{ dispatchSetCurrentUser }, { password: any, email: any }> {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",

        }
    }

    handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText)
        }
        return response;
    }
    handleSubmit = event => {
        event.preventDefault();

        // const requestOptions = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         username: this.state.email,
        //         password: this.state.password,
        //     })
        // };

        axios.post('http://localhost:4000/auth/signin', {
            username: this.state.email,
            password: this.state.password,
        })
            .then((data) => {
                if (data) {
                    console.log(data);
                    alert("USER LOGGED IN");
                    const user = {
                        email: this.state.email,
                        name: this.state.email
                    };
                    this.setState({ email: '', password: '' });
                    this.props.dispatchSetCurrentUser(user);
                }
            }).catch(error => { alert("Wrong email or password") })
    };

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
                    <Box className="sign-in-box" background="white" border gap="medium" pad="large" width="medium">
                        <h1>Sign in</h1>
                        <FormField htmlFor="enabled-id" name="enabled" label="">
                            <TextInput
                                onChange={this.handleChange}
                                value={this.state.email}
                                type='text'
                                className="form-input"
                                id="enabled-id"
                                name="email"
                                placeholder="Email"
                            ></TextInput>
                        </FormField>
                        <FormField htmlFor="enabled-id" name="enabled" label="">
                            <TextInput
                                onChange={this.handleChange}
                                value={this.state.password}
                                type='password'
                                className="form-input"
                                id="enabled-id"
                                name="password"
                                placeholder="Password"
                            />
                        </FormField>
                        <CustomButton onChange={this.handleSubmit} type='submit'>Log in</CustomButton>
                        <CustomButton onChange={this.handleSubmit} className='facebook-button' name='fb' type='submit' >Log in with Facebook</CustomButton>
                        <CustomButton onChange={this.handleSubmit} className='google-button' name='google' type='submit' >Log in with Google</CustomButton>
                        <h1>or</h1>
                        <Link to='/register'><CustomButton onChange={this.handleSubmit} type='submit'>Register with email</CustomButton></Link>
                    </Box>

                </Form>
            </div>
        )
    }

}

const mapDispatchToProps = dispatch => ({
    dispatchSetCurrentUser: (user) => dispatch(setCurrentUser(user))
});

export default connect(
    null,
    mapDispatchToProps)
    (SignIn);

