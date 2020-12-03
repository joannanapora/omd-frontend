import React from 'react';
import './info.component.scss';
import { Box, Text } from 'grommet';


const Info = () => (
    <Box className="info-text" background="white" border gap="medium" pad="large" width="medium">
        <Text><h1 className="info-title">
            OH MY DOG!</h1>
        </Text>
        <Text className="info-descript">
            Search for your dog walking assistance with Oh My Dog!
            We operate throughout London. With us you can easly add a service request,
            perform a serive or just
            see how it works in our gallery
            Join us and meet our community!
            </Text>
        <Text className="info-footer">
            Join us and meet our community!
            <img alt="dog-walker" src="https://www.flaticon.com/svg/static/icons/svg/53/53086.svg" />
        </Text>
    </Box>
);

export default Info;