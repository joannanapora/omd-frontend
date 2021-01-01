import React from 'react';
import './custom-date.styles.scss';

import {
    Box,
    Text,
    Calendar,
    DropButton,
} from 'grommet';

class CustomDate extends React.Component<{ label: string, date: string, onChange, name: string }, { open: boolean }> {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
        }
    };

    setDate = (value) => {
        this.props.onChange({ name: this.props.name, date: value });

    };


    setTime = (event) => {
        this.props.onChange({ name: this.props.name, date: this.props.date })
    };

    onClose = () => { this.setState({ open: false }); };
    setOpen = () => { this.setState({ open: true }) };


    renderDropContent = () => {
        return (
            <Box className="custom-date">
                <Calendar
                    size="small"
                    animate={true}
                    date={this.props.date}
                    onSelect={this.setDate}
                    showAdjacentDays={false}
                    onClick={this.onClose}
                />
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
                <Box direction="row" gap="medium" pad="small">
                    <Text size='small' color={this.props.date ? 'black' : 'black'}>
                        {this.props.date
                            ? `${new Date(this.props.date).toLocaleDateString()}`
                            : this.props.label}
                    </Text>
                </Box>
            </DropButton>
        )
    };
};


export default CustomDate;