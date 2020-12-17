import React from 'react';

import { FormClose } from 'grommet-icons';
import { Box, FormField, Select, Text } from 'grommet';

import CustomButton from '../custom-button/custom-button.component';



class CustomFilter extends React.Component<{ className: any, selectedOptions: any[], options: string[], name: string, placeholder: string, onChange: any }, { name: string, listOfOptions: string[], placeholder: string }> {
    constructor(props) {
        super(props);

        this.state = {
            name: props.name,
            placeholder: props.placeholder,
            listOfOptions: props.options,
        }

    };

    onSelect = (props) => {
        // this.setState({ selectedOptions: props });
        this.props.onChange({ name: this.props.name, value: props });
    };

    removeOption = season => {
        const seasonIndex = this.state.listOfOptions.indexOf(season);
        const newList = this.props.selectedOptions.filter(selectedSeason => selectedSeason !== seasonIndex);

        this.props.onChange({ name: this.props.name, value: newList });
    };

    renderOptions = season => (
        <CustomButton
            key={`season_tag_${season}`}
            onClick={event => {
                event.preventDefault();
                event.stopPropagation();
                this.removeOption(season);
            }}
            onFocus={event => event.stopPropagation()}
        >
            <Box
                height="30px"
                align="center"
                direction="row"
                background="#d6702b"
            >
                <Text size="xsmall" color="#d6702b">
                    {season}
                </Text>
                <Box background="#d6702b" >
                    <FormClose />
                </Box>
            </Box>
        </CustomButton>
    );


    render() {
        return (
            <FormField className={this.props.className} >
                <Select
                    placeholder={this.props.placeholder}
                    name={this.props.name}
                    closeOnChange={false}
                    multiple
                    value={this.props.selectedOptions}
                    options={this.state.listOfOptions}
                    selected={this.props.selectedOptions}
                    onChange={({ selected: nextSelected }) => {
                        this.onSelect([...nextSelected].sort());
                    }}
                />
            </FormField>
        );
    };
}

export default CustomFilter;