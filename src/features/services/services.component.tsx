import React from 'react';

import { DebounceInput } from 'react-debounce-input';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import axios from 'axios';
import { debounce } from 'lodash';

import { Box, FormField, TextInput, DataTable, Grid } from 'grommet';
import { Add, Filter, Erase } from 'grommet-icons';


import { format } from 'date-fns'

import Notification, { Status } from '../../shared/custom-notification/custom-notification.component';
import CustomFilter from '../../shared/custom-filter/custom-filter.component';
import CustomButton from '../../shared/custom-button/custom-button.component';
import CustomDate from '../../shared/custom-date/custom-date.component';
import './services.styles.scss';

import { IServiceFilters } from '../../store/filters/filter.reducer';
import { setUserFilters } from '../../store/filters';

import { mapLocationsToOptions, mapWeightToOptions } from '../../models/enums';
import { IService } from '../../models/interfaces';




class Services extends React.Component<{ history, currentFilters: IServiceFilters, dispatchSetUserFilters }, { showNotification: boolean, sidebar: boolean, services: IService[], columns: { header: string; property: string }[] }> {
    constructor(props) {
        super(props);

        this.state = {
            sidebar: true,
            columns: [
                { header: "Name", property: 'dogName' },
                { header: "Breed", property: 'breed' },
                { header: "Weight", property: "weight" },
                { header: "Location", property: "location" },
                { header: "From", property: "dateFrom" },
                { header: "To", property: "dateTo" },
            ],
            services: [],
            showNotification: false,
        }
    };

    redirectToAddService = () => {
        const { history } = this.props;
        if (history) history.push('/add-service');
    };

    componentDidMount() {
        this.getServices();
    }

    handleDateChange = ({ date, name }) => {
        this.props.dispatchSetUserFilters({ [name]: date });
    };

    handleInputsChange = (event) => {
        this.getServices({
            ...this.props.currentFilters,
            [event.target.name]: event.target.value
        });

        this.props.dispatchSetUserFilters({ [event.target.name]: event.target.value });
    }

    handleSelectsChange = (filter: { name: string; value: number[]; }) => {
        this.props.dispatchSetUserFilters({ [filter.name]: filter.value });
    };

    clearAllFilters = () => {
        this.props.dispatchSetUserFilters({ name: "", breed: "", owner: "", location: [], dateFrom: "", dateTo: "", weight: [] });
    };


    getServices = (params?: any) => {
        let url = 'http://localhost:4000/services';
        const config = {
            headers: { Authorization: "Bearer " + localStorage.getItem('accessToken') }
        };

        if (params) {
            if (params.name) {
                url = url + '?dogName=' + params.name + '&';
            }

            if (params.breed) {
                url = url + '?breed=' + params.breed + '&';
            }

            if (params.location) {
                params.location.forEach(l => {
                    url = url + '?locations=' + l + '&';
                })
            }

            if (params.weight) {
                params.location.forEach(l => {
                    url = url + '?weights=' + l + '&';
                })
            }
        }

        axios.get(url, config)
            .then((response) => {
                const services = response.data.map(element => ({
                    dogName: element.dogName,
                    breed: element.breed,
                    weight: mapWeightToOptions(element.weight),
                    location: mapLocationsToOptions(element.location),
                    dateFrom: format(new Date(element.dateFrom), 'dd/MM/yyyy'),
                    dateTo: format(new Date(element.dateTo), 'dd/MM/yyyy')
                }));

                this.setState({ services })

            }).catch(error => {
                console.log(error);
                this.setState({ showNotification: true })
            });
    };

    setSidebar = () => {
        this.setState({ sidebar: !this.state.sidebar });
    };

    render() {
        const filters = this.props.currentFilters;

        return (
            <Grid
                fill
                rows={['auto', 'flex']}
                columns={['auto', 'flex']}
                areas={[
                    { name: 'header', start: [0, 0], end: [1, 0] },
                    { name: 'sidebar', start: [0, 1], end: [0, 1] },
                    { name: 'main', start: [1, 1], end: [1, 1] },
                ]}
            >
                <CustomButton className='filter-button' secondary icon={<Filter />} label="filters" onClick={this.setSidebar} />
                {this.state.sidebar && (
                    <Box
                        className="sidebar-box"
                        gridArea="sidebar"
                        background="white"
                        width="90%"
                        animation={[
                            { type: 'fadeIn', duration: 300 },
                            { type: 'slideRight', size: 'large', duration: 450 },
                        ]}
                    >
                        <div className="filters">
                            <FormField className='filter-field'>
                                <TextInput value={filters?.dogName} onChange={debounce(this.handleInputsChange, 300)} className=' filter_text' placeholder="Name" name="name">
                                </TextInput>
                            </FormField >
                            <FormField className='filter-field'>
                                <TextInput value={filters?.breed} onChange={this.handleInputsChange} className='filter_text' placeholder="Breed" name="breed"></TextInput>
                            </FormField>
                            <CustomFilter className='filter-field' selectedOptions={filters?.weight} name="weight" onChange={this.handleSelectsChange} options={['< 4kg', '4-10kg', '11-18kg', '19-34kg', ' > 35kg']} placeholder="Weight"></CustomFilter>
                            <CustomFilter className='filter-field' selectedOptions={filters?.location} name="location" onChange={this.handleSelectsChange} options={['north', 'north-west', 'north-east', 'west', 'east', 'south', 'south-west', 'south-east']} placeholder="Location">
                            </CustomFilter>
                            <FormField className="date">
                                <CustomDate label="Date (start)" date={filters?.dateFrom} name="dateFrom" onChange={this.handleDateChange} />
                            </FormField>
                            <FormField className="date">
                                <CustomDate label="Date(end)" date={filters?.dateTo} name="dateTo" onChange={this.handleDateChange} />
                            </FormField>
                            <CustomButton className='clean-filter-button' label='clear' secondary icon={<Erase />} onClick={this.clearAllFilters} />
                        </div>
                    </Box >
                )
                }
                <Box className='services-table' gridArea="main" >
                    <DataTable
                        primaryKey='id'
                        columns={this.state.columns}
                        data={this.state.services}
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
                    <div className='add-service-button' ><CustomButton label="Add Service" primary icon={<Add />} onClick={this.redirectToAddService} /></div>
                </Box>
                {
                    this.state.showNotification ?
                        <Notification
                            status={Status.FAILURE}
                            text={"Ops, backend is OFF"}>
                        </Notification>
                        :
                        null
                }
            </Grid >
        );
    };
}

const mapDispatchToProps = dispatch => ({
    dispatchSetUserFilters: (filter) => dispatch(setUserFilters(filter))
});

const mapStateToProps = ({ filter }) => ({
    currentFilters: filter.currentFilters,
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps)
    (Services));