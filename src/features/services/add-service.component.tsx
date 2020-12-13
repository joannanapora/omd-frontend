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

class AddService extends React.Component<{ history }, {
    checked: boolean, dateFrom: string, dateTo: string, timeFrom: string, timeTo: string,
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
            timeFrom: "",
            dateFrom: "",
            timeTo: "",
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

        const config = {
            headers: { Authorization: "Bearer " + localStorage.getItem('accessToken') }
        };

        axios.post('http://localhost:4000/services', {

            message: this.state.message,
            dateFrom: this.state.dateFrom,
            dateTo: this.state.dateTo,
            breed: this.state.breed,
            ownerName: this.state.owner,
            dogName: this.state.name,
            location: mapOptionsToLocation(this.state.selectedLocation),
            weight: mapOptionsToWeight(this.state.selectedWeight),
            saveAsTemplate: this.state.checked


        }, config).then(() => {
            this.setState({ showNotification: true });
            if (!this.state.checked) {
                this.setState({
                    name: "",
                    breed: "",
                    owner: "",
                    selectedLocation: null,
                    selectedWeight: null,
                    dateFrom: "",
                    timeFrom: "",
                    dateTo: "",
                    timeTo: "",
                    message: ""
                })
            } else {
                this.setState({ isReadOnly: true });
                this.setState({ dateFrom: "", dateTo: "", timeFrom: "", timeTo: "" });
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

    handleDateChange = ({ time, date, name }) => {
        if (name === 'from') {
            this.setState({ dateFrom: date, timeFrom: time })
        }
        if (name === "to") {
            this.setState({ dateTo: date, timeTo: time })
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
        const config = {
            headers: { Authorization: "Bearer " + localStorage.getItem('accessToken') }
        };
        axios.get('http://localhost:4000/services/template', config)
            .then((response) => {
                console.log(response)
                this.setState({
                    owner: response.data.ownerName, message: response.data.message, breed: response.data.breed, name: response.data.dogName,
                    selectedLocation: mapLocationsToOptions(response.data.location), selectedWeight: mapWeightToOptions(response.data.weight)
                });
                // this.setState({ weight: response.data.selectedWeight });
                // this.setState({ location: response.data.selectedLocation });
                // }
            }).catch(e => {
                this.setState({ isReadOnly: false });
            });
    };


    render() {
        return (
            <Box className="service-box" background="white" border gap="small" pad="large" width="large" >
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
                        <div></div>
                    </div>
                    <Box className='form' direction="row" flex background="white" pad={{ bottom: 'small', right: 'large', left: 'large', top: 'large' }} width="large">
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
                            <FormField className='date-field' >
                                <CustomDate label="Date 'From'" date={this.state.dateFrom} time={this.state.timeFrom} name="from" onChange={this.handleDateChange} />
                            </FormField>
                            <FormField className='date-field'>
                                <CustomDate label="Date 'To'" date={this.state.dateTo} time={this.state.timeTo} name="to" onChange={this.handleDateChange} />
                            </FormField>
                            <div className='service-description'>
                                <TextArea className='service-text-area' resize={false} disabled={this.state.isReadOnly} value={this.state.message} name='message' onChange={this.handleMessageChange} placeholder="Service Description" />
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
                                                        <img src={image['data_url']} alt="" width="140" />
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
                    <div className='add-service-buttons'>
                        <CustomCheckBox checked={this.state.checked} onChange={this.setChecked}
                            label="Remember" />
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