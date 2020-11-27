import React from 'react';
import './who-needs-me.component.scss';
import { Box } from 'grommet';
import LocationFilter from './location-filter/location-filter.component';
import SizeFilter from './dog-size-filter/dog-size-filter.component';
import DurationFilter from './duration-filter/duration-filter.component';

const WhoNeedsMe = () => (
    <Box className="who-needs-me" background="white" border gap="medium" pad="medium" width="xlarge">
        <h1>Who needs me?</h1>
        <div className="filters">
            <LocationFilter />
            <SizeFilter />
            <DurationFilter />
        </div>
        <h1>all quotes</h1>
    </Box>
);


export default WhoNeedsMe;