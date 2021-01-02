import React, { useState } from 'react';

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

const AddService = (history) => {
    let location = ['north', 'north-west', 'north-east', 'west', 'east', 'south', 'south-west', 'south-east'];
    let weight = ['< 4kg', '4-10kg', '11-18kg', '19-34kg', ' > 35kg'];
    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [owner, setOwner] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [message, setMessage] = useState('');

    const [checked, setChecked] = useState(false);
    const [showNotification, handleShowNotification] = useState(false);
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [isSelectOpen] = useState(false);

    const [selectedLocation, setLocation] = useState(null);
    const [selectedWeight, setWeight] = useState(null);
    const [image, setImage] = useState(null);

    // const componentDidMount() {
    //     getTemplate().then((response) => {
    //         console.log(response)
    //         this.setState({
    //             owner: response.data.ownerName, message: response.data.message, breed: response.data.breed, name: response.data.dogName,
    //             selectedLocation: mapLocationsToOptions(response.data.location), selectedWeight: mapWeightToOptions(response.data.weight)
    //         });
    //     }).catch(e => {
    //         this.setState({ isReadOnly: false });
    //     });
    // };

    const handleSubmit = () => {
        handleShowNotification(false)
        postService(message, dateFrom, dateTo, breed, owner, name, mapOptionsToLocation(selectedLocation),
            mapOptionsToWeight(selectedWeight), checked)
            .then(() => {
                handleShowNotification(true)
                if (!checked) {
                    setName("")
                    setBreed("")
                    setOwner("")
                    setMessage("")
                    setDateFrom("")
                    setDateTo("")
                    setLocation(null)
                    setWeight(null)
                    handleShowNotification(false)
                } else {
                    setIsReadOnly(true)
                    setDateFrom("")
                    setDateTo("")
                    if (!checked) {
                        setIsReadOnly(false);
                    }
                };
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
        if (event.target.name === "name") {
            setName(event.target.value)
        }
        if (event.target.name === "breed") {
            setBreed(event.target.value)
        }
        if (event.target.name === "owner") {
            setOwner(event.target.value)
        }
        if (event.target.name === 'message') {
            setMessage(event.target.value)
        }
    };

    const handleSelectChange = (event) => {
        if (event.target.name === "weight") {
            setWeight(event.value)
        } else {
            setLocation(event.value)
        }
    };

    const handleDateChange = ({ date, name }) => {
        if (name === 'from') {
            setDateFrom(date)
        } else {
            setDateTo(date)
        }
    };

    const handleChecked = (event) => {
        setChecked(event.target.checked);
        if (!event.target.checked) {
            setIsReadOnly(false)
        };
    }


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
                                value={owner}
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
                                name="location"
                                placeholder="Location"
                                open={isSelectOpen}
                                value={selectedLocation}
                                options={location}
                                onChange={handleSelectChange}
                            />
                        </FormField>
                        <div className='date-selects'>
                            <CustomDate label="Start Date" date={dateFrom} name="from" onChange={handleDateChange} />
                            <CustomDate label="End Date" date={dateTo} name="to" onChange={handleDateChange} />

                        </div>
                    </div>
                    <div className='add-service-right'>
                        <FormField required={false}>
                            <TextInput
                                disabled={isReadOnly}
                                onChange={handleInputChange}
                                value={name}
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
                                value={breed}
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
                                name="weight"
                                placeholder="Dog Weight"
                                open={isSelectOpen}
                                value={selectedWeight}
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
                    <TextArea className='service-text-area' resize={false} disabled={isReadOnly} value={message} name='message' onChange={handleInputChange} placeholder="Service Description" />
                </Box>
                <div className='add-service-buttons'>
                    <CustomButton secondary>
                        <CustomCheckBox checked={checked} onChange={setChecked}
                            label="Save" /></CustomButton>
                    <CustomButton
                        primary
                        onClick={handleSubmit}
                        disabled={!(breed && owner && name && selectedLocation && dateFrom && dateTo && selectedWeight && message) || isReadOnly}
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