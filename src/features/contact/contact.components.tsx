import React from 'react';
import './contact.components.scss';
import CustomButton from '../../shared/custom-button/custom-button.component';
import { Box, FormField, Select, TextArea } from 'grommet';
import Notification, { Status } from '../../shared/custom-notification/custom-notification.component';

class Contact extends React.Component<{}, { message: any, options: string[], isSelectOpen: boolean, showNotification: boolean, selectedOption: string }> {
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
        this.setState({ showNotification: true })
        this.setState({ message: '', selectedOption: "" })
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