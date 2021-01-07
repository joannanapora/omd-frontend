import React from 'react';

import { Search } from 'grommet-icons';
import { Box, TextInput } from 'grommet';
import './custom-filter-input.styles.scss';


const CustomFilterInput = ({ name, onChange }) => (
    <Box fill>
        <div className='custom-input'>
            <TextInput name={name} onChange={onChange} icon={<Search />} reverse placeholder="search ..." />
        </div>
    </Box >
)
export default CustomFilterInput;