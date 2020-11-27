import React, { useState } from 'react';

import { Box, Select } from 'grommet';


const options = ['one-time help', 'more than 1 day', 'more than week', 'more than month'];

const DurationFilter = () => {
    const [value, setValue] = useState(['one']);

    return (
        <Box fill align="center" justify="start" >
            <Select
                placeholder="duration"
                multiple
                closeOnChange={false}
                value={value}
                options={options}
                onChange={({ value: nextValue }) => setValue(nextValue)}
            />
        </Box>
    );
};



export default DurationFilter;