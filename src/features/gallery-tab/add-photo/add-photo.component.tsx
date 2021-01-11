import React, { useState } from 'react';

import ImageUploading from 'react-images-uploading'

import { Box, FormField, DateInput, TextArea, TextInput } from 'grommet';
import { Image, Close } from 'grommet-icons';

import { postImage, postGallery } from '../../../api';

import Spinner from '../../../shared/spinner/spinner.component';
import CustomButton from '../../../shared/custom-button/custom-button.component';
import Notification, { Status } from '../../../shared/custom-notification/custom-notification.component';
import './add-photo.styles.scss';


const AddPhoto = ({ onClose }) => {
    const [okNotification, showOkNotification]: [boolean, any] = useState(false);
    const [errorNotification, showErrorNotification]: [boolean, any] = useState(false);
    const [loading, setLoading]: [boolean, any] = useState(false);

    const [description, setDescription]: [string, any] = useState("");
    const [dogName, setDogName]: [string, any] = useState("");
    const [date, setDate]: [any, any] = useState(null);
    const [imageId, setImageId]: [string, any] = useState("");

    const [imageList, setImageList]: [[], any] = useState([]);

    const [isNewPhotoAdded, setNewPhotoAdded] = useState(false)

    const onSelectImage = (imageList: any[]) => {
        if (imageList.length === 0) {
            setImageList(imageList)
            return;
        } else {
            setLoading(true)
            postImage(imageList[0].file)
                .then((result) => {
                    setImageList(imageList)
                    setImageId(result.data.id);
                    setLoading(false);
                }
                ).catch(error => {
                    console.log(error)
                    if (error.status === 404) {
                        showErrorNotification(true)
                        setLoading(false);
                    }
                }
                )
        };
    };

    const handleSubmit = () => {
        setNewPhotoAdded(true)
        postGallery(
            imageId,
            description,
            dogName,
            date
        ).then(() => {
            showErrorNotification(false);
            showOkNotification(true);
            setDescription('');
            setDate('');
            setDogName('');
            setImageList([]);
        }).catch(error => {
            console.log(error)
        })
    }

    const handleInputChange = (event) => {
        if (event.target.name === 'dogName') {
            setDogName(event.target.value);
        }
        else {
            setDescription(event.target.value)
        }
    }

    const renderImageDropbox = () => {
        return (
            loading ?
                (<Spinner />) :
                <Box
                    height='100%'
                    justify='center'
                    alignSelf='center'
                    width='medium'
                    pad="small"
                    border={[
                        { size: 'medium', style: 'dotted' },
                    ]}
                >
                    <ImageUploading
                        value={imageList}
                        onChange={onSelectImage}
                        maxNumber={1}
                        dataURLKey="data_url"
                    >
                        {({
                            imageList,
                            onImageUpload,
                            onImageUpdate,
                            onImageRemove,
                            dragProps,
                        }) => (
                            <div className="upload__image-wrapper">
                                <CustomButton
                                    icon={<Image />}
                                    primary
                                    label='Upload Image'
                                    onClick={onImageUpload}
                                    {...dragProps}
                                    color='grey'
                                ></CustomButton>

                            &nbsp;
                                {imageList.map((image, index) => (
                                    <div key={index} className="image-item">
                                        <img src={image['data_url']} alt="" width="250" />
                                        <div className="remove-update-buttons">
                                            <CustomButton type='submit' label='Update' secondary onClick={(index) => onImageUpdate(index)} />
                                            <CustomButton type='submit' label='Remove' secondary onClick={(index) => onImageRemove(index)} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </ImageUploading>
                </Box>
        );
    }

    const renderImage = () =>
        <ImageUploading
            value={imageList}
            onChange={onSelectImage}
            maxNumber={1}
            dataURLKey="data_url"
        >
            {({
                imageList,
                onImageUpdate,
                onImageRemove,

            }) => (
                <div className="upload__image-wrapper">
                    &nbsp;
                    {imageList.map((image, index) => (
                        <div key={index} className="image-item">
                            <img src={image['data_url']} alt="" width="250" />
                            <div className="remove-update-buttons">
                                <CustomButton type='submit' label='Update' secondary onClick={(index) => onImageUpdate(index)} />
                                <CustomButton type='submit' label='Remove' secondary onClick={(index) => onImageRemove(index)} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </ImageUploading>
        ;

    const onHandleClose = () => {
        onClose(isNewPhotoAdded);
    }

    return (
        <Box className="photo-box" border={{ color: 'brand', size: 'medium' }} gap="xsmall" pad="small" width="large" >
            <div className='add-photo-headers'>
                <div className='paw'><img alt='paw' src="https://www.flaticon.com/svg/static/icons/svg/676/676163.svg" /></div>
                <div><h1>Add New Photo</h1></div>
                <div><CustomButton onClick={onHandleClose} secondary icon={<Close />} /></div>
            </div>
            <Box className='add-photo-form' direction="row" flex background="white" >
                <div className='add-photo-left'>
                    <div className='add-photo-inputs'>
                        <FormField>
                            <TextInput maxLength={20} placeholder='Dog Name' name="dogName" onChange={handleInputChange} value={dogName}></TextInput>
                        </FormField>
                        <FormField>
                            <DateInput format="dd/mm/yyyy" onChange={event => setDate(event.value)} value={date} name="date" />
                        </FormField>
                        <FormField>
                            <TextArea maxLength={120} placeholder='Description' size='xsmall' resize={false} value={description} name="description" onChange={handleInputChange} />
                        </FormField>
                    </div>
                </div>
                <div className='add-photo-right'>
                    {imageList.length > 0 ? renderImage() : renderImageDropbox()}
                </div>
            </Box>
            <div className='add-photo-buttons'>
                <CustomButton
                    label='Submit'
                    primary
                    onClick={handleSubmit}
                    disabled={!(description && date && dogName)} />
            </div>
            {
                okNotification ?
                    <Notification
                        status={Status.SUCCESS}
                        text={"Success! Photo uplouded."} />
                    :
                    null
            }{
                errorNotification ?
                    <Notification
                        status={Status.SUCCESS}
                        text={"Error. Allowed extensions: jpg, png"} />
                    :
                    null
            }
        </Box >
    )
};

export default AddPhoto;