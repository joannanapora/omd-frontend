import React from 'react';
import { withRouter } from 'react-router-dom';

import './register.container.scss';

import { validateEmail } from '../../shared/index';
import CustomButton from '../../shared/custom-button/custom-button.component';

import { Box, Form, FormField, TextInput } from 'grommet';

import {postSignUp} from '../../api';

class Register extends React.Component<{ history }, { password: any, email: any, confirmPassword: any }> {
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


        if (!validateEmail(email)) {
            alert("email is wrong");
            return;
        }

        if (password !== confirmPassword) {
            alert("passwords don't match");
            return;
        }


        postSignUp(this.state.email, this.state.password)
            .then((data) => {
                this.setState({ email: '', password: '', confirmPassword: '' });
                this.redirectToAccountCreated();
            })
            .catch(error => { alert("Something went wrong") })

    };

    redirectToAccountCreated = () => {
        const { history } = this.props;
        if (history) history.push('/confirmation');
    }

    handleChange = (event: { target: { value: string; name: string } }) => {
        type nameTypes = 'email';
        const { value, name }: { value: string, name: string } = event.target;
        const castName: nameTypes = name as nameTypes;

        this.setState({ [castName]: value });
    };

    render() {
        return (
            <div className='register'>
                <Form className='register-form' onSubmit={this.handleSubmit}>
                    <Box className="register-box" background="white" border gap="large" pad="large" width="medium">
                        <h1>Create an account</h1>
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
                            primary
                            disabled={!(this.state.email && this.state.password && this.state.confirmPassword)}
                            type='submit'>Submit</CustomButton>

                    </Box>
                </Form>
            </div >
        )
    }

}

export default withRouter(Register);

