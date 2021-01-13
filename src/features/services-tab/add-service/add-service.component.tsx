import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom'

import { Box, DateInput, FormField, Select, TextInput } from 'grommet';
import { Erase, Tag, List, Map, Certificate, Close } from 'grommet-icons';

import { mapOptionsToWeight, mapOptionsToLocation, mapLocationsToOptions, mapWeightToOptions } from '../../../models/enums';
import Notification, { Status } from '../../../shared/custom-notification/custom-notification.component';
import CustomCheckBox from '../../../shared/custom-checkbox/custom-checkbox.component';
import CustomButton from '../../../shared/custom-button/custom-button.component';
import { INewService } from '../../../models/interfaces/index';
import './add-service.styles.scss';

import { postService, getTemplate } from '../../../api';


const AddService = ({ onClose }) => {

    let location = ['north', 'north-west', 'north-east', 'west', 'east', 'south', 'south-west', 'south-east'];
    let weight = ['< 4kg', '4-10kg', '11-18kg', '19-34kg', ' > 35kg'];
    const isSelectOpen: boolean = false

    const [newService, setNewService]: [INewService, any] = useState({
        name: '',
        breed: '',
        dateFrom: '',
        dateTo: '',
        checked: false,
        selectedLocation: null,
        selectedWeight: null,
    });

    const [errorNotification, showErrorNotification]: [boolean, any] = useState(false);
    const [okNotification, showOkNotification]: [boolean, any] = useState(false);
    const [isReadOnly, setIsReadOnly]: [boolean, any] = useState(false);
    const [isNewServiceAdded, setNewServiceAdded]: [boolean, any] = useState(false)

    useEffect(() => {
        getTemplate().then((response) => {
            setNewService({
                breed: response.data.breed, name: response.data.dogName,
                selectedLocation: mapLocationsToOptions(response.data.location), selectedWeight: mapWeightToOptions(response.data.weight)
            })
        })
            .catch(error => {
                setIsReadOnly(false)
                showErrorNotification(true)
            });
    }, []);

    const clearAllFilters = () => {
        setNewService({
            name: '',
            breed: '',
            dateFrom: '',
            checked: false,
            selectedLocation: null,
            selectedWeight: null,
        })
    };

    const handleSubmit = () => {
        showOkNotification(false)
        postService(newService.dateFrom, newService.breed, newService.name, mapOptionsToLocation(newService.selectedLocation),
            mapOptionsToWeight(newService.selectedWeight), newService.checked)
            .then(() => {
                setNewServiceAdded(true);
                if (!newService.checked) {
                    setNewService({
                        name: '',
                        breed: '',
                        dateFrom: '',
                        checked: false,
                        selectedLocation: null,
                        selectedWeight: null,
                    });
                    showOkNotification(true)
                } else {
                    setNewService({
                        ...newService,
                    });
                    showOkNotification(true)
                }
            }).catch((error) => {
            })
    };


    const handleInputChange = (event) => {
        setNewService({ ...newService, [event.target.name]: event.target.value })
    };

    const handleSelectChange = (event) => {
        setNewService({ ...newService, [event.target.name]: event.value })
    };

    const handleDateChange = (event, name) => {
        setNewService({ ...newService, [name]: event.value })
    };

    const handleChecked = (event) => {
        setNewService({ ...newService, checked: event.target.checked })
    };

    const onHandleClose = () => {
        onClose(isNewServiceAdded);
    };


    return (
        <Box className="service-box" border={{ color: 'brand', size: 'medium' }} gap="xsmall" pad="medium" width="large" >
            <div className='add-service-headers'>
                <div className='paw'><img alt='paw' src="https://www.flaticon.com/svg/static/icons/svg/676/676163.svg" /></div>
                <div><h1>Add Service</h1></div>
                <div><CustomButton onClick={onHandleClose} secondary icon={<Close />} /></div>
            </div>
            <Box className='add-service-form' direction="row" flex background="white" >
                <div className='add-service-left'>
                    <FormField><DateInput format="dd/mm/yyyy" value={newService.dateFrom} onChange={(event) => handleDateChange(event, "dateFrom")} name="dateFrom" /></FormField>
                    <FormField required={false} >
                        <Select
                            icon={<Map />}
                            disabled={isReadOnly}
                            name="selectedLocation"
                            placeholder="Location"
                            open={isSelectOpen}
                            value={newService.selectedLocation}
                            options={location}
                            onChange={handleSelectChange}
                        />
                    </FormField>
                    <FormField required={false}>
                        <TextInput
                            icon={<List />}
                            disabled={isReadOnly}
                            onChange={handleInputChange}
                            value={newService.name}
                            name="name"
                            reverse placeholder="Dog Name"
                        ></TextInput>
                    </FormField>
                    <FormField required={false} >
                        <TextInput
                            icon={<Certificate />}
                            disabled={isReadOnly}
                            onChange={handleInputChange}
                            value={newService.breed}
                            name="breed"
                            reverse placeholder="Dog Breed"
                        />
                    </FormField>
                    <FormField required={false}>
                        <Select
                            icon={<Tag />}
                            disabled={isReadOnly}
                            name="selectedWeight"
                            placeholder="Dog Weight"
                            open={isSelectOpen}
                            value={newService.selectedWeight}
                            options={weight}
                            onChange={handleSelectChange}
                        />

                    </FormField>
                </div>
            </Box>
            <div className='add-service-buttons'>
                <CustomCheckBox checked={newService.checked} onChange={handleChecked}
                    label="Remember" />
                <CustomButton
                    label='Submit'
                    primary
                    onClick={handleSubmit}
                    disabled={!(newService.breed && newService.name && newService.selectedLocation && newService.dateFrom &&
                        newService.selectedWeight) || isReadOnly} />
                <CustomButton label="Clear" primary icon={<Erase />} onClick={clearAllFilters}></CustomButton>
            </div>
            {
                okNotification ?
                    <Notification
                        status={Status.SUCCESS}
                        text={"New service has been added."} />
                    :
                    null
            }
            {
                errorNotification ?
                    <Notification
                        status={Status.FAILURE}
                        text={"Ooops, something went wrong"} /> :
                    null
            }
        </Box >
    );
}

export default withRouter(AddService);