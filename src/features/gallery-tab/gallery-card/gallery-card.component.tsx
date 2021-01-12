import React, { useState } from 'react';
import { Box, Text, Card, CardBody, CardHeader, Image, Stack, Button, } from 'grommet';

import Modal from 'react-modal';

import './gallery-card.styles.scss'

import { Trash } from 'grommet-icons';

const GalleryCard = ({ onClick, id, image, date, description, title, displayImageActions }) => {

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            border: 'none'

        }
    };

    return (
        <Box width={{ max: 'medium', min: '18vw' }} height={{ max: 'medium', min: 'medium' }} className='gallery-card-box'
            align='center' background="white" round gap="small">
            <Card border={{ color: 'brand', size: 'medium' }}>
                <Stack className="header-stack" anchor="bottom-left">
                    <CardBody height="medium">
                        <Image
                            key={id}
                            fit="cover"
                            src={image}
                            alt='dog' />
                    </CardBody>
                    <CardHeader
                        pad={{ horizontal: 'small', vertical: 'small' }}
                        background="#000000A0"
                        width="medium"
                        justify="start">
                        <Box width="100%">
                            <div className='photo-buttons'>
                                <div>{title}</div>
                                {displayImageActions ?
                                    <div>
                                        <Button color='white' onClick={onClick} icon={<Trash />}></Button>
                                    </div>
                                    :
                                    null
                                }
                            </div>

                            <Text size="small">{date}</Text>
                            <Text size="small">{description} </Text>
                        </Box>

                    </CardHeader>
                </Stack>
            </Card >
        </Box >
    )
};

export default GalleryCard;