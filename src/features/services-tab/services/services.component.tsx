import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


import { Box, DateInput, TextInput, DataTable, FormField } from 'grommet';
import { NewWindow, SearchAdvanced, Erase } from 'grommet-icons';

import { selectUserFilters } from '../../../store/filters/filter.selectors';
import { selectCurrentUser } from '../../../store/user/user.selectors';
import { setUserFilters } from '../../../store/filters';
import { createStructuredSelector } from 'reselect';

import { format } from 'date-fns'

import Notification, { Status } from '../../../shared/custom-notification/custom-notification.component';
import CustomFilter from '../../../shared/custom-filter/custom-filter.component';
import CustomButton from '../../../shared/custom-button/custom-button.component';
import CustomModal from '../../../shared/custom-modal/custom-modal.component';
import Spinner from '../../../shared/spinner/spinner.component';
import AddService from '../add-service/add-service.component';
import './services.styles.scss';

import { mapLocationsToOptions, mapWeightToOptions } from '../../../models/enums';
import { IService } from '../../../models/interfaces';

import { getServices } from '../../../api';


const AllDogs = ({ filters, user, dispatchSetUserFilters, }) => {

    const columns = [
        { header: "Name", property: 'dogName' },
        { header: "Breed", property: 'breed' },
        { header: "Weight", property: "weight" },
        { header: "London Location", property: "location" },
        { header: "Date of Birth", property: "dateFrom" },
    ];
    const [errorNotification, showErrorNotification]: [boolean, any] = useState(false);
    const [services, setServices]: [IService[], any] = useState([]);
    const [sidebar, isSidebarVisible]: [boolean, any] = useState(false);
    const [modalIsOpen, setIsOpen]: [boolean, any] = useState(false);
    const [loading, setLoading]: [boolean, any] = useState(true);


    useEffect(() => {
        filterServices();
    }, []);

    const handleDateChange = (event, name) => {
        dispatchSetUserFilters({ [name]: event.value });
    };

    const handleInputsChange = (event) => {
        filterServices({
            ...filters, [event.target.name]: event.target.value
        });
        dispatchSetUserFilters({ [event.target.name]: event.target.value });
    }

    const handleSelectsChange = (filter: { name: string; value: number[]; }) => {
        filterServices({
            ...filters, [filter.name]: filter.value
        });
        dispatchSetUserFilters({ [filter.name]: filter.value });
    };

    const clearAllFilters = () => {
        dispatchSetUserFilters({ dogName: "", breed: "", location: [], dateFrom: "", weight: [] });
        filterServices();
    };


    const filterServices = (params?: any) => {
        setLoading(true);
        getServices(params)
            .then((response) => {
                const services = response.data.map(element => ({
                    id: element.id,
                    dogName: element.dogName,
                    breed: element.breed,
                    weight: mapWeightToOptions(element.weight),
                    location: mapLocationsToOptions(element.location),
                    dateFrom: format(new Date(element.dateFrom), 'dd/MM/yyyy'),
                }));
                setServices(services)
                setLoading(false);
            }).catch(() => {
                showErrorNotification(true)
                setLoading(false)
            });
    };

    const setSidebar = () => {
        isSidebarVisible(!sidebar);
    };

    function openModal() {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
        filterServices();
    }

    return (
        <div className='services'>
            <div className='services-buttons'>
                <CustomButton label="Add" disabled={!user} primary icon={<NewWindow
                />} onClick={openModal} />
                {modalIsOpen &&
                    (<CustomModal
                        modalIsOpen={modalIsOpen}
                        content={<AddService onClose={closeModal} />}
                    />)
                }
                <CustomButton label="Filters" primary icon={<SearchAdvanced />} onClick={setSidebar} />
            </div>
            {sidebar && (
                <Box
                    border={{ color: 'brand', size: 'small' }}
                    height="12%"
                    className="sidebar-box"
                    background="white"
                    animation={[
                        { type: 'fadeIn', duration: 300 },
                        { type: 'slideUp', duration: 200 },
                    ]}
                >
                    <Box className="filter-box" alignSelf='center' pad='small'>
                        <div className='filter-categories'>
                            <FormField>
                                <TextInput className='filter-input' value={filters?.dogName} onChange={event => handleInputsChange(event)}
                                    placeholder="Name" name="dogName" />
                            </FormField>
                            <FormField>
                                <TextInput value={filters?.breed} onChange={handleInputsChange}
                                    className='filter-input' placeholder="Breed" name="breed" />
                            </FormField>
                            <FormField>
                                <CustomFilter className='filter-select' selectedOptions={filters?.weight} name="weight" onChange={handleSelectsChange}
                                    options={['< 4kg', '4-10kg', '11-18kg', '19-34kg', ' > 35kg']} placeholder="Weight" />
                            </FormField>
                            <FormField>
                                <CustomFilter className='filter-select' selectedOptions={filters?.location} name="location" onChange={handleSelectsChange}
                                    options={['north', 'north-west', 'north-east', 'west', 'east', 'south', 'south-west', 'south-east']} placeholder="Location" />
                            </FormField>
                            <FormField><DateInput format="dd/mm/yyyy" value={filters?.dateFrom} onChange={(event) => handleDateChange(event, "dateFrom")} name="dateFrom" /></FormField>
                            <CustomButton className='clear-button' icon={<Erase />} default onClick={clearAllFilters} /></div>
                    </Box>
                </Box >
            )
            }
            <Box
                overflow={{
                    horizontal: 'hidden', vertical: 'auto'
                }}
                height='75%'
                align="center"
                width='inherit'>
                {loading ?
                    <Spinner />
                    :
                    <DataTable
                        pin={modalIsOpen ? false : 'header'}
                        primaryKey="id"
                        columns={columns}
                        data={services}
                        step={11}
                        background={{
                            header: 'dark-3',
                            body: ['light-1', 'light-3'],
                            footer: 'dark-3',
                        }}
                        border={{ body: 'bottom' }}
                        rowProps={{ Eric: { background: 'accent-2', pad: 'large' } }}
                    />
                }
            </Box>
            {
                errorNotification ?
                    <Notification
                        status={Status.FAILURE}
                        text={"Ooops, something went wrong."} />
                    :
                    null
            }
        </div>

    );
};

const mapDispatchToProps = dispatch => ({
    dispatchSetUserFilters: (filter) => dispatch(setUserFilters(filter))
});

const mapStateToProps = createStructuredSelector({
    user: selectCurrentUser,
    filters: selectUserFilters
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps)
    (AllDogs));