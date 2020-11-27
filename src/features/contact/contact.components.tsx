import React from 'react';
import './contact.components.scss';
import CustomButton from '../../shared/custom-button/custom-button.component';
import { Box, FormField, Button, TextInput, Select, Text, TextArea, Layer } from 'grommet';
import { Add, FormClose, StatusGood, Target } from 'grommet-icons';
import { opendir } from 'fs';


class Contact extends React.Component<{}, { message: any, options: string[], isSelectOpen: boolean, isClose: boolean, isOpen: boolean, selectedOption: string }> {
    constructor(props) {
        super(props);

        this.state = {
            message: "",
            options: ['Problem with Walker', 'Problem with Owner', 'Technical Problem', 'Other issue'],
            selectedOption: "",
            isSelectOpen: false,
            isClose: true,
            isOpen: false,
        }
    };

    handleSelectChange = (option: string) => {
        this.setState({ selectedOption: option });
    };



    onPopUpClose = () => {
        this.setState({ isOpen: false })
    };

    onSubmit = () => {
        this.setState({ isOpen: true })
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
                {this.state.isOpen && (
                    <Layer
                        position="bottom"
                        modal={false}
                        margin={{ vertical: 'medium', horizontal: 'small' }}
                        onEsc={this.onPopUpClose}
                        responsive={false}
                        plain
                    >
                        <Box
                            align="center"
                            direction="row"
                            gap="small"
                            justify="center"
                            round="medium"
                            elevation="medium"
                            pad={{ vertical: 'small', horizontal: 'small' }}
                            background="status-ok"
                        >
                            <Box justify='center' align="center" direction="row" gap="xsmall">
                                <StatusGood />
                                <Text>Message has been sent.</Text>
                            </Box>
                            <Button icon={<FormClose />} onClick={this.onPopUpClose} plain />
                        </Box>
                    </Layer>)}
            </Box>
        );
    };
}
export default Contact;