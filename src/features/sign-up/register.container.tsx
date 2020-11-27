import React from 'react';
import './register.container.scss';
import { Link, Router } from 'react-router-dom';

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
        const { password, confirmPassword } = this.state;

        if (password !== confirmPassword) {
            alert("passwords don't match");
            return;
        }
        this.setState({ email: '', password: '', confirmPassword: '' });
    };

    handleChange = (event: { target: { value: string; name: string } }) => {
        type nameTypes = 'email';
        const { value, name }: { value: string, name: string } = event.target;
        const castName: nameTypes = name as nameTypes;

        this.setState({ [castName]: value });
    };


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
                            />
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
                        <Link to='/confirmation'>
                            <CustomButton
                                disabled={!(this.state.email && this.state.password && this.state.confirmPassword)}
                                type='submit'>Submit</CustomButton>
                        </Link>
                    </Box>
                </Form>
            </div >
        )
    }

}

export default Register;

