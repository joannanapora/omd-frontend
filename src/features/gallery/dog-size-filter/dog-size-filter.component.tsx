import React, { useState } from 'react';
import './dog-size-filter.component'
import { Box, Select } from 'grommet';

const options = ['very small', 'small', 'medium', 'large'];

const SizeFilter = () => {
    const [value, setValue] = useState(['one']);

    return (
        <Box className="size-filter" fill align="center" justify="start" width="medium">
            <Select
                placeholder="dog size"
                multiple
                closeOnChange={false}
                value={value}
                options={options}
                onChange={({ value: nextValue }) => setValue(nextValue)}
            />
        </Box>
    );
};



export default SizeFilter;