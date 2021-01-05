import React, { useEffect, useState } from 'react';
import './my-profile.component.scss'

import { Box, Form, FormField, TextInput } from 'grommet';
import { FormCheckmark, FormEdit, Phone, ContactInfo, Home } from 'grommet-icons';

import Notification, { Status } from '../../shared/custom-notification/custom-notification.component';
import CustomButton from '../../shared/custom-button/custom-button.component';

import { patchUser, getUser } from '../../api';

interface IPersonalDetails {
    name: string;
    surname: string;
    postCode: string;
    phoneNumber: string;
}

const MyProfile = () => {
    const [newPersonalDetails, setPersonalDetails]: [IPersonalDetails, any] = useState({
        name: '',
        surname: '',
        postCode: '',
        phoneNumber: '',
    });

    const [notification, showNotification] = useState(false);
    const [isReadOnly, setIsReadOnly] = useState(false);


    useEffect(() => {
        getUser().then((response) => {
            setIsReadOnly(true);
            setPersonalDetails({
                name: response.data.name,
                surname: response.data.surname,
                postCode: response.data.postCode,
                phoneNumber: response.data.phoneNumber
            });
        }).catch(error => {
            console.log(error);
        })
    },
        []);

    const handleSubmit = () => {
        patchUser(newPersonalDetails.name, newPersonalDetails.surname, newPersonalDetails.phoneNumber, newPersonalDetails.postCode).then(() => {
            setIsReadOnly(true);
            showNotification(true)
        })
            .catch(e => {
                console.log(e);
            })
    };

    const handleEdit = () => {
        setIsReadOnly(false);
        showNotification(false);
    };

    const handleChange = (event) => {
        setPersonalDetails({ ...newPersonalDetails, [event.target.name]: event.target.value })
    }

    return (
        <Box className="my-profile" background="white" border={{ color: 'brand', size: 'medium' }} gap="medium" pad="large" width="medium">
            <h1>My profile</h1>
            <Form onSubmit={handleSubmit} className='my-profile-form'>
                <FormField>
                    <TextInput
                        icon={< ContactInfo />}
                        reverse placeholder='Name'
                        onChange={event => handleChange(event)}
                        value={newPersonalDetails.name}
                        name="name"
                        disabled={isReadOnly}>
                    </TextInput>
                </FormField>
                <FormField>
                    <TextInput
                        icon={< ContactInfo />}
                        reverse placeholder='Surname'
                        onChange={event => handleChange(event)}
                        value={newPersonalDetails.surname}
                        name="surname"
                        disabled={isReadOnly}>
                    </TextInput>
                </FormField>
                <FormField>
                    <TextInput
                        icon={< Home />}
                        reverse placeholder='Post Code'
                        onChange={event => handleChange(event)}
                        value={newPersonalDetails.postCode}
                        name="postCode"
                        disabled={isReadOnly}>
                    </TextInput>
                </FormField>
                <FormField>
                    <TextInput
                        reverse placeholder='Phone Number'
                        value={newPersonalDetails.phoneNumber}
                        icon={< Phone />}
                        onChange={event => handleChange(event)}
                        name="phoneNumber"
                        disabled={isReadOnly}>
                    </TextInput>
                </FormField>
                <div className='my-profile-buttons'>
                    <CustomButton secondary icon={<FormEdit />} label='Edit' onClick={handleEdit} />
                    <CustomButton primary icon={<FormCheckmark />} label='Save'
                        disabled={!(newPersonalDetails.surname && newPersonalDetails.surname &&
                            newPersonalDetails.phoneNumber && newPersonalDetails.postCode) ||
                            isReadOnly} type='submit' onClick={handleSubmit} />
                </div>
                {
                    notification ?
                        <Notification
                            status={Status.SUCCESS}
                            text={"Information saved."}>
                        </Notification>
                        :
                        null
                }
            </Form>
        </Box>
    );
};

export default MyProfile;
