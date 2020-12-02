import React from 'react';
import axios from 'axios';

import { Box, FormField, Select, TextArea } from 'grommet';

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
        const config = {
            headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6bnVsbCwic3ViIjoiMWFkOGYzNjctZDAwZC00ODNmLThiMjAtMTY0NjJjOGVkZTc4IiwiaWF0IjoxNjA2OTA5NTEwLCJleHAiOjE2MDY5MTMxMTB9.QP_4QzV5hlzy_dJ_PHZ4cZ7VNB9jFR_P79-r8sQX2DM` }
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
                    <CustomButton disabled={!(this.state.message && this.state.selectedOption)} onClick={this.onSubmit} >
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