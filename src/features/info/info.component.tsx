import React, { useEffect, useState } from 'react';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { debounce } from 'lodash';

import { Box, DateInput, TextInput, DataTable, } from 'grommet';
import { Add, Filter, Erase } from 'grommet-icons';

import { IServiceFilters } from '../../store/filters/filter.reducer';
import { setUserFilters } from '../../store/filters';
import { createStructuredSelector } from 'reselect';
import { selectUserFilters } from '../../store/filters/filter.selectors';

import { format } from 'date-fns'

import Notification, { Status } from '../../shared/custom-notification/custom-notification.component';
import CustomFilter from '../../shared/custom-filter/custom-filter.component';
import CustomButton from '../../shared/custom-button/custom-button.component';
import CustomDate from '../../shared/custom-date/custom-date.component';
import './info.styles.scss';

import { mapLocationsToOptions, mapWeightToOptions } from '../../models/enums';
import { IService } from '../../models/interfaces';

import { getServices } from '../../api/';


const Services = ({ history, filters, dispatchSetUserFilters }) => {

    const columns = [
        { header: "Name", property: 'dogName' },
        { header: "Breed", property: 'breed' },
        { header: "Weight", property: "weight" },
        { header: "Location", property: "location" },
        { header: "From", property: "dateFrom" },
        { header: "To", property: "dateTo" },
    ];

    const [services, setServices]: [IService[], any] = useState([]);
    const [sidebar, isSidebarVisible] = useState(true);
    const [showNotification, setShowNotification] = useState(false);


    const redirectToAddService = () => {
        if (history) history.push('/add-service');
    };

    useEffect(() => {
        filterServices();
    }, []);

    const handleDateChange = ({ event, name }) => {
        dispatchSetUserFilters({ [name]: event.target.value });
    };

    const handleInputsChange = (event) => {
        filterServices({
            ...filters, [event.target.name]: event.target.value
        });
        console.log(dispatchSetUserFilters)
        dispatchSetUserFilters({ [event.target.name]: event.target.value });
    }

    const handleSelectsChange = (filter: { name: string; value: number[]; }) => {
        dispatchSetUserFilters({ [filter.name]: filter.value });
    };

    const clearAllFilters = () => {
        dispatchSetUserFilters({ name: "", breed: "", owner: "", location: [], dateFrom: "", dateTo: "", weight: [] });
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

            }).catch(error => {
                setShowNotification(true);
            });
    };

    const setSidebar = () => {
        isSidebarVisible(!sidebar);
    };

    return (
        <div className='services'>
            <CustomButton label="Filters" primary icon={<Filter />} onClick={setSidebar} />
            {sidebar && (
                <Box
                    className="sidebar-box"
                    background="white"
                    animation={[
                        { type: 'fadeIn', duration: 300 },
                        { type: 'slideUp', size: 'large', duration: 600 },
                    ]}
                >
                    <Box className="filter-box" pad="small">
                        <div className='input-filters'>
                            <TextInput className='filter-input' value={filters?.dogName} onChange={debounce(handleInputsChange, 300)}
                                placeholder="Name" name="name" />
                            <TextInput value={filters?.breed} onChange={handleInputsChange}
                                className='filter-input' placeholder="Breed" name="breed" />
                        </div>
                        <div className='select-filters'>
                            <div className='select-filters-left'>
                                <CustomFilter width="100%" className='filter-select' selectedOptions={filters?.weight} name="weight" onChange={handleSelectsChange}
                                    options={['< 4kg', '4-10kg', '11-18kg', '19-34kg', ' > 35kg']} placeholder="Weight" />
                            </div>
                            <div className='select-filters-right'>
                                <CustomFilter className='filter-select' selectedOptions={filters?.location} name="location" onChange={handleSelectsChange}
                                    options={['north', 'north-west', 'north-east', 'west', 'east', 'south', 'south-west', 'south-east']} placeholder="Location" />
                            </div>
                        </div>
                        <div className='date-inputs'>
                            <DateInput format="dd/mm/yyyy" value={filters?.dateFrom} onChange={(event) => handleDateChange} name="dateFrom" />
                            <DateInput format="dd/mm/yyyy" value={filters?.dateTo} onChange={(event) => handleDateChange} name="dateTo" />
                        </div>
                        <CustomButton className='clean-filter-button' label='clear' secondary icon={<Erase />} onClick={() => clearAllFilters()} />

                    </Box>
                </Box >
            )
            }
            <Box className='services-table' gridArea="main" >
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
                <CustomButton label="Add Service" primary icon={<Add />} onClick={redirectToAddService} />
            </Box>
            {
                showNotification ?
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
    filters: selectUserFilters
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps)
    (Services));