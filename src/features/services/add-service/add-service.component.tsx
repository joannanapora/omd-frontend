import React, { useEffect, useState } from 'react';

import { withRouter } from 'react-router-dom'

import ImageUploading from 'react-images-uploading'

import { Box, DateInput, FormField, Select, TextArea, TextInput } from 'grommet';
import { Erase, Tag, List, Map, Image, Certificate, Close } from 'grommet-icons';

import { postService, getTemplate } from '../../../api';

import CustomButton from '../../../shared/custom-button/custom-button.component';
import CustomCheckBox from '../../../shared/custom-checkbox/custom-checkbox.component';
import Notification, { Status } from '../../../shared/custom-notification/custom-notification.component';
import { mapOptionsToWeight, mapOptionsToLocation, mapLocationsToOptions, mapWeightToOptions } from '../../../models/enums';

import './add-service.styles.scss';

interface INewService {
    name: string;
    breed: string;
    dateFrom: string;
    dateTo: string;
    message: string;
    checked: boolean;
    selectedLocation: string;
    selectedWeight: string;
    image: any;
}

const AddService = ({ history, onClose }) => {
    let location = ['north', 'north-west', 'north-east', 'west', 'east', 'south', 'south-west', 'south-east'];
    let weight = ['< 4kg', '4-10kg', '11-18kg', '19-34kg', ' > 35kg'];

    const [newService, setNewService]: [INewService, any] = useState({
        name: '',
        breed: '',
        dateFrom: '',
        dateTo: '',
        message: '',
        checked: false,
        selectedLocation: null,
        selectedWeight: null,
        image: []
    });


    const [okNotification, showOkNotification] = useState(false);
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [isSelectOpen] = useState(false);
    const [image, setImage]: [any, any] = useState(null);
    const [errorNotification, showErrorNotification] = useState(false);


    useEffect(() => {
        getTemplate().then((response) => {
            setNewService({
                message: response.data.message, breed: response.data.breed, name: response.data.dogName,
                selectedLocation: mapLocationsToOptions(response.data.location), selectedWeight: mapWeightToOptions(response.data.weight)
            })
        })
            .catch(error => {
                setIsReadOnly(false)
            });
    }, []);

    const clearAllFilters = () => {
        setNewService({
            name: '',
            breed: '',
            dateFrom: '',
            dateTo: '',
            message: '',
            checked: false,
            selectedLocation: null,
            selectedWeight: null,
            imageList: [],
        })
    };

    const handleSubmit = () => {
        showOkNotification(false)
        postService(newService.message, newService.dateFrom, newService.dateTo, newService.breed, newService.name, mapOptionsToLocation(newService.selectedLocation),
            mapOptionsToWeight(newService.selectedWeight), newService.checked)
            .then(() => {
                showOkNotification(true)
                if (!newService.checked) {
                    setNewService({
                        name: '',
                        breed: '',
                        dateFrom: '',
                        dateTo: '',
                        message: '',
                        checked: false,
                        selectedLocation: null,
                        selectedWeight: null,
                    });
                } else {
                    setNewService({
                        ...newService,
                        dateFrom: '',
                        dateTo: ''
                    })
                }
            }).catch(() => {
                showErrorNotification(true)
            })
    };

    const onSelectImage = (imageList) => {
        setImage(imageList);
    };

    const handleInputChange = (event) => {
        setNewService({ ...newService, [event.target.name]: event.target.value })
    };

    const handleSelectChange = (event) => {
        setNewService({ ...newService, [event.target.name]: event.value })
    };

    const handleDateChange = (event, name) => {
        setNewService({ ...newService, [name]: event.value })
    };

    const handleChecked = (event) => {
        setNewService({ ...newService, checked: event.target.checked })
    };


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
                                        <CustomButton secondary onClick={() => onImageUpdate(index)}>Update</CustomButton>
                                        <CustomButton secondary onClick={() => onImageRemove(index)}>Remove</CustomButton>
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
                                    <CustomButton secondary onClick={() => onImageUpdate(index)}>Update</CustomButton>
                                    <CustomButton secondary onClick={() => onImageRemove(index)}>Remove</CustomButton>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </ImageUploading>
        );
    };

    return (
        <Box className="service-box" border={{ color: 'brand', size: 'medium' }} gap="xsmall" pad="medium" width="large" >
            <div className='add-service-headers'>
                <div className='paw'><img alt='paw' src="https://www.flaticon.com/svg/static/icons/svg/676/676163.svg" /></div>
                <div><h1>Add Service</h1></div>
                <div><CustomButton onClick={onClose} secondary icon={<Close />} /></div>
            </div>
            <Box className='add-service-form' direction="row" flex background="white" >
                <div className='add-service-left'>
                    <FormField><DateInput format="dd/mm/yyyy" value={newService.dateFrom} onChange={(event) => handleDateChange(event, "dateFrom")} name="dateFrom" /></FormField>
                    <FormField><DateInput format="dd/mm/yyyy" value={newService.dateTo} onChange={(event) => handleDateChange(event, "dateTo")} name="dateTo" />
                    </FormField>
                    <FormField required={false} >
                        <Select
                            icon={<Map />}
                            disabled={isReadOnly}
                            name="selectedLocation"
                            placeholder="Location"
                            open={isSelectOpen}
                            value={newService.selectedLocation}
                            options={location}
                            onChange={handleSelectChange}
                        />
                    </FormField>
                    <FormField required={false}>
                        <TextInput
                            icon={<List />}
                            disabled={isReadOnly}
                            onChange={handleInputChange}
                            value={newService.name}
                            name="name"
                            reverse placeholder="Dog Name"
                        ></TextInput>
                    </FormField>
                    <FormField required={false} >
                        <TextInput
                            icon={<Certificate />}
                            disabled={isReadOnly}
                            onChange={handleInputChange}
                            value={newService.breed}
                            name="breed"
                            reverse placeholder="Dog Breed"
                        />
                    </FormField>
                    <FormField required={false}>
                        <Select
                            icon={<Tag />}
                            disabled={isReadOnly}
                            name="selectedWeight"
                            placeholder="Dog Weight"
                            open={isSelectOpen}
                            value={newService.selectedWeight}
                            options={weight}
                            onChange={handleSelectChange}
                        />

                    </FormField>
                    <TextArea placeholder='Description' size='medium' resize={false} disabled={isReadOnly} value={newService.message} name='message' onChange={handleInputChange} />
                </div>
                <div className='add-service-right'>
                    {image ? renderImage() : renderImageDropbox()}
                </div>
            </Box>
            <div className='add-service-buttons'>
                <CustomCheckBox checked={newService.checked} onChange={handleChecked}
                    label="Remember" />
                <CustomButton
                    label='Submit'
                    primary
                    onClick={handleSubmit}
                    disabled={!(newService.breed && newService.name && newService.selectedLocation && newService.dateFrom &&
                        newService.dateTo && newService.selectedWeight && newService.message) || isReadOnly} />
                <CustomButton label="Clear" primary icon={<Erase />} onClick={clearAllFilters}></CustomButton>
            </div>
            {
                showOkNotification ?
                    <Notification
                        status={Status.SUCCESS}
                        text={"New service has been added."}>
                    </Notification>
                    :
                    null
            }
            {
                showErrorNotification ?
                    <Notification
                        status={Status.FAILURE}
                        text={"You have to be logged in to Add Service."}>
                    </Notification>
                    :
                    null
            }
        </Box >
    );
}

export default withRouter(AddService);