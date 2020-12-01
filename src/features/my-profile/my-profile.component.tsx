import React from 'react';
import './my-profile.component.scss'

import OwnerPage from './owner-page.component';
import WalkerPage from './walker-page.component';
import { Box, CheckBox, Form, FormField, TextInput, Text, MaskedInput } from 'grommet';
import Notification, { Status } from '../../shared/custom-notification/custom-notification.component';
import CustomButton from '../../shared/custom-button/custom-button.component';
import { Target } from 'grommet-icons';


class MyProfile extends React.Component<{}, { email: string, phoneNumber: any, postCode: any, showNotification: boolean, name: string, surname: string, value: string, isCheckedOwner: boolean, isCheckedWalker: boolean, isReadOnly: boolean }> {
    constructor(props) {
        super(props);

        this.state = {
            isCheckedOwner: false,
            isCheckedWalker: false,
            name: "",
            surname: "",
            email: "",
            postCode: "",
            phoneNumber: "",
            isReadOnly: false,
            showNotification: false,
            value: "",
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
    handleEdit = () => {
        this.setState({ isReadOnly: false });
        this.setState({ showNotification: false });
    }

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
        } if (event.target.name === "email") {
            this.setState({
                email: event.target.value
            }
            )
        } if (event.target.name === "postCode") {
            this.setState({
                postCode: event.target.value
            }
            )
        } if (event.target.name === "phoneNumber") {
            this.setState({
                phoneNumber: event.target.value
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
                                    placeholder="Name*"
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
                                    placeholder="Surname*"
                                    name="surname"
                                    disabled={this.state.isReadOnly}
                                />
                            </FormField>
                            <FormField htmlFor="enabled-id" label="">
                                <TextInput
                                    onChange={this.handleChange}
                                    className="form-input"
                                    id="enabled-id"
                                    value={this.state.postCode}
                                    placeholder="Post Code"
                                    name="postCode"
                                    disabled={this.state.isReadOnly}
                                />
                            </FormField>
                            <FormField htmlFor="enabled-id" label="">
                                <TextInput
                                    onChange={this.handleChange}
                                    className="form-input"
                                    id="enabled-id"
                                    value={this.state.email}
                                    placeholder="E-mail"
                                    name="email"
                                    disabled={this.state.isReadOnly}
                                />
                            </FormField>
                            <FormField htmlFor="enabled-id" label="">
                                <MaskedInput
                                    mask={[
                                        {
                                            length: 5,
                                            regexp: /^[0-9]{1,5}$/,
                                            placeholder: 'Phone',
                                        },
                                        { fixed: '-' },
                                        {
                                            length: 6,
                                            regexp: /^[0-9]{1,6}$/,
                                            placeholder: 'number',
                                        },
                                    ]}
                                    value={this.state.phoneNumber}
                                    onChange={this.handleChange}
                                    className="form-input"
                                    id="enabled-id"
                                    placeholder=""
                                    name="phoneNumber"
                                    disabled={this.state.isReadOnly}
                                />
                            </FormField>
                        </Form>
                    </div>
                    <Text margin={{ left: 'small' }} size="small" color="status-critical">
                        * Required field.</Text>
                    <div className='buttons'>
                        <CustomButton onClick={this.handleEdit}>Edit</CustomButton>
                        <CustomButton type='submit' onClick={this.handleSubmit} disabled={!(this.state.name && this.state.surname) || this.state.isReadOnly}>Save</CustomButton>
                    </div>
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

