import React from 'react';
import {
    Box,
    Text,
    Card,
    Heading,
    CardBody,
    CardHeader,
    Image,
    Stack,
} from 'grommet';

import './gallery-card.styles.scss'

const GalleryCard = ({ key, image, date, description, title }) => {

    return (
        <Box width={{ max: 'medium', min: 'medium' }} height={{ max: 'medium', min: 'medium' }} className='gallery-card-box'
            align='center' background="white" round gap="small">
            <Card >
                <Stack anchor="bottom-left">
                    <CardBody height="medium">
                        <Image
                            key={key}
                            fit="cover"
                            src={image}
                            alt='dog' />
                    </CardBody>
                    <CardHeader
                        pad={{ horizontal: 'small', vertical: 'small' }}
                        background="#000000A0"
                        width="medium"
                        justify="start">
                        <Box>
                            <Heading level="3" margin="none">
                                {title}
                            </Heading>
                            <Text size="small">{date}</Text>
                            <Text size="small">{description}</Text>
                        </Box>
                    </CardHeader>
                </Stack>
            </Card >
        </Box >
    )
};

export default GalleryCard;