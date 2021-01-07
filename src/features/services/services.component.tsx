import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


import { Box, DateInput, TextInput, DataTable, FormField } from 'grommet';
import { NewWindow, SearchAdvanced, Erase } from 'grommet-icons';

import { setUserFilters } from '../../store/filters';
import { createStructuredSelector } from 'reselect';
import { selectUserFilters } from '../../store/filters/filter.selectors';

import { format } from 'date-fns'

import Notification, { Status } from '../../shared/custom-notification/custom-notification.component';
import CustomFilter from '../../shared/custom-filter/custom-filter.component';
import CustomButton from '../../shared/custom-button/custom-button.component';
import './services.styles.scss';

import { mapLocationsToOptions, mapWeightToOptions } from '../../models/enums';
import { IService } from '../../models/interfaces';

import { getServices } from '../../api/';
import AddService from './add-service/add-service.component';
import { selectCurrentUser } from '../../store/user/user.selectors';


const Services = ({ filters, user, dispatchSetUserFilters, }) => {

    const columns = [
        { header: "Name", property: 'dogName' },
        { header: "Breed", property: 'breed' },
        { header: "Weight", property: "weight" },
        { header: "Location", property: "location" },
        { header: "From", property: "dateFrom" },
        { header: "To", property: "dateTo" },
    ];
    const [errorNotification, showErrorNotification] = useState(false);
    const [services, setServices]: [IService[], any] = useState([]);
    const [sidebar, isSidebarVisible] = useState(false);
    const [modalIsOpen, setIsOpen] = React.useState(false);


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
        dispatchSetUserFilters({ [filter.name]: filter.value });
    };

    const clearAllFilters = () => {
        dispatchSetUserFilters({ dogName: "", breed: "", location: [], dateFrom: "", dateTo: "", weight: [] });
        filterServices();
    };


    const filterServices = (params?: any) => {
        getServices(params)
            .then((response) => {
                const services = response.data.map(element => ({
                    dogName: element.dogName,
                    breed: element.breed,
                    weight: mapWeightToOptions(element.weight),
                    location: mapLocationsToOptions(element.location),
                    dateFrom: format(new Date(element.dateFrom), 'dd/MM/yyyy'),
                    dateTo: format(new Date(element.dateTo), 'dd/MM/yyyy')
                }));

                setServices(services)

            }).catch(() => {
                showErrorNotification(true)
            });
    };

    const setSidebar = () => {
        isSidebarVisible(!sidebar);
    };

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            border: 'none'
        }
    };

    function openModal() {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    return (
        <div className='services'>
            <div className='services-buttons'>
                <CustomButton label="Add Service" disabled={!user} primary icon={<NewWindow
                />} onClick={openModal} />
                {modalIsOpen ?
                    <Modal
                        isOpen={modalIsOpen}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >
                        <AddService onClose={closeModal} />
                    </Modal>
                    :
                    null
                }
                <CustomButton label="Filters" primary icon={<SearchAdvanced />} onClick={setSidebar} />
            </div>
            {sidebar && (
                <Box
                    width='xlarge'
                    height="xsmall"
                    className="sidebar-box"
                    background="white"
                    animation={[
                        { type: 'fadeIn', duration: 300 },
                        { type: 'slideUp', duration: 200 },
                    ]}
                >
                    <Box className="filter-box" pad="medium">
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
                            <FormField><DateInput format="dd/mm/yyyy" value={filters?.dateTo} onChange={(event) => handleDateChange(event, "dateTo")} name="dateTo" /></FormField>
                            <CustomButton className='clear-button' label="Clear" secondary icon={<Erase />} onClick={clearAllFilters} /></div>
                    </Box>
                </Box >
            )
            }
            <Box className='services-table' width="xlarge" overflow='auto' height='100%' gridArea="main" >
                <DataTable
                    primaryKey='id'
                    columns={columns}
                    data={services}
                    step={11}
                    pad={{ horizontal: 'large', vertical: 'small' }}
                    background={{
                        header: 'dark-3',
                        body: ['light-1', 'light-3'],
                        footer: 'dark-3',
                    }}
                    border={{ body: 'bottom' }}
                    rowProps={{ Eric: { background: 'accent-2', pad: 'large' } }}
                />
            </Box>
            {
                errorNotification ?
                    <Notification
                        status={Status.FAILURE}
                        text={"Ooops, something went wrong."}>
                    </Notification>
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
    (Services));