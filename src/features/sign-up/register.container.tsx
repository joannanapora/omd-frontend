import React from 'react';
import './register.container.scss'

import { CustomButton } from '../../shared';
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

        if (password !== confirmPassword) {
            alert("passwords don't match");
            return;
        }

        this.setState({ email: '', password: '' });

    }

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
                <Form className='form'>
                    <Box className="register-box" background="white" border gap="medium" pad="large" width="medium">
                        <h1>Sign up</h1>
                        <FormField htmlFor="enabled-id" name="enabled" label="">
                            <TextInput
                                className="form-input"
                                id="enabled-id"
                                name="enabled"
                                placeholder="Email"
                            />
                        </FormField>
                        <FormField htmlFor="enabled-id" name="enabled" label="">
                            <TextInput
                                type='password'
                                className="form-input"
                                id="enabled-id"
                                name="enabled"
                                placeholder="Password"
                            />
                        </FormField>
                        <FormField htmlFor="enabled-id" name="enabled" label="">
                            <TextInput
                                type='password'
                                className="form-input"
                                id="enabled-id"
                                name="enabled"
                                placeholder="Confirm Password"
                            />
                        </FormField>
                        <CustomButton onChange={this.handleSubmit} type='submit' label='Submit'></CustomButton>
                    </Box>

                </Form>

                {/* <form onSubmit={this.handleSubmit}>

                    <label>EMAIL</label>
                    <input name='email' type='email' value={this.state.email} onChange={this.handleChange} required />

                    <label>PASSWORD</label>
                    <input name='password' type='password' value={this.state.password} onChange={this.handleChange} required />

                    <CustomButton />
                </form> */}
            </div>
        )
    }

}

export default Register;

