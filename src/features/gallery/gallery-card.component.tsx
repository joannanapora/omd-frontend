import React from 'react';
import { Button, Anchor, Box, Text } from 'grommet';
import { Attraction, Car } from 'grommet-icons';
import './gallery-card.styles.scss'
import LimitedTextarea from '../../shared/custom-textarea/custom-textarea.component';

class GalleryCard extends React.Component<{ key: number, image, date, description, title }, {}> {
    render() {
        return (
            <div className='gallery-card'>
                <Box className='gallery-card-box'
                    pad="medium" align='center' background="white" round gap="small">
                    <h3 className='card-title'>{this.props.title}</h3>
                    <img key={this.props.key} className='dog-image-card' alt='dog-card' src={this.props.image}></img>
                    <Text className='card-description' >{this.props.description}</Text>
                    <Text className='card-date' >{this.props.date}</Text>
                </Box>
            </div>
        )
    }
}


export default GalleryCard;