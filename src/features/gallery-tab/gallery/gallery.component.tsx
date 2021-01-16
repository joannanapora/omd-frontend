import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Add, Gallery } from 'grommet-icons';
import { Box } from 'grommet';

import CustomFilterInput from '../../../shared/custom-filter-input/custom-filter-input.component';
import CustomButton from '../../../shared/custom-button/custom-button.component';
import CustomModal from '../../../shared/custom-modal/custom-modal.component';
import GalleryCard from '../gallery-card/gallery-card.component';
import Spinner from '../../../shared/spinner/spinner.component';
import { ICardDetails } from '../../../models/interfaces/index';
import AddPhoto from '../add-photo/add-photo.component';
import './gallery.styles.scss'

import { getGallery } from '../../../api';

import { format } from 'date-fns'

import { selectCurrentUser } from '../../../store/user/user.selectors';
import { createStructuredSelector } from 'reselect';


const GalleryPage = ({ user, history }) => {

    const [searchInput, setSearchInput]: [string, any] = useState("")
    const [modalIsOpen, setIsOpen]: [boolean, any] = useState(false);
    const [cardList, setCardList]: [ICardDetails[], any] = useState([]);
    const [loading, setLoading]: [boolean, any] = useState(true);

    useEffect(() => {
        filterGallery();
    }, []);

    const redirectToMyGallery = () => {
        if (history) { history.push('/my-gallery') };
    };


    const filterGallery = (params?: any) => {
        setLoading(true)
        getGallery(params)
            .then((response) => {
                const filteredGallery = response.data.map(image => ({
                    description: image.description,
                    title: image.dogName,
                    date: format(new Date(image.date), 'dd/MM/yyyy'),
                    key: image.id,
                    image: image.url,
                }));
                setCardList(filteredGallery);
                setLoading(false);
            }).catch((error) => {
                setLoading(false);
            });
    };

    const handleSearchInput = (event) => {
        setSearchInput(event.target.value);
        filterGallery({ dogName: event.target.value });
    }

    function openModal() {
        setIsOpen(true);
    }

    const closeModal = (isNewPhotoAdded) => {
        if (isNewPhotoAdded) {
            filterGallery();
        }
        setIsOpen(false);
    }

    const renderSpinnerOrCards = () => {
        return loading ? <Spinner /> : renderCards();
    }

    const renderCards = () => {

        return (cardList.length > 0 ?
            <Box
                className="smooth-image-wrapper"
                height="80%"
                overflow={{ horizontal: "auto", vertical: "hidden" }}
                direction="row"
                align="center"
                gap="small">
                {cardList.map(element => (
                    <GalleryCard
                        key={element.key}
                        onClick
                        displayImageActions={false}
                        date={element.date}
                        title={element.title}
                        description={element.description}
                        image={element.image}
                    />
                ))}


            </Box> :
            <Box
                width='auto'
                height="80%"
                justify="center"
                pad="medium" align='center' border={{ color: 'brand', size: 'medium' }} background="white" round gap="small">
                <div className="no-image">
                    No Results
                                </div>
            </Box>)
    }

    return (
        <div className='gallery'>
            {renderSpinnerOrCards()}
            <Box className='search'
                height="20%"
                border={false}
                pad="xxsmall"
                gap="small">
                <div className="search-box">
                    <div className='filter-button'>
                        <CustomButton onClick={openModal} label="Add Photo" icon={<Add />} primary />
                    </div>
                    {modalIsOpen &&
                        (<CustomModal
                            modalIsOpen={modalIsOpen}
                            content={<AddPhoto onClose={closeModal} />}
                        />)
                    }
                    <CustomFilterInput value={searchInput} name='search-images' onChange={handleSearchInput} />
                    <div className='filter-button'>
                        <CustomButton onClick={redirectToMyGallery} disabled={!user} label="My Gallery" icon={<Gallery />} primary />
                    </div>
                </div>
            </Box>
        </div >
    );
};

const mapStateToProps = createStructuredSelector({
    user: selectCurrentUser,
});

export default withRouter(connect(
    mapStateToProps,
    null)
    (GalleryPage));