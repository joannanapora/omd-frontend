import React, { useEffect, useState } from 'react';

import { FormCheckmark, FormEdit, Phone, ContactInfo, Home } from 'grommet-icons';
import { Box, Form, FormField, TextInput } from 'grommet';

import Notification, { Status } from '../../shared/custom-notification/custom-notification.component';
import CustomButton from '../../shared/custom-button/custom-button.component';
import { IPersonalDetails } from '../../models/interfaces/index';
import Spinner from '../../shared/spinner/spinner.component';
import './my-profile.component.scss'

import { patchUser, getUser } from '../../api';

const MyProfile = () => {
    const [newPersonalDetails, setPersonalDetails]: [IPersonalDetails, any] = useState({
        name: '',
        surname: '',
        postCode: '',
        phoneNumber: '',
    });

    const [okNotification, showOkNotification]: [boolean, any] = useState(false);
    const [errorNotification, showErrorNotification]: [boolean, any] = useState(false);
    const [isReadOnly, setIsReadOnly]: [boolean, any] = useState(false);
    const [loading, setLoading]: [boolean, any] = useState(true);


    useEffect(() => {
        setLoading(true);
        getUser().then((response) => {
            setPersonalDetails({
                name: response.data.name || "",
                surname: response.data.surname || "",
                postCode: response.data.postCode || "",
                phoneNumber: response.data.phoneNumber || ""
            });
            setLoading(false)
        }).catch(error => {
            setLoading(false)
        })
    },
        []);

    const handleSubmit = () => {
        setLoading(true)
        patchUser(newPersonalDetails.name, newPersonalDetails.surname, newPersonalDetails.phoneNumber.toString(), newPersonalDetails.postCode)
            .then(() => {
                setIsReadOnly(true);
                showOkNotification(true)
                setLoading(false)
            })
            .catch(error => {
                showErrorNotification(true)
                setLoading(false)
            })
    };

    const handleEdit = () => {
        setIsReadOnly(false);
        showOkNotification(false);
    };

    const handleChange = (event) => {
        if (event.target.name === 'phoneNumber' && event.target.value.length === 12) {
            return;
        }
        if (event.target.name === 'phoneNumber' && event.target.value[0] !== '0') {
            event.target.value = '0' + event.target.value
        }

        setPersonalDetails({ ...newPersonalDetails, [event.target.name]: event.target.value })
    }

    return (
        <Box className="my-profile" background="white" border={{ color: 'brand', size: 'medium' }} gap="medium" pad="large" width="medium">
            <h1>My profile</h1>
            {loading ?
                <Spinner />
                :
                <Form onSubmit={handleSubmit} className='my-profile-form'>
                    <FormField>
                        <TextInput
                            maxLength={20}
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
                            maxLength={20}
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
                            maxLength={7}
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
                            maxLength={11}
                            max={9999999999}
                            reverse placeholder='Phone Number'
                            value={newPersonalDetails.phoneNumber}
                            icon={< Phone />}
                            onChange={event => handleChange(event)}
                            name="phoneNumber"
                            disabled={isReadOnly}
                            type='number'
                        >
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
                        okNotification ?
                            <Notification
                                status={Status.SUCCESS}
                                text={"Information saved."} />
                            :
                            null
                    }
                    {
                        errorNotification ?
                            <Notification
                                status={Status.SUCCESS}
                                text={"Ooops! Something went wrong."} />
                            :
                            null
                    }
                </Form>}
        </Box>
    );
};

export default MyProfile;
