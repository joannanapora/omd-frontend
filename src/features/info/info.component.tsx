import React from 'react';
import { Link } from 'react-router-dom';
import './info.component.scss';
import { Box, Text } from 'grommet';
import CustomButton from '../../shared/custom-button/custom-button.component';
import { FormNextLink } from 'grommet-icons';

const Info = () => (
    <Box className="info-text" background="white" border gap="medium" pad="large" width="medium">
        <h1>Oh My Dog!</h1>
        <Text>
            Thanks to our free platform, we connect dog owners with dog walkers. You can add service and undertake it yourself.
            When the owner chooses you to take care of his dog, we will enable you to contact each other!
        </Text>
        <Text>
            Collect dog bones for each accepted and completed work.
        dditionally, verify your profile by sending an identity document to gain trust.</Text>
        <Text>Join our Community today!</Text>
        <Link to='/sign-in'><CustomButton secondary icon={<FormNextLink />} label="Go to registration"></CustomButton></Link>
    </Box>
);

export default Info;