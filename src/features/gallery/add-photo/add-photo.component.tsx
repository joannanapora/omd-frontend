import React, { useState } from 'react';

import ImageUploading from 'react-images-uploading'

import { Box, FormField, DateInput, TextArea, TextInput } from 'grommet';
import { Image, Close } from 'grommet-icons';

import CustomButton from '../../../shared/custom-button/custom-button.component';
import Notification, { Status } from '../../../shared/custom-notification/custom-notification.component';
import './add-photo.styles.scss';



const AddPhoto = ({ onClose }) => {
    const [image, setImage]: [any, any] = useState(null);
    const [showNotification, handleShowNotification] = useState(false);
    const [description, handleDescription] = useState("");
    const [dogName, setDogName] = useState("");

    const handleSubmit = () => {
        handleShowNotification(true)
    }

    const renderImageDropbox = () => {
        return (
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
                    value={image}
                    onChange={setImage}
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

    const renderImage = () => {
        return (
            <ImageUploading
                value={image}
                onChange={setImage}
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
        );
    };

    return (
        <Box className="photo-box" border={{ color: 'brand', size: 'medium' }} gap="xsmall" pad="medium" width="large" >
            <div className='add-photo-headers'>
                <div className='paw'><img alt='paw' src="https://www.flaticon.com/svg/static/icons/svg/676/676163.svg" /></div>
                <div><h1>Add New Photo</h1></div>
                <div><CustomButton onClick={onClose} secondary icon={<Close />} /></div>
            </div>
            <Box className='add-photo-form' direction="row" flex background="white" >
                <div className='add-photo-left'>
                    <div className='add-photo-inputs'>
                        <FormField>
                            <TextInput placeholder='Dog Name' name='dogName' value={dogName}></TextInput>
                        </FormField>
                        <FormField>
                            <TextArea placeholder='Description' size='xsmall' resize={false} value={description} name='description' onChange={event => handleDescription(event.target.value)} />
                        </FormField>
                        <FormField>
                            <DateInput name="value" format="mm/dd/yyyy" />
                        </FormField>
                    </div>
                </div>
                <div className='add-photo-right'>
                    {image ? renderImage() : renderImageDropbox()}
                </div>
            </Box>
            <div className='add-photo-buttons'>
                <CustomButton
                    label='Submit'
                    primary
                    onClick={handleSubmit}
                    disabled={!(description && dogName && image)} />
            </div>
            {
                showNotification ?
                    <Notification
                        status={Status.SUCCESS}
                        text={"Success! Photo uplouded."}>
                    </Notification>
                    :
                    null
            }
        </Box >
    )
};

export default AddPhoto;