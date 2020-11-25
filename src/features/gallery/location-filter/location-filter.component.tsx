import React, { useState } from 'react';

import { Box, Select } from 'grommet';


const options = ['north', 'north-west', 'north-east', 'west', 'east', 'south', 'south-west', 'south-east'];

const LocationFilter = () => {
    const [value, setValue] = useState(['one']);

    return (
        <Box fill align="center" justify="start" >
            <Select
                placeholder="location"
                multiple
                closeOnChange={false}
                value={value}
                options={options}
                onChange={({ value: nextValue }) => setValue(nextValue)}
            />
        </Box>
    );
};



export default LocationFilter;
