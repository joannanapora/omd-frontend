import React from 'react';
import axios from 'axios';
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

import {postService, getTemplate} from '../../api/';

class AddService extends React.Component<{ history }, {
    checked: boolean, dateFrom: string, dateTo: string,
    images: any, isSelectOpen: boolean, selectedLocation: string, isReadOnly: boolean, message: string,
    selectedWeight: string, showNotification: boolean, name: string, breed: string, owner: string, location: any[], weight: any[],
}> {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            breed: "",
            owner: "",
            location: ['north', 'north-west', 'north-east', 'west', 'east', 'south', 'south-west', 'south-east'],
            weight: ['< 4kg', '4-10kg', '11-18kg', '19-34kg', ' > 35kg'],
            showNotification: false,
            selectedLocation: null,
            selectedWeight: null,
            isSelectOpen: false,
            images: null,
            dateFrom: "",
            dateTo: "",
            checked: false,
            isReadOnly: false,
            message: "",
        }
    };


    onSelectImage = (imageList, addUpdateIndex) => {
        console.log(imageList, addUpdateIndex);
        this.setState({ images: imageList });
    };

    handleSubmit = () => {
        this.setState({ showNotification: false });
        
        postService(this.state.message, this.state.dateFrom, this.state.dateTo,
            this.state.breed, this.state.owner, this.state.name, mapOptionsToLocation(this.state.selectedLocation),
            mapOptionsToWeight(this.state.selectedWeight), this.state.checked,
        ).then(() => {
            this.setState({ showNotification: true });
            if (!this.state.checked) {
                this.setState({
                    name: "",
                    breed: "",
                    owner: "",
                    selectedLocation: null,
                    selectedWeight: null,
                    dateFrom: "",
                    dateTo: "",
                    message: ""
                })
            } else {
                this.setState({ isReadOnly: true });
                this.setState({ dateFrom: "", dateTo: "" });
                if (!this.state.checked) {
                    this.setState({ isReadOnly: false })
                }
            };
        }).catch(e => {
            console.log(e);
        })


    };

    redirectToServices = () => {
        const { history } = this.props;
        if (history) history.push('/services');
    }


    handleChange = (event) => {
        if (event.target.name === "name") {
            this.setState({
                name: event.target.value
            }
            )
        } if (event.target.name === "breed") {
            this.setState({
                breed: event.target.value
            }
            )
        } if (event.target.name === "owner") {
            this.setState({
                owner: event.target.value
            }
            )
        }
    };


    handleSelectChange = (event) => {
        if (event.target.name === "weight") {
            this.setState({
                selectedWeight: event.value
            });
        } else {
            this.setState({
                selectedLocation: event.value
            });
        }
    };

    handleDateChange = ({ date, name }) => {
        if (name === 'from') {
            this.setState({ dateFrom: date })
        }
        if (name === "to") {
            this.setState({ dateTo: date })
        }
    }

    setChecked = (event) => {
        this.setState({ checked: event.target.checked });

        if (!event.target.checked) {
            this.setState({ isReadOnly: false })
        };
    }

    handleMessageChange = (event) => {
        if (event.target.name === 'message') {
            this.setState({ message: event.target.value })
        }
    };

    componentDidMount() {
        getTemplate() .then((response) => {
                console.log(response)
                this.setState({
                    owner: response.data.ownerName, message: response.data.message, breed: response.data.breed, name: response.data.dogName,
                    selectedLocation: mapLocationsToOptions(response.data.location), selectedWeight: mapWeightToOptions(response.data.weight)
                });
            }).catch(e => {
                this.setState({ isReadOnly: false });
            });
    };


    render() {
        return (
            <Box className="service-box" background="white" border gap="small" pad="large" width="xlarge" >
                <Form>
                    <div className='add-services-header'>
                        <div>
                            <CustomButton
                                secondary
                                icon={<LinkPrevious />}
                                label="Go Back"
                                onClick={this.redirectToServices} />
                        </div>
                        <div className='header'><h1>Add Service</h1></div>
                        <div className="empty-div"> </div>
                    </div>
                    <Box className='add-service-form' direction="row" flex background="white" >
                        <div className='add-service-left'>
                            <FormField required={false}>
                                <TextInput
                                    disabled={this.state.isReadOnly}
                                    value={this.state.owner}
                                    type='text'
                                    className="form-input"
                                    name="owner"
                                    placeholder="Owner Name"
                                    onChange={this.handleChange}
                                />
                            </FormField>
                            <FormField required={false} >
                                <Select
                                    disabled={this.state.isReadOnly}
                                    name="location"
                                    placeholder="Location"
                                    open={this.state.isSelectOpen}
                                    value={this.state.selectedLocation}
                                    options={this.state.location}
                                    onChange={(event) => this.handleSelectChange(event)}
                                />
                            </FormField>
                            <div className='date-selects'>
                                <CustomDate label="Start Date" date={this.state.dateFrom} name="from" onChange={this.handleDateChange} />
                                <CustomDate label="End Date" date={this.state.dateTo} name="to" onChange={this.handleDateChange} />

                            </div>
                        </div>
                        <div className='add-service-right'>
                            <FormField required={false}>
                                <TextInput
                                    disabled={this.state.isReadOnly}
                                    onChange={this.handleChange}
                                    value={this.state.name}
                                    className="form-input"
                                    id="enabled-id"
                                    name="name"
                                    placeholder="Dog Name"
                                ></TextInput>
                            </FormField>
                            <FormField required={false} >
                                <TextInput
                                    disabled={this.state.isReadOnly}
                                    onChange={this.handleChange}
                                    value={this.state.breed}
                                    type='text'
                                    className="form-input"
                                    name="breed"
                                    placeholder="Dog Breed"
                                />
                            </FormField>
                            <FormField required={false}>
                                <Select
                                    disabled={this.state.isReadOnly}
                                    id="select"
                                    name="weight"
                                    placeholder="Dog Weight"
                                    open={this.state.isSelectOpen}
                                    value={this.state.selectedWeight}
                                    options={this.state.weight}
                                    onChange={(event) => this.handleSelectChange(event)}
                                />
                            </FormField>
                        </div>
                        <div className='add-service-medium'>
                        </div>
                        <div className='add-service-medium2'>
                            <div className='uploud-image'>
                                <ImageUploading
                                    value={this.state.images}
                                    onChange={this.onSelectImage}
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
                        <TextArea className='service-text-area' resize={false} disabled={this.state.isReadOnly} value={this.state.message} name='message' onChange={this.handleMessageChange} placeholder="Service Description" />
                    </Box>
                    <div className='add-service-buttons'>
                        <CustomButton secondary>
                            <CustomCheckBox checked={this.state.checked} onChange={this.setChecked}
                                label="Save" /></CustomButton>
                        <CustomButton
                            primary
                            onClick={this.handleSubmit}
                            disabled={!(this.state.breed && this.state.owner && this.state.name && this.state.selectedLocation
                                && this.state.dateFrom && this.state.dateTo && this.state.selectedWeight && this.state.message) || this.state.isReadOnly}
                            type='submit'>Submit</CustomButton>
                    </div>
                    {
                        this.state.showNotification ?
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
        )
    }
}


export default withRouter(AddService);