import React, { useState } from 'react';
import { Box } from 'grommet';
import GalleryCard from './gallery-card.component';
import './gallery.styles.scss'
import CustomFilterInput from '../../shared/custom-filter-input/custom-filter-input.component';

const Gallery = () => {

    let cardList = [
        {
            title: "Aron",
            key: 1,
            date: "10.10.2010",
            description: "Pogoda byla zła, złe warunki pogodowe i..ii... i pogoda tez był zła ",
            image: 'https://media.newyorker.com/photos/5f6cd4dbe1656cfb9de92e71/master/w_2560%2Cc_limit/Gupta-DogTourofHouse.jpg',
        },
        {
            title: "Baron",
            key: 2,
            date: "12.12.2012",
            description: "Pogoda byla zła, złe warunki pogodowe i..ii... i pogoda tez był zła ",
            image: 'https://www.cesarsway.com/wp-content/uploads/2019/10/AdobeStock_190562703-1024x713.jpeg',

        },
        {
            title: "Cesar",
            key: 3,
            date: "05.05.2005",
            description: "Pogoda byla zła, złe warunki pogodowe i..ii... i pogoda tez był zła ",
            image: 'https://e3.365dm.com/20/08/2048x1152/skynews-boston-terrier-dogs_5072214.jpg'

        },
        {
            title: "Donatan",
            key: 4,
            date: "12.12.2012",
            description: "Pogoda byla zła, złe warunki pogodowe i..ii... i pogoda tez był zła ",
            image: 'https://0.allegroimg.com/original/12ad91/4a2d886a43c59c23844d136d6a00',

        },
        {
            title: "Emily",
            key: 5,
            date: "05.05.2005",
            description: "Pogoda byla zła, złe warunki pogodowe i..ii... i pogoda tez był zła ",
            image: "https://static.fajnyzwierzak.pl/media/uploads/media_image/auto/entry-content/472/mobile/piesel-shiba-inu.jpg"
        },
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
                    <div className="filter-cards">
                        <CustomFilterInput onChange={handleChange} /></div>
                </div>
            </Box>
        </div>
    )
}

export default Gallery;
