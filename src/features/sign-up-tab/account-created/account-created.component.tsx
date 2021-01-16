import React from 'react';
import './account-created.component.scss';

import { Box, Text } from 'grommet';

const AccountCreated = () => (
    <Box className="account-created" background="white" border gap="medium" pad="xlarge" width="large">
        <Text>Your account has been created.
        You can log in now.</Text>
        <img alt='confirmation-sign' className='confirmation-sign' src="https://www.flaticon.com/svg/static/icons/svg/66/66936.svg"></img>
    </Box>
)

export default AccountCreated;