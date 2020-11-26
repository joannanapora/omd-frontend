import React from 'react';
import './shop.component.scss';
import { Box } from 'grommet';
import SimpleCheckBox from '../logged-in-user/logged-in-user.component';
import { Form, FormField, TextInput, Text } from 'grommet';

import CustomButton from '../../shared/custom-button/custom-button.component';




const Shop = () => (
    <Box className="articles" background="white" border gap="medium" pad="large" width="xlarge">
        <Form className='form'>
            <Box className="account-information" background="white" border gap="xsmall" pad="medium" width="medium">
                <Text>Account Information</Text>
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