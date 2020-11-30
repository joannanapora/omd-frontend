import React from 'react';
import axios from 'axios';
import './register.container.scss';

import CustomButton from '../../shared/custom-button/custom-button.component';
import { Box, Form, FormField, TextInput } from 'grommet';

class Register extends React.Component<{}, { password: any, email: any, confirmPassword: any }> {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
        }
    }
    handleSubmit = async event => {
        event.preventDefault();

        const { email, password, confirmPassword } = this.state;


        if (!this.validateEmail(email)) {
            alert("email is wrong");
            return;
        }

        if (password !== confirmPassword) {
            alert("passwords don't match");
            return;
        }

        // Simple POST request with a JSON body using fetch
        // const requestOptions = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         username: email,
        //         password: password,
        //     })
        // };

        axios.post('http://localhost:4000/auth/signup', {
            username: this.state.email,
            password: this.state.password,
        })
            .then((data) => {
                alert("USER CREATED!");
                this.setState({ email: '', password: '', confirmPassword: '' });
            })
            .catch(error => { alert("Something went wrong") })

    };

    handleChange = (event: { target: { value: string; name: string } }) => {
        type nameTypes = 'email';
        const { value, name }: { value: string, name: string } = event.target;
        const castName: nameTypes = name as nameTypes;

        this.setState({ [castName]: value });
    };

    validateEmail(email: string): boolean {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }


    render() {
        const { email, password, confirmPassword } = this.state;
        return (
            <div className='register'>
                <Form className='form' onSubmit={this.handleSubmit}>
                    <Box className="register-box" background="white" border gap="medium" pad="large" width="medium">
                        <h1>Sign up</h1>
                        <FormField htmlFor="enabled-id" name="enabled" label="">
                            <TextInput
                                onChange={this.handleChange}
                                value={this.state.email}
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
                        <FormField htmlFor="enabled-id" name="enabled" label="">
                            <TextInput
                                value={this.state.confirmPassword}
                                type='password'
                                className="form-input"
                                id="enabled-id"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                onChange={this.handleChange}
                            />
                        </FormField>

                        <CustomButton
                            disabled={!(this.state.email && this.state.password && this.state.confirmPassword)}
                            type='submit'>Submit</CustomButton>

                    </Box>
                </Form>
            </div >
        )
    }

}

export default Register;

