import React, { useEffect, useState } from 'react';

import { withRouter } from 'react-router-dom'

import ImageUploading from 'react-images-uploading'

import { Box, Form, FormField, Select, TextArea, TextInput } from 'grommet';
import { LinkPrevious } from 'grommet-icons';

import './add-service.styles.scss';
import CustomDate from '../../shared/custom-date/custom-date.component';
import CustomButton from '../../shared/custom-button/custom-button.component';
import CustomCheckBox from '../../shared/custom-checkbox/custom-checkbox.component';
import Notification, { Status } from '../../shared/custom-notification/custom-notification.component';
import { mapOptionsToWeight, mapOptionsToLocation, mapLocationsToOptions, mapWeightToOptions } from '../../models/enums';

import { postService, getTemplate } from '../../api/';

interface INewService {
    name: string;
    breed: string;
    owner: string;
    dateFrom: string;
    dateTo: string;
    message: string;
    checked: boolean;
    selectedLocation: string;
    selectedWeight: string;
}

const AddService = (history) => {
    let location = ['north', 'north-west', 'north-east', 'west', 'east', 'south', 'south-west', 'south-east'];
    let weight = ['< 4kg', '4-10kg', '11-18kg', '19-34kg', ' > 35kg'];

    const [newService, setNewService]: [INewService, any] = useState({
        name: '',
        breed: '',
        owner: '',
        dateFrom: '',
        dateTo: '',
        message: '',
        checked: false,
        selectedLocation: null,
        selectedWeight: null,
    });


    const [showNotification, handleShowNotification] = useState(false);
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [isSelectOpen] = useState(false);
    const [image, setImage]: [any, any] = useState(null);



    useEffect(() => {
        getTemplate().then((response) => {
            setNewService({
                owner: response.data.ownerName, message: response.data.message, breed: response.data.breed, name: response.data.dogName,
                selectedLocation: mapLocationsToOptions(response.data.location), selectedWeight: mapWeightToOptions(response.data.weight)
            })
        })
            .catch(error => {
                setIsReadOnly(false)
            });
    }, []);

    const handleSubmit = () => {
        handleShowNotification(false)
        postService(newService.message, newService.dateFrom, newService.dateTo, newService.breed, newService.owner, newService.name, mapOptionsToLocation(newService.selectedLocation),
            mapOptionsToWeight(newService.selectedWeight), newService.checked)
            .then(() => {
                handleShowNotification(true)
                if (!newService.checked) {
                    setNewService({
                        name: '',
                        breed: '',
                        owner: '',
                        dateFrom: '',
                        dateTo: '',
                        message: '',
                        checked: false,
                        selectedLocation: null,
                        selectedWeight: null,
                    });
                    handleShowNotification(false)
                } else {
                    setIsReadOnly(true)
                    setNewService({
                        ...newService,
                        dateFrom: '',
                        dateTo: ''
                    })
                }
                if (!newService.checked) {
                    setIsReadOnly(false);
                }
            }).catch(error => {
                console.log(error);
            })
    };

    const onSelectImage = (imageList) => {
        setImage(imageList);
    };


    const redirectToServices = () => {
        if (history) history.push('/services');
    };

    const handleInputChange = (event) => {
        setNewService({ ...newService, [event.target.name]: event.target.value })
    };

    const handleSelectChange = (event) => {
        setNewService({ ...newService, [event.target.name]: event.value })
    };

    const handleDateChange = ({ date, name }) => {
        setNewService({ ...newService, [name]: date })
    };

    const handleChecked = (event) => {
        setNewService({ ...newService, checked: event.target.checked })
    };


    return (
        <Box className="service-box" background="white" gap="small" pad="large" width="xlarge" >
            <Form>
                <div className='add-services-header'>
                    <div>
                        <CustomButton
                            secondary
                            icon={<LinkPrevious />}
                            label="Go Back"
                            onClick={redirectToServices} />
                    </div>
                    <div className='header'><h1>Add Service</h1></div>
                    <div className="empty-div"> </div>
                </div>
                <Box className='add-service-form' direction="row" flex background="white" >
                    <div className='add-service-left'>
                        <FormField required={false}>
                            <TextInput
                                disabled={isReadOnly}
                                value={newService.owner}
                                type='text'
                                className="form-input"
                                name="owner"
                                placeholder="Owner Name"
                                onChange={handleInputChange}
                            />
                        </FormField>
                        <FormField required={false} >
                            <Select
                                disabled={isReadOnly}
                                name="selectedLocation"
                                placeholder="Location"
                                open={isSelectOpen}
                                value={newService.selectedLocation}
                                options={location}
                                onChange={handleSelectChange}
                            />
                        </FormField>
                        <div className='date-selects'>
                            <CustomDate label="Start Date" date={newService.dateFrom} name="dateFrom" onChange={handleDateChange} />
                            <CustomDate label="End Date" date={newService.dateTo} name="dateTo" onChange={handleDateChange} />

                        </div>
                    </div>
                    <div className='add-service-right'>
                        <FormField required={false}>
                            <TextInput
                                disabled={isReadOnly}
                                onChange={handleInputChange}
                                value={newService.name}
                                className="form-input"
                                id="enabled-id"
                                name="name"
                                placeholder="Dog Name"
                            ></TextInput>
                        </FormField>
                        <FormField required={false} >
                            <TextInput
                                disabled={isReadOnly}
                                onChange={handleInputChange}
                                value={newService.breed}
                                type='text'
                                className="form-input"
                                name="breed"
                                placeholder="Dog Breed"
                            />
                        </FormField>
                        <FormField required={false}>
                            <Select
                                disabled={isReadOnly}
                                id="select"
                                name="selectedWeight"
                                placeholder="Dog Weight"
                                open={isSelectOpen}
                                value={newService.selectedWeight}
                                options={weight}
                                onChange={handleSelectChange}
                            />
                        </FormField>
                    </div>
                    <div className='add-service-medium'>
                    </div>
                    <div className='add-service-medium2'>
                        <div className='uploud-image'>
                            <ImageUploading
                                value={image}
                                onChange={onSelectImage}
                                maxNumber={1}
                                dataURLKey="data_url"
                            >
                                {({
                                    imageList,
                                    onImageUpload,
                                    onImageUpdate,
                                    onImageRemove,
                                    isDragging,
                                    dragProps,
                                }) => (
                                    // write your building UI
                                    <div className="upload__image-wrapper">
                                        <CustomButton
                                            primary
                                            size='small'
                                            style={isDragging ? { color: 'red' } : undefined}
                                            onClick={onImageUpload}
                                            {...dragProps}
                                        >
                                            Upload Dog Image
                                            </CustomButton>
                                            &nbsp;
                                        {imageList.map((image, index) => (
                                            <div key={index} className="image-item">
                                                <img src={image['data_url']} alt="" width="180" />
                                                <div className="image-item__btn-wrapper">
                                                    <CustomButton default size='small' onClick={() => onImageUpdate(index)}>Update</CustomButton>
                                                    <CustomButton default size='small' onClick={() => onImageRemove(index)}>Remove</CustomButton>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </ImageUploading>
                        </div>
                    </div>
                </Box>
                <Box direction="row" flex className='service-description'>
                    <TextArea className='service-text-area' resize={false} disabled={isReadOnly} value={newService.message} name='message' onChange={handleInputChange} placeholder="Service Description" />
                </Box>
                <div className='add-service-buttons'>
                    <CustomButton secondary>
                        <CustomCheckBox checked={newService.checked} onChange={handleChecked}
                            label="Save" /></CustomButton>
                    <CustomButton
                        primary
                        onClick={handleSubmit}
                        disabled={!(newService.breed && newService.owner && newService.name && newService.selectedLocation && newService.dateFrom && newService.dateTo && newService.selectedWeight && newService.message) || isReadOnly}
                        type='submit'>Submit</CustomButton>
                </div>
                {
                    showNotification ?
                        <Notification
                            status={Status.SUCCESS}
                            text={"New service has been added."}>
                        </Notification>
                        :
                        null
                }
            </Form>
            <Box align="center">
            </Box>
        </Box >
    );
}

export default withRouter(AddService);