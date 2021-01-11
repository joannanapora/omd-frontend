import React from 'react';

import { Search } from 'grommet-icons';
import { Box, TextInput } from 'grommet';
import './custom-filter-input.styles.scss';


const CustomFilterInput = ({ value, name, onChange }) => (
    <Box fill>
        <div className='custom-input'>
            <TextInput value={value} name={name} onChange={onChange} icon={<Search />} reverse placeholder="search ..." />
        </div>
    </Box >
)
export default CustomFilterInput;