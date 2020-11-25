import React from 'react';
import './artciles.component.scss';
import { Box, Text } from 'grommet';


const Info = () => (
    <div className="info">
        <Box className="info-text" background="white" border gap="medium" pad="large" width="medium">
            <Text><h1 className="info-title">
                Dogs just wanna have fun!</h1>
            </Text>
            <Text className="info-descript">
                We connect those who want with those who are in need.
                Free dog walking assistance for dog owners throughout London. Join us and meet our community!
            </Text>
            <Text className="info-footer">
                Join us and meet our community!
            </Text>
            <div className="info-footer-img">
                <img alt="dog-walker" src="https://www.flaticon.com/svg/static/icons/svg/53/53086.svg" />
            </div>
        </Box>
        <img className="info-img" alt="who-we-are" src="https://images.unsplash.com/photo-1581434293783-79abdca76f3d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" />
    </div >
);

export default Info;