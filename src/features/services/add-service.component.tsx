import React from 'react';
import ImageUploading from 'react-images-uploading'

import { Box, DateInput, Form, FormField, Select, Text, TextInput } from 'grommet';

import CustomButton from '../../shared/custom-button/custom-button.component';
import './add-service.styles.scss';

class AddService extends React.Component<{}, { images: any, selectedDate: string, isSelectOpen: boolean, selectedLocation: string, selectedWeight: string, showNotification: boolean, name: string, breed: string, owner: string, location: any[], date: string, weight: any[], }> {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            breed: "",
            owner: "",
            date: "",
            location: ['north', 'north-west', 'north-east', 'west', 'east', 'south', 'south-west', 'south-east'],
            weight: ['< 4kg', '4-10kg', '11-18kg', '19-34kg', ' > 35kg'],
            showNotification: false,
            selectedLocation: null,
            selectedWeight: null,
            selectedDate: null,
            isSelectOpen: false,
            images: null,
        }
    };


    onSelectImage = (imageList, addUpdateIndex) => {
        console.log(imageList, addUpdateIndex);
        this.setState({ images: imageList });
    };

    handleSubmit = event => {
        this.setState({
            name: "",
            breed: "",
            owner: "",
            location: [],
            weight: [],
            date: ""
        })
    }

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

    handleDate = (event: any) => {
        this.setState({ date: event.value })
    }

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

    render() {
        return (
            <Box className="service-box" background="white" border gap="medium" pad="large" width="large" >
                <Form onSubmit={this.handleSubmit}>
                    <h1>Add new service</h1>
                    <Box className='form' direction="row" flex background="white" gap="medium" pad="large" width="large">
                        <div className='add-service-left'>
                            <FormField required={false}>
                                <TextInput
                                    onChange={this.handleChange}
                                    value={this.state.name}
                                    className="form-input"
                                    id="enabled-id"
                                    name="name"
                                    placeholder="Name"
                                ></TextInput>
                            </FormField>
                            <FormField required={false} >
                                <TextInput
                                    onChange={this.handleChange}
                                    value={this.state.breed}
                                    type='text'
                                    className="form-input"
                                    name="breed"
                                    placeholder="Breed"
                                />
                            </FormField>
                            <FormField required={false}>
                                <Select
                                    id="select"
                                    name="weight"
                                    placeholder="Weight"
                                    open={this.state.isSelectOpen}
                                    value={this.state.selectedWeight}
                                    options={this.state.weight}
                                    onChange={(event) => this.handleSelectChange(event)}
                                />
                            </FormField>
                            <FormField required={false} >
                                <DateInput onChange={this.handleDate} name="date" value={this.state.date} format="mm/dd/yyyy" />
                            </FormField>
                            <FormField required={false} >
                                <Select
                                    name="location"
                                    placeholder="Location"
                                    open={this.state.isSelectOpen}
                                    value={this.state.selectedLocation}
                                    options={this.state.location}
                                    onChange={(event) => this.handleSelectChange(event)}
                                />
                            </FormField>
                            <FormField required={false}>
                                <TextInput
                                    value={this.state.owner}
                                    type='text'
                                    className="form-input"
                                    name="owner"
                                    placeholder="Owner/s Name"
                                    onChange={this.handleChange}
                                />
                            </FormField>
                        </div>
                        <div className='add-service-right'>
                            <Text>Show your doggie!</Text>
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
                                    onImageRemoveAll,
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
                    <CustomButton
                        disabled={!(this.state.breed && this.state.owner && this.state.name)}
                        type='submit'>Submit</CustomButton>
                </Form>

            </Box >
        )
    }

}


export default AddService;