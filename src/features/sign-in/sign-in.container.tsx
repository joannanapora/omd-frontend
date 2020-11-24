import React from 'react';
import './sign-in.container.scss';

import { Link } from 'react-router-dom'
import { Box, Form, FormField, TextInput } from 'grommet';

import { CustomButton } from '../../shared';



class SignIn extends React.Component<{}, { password: any, email: any }> {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        }
    }
    handleSubmit = event => {
        event.preventDefault();

        this.setState({ email: '', password: '' })
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
                <Form className='form' onChange={this.handleChange}>
                    <Box className="sign-in-box" background="white" border gap="medium" pad="large" width="medium">
                        <h1>Sign in</h1>
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
                        <CustomButton onChange={this.handleSubmit} type='submit'>Log in</CustomButton>
                        <CustomButton onChange={this.handleSubmit} className='facebook-button' type='submit' >Log in with Facebook</CustomButton>
                        <CustomButton onChange={this.handleSubmit} className='google-button' type='submit' >Log in with Google</CustomButton>
                        <h1>or</h1>
                        <Link to='/register'><CustomButton type='submit' label='Register with email'></CustomButton></Link>
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

export default SignIn;

