import React from 'react';
import './my-profile.component.scss'
import axios from 'axios';

import { Box, CheckBox, Form, FormField, TextInput, Text, MaskedInput } from 'grommet';
import Notification, { Status } from '../../shared/custom-notification/custom-notification.component';
import CustomButton from '../../shared/custom-button/custom-button.component';



class MyProfile extends React.Component<{}, { phoneNumber: any, postCode: any, showNotification: boolean, name: string, surname: string, value: string, isReadOnly: boolean }> {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            surname: "",
            postCode: "",
            phoneNumber: "",
            isReadOnly: false,
            showNotification: false,
            value: "",
        }
    }

    componentDidMount() {
        if (this.state.name !== "" &&
            this.state.surname !== "") {
            this.setState({ isReadOnly: true })

        } else {
            this.setState({ isReadOnly: false })
        }
    }


    handleSubmit = () => {
        const config = {
            headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6bnVsbCwic3ViIjoiMWFkOGYzNjctZDAwZC00ODNmLThiMjAtMTY0NjJjOGVkZTc4IiwiaWF0IjoxNjA2OTEzNjY0LCJleHAiOjE2MDY5MTcyNjR9.Uo8xGSNb07fod0ySTtcaSo_-SEMEwFT1qd8_a3-i2lk` }
        };

        axios.patch('http://localhost:4000/user', {
            name: this.state.name,
            surname: this.state.surname,
            phoneNumber: this.state.phoneNumber
        }, config).then(() => {
            this.setState({ isReadOnly: true, showNotification: true })
        }).catch(e => {
            console.log(e);
        })
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

    FormFieldLabel = props => {
        const { required, label, ...rest } = props;
        return (
            <FormField
                label={
                    required ? (
                        <Box direction="row">
                            <Text>{label}</Text>
                            <Text color="status-critical">*</Text>
                        </Box>
                    ) : (
                            label
                        )
                }
                required={required}
                {...rest}
            />
        );
    };



    render() {
        return (
            <div className='account-information'>
                <Box className="account-information" background="white" border gap="medium" pad="large" width="large">
                    <h1>Account information.</h1>
                    <Text>
                        The following data will not be visible on your profile. We collect them for the safety of users.
                        </Text>
                    <div className="name-surname-form">
                        <Form onSubmit={this.handleSubmit} className='form'>
                            <this.FormFieldLabel label="Name" required
                                onChange={this.handleChange}
                                className="form-input"
                                id="10"
                                value={this.state.name}
                                name="name"
                                message="string"
                                disabled={this.state.isReadOnly}>
                            </this.FormFieldLabel>
                            <this.FormFieldLabel label="Surname" required
                                onChange={this.handleChange}
                                className="form-input"
                                id="20"
                                value={this.state.surname}
                                name="surname"
                                disabled={this.state.isReadOnly}>
                            </this.FormFieldLabel>
                            <this.FormFieldLabel label="Post Code" required
                                onChange={this.handleChange}
                                className="form-input"
                                id="30"
                                value={this.state.postCode}
                                name="postCode"
                                disabled={this.state.isReadOnly}>
                            </this.FormFieldLabel>
                            <this.FormFieldLabel label="Phone Number" required
                                value={this.state.phoneNumber}
                                onChange={this.handleChange}
                                className="form-input"
                                id="40"
                                name="phoneNumber"
                                disabled={this.state.isReadOnly}>

                            </this.FormFieldLabel>
                            <div className='buttons'>
                                <CustomButton onClick={this.handleEdit}>Edit</CustomButton>
                                <CustomButton disabled={!(this.state.surname && this.state.name && this.state.phoneNumber && this.state.postCode) || this.state.isReadOnly} type='submit' onClick={this.handleSubmit}>Save</CustomButton>
                            </div>
                        </Form>
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

