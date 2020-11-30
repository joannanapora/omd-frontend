import React from 'react';

import { Box } from 'grommet';

import './who-needs-me.component.scss';
import Filter from '../../shared/custom-filter/custom-filter.component';

class WhoNeedsMe extends React.Component<{}, {}> {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Box className="who-needs-me" background="white" border gap="medium" pad="medium" width="xlarge">
                <h1>Who needs me?</h1>
                <div className="filters">
                    <Filter options={['north', 'north-west', 'north-east', 'west', 'east', 'south', 'south-west', 'south-east']} name="Location"></Filter>
                    <Filter options={['one-time help', 'more than 1 day', 'more than week', 'more than month']} name="Duration"></Filter>
                    <Filter options={['< 4kg', '4-10kg', '11-18kg', '19-34kg', ' > 35kg']} name="Weight"></Filter>
                </div>
                <h1>All avalible quotes: </h1>

            </Box>
        )
    };
};


export default WhoNeedsMe;