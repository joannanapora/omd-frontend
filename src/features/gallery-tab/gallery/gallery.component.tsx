import React, { useEffect, useState, useRef } from 'react';
import { Box } from 'grommet';
import { Add, Gallery } from 'grommet-icons';
import GalleryCard from '../gallery-card/gallery-card.component';
import AddPhoto from '../add-photo/add-photo.component';
import './gallery.styles.scss'
import CustomFilterInput from '../../../shared/custom-filter-input/custom-filter-input.component';
import CustomButton from '../../../shared/custom-button/custom-button.component';
import Modal from 'react-modal';
import { getGallery } from '../../../api';
import { format } from 'date-fns'
import Spinner from '../../../shared/spinner/spinner.component';
import CustomModal from '../../../shared/custom-modal/custom-modal.component';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../../store/user/user.selectors';





const GalleryPage = ({ user, history }) => {

    const [searchInput, setSearchInput] = useState("")
    const [modalIsOpen, setIsOpen] = useState(false);
    const [cardList, setCardList] = useState([]);
    const [loading, setLoading]: [boolean, any] = useState(true);



    useEffect(() => {
        filterGallery();
    }, []);

    const redirectToMyGallery = () => {
        if (history) { history.push('/my-gallery') };
    };

    const filterGallery = (params?: any) => {
        setLoading(true);

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
                console.log(error);
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
                height="80%"
                overflow={{ horizontal: "auto", vertical: "hidden" }}
                direction="row"
                align="center"
                gap="small">
                {cardList.map(element => (
                    <GalleryCard

                        onClick
                        displayImageActions={false}
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
            </Box>)
            ;
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