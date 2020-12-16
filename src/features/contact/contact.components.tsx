import React from 'react';
import axios from 'axios';

import { Box, FormField, Select, TextArea } from 'grommet';
import { Send } from 'grommet-icons';

import './contact.components.scss';
import Notification, { Status } from '../../shared/custom-notification/custom-notification.component';
import CustomButton from '../../shared/custom-button/custom-button.component';
import { mapOptionsToContactSubject } from '../../models/enums';


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



    onSubmit = () => {
        const config = {
            headers: { Authorization: "Bearer " + localStorage.getItem('accessToken') }
        };
        axios.post('http://localhost:4000/contacts', {
            message: this.state.message,
            subject: mapOptionsToContactSubject(this.state.selectedOption)
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
                <FormField>
                    <Select
                        id="select"
                        name="select"
                        placeholder="Subject"
                        open={this.state.isSelectOpen}
                        value={this.state.selectedOption}
                        options={this.state.options}
                        onChange={({ option }) => this.handleSelectChange(option)}
                    />
                </FormField>
                <FormField>
                    <TextArea className='contact-text-area' onChange={this.handleMessageChange} value={this.state.message} placeholder="Text..." />
                </FormField>
                <Box fill align="center" justify="center">
                    <CustomButton disabled={!(this.state.message && this.state.selectedOption)}
                        primary
                        onClick={this.onSubmit} icon={<Send />} label="Send">
                        Send Message
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