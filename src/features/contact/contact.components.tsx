import React from 'react';
import axios from 'axios';

import { Box, FormField, Select, TextArea } from 'grommet';
import { Send } from 'grommet-icons';

import './contact.components.scss';
import Notification, { Status } from '../../shared/custom-notification/custom-notification.component';
import CustomButton from '../../shared/custom-button/custom-button.component';
import { ContactSubject } from '../../models/enums';

class Contact extends React.Component<{}, { options: string[], message: any, isSelectOpen: boolean, showNotification: boolean, selectedOption: string }> {
    constructor(props) {
        super(props);

        this.state = {
            message: "",
            options: ['Problem with Walker', 'Problem with Owner', 'Technical Problem', 'Other issue'],
            selectedOption: "",
            isSelectOpen: false,
            showNotification: false,
        }
    };

    handleSelectChange = (option: string) => {
        this.setState({ selectedOption: option });
    };

    mapOptionsToContactSubject = (option): ContactSubject => {
        if (option === 'Problem with Walker') {
            return ContactSubject.PROBLEM_WITH_WOKER;
        }
        if (option === 'Problem with Owner') {
            return ContactSubject.PROBLEM_WITH_OWNER;
        }
        if (option === 'Technical Problem') {
            return ContactSubject.TECHNICAL_PROBLEM;
        }

        return ContactSubject.OTHER;
    }


    onSubmit = () => {
        console.log("Bearer " + localStorage.getItem('accessToken'));

        const config = {
            headers: { Authorization: "Bearer " + localStorage.getItem('token') }
        };

        axios.post('http://localhost:4000/contacts', {
            message: this.state.message,
            subject: this.mapOptionsToContactSubject(this.state.selectedOption)
        }, config).then(() => {
            this.setState({ showNotification: true })
            this.setState({ message: '', selectedOption: "" })
        }).catch(e => {
            console.log(e);
        })

    };

    handleMessageChange = event => (
        this.setState({ message: event.target.value })
    );
    render() {
        return (
            <Box className="contact" background="white" border gap="medium" pad="large" width="medium">
                <h1 className="contact-box"> Contact Us </h1>
                <FormField htmlFor="enabled-id" name="enabled" label="">
                    <Select
                        id="select"
                        name="select"
                        placeholder="Select subject"
                        open={this.state.isSelectOpen}
                        value={this.state.selectedOption}
                        options={this.state.options}
                        onChange={({ option }) => this.handleSelectChange(option)}
                    />
                </FormField>
                <FormField htmlFor="enabled-id" name="enabled" label="">
                    <TextArea onChange={this.handleMessageChange} value={this.state.message} placeholder="Message..." />
                </FormField>
                <Box fill align="center" justify="center">
                    <CustomButton disabled={!(this.state.message && this.state.selectedOption)}
                        onClick={this.onSubmit} icon={<Send />} label="Send">
                        Send
                        </CustomButton>
                </Box>
                {
                    this.state.showNotification ?
                        <Notification
                            status={Status.SUCCESS}
                            text={"Message has been sent"}>
                        </Notification>
                        :
                        null
                }
            </Box>
        );
    };
}
export default Contact;