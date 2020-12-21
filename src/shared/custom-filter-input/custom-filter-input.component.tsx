import React from 'react';

import { Search } from 'grommet-icons';
import { Box, TextInput } from 'grommet';

const CustomFilterInput = ({ onChange }) => (
    <Box fill align="center" justify="start" pad="small">
        <TextInput onChange={onChange} icon={<Search />} reverse placeholder="search ..." />
    </Box>
)
export default CustomFilterInput;