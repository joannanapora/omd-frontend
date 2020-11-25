import React from 'react';
import './contact.components.scss';
import CustomButton from '../../shared/custom-button/custom-button.component';
import { Box, FormField, TextInput, Select, Text, TextArea } from 'grommet';


class Contact extends React.Component<{}, { email: any, subject: any, message: any, options: string[], isSelectOpen: boolean }> {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            subject: "",
            message: "",
            options: ['Problem with Walker', 'Problem with Owner', 'Technical Problem', 'Other issue'],
            isSelectOpen: false
        }
    };

    handleSelectChange = (option: string) => {
        this.setState({ subject: option });
    };


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
                        value={this.state.subject}
                        options={this.state.options}
                        onChange={({ option }) => this.handleSelectChange(option)}
                    />
                </FormField>
                <FormField htmlFor="enabled-id" name="enabled" label="">
                    <TextArea name="value" placeholder="Message..." />
                </FormField>
                <CustomButton type='submit'> Send Message </CustomButton>
            </Box>
        );
    }
}

export default Contact;