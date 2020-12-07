import React from 'react';
import {
    Box,
    Button,
    Text,
    Calendar,
    MaskedInput,
    DropButton,
    FormField,
} from 'grommet';
import CustomButton from '../custom-button/custom-button.component';


class CustomDate extends React.Component<{ date: string, time: string, onChange, name: string }, { open: boolean }> {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
        }
    };

    setDate = (value) => {
        this.props.onChange({ name: this.props.name, date: value, time: this.props.time });

    };


    setTime = (event) => {
        this.props.onChange({ name: this.props.name, date: this.props.date, time: event.target.value })
    };

    onClose = () => { this.setState({ open: false }); };
    setOpen = () => { this.setState({ open: true }) };


    renderDropContent = () => {
        return (
            <Box>
                <Calendar
                    animate={false}
                    date={this.props.date}
                    onSelect={this.setDate}
                    showAdjacentDays={false}
                />
                <Box flex={false} pad="xxsmall" gap="medium">
                    <MaskedInput
                        mask={[
                            {
                                length: [1, 2],
                                options: [
                                    '1',
                                    '2',
                                    '3',
                                    '4',
                                    '5',
                                    '6',
                                    '7',
                                    '8',
                                    '9',
                                    '10',
                                    '11',
                                    '12',
                                ],
                                regexp: /^1[1-2]$|^[0-9]$/,
                                placeholder: 'hh',
                            },
                            { fixed: ':' },
                            {
                                length: 2,
                                options: ['00', '15', '30', '45'],
                                regexp: /^[0-5][0-9]$|^[0-9]$/,
                                placeholder: 'mm',
                            },
                            { fixed: ' ' },
                            {
                                length: 2,
                                options: ['am', 'pm'],
                                regexp: /^[ap]m$|^[AP]M$|^[aApP]$/,
                                placeholder: 'ap',
                            },
                        ]}
                        value={this.props.time}
                        name="maskedInput"
                        onChange={this.setTime}
                    />
                    <Box flex={false}>
                        <CustomButton label="Done" onClick={this.onClose} />
                    </Box>
                </Box>
            </Box>
        );
    };

    render() {
        return (
            <DropButton alignSelf='center'
                open={this.state.open}
                onClose={this.onClose}
                onOpen={this.setOpen}
                dropContent={
                    this.renderDropContent()}>
                <Box direction="row" gap="small" align="center" pad="small">
                    <Text color={this.props.date ? undefined : 'dark-5'}>
                        {this.props.date
                            ? `${new Date(this.props.date).toLocaleDateString()} ${this.props.time}`
                            : 'Select date & time'}
                    </Text>
                </Box>
            </DropButton>
        )
    };
};


export default CustomDate;