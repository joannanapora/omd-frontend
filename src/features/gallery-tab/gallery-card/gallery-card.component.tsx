import React from 'react';
import { Box, Text, Card, CardBody, CardHeader, Image, Stack, Button, } from 'grommet';

import { Trash } from 'grommet-icons';

import './gallery-card.styles.scss'
import Spinner from '../../../shared/spinner/spinner.component';


const GalleryCard = ({ onClick, image, date, description, title, displayImageActions }) => {
    const [imageLoaded, setImageLoaded] = React.useState(false);

    const onImageLoad = () => {
        setImageLoaded(true);
    }

    return (
        <Box
            width={{ max: 'medium', min: '18vw' }}
            height={{ max: 'medium', min: 'medium' }}
            align='center' background="white" round gap="small">
            <Card border={{ color: 'brand', size: 'medium' }}>
                <Stack
                    className="header-stack"
                    anchor="bottom-left">
                    <CardBody
                        className={`smooth-image image-${imageLoaded ? 'visible' : 'hidden'}`}
                        height="medium">
                        <Image
                            onLoad={onImageLoad}
                            fit="cover"
                            src={image}
                            alt='dog' />
                    </CardBody>

                    {!imageLoaded && (
                        <CardBody height="medium">
                            <Spinner />
                        </CardBody>
                    )}

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