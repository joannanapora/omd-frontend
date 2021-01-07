import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Box } from 'grommet';
import { Gallery, Previous } from 'grommet-icons';
import GalleryCard from '../gallery-card/gallery-card.component';
import './my-gallery.styles.scss'
import CustomFilterInput from '../../../shared/custom-filter-input/custom-filter-input.component';
import CustomButton from '../../../shared/custom-button/custom-button.component';

const MyGallery = ({ history }) => {

    let cardList = [
        {
            title: "Ghost",
            key: 7,
            date: "12.12.2012",
            description: "Pogoda byla zła, złe warunki pogodowe i..ii... i pogoda tez był zła ",
            image: 'https://static.fajnyzwierzak.pl/media/uploads/media_image/original/wpis/498/cena-chihuahua.jpg',

        },
        {
            title: "Holly",
            key: 8,
            date: "05.05.2005",
            description: "Pogoda byla zła, złe warunki pogodowe i..ii... i pogoda tez był zła ",
            image: 'https://www.k9web.com/wp-content/uploads/2019/05/White-German-Shepherd-4-780x637.jpg'

        },
    ];

    const [searchInput, handleSearchInput] = useState("")


    const handleChange = (event) => {
        handleSearchInput(event.target.value)
    };

    const redirectToGalleryPage = () => {
        if (history)
            history.push('/gallery');
    };

    const filteredCardList = () => {
        const list = cardList.filter(card =>
            card.title.toLowerCase().includes(searchInput.toLowerCase()
            ));
        return list;
    };

    cardList = filteredCardList();

    return (
        <div className='gallery'>
            {
                cardList.length > 0 ?
                    <Box
                        height="80%"
                        overflow={{ horizontal: "auto", vertical: "hidden" }}
                        direction="row"
                        align="center"
                        gap="small">
                        {cardList.map(element => (
                            <GalleryCard
                                id={element.key}
                                date={element.date}
                                title={element.title}
                                description={element.description}
                                image={element.image}
                            />
                        ))}
                    </Box> :
                    <Box
                        height="80%"
                        justify="center"
                        pad="medium" align='center' background="white" round gap="small">
                        <div className="no-image">
                            No Results
                                    </div>
                    </Box>
            }
            <Box className='search'
                height="20%"
                border={false}
                pad="xxsmall"
                gap="small">
                <div className="search-box">
                    <div className='filter-button'>
                        <CustomButton onClick={redirectToGalleryPage} label="Go Back" icon={<Previous />} primary />
                    </div>
                    <CustomFilterInput name='search-images' onChange={handleChange} />
                    <div className='filter-button'><CustomButton disabled label="My Gallery" icon={<Gallery />} primary /></div>
                </div>
            </Box>
        </div >
    )
}

export default withRouter(MyGallery);
