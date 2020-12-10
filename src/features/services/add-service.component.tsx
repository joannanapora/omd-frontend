import React from 'react';
import ImageUploading from 'react-images-uploading'

import { Box, Form, FormField, Select, Text, TextInput } from 'grommet';

import CustomDate from '../../shared/custom-date/custom-date.component';
import CustomButton from '../../shared/custom-button/custom-button.component';
import './add-service.styles.scss';
import CustomCheckBox from '../../shared/custom-checkbox/custom-checkbox.component';

class AddService extends React.Component<{}, {
    checked: boolean, dateFrom: string, dateTo: string, timeFrom: string, timeTo: string,
    images: any, isSelectOpen: boolean, selectedLocation: string, isReadOnly: boolean,
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
        }
    };


    onSelectImage = (imageList, addUpdateIndex) => {
        console.log(imageList, addUpdateIndex);
        this.setState({ images: imageList });
    };

    handleSubmit = () => {
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
                timeTo: ""
            })
        } else {
            this.setState({ isReadOnly: true });
            this.setState({ dateFrom: "", dateTo: "", timeFrom: "", timeTo: "" });
            if (!this.state.checked) {
                this.setState({ isReadOnly: false })
            }
        };
    };

    handleChange = (event) => {
        console.log(event);
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
        }
    }


    render() {
        return (
            <Box className="service-box" background="white" border gap="medium" pad="xlarge" width="large" >
                <Form>
                    <h1>Add new service</h1>
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
                            <FormField label="From">
                                <CustomDate date={this.state.dateFrom} time={this.state.timeFrom} name="from" onChange={this.handleDateChange} />
                            </FormField>
                            <FormField label="To">
                                <CustomDate date={this.state.dateTo} time={this.state.timeTo} name="to" onChange={this.handleDateChange} />
                            </FormField>
                        </div>
                        <div className='add-service-right'>
                            <Text>Place for Dog Image</Text>
                            <ImageUploading
                                multiple
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
                                                size='small'
                                                style={isDragging ? { color: 'red' } : undefined}
                                                onClick={onImageUpload}
                                                {...dragProps}
                                            >
                                                Click or Drop here
                                            </CustomButton>
                                            &nbsp;
                                            {imageList.map((image, index) => (
                                                <div key={index} className="image-item">
                                                    <img src={image['data_url']} alt="" width="250" />
                                                    <div className="image-item__btn-wrapper">
                                                        <CustomButton size='small' onClick={() => onImageUpdate(index)}>Update</CustomButton>
                                                        <CustomButton size='small' onClick={() => onImageRemove(index)}>Remove</CustomButton>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                            </ImageUploading>
                        </div>
                    </Box>
                    <div className='add-service-buttons'>
                        <CustomCheckBox checked={this.state.checked} onChange={this.setChecked}
                            label="Remember" />
                        <CustomButton
                            onClick={this.handleSubmit}
                            disabled={!(this.state.breed && this.state.owner && this.state.name && this.state.location
                                && this.state.dateFrom && this.state.dateTo && this.state.weight) || this.state.isReadOnly}
                            type='submit'>Submit</CustomButton>
                    </div>
                </Form>
                <Box align="center">
                </Box>
            </Box >
        )
    }
}


export default AddService;