import React from 'react';

import { Box, Form, FormField, Select, TextInput, Text, } from 'grommet';


class OwnerPage extends React.Component<{}, { dogName: string, dogBreed: string, weights: any[], ages: any[], locations: any[], value: string }> {
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
            value: ""
        }
    }

    useCallback = () => (
        console.log("lol")
    );
    handleChange = () => (
        this.setState({ value: this.state.value })
    );

    handleSubmit = () => (
        console.log("lol")
    );

    render() {
        return (
            <div className='dog-info'>
                <Form onChange={this.handleSubmit} className='form'>
                    <Box className="account-information" background="white" gap="small" pad="medium" width="medium">
                        <Text>Dog Information</Text>
                        <FormField htmlFor="enabled-id" name="Name" label="">
                            <TextInput
                                className="form-input"
                                id="enabled-id"
                                name="enabled"
                                placeholder="Name"
                            />
                        </FormField>
                        <FormField htmlFor="enabled-id" name="Rase" label="">
                            <TextInput
                                className="form-input"
                                id="enabled-id"
                                name="enabled"
                                placeholder="Breed"
                            />
                        </FormField>
                    </Box>
                </Form>
                <Form
                    value={this.state.value}
                    onChange={this.handleChange}
                    onSubmit={() => console.log('Submit', this.state.value)}
                >
                    <FormField name="select">
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
                    value={this.state.value}
                    onChange={this.handleChange}
                    onSubmit={() => console.log('Submit', this.state.value)}
                >
                    <FormField name="select">
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
                    value={this.state.value}
                    onChange={this.handleChange}
                    onSubmit={() => console.log('Submit', this.state.value)}
                >
                    <FormField name="select">
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
        );
    }
}

export default OwnerPage;