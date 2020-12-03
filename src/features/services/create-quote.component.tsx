import React from 'react';
import './create-quote.styles.scss';
import CustomButton from '../../shared/custom-button/custom-button.component';
import { Box, DateInput, Form, FormField, Select, TextInput } from 'grommet';

class AddService extends React.Component<{}, { selectedDate: string, isSelectOpen: boolean, selectedLocation: string, selectedWeight: string, showNotification: boolean, name: string, breed: string, owner: string, location: any[], date: string, weight: any[], }> {
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
        }
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
                <Form className='form' onSubmit={this.handleSubmit}>
                    <h1>Add new service</h1>
                    <Box direction="row" flex className="service-box" background="white" gap="medium" pad="large" width="large">
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
                        </div>
                        <div className='add-service-right'> UPLOAD IMAGE
                        <FormField required={false}>
                                <TextInput
                                    value={this.state.owner}
                                    type='text'
                                    className="form-input"
                                    name="owner"
                                    placeholder="Owner's Name"
                                    onChange={this.handleChange}
                                />
                            </FormField>
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