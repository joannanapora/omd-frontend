import React from 'react';
import './my-profile.component.scss'
import axios from 'axios';
import { FormEdit, FormCheckmark } from 'grommet-icons';

import { Box, Form, FormField, Text } from 'grommet';
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
        const config = {
            headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6bnVsbCwic3ViIjoiNWU0ZTVhZmYtODlmOC00YTViLWE4NmItMmZlODU1ODEyNzUyIiwiaWF0IjoxNjA3NDI5NTUzLCJleHAiOjE2MDc0MzMxNTN9.mcgLfMwqCDbnsWzZjvzghZIX9bTqf0gNrn6ebbO3YbQ` }
        };
        axios.get('http://localhost:4000/user', config)
            .then((response) => {
                console.log(response);
                this.setState({ isReadOnly: true });
                this.setState({ name: response.data.name });
                this.setState({ surname: response.data.surname });
                this.setState({ phoneNumber: response.data.phoneNumber });
                this.setState({ postCode: response.data.postCode });
            }).catch(e => {
                this.setState({ isReadOnly: false });
            });
    }


    handleSubmit = () => {
        const config = {
            headers: { Authorization: "Bearer " + localStorage.getItem('accessToken') }
        };

        axios.patch('http://localhost:4000/user', {
            name: this.state.name,
            surname: this.state.surname,
            phoneNumber: this.state.phoneNumber,
            postCode: this.state.postCode,
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
            <Box className="my-profile" background="white" border gap="medium" pad="large" width="medium">
                <h1>My profile</h1>
                <Form onSubmit={this.handleSubmit} className='my-profile-form'>
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
                    <div className='my-profile-buttons'>
                        <CustomButton secondary icon={<FormEdit />} label='Edit' onClick={this.handleEdit} />
                        <CustomButton primary icon={<FormCheckmark />} label='Save' disabled={!(this.state.surname && this.state.name && this.state.phoneNumber && this.state.postCode) || this.state.isReadOnly} type='submit' onClick={this.handleSubmit} />
                    </div>
                    {
                        this.state.showNotification ?
                            <Notification
                                status={Status.SUCCESS}
                                text={"Information saved."}>
                            </Notification>
                            :
                            null
                    }
                </Form>
            </Box>
        );
    }
};

export default MyProfile;

