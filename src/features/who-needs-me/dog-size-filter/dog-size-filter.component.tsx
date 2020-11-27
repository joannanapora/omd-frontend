import React from 'react';

import './dog-size-filter.component'

import { FormClose } from 'grommet-icons';
import { Box, Button, Grommet, Select, Text } from 'grommet';
import CustomButton from '../../../shared/custom-button/custom-button.component';


class SizeFilter extends React.Component<{}, { allWeights: any[], selected: any[] }> {
    constructor(props) {
        super(props);

        this.state = {
            allWeights: ['< 4kg', '4-10kg', '11-18kg', '19-34kg', ' > 35kg'],
            selected: []
        }

    };

    onSelect = (props) => {
        console.log(props)
        this.setState({ selected: props })
        console.log(this.state)
    };

    onRemoveSeason = season => {
        const seasonIndex = this.state.allWeights.indexOf(season);
        this.onSelect(
            this.state.selected.filter(selectedSeason => selectedSeason !== seasonIndex),
        );
    };

    renderSeason = season => (
        <CustomButton
            key={`season_tag_${season}`}
            href="#"
            onClick={event => {
                event.preventDefault();
                event.stopPropagation();
                this.onRemoveSeason(season);
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
                            {this.state.selected && this.state.selected.length ? (
                                this.state.selected.map(index => this.renderSeason(this.state.allWeights[index]))
                            ) : (
                                    <Box
                                        pad={{ vertical: 'small', horizontal: 'small' }}
                                        margin="small"
                                    >
                                        Weight
                                    </Box>
                                )}
                        </Box>
                    }
                    options={this.state.allWeights}
                    selected={this.state.selected}
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

export default SizeFilter;