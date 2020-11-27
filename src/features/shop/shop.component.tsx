import React from 'react';

import { Box, Form, FormField, TextInput, Text } from 'grommet';
import SimpleCheckBox from '../logged-in-user/logged-in-user.component';

import CustomButton from '../../shared/custom-button/custom-button.component';
import './shop.component.scss';




const Shop = () => (
    <Box className="articles" background="white" border gap="medium" pad="large" width="xlarge">
        <h3>Please enter your account details.</h3>
        <Form className='form'>
            <Box className="account-information" background="white" border gap="xsmall" pad="medium" width="medium">
                <FormField htmlFor="enabled-id" name="Name" label="">
                    <TextInput
                        className="form-input"
                        id="enabled-id"
                        name="enabled"
                        placeholder="Name"
                    />
                </FormField>
                <FormField htmlFor="enabled-id" name="Surname" label="">
                    <TextInput
                        className="form-input"
                        id="enabled-id"
                        name="enabled"
                        placeholder="Surname"
                    />
                </FormField>
            </Box>
        </Form>
        <SimpleCheckBox></SimpleCheckBox>
        <CustomButton type='submit'>Submit</CustomButton>
    </Box>
);

export default Shop;