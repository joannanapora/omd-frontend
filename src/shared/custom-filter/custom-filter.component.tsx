import React from 'react';


import { FormClose } from 'grommet-icons';
import { Box, Select, Text } from 'grommet';
import CustomButton from '../custom-button/custom-button.component';


class Filter extends React.Component<{ options: string[], name: string }, { listOfOptions: string[], selectedOptions: any[], placeholder: string }> {
    constructor(props) {
        super(props);

        this.state = {
            placeholder: props.name,
            listOfOptions: props.options,
            selectedOptions: [],
        }

    };

    onSelect = (props) => {
        console.log(props)
        this.setState({ selectedOptions: props })
        console.log(this.state)
    };

    removeOption = season => {
        const seasonIndex = this.state.listOfOptions.indexOf(season);
        this.onSelect(
            this.state.selectedOptions.filter(selectedSeason => selectedSeason !== seasonIndex),
        );
    };

    renderOptions = season => (
        <CustomButton
            key={`season_tag_${season}`}
            href="#"
            onClick={event => {
                event.preventDefault();
                event.stopPropagation();
                this.removeOption(season);
            }}
            onFocus={event => event.stopPropagation()}
        >
            <Box
                height="3px"
                align="center"
                direction="row"
                background="d6702b"
            >
                <Text size="xsmall" color="d6702b">
                    {season}
                </Text>
                <Box background="d6702b" round="medium" margin={{ left: 'medium' }}>
                    <FormClose
                        color="white"
                        size="small"
                        style={{ width: '10px', height: '10px' }}
                    />
                </Box>
            </Box>
        </CustomButton>
    );

    renderOption = (option, state) => (
        <Box pad="small" background={state.active ? 'active' : undefined}>
            <Text>{option}</Text>
        </Box>
    );

    render() {
        return (
            <Box fill align="center" justify="center">
                <Select
                    closeOnChange={false}
                    multiple
                    value={
                        <Box wrap direction="row" width="small">
                            {this.state.selectedOptions && this.state.selectedOptions.length ? (
                                this.state.selectedOptions.map(index => this.renderOptions(this.state.listOfOptions[index]))
                            ) : (
                                    <Box
                                        pad={{ vertical: 'small', horizontal: 'small' }}
                                        margin="small"
                                    >
                                        {this.state.placeholder}
                                    </Box>
                                )}
                        </Box>
                    }
                    options={this.state.listOfOptions}
                    selected={this.state.selectedOptions}
                    onChange={({ selected: nextSelected }) => {
                        this.onSelect([...nextSelected].sort());
                    }}
                >
                    {this.renderOption}
                </Select>
            </Box>
        );
    };
}

export default Filter;