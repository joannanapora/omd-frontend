import React from 'react';
import { Box, Form, FormField, Select, TextInput, Text, } from 'grommet';
import './owner-page.component.scss';

class OwnerPage extends React.Component<{}, { dogName: string, dogBreed: string, weights: any[], ages: any[], locations: any[] }> {
    constructor(props) {
        super(props);

        this.state = {
            dogName: "",
            dogBreed: "",
            weights: [

                { label: ' < 4kg', value: 1 },
                { label: '4-10kg', value: 2 },
                { label: '11-18kg', value: 3 },
                { label: '19-34kg', value: 4 },
                { label: ' > 35kg', value: 5 },
            ],
            ages: [

                { label: '< 3 years', value: 6 },
                { label: '4-8 years', value: 7 },
                { label: '9-13 years', value: 8 },
                { label: '13-17 years', value: 9 },
                { label: '> 17 years', value: 10 },
            ],
            locations: [

                { label: 'North', value: 11 },
                { label: 'North-West', value: 12 },
                { label: 'North-East', value: 13 },
                { label: 'South', value: 14 },
                { label: 'South-West', value: 15 },
                { label: 'South-East', value: 16 },
                { label: 'West', value: 17 },
                { label: 'East', value: 18 },
            ],
        }
    }

    useCallback = () => (
        console.log("lol")
    );
    handleChange = () => (
        console.log()
        // this.setState({ value: this.state.value })
    );

    handleSubmit = () => (
        console.log("lol")
    );

    render() {
        return (
            <div className='dog-info'>
                <Form onChange={this.handleSubmit} className='form'>
                    <Text className="header">Dog Information</Text>
                    <Box className="account-information" background="white" gap="small" pad="medium">
                        <FormField name="dog-name">
                            <TextInput
                                className="form-input"
                                id="enabled-id"
                                name="dog-name"
                                placeholder="Name"
                            />
                        </FormField>
                        <FormField name="dog-breed">
                            <TextInput
                                className="form-input"
                                id="enabled-id"
                                name="breed"
                                placeholder="Breed"
                            />
                        </FormField>
                    </Box>
                </Form>
                <div className="selectors">
                    <Form
                        onChange={this.handleChange}
                    >
                        <FormField className='select-weight'>
                            <Select
                                name="select"
                                placeholder="Weight"
                                options={this.state.weights}
                                labelKey="label"
                                valueKey="value"
                            />
                        </FormField>
                    </Form>
                    <Form
                        onChange={this.handleChange}
                    >
                        <FormField className='select-age'>
                            <Select
                                name="select"
                                placeholder="Age"
                                options={this.state.ages}
                                labelKey="label"
                                valueKey="value"
                            />
                        </FormField>
                    </Form>
                    <Form
                        onChange={this.handleChange}
                    >
                        <FormField className='select-location'>
                            <Select
                                name="select"
                                placeholder="Location"
                                options={this.state.locations}
                                labelKey="label"
                                valueKey="value"
                            />
                        </FormField>
                    </Form>
                </div>
            </div>
        );
    }
}

export default OwnerPage;