import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { selectCurrentUser } from '../../../store/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import { format } from 'date-fns'

import { Gallery, Previous, FormClose, FormCheckmark } from 'grommet-icons';
import { Box, Text } from 'grommet';

import { getGallery } from '../../../api';

import CustomFilterInput from '../../../shared/custom-filter-input/custom-filter-input.component';
import CustomButton from '../../../shared/custom-button/custom-button.component';
import CustomModal from '../../../shared/custom-modal/custom-modal.component';
import GalleryCard from '../gallery-card/gallery-card.component';
import Spinner from '../../../shared/spinner/spinner.component';
import { ICardDetails } from '../../../models/interfaces/index';
import './my-gallery.styles.scss'


const MyGallery = ({ history, user }) => {
    const [searchInput, setSearchInput]: [string, any] = useState("")
    const [cardList, setCardList]: [ICardDetails[], any] = useState([]);
    const [loading, setLoading]: [boolean, any] = useState(true);
    const [modalIsOpen, openModal]: [boolean, any] = useState(false);

    useEffect(() => {
        filterMyGallery();
    });

    const handleSearchInput = (event) => {
        setSearchInput(event.target.value);
        filterMyGallery({ dogName: event.target.value });
    }

    const redirectToGalleryPage = () => {
        if (history)
            history.push('/gallery');
    };

    const renderSpinnerOrCards = () => {
        return loading ? <Spinner /> : renderCards();
    }

    const filterMyGallery = (params?: any) => {

        if (!params) {
            params = { userId: user.userId }
        } else {
            params = { ...params, userId: user.userId }
        }
        getGallery(params)
            .then((response) => {
                const filteredGallery = response.data.map(image => ({
                    description: image.description,
                    title: image.dogName,
                    date: format(new Date(image.date), 'dd/MM/yyyy'),
                    key: image.id,
                    image: image.url,
                }));
                setLoading(false);
                setCardList(filteredGallery);

            }).catch((error) => {
                setLoading(false);
            });
    };

    const setModal = () => {
        openModal(true)
    }

    const closeModal = () => {
        openModal(false);
    }

    const renderCards = () => {
        return (cardList.length > 0 ?
            <Box
                height="80%"
                overflow={{ horizontal: "auto", vertical: "hidden" }}
                direction="row"
                align="center"
                gap="small">
                {cardList.map(element => (
                    <GalleryCard
                        key={element.key}
                        displayImageActions
                        onClick={setModal}
                        date={element.date}
                        title={element.title}
                        description={element.description}
                        image={element.image}

                    />
                ))}
            </Box>
            :
            <Box
                height="80%"
                justify="center"
                pad="medium" align='center' background="white" round gap="small">
                <div className="no-image">
                    No Results
                </div>
            </Box>)
    };

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
                        <CustomButton onClick={redirectToGalleryPage} label="Go Back" icon={<Previous />} primary />
                    </div>
                    <CustomFilterInput value={searchInput} name='search-images' onChange={handleSearchInput} />
                    <div className='filter-button'><CustomButton disabled label="My Gallery" icon={<Gallery />} primary /></div>
                    {modalIsOpen && (<CustomModal
                        modalIsOpen={modalIsOpen}
                        content={
                            <div className='modal-confirmation'>
                                <div>
                                    <Text>Are you sure you want to delete this photo?</Text></div>
                                <div className='confirmation-buttons'>
                                    <CustomButton onClick={closeModal} label="No" icon={<FormClose />} primary />
                                    <CustomButton onClick={closeModal} label="Yes" icon={<FormCheckmark />} primary />
                                </div>
                            </div>}
                    />)}
                </div>
            </Box>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    user: selectCurrentUser,
});

export default withRouter(connect(
    mapStateToProps,
    null)
    (MyGallery));
