import React from 'react';
import './my-profile.component.scss'

import OwnerPage from './owner-page.component';
import WalkerPage from './walker-page.component';
import { Box, CheckBox, Form, FormField, TextInput } from 'grommet';
import Notification, { Status } from '../../shared/custom-notification/custom-notification.component';
import CustomButton from '../../shared/custom-button/custom-button.component';


class MyProfile extends React.Component<{}, { showNotification: boolean, name: string, surname: string, isCheckedOwner: boolean, isCheckedWalker: boolean, isReadOnly: boolean }> {
    constructor(props) {
        super(props);

        this.state = {
            isCheckedOwner: false,
            isCheckedWalker: false,
            name: "",
            surname: "",
            isReadOnly: false,
            showNotification: false,
        }
    }

    componentDidMount() {
        // API CALLS FOR USER DETAILS
        if (this.state.name !== "" &&
            this.state.surname !== "") {
            this.setState({ isReadOnly: true })

        } else {
            this.setState({ isReadOnly: false })
        }
    }

    onChange = (event) => {
        if (event.target.name === "owner") {
            this.setState({
                isCheckedOwner: event.target.checked
            })
        } else {
            this.setState({
                isCheckedWalker: event.target.checked
            })
        }
    }

    handleSubmit = () => {
        this.setState({ isReadOnly: true, showNotification: true })
    };

    handleChange = (event) => {
        if (event.target.name === "name") {
            this.setState({
                name: event.target.value
            }
            )
        } if (event.target.name === "surname") {
            this.setState({
                surname: event.target.value
            }
            )
        }
    }
    render() {
        return (
            <div className='account-information'>
                <Box className="account-information" background="white" border gap="medium" pad="large" width="large">
                    <h1>Account information.</h1>
                    <div className="name-surname-form">
                        <Form onSubmit={this.handleSubmit} className='form'>

                            <FormField htmlFor="enabled-id" label="">
                                <TextInput
                                    onChange={this.handleChange}
                                    className="form-input"
                                    id="enabled-id"
                                    value={this.state.name}
                                    placeholder="Name"
                                    name="name"
                                    disabled={this.state.isReadOnly}
                                />
                            </FormField>
                            <FormField htmlFor="enabled-id" label="">
                                <TextInput
                                    onChange={this.handleChange}
                                    className="form-input"
                                    id="enabled-id"
                                    value={this.state.surname}
                                    placeholder="Surname"
                                    name="surname"
                                    disabled={this.state.isReadOnly}
                                />
                            </FormField>

                        </Form>
                    </div>
                    <div className="walker-owner">
                        <Box align='center' pad="large">
                            <CheckBox disabled={!(this.state.name && this.state.surname ||
                                this.state.isReadOnly)} label='Owner' name='owner' checked={this.state.isCheckedOwner} onChange={this.onChange} />
                            {this.state.isCheckedOwner ?
                                <OwnerPage /> : null
                            }
                        </Box>
                        <Box align='center' pad="large">
                            <CheckBox disabled={!(this.state.name && this.state.surname ||
                                this.state.isReadOnly)} label='Walker' name='walker' checked={this.state.isCheckedWalker} onChange={this.onChange} />
                            {this.state.isCheckedWalker ?
                                <WalkerPage /> : null
                            }
                        </Box>
                    </div>
                    <CustomButton type='submit' onClick={this.handleSubmit} disabled={!(this.state.name && this.state.surname) || this.state.isReadOnly}>Save</CustomButton>
                </Box>
                {
                    this.state.showNotification ?
                        <Notification
                            status={Status.SUCCESS}
                            text={"Information saved."}>
                        </Notification>
                        :
                        null
                }
            </div>
        );
    }
};

export default MyProfile;

