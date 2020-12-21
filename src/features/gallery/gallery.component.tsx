import React from 'react';
import { Box } from 'grommet';
import GalleryCard from './gallery-card.component';
import './gallery.styles.scss'
import CustomFilterInput from '../../shared/custom-filter-input/custom-filter-input.component';

class Gallery extends React.Component<{}, { cardList: any[], searchInput: string }> {
    constructor(props: any) {
        super(props);

        this.state = {
            searchInput: "",
            cardList: [
                {
                    title: "Aron",
                    key: 1,
                    date: "10.10.2010",
                    description: "bylo fajnie",
                    image: 'https://media.newyorker.com/photos/5f6cd4dbe1656cfb9de92e71/master/w_2560%2Cc_limit/Gupta-DogTourofHouse.jpg',
                },
                {
                    title: "Baron",
                    key: 2,
                    date: "12.12.2012",
                    description: "bylo super",
                    image: 'https://www.cesarsway.com/wp-content/uploads/2019/10/AdobeStock_190562703-1024x713.jpeg',

                },
                {
                    title: "Cesar",
                    key: 3,
                    date: "05.05.2005",
                    description: "bylo git",
                    image: 'https://e3.365dm.com/20/08/2048x1152/skynews-boston-terrier-dogs_5072214.jpg'

                },
                {
                    title: "Donatan",
                    key: 4,
                    date: "12.12.2012",
                    description: "bylo super",
                    image: 'https://0.allegroimg.com/original/12ad91/4a2d886a43c59c23844d136d6a00',

                },
                {
                    title: "Emily",
                    key: 5,
                    date: "05.05.2005",
                    description: "bylo git",
                    image: "https://static.fajnyzwierzak.pl/media/uploads/media_image/auto/entry-content/472/mobile/piesel-shiba-inu.jpg"
                },
                {
                    title: "Franklin",
                    key: 6,
                    date: "10.10.2010",
                    description: "bylo fajnie",
                    image: 'https://lh3.googleusercontent.com/proxy/qfcqC9HnN31hHKxb9fwSGCvCuPWhQrS2AK8SVdKUAao1ODu0WbUKK4kTPJhjfG9EqhFaX6VrR9rTjwbU4a1qwnSvmMtUtCw4cDK6e6hf8H5SYScDodBuDUpwy6HgxcFqHdQzm1M',
                },
                {
                    title: "Ghost",
                    key: 7,
                    date: "12.12.2012",
                    description: "bylo super",
                    image: 'https://static.fajnyzwierzak.pl/media/uploads/media_image/original/wpis/498/cena-chihuahua.jpg',

                },
                {
                    title: "Holly",
                    key: 8,
                    date: "05.05.2005",
                    description: "bylo git",
                    image: 'https://www.k9web.com/wp-content/uploads/2019/05/White-German-Shepherd-4-780x637.jpg'

                },
            ],
        };
    }

    handleChange = (event) => {
        this.setState({ searchInput: event.target.value })
    };


    filteredCardList = () => {
        const lista = this.state.cardList.filter(card =>
            card.title.toLowerCase().includes(this.state.searchInput.toLowerCase()
            ));

        console.log(lista)
        return lista;
    }


    render() {
        const cardList: any[] = this.filteredCardList();

        return (
            <Box
                className="gallery-box"
                margin='xlarge'
                pad="large"
                background={{ color: 'light-2', opacity: 'strong' }}
                gap="small"
            ><div className='gallery-cards'>
                    {cardList.map(element => (
                        <GalleryCard
                            key={element.key}
                            date={element.date}
                            title={element.title}
                            description={element.description}
                            image={element.image}
                        />
                    ))}
                </div>
                <div className="search-box">
                    <CustomFilterInput onChange={this.handleChange} />
                </div>
            </Box>


        )
    }
}
export default Gallery;
