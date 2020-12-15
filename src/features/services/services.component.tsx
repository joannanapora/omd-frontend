import React from 'react';

import { Box, Grommet, FormField, Menu, TextInput, DataTable, Button, Grid, Text } from 'grommet';
import { grommet } from 'grommet/themes';

import axios from 'axios';

import { format } from 'date-fns'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './services.styles.scss';
import CustomFilter from '../../shared/custom-filter/custom-filter.component';
import CustomButton from '../../shared/custom-button/custom-button.component';
import { setUserFilters } from '../../store/filters';
import CustomDate from '../../shared/custom-date/custom-date.component';

import { mapLocationsToOptions, mapWeightToOptions } from '../../models/enums/index'

import { Add, FormTrash, FormDown, Filter, Trash } from 'grommet-icons';

interface IQuote {
    dogName: string;
    dogImage: string;
    owner: string;
    id: number;
    location: string;
    breed: string;
    dateFrom: any;
    dateTo: any;
    weight: string;
}

class Services extends React.Component<{ history, currentFilters, dispatchSetUserFilters, animate: any, multiple: any }, { sidebar: boolean, quotes: IQuote[], columns: any[], filters: any }> {
    constructor(props) {
        super(props);

        const quotes = []

        this.state = {
            sidebar: true,
            filters: {
                breed: "",
                name: "",
                dateFrom: "",
                dateTo: "",
                location: [],
                weight: [],
            },
            columns: [
                // { header: "#id", property: 'id' },
                { header: "Name", property: 'dogName' },
                { header: "Breed", property: 'breed' },
                { header: "Weight", property: "weight" },
                { header: "Location", property: "location" },
                { header: "From", property: "dateFrom" },
                { header: "To", property: "dateTo" },
            ],
            quotes
        }
    }

    redirectToAddService = () => {
        const { history } = this.props;
        if (history) history.push('/add-service');
    }

    componentDidMount() {
        if (this.props.currentFilters) {
            this.setState({ filters: this.props.currentFilters })
        };

        this.getServices();
    };

    handleDateChange = ({ date, name }) => {
        if (name === 'from') {
            this.setState({
                filters: {
                    ...this.state.filters,
                    dateFrom: date
                }
            });
        }
        if (name === 'to') {
            this.setState({
                filters: {
                    ...this.state.filters,
                    dateTo: date
                }
            });
        }
    }

    handleChange = (event) => {
        if (event.target.name === "name") {
            this.setState({
                filters: {
                    ...this.state.filters,
                    name: event.target.value
                }
            });
            this.getServices({
                ...this.state.filters,
                name: event.target.value
            });
        }
        if (event.target.name === "breed") {
            this.setState({
                filters: {
                    ...this.state.filters,
                    breed: event.target.value
                }
            });
            this.getServices({
                ...this.state.filters,
                breed: event.target.value
            });
        }
        ;
        this.props.dispatchSetUserFilters({ [event.target.name]: event.target.value });
        // CALL getServices with new filters
        // this.getService("lupus");
    }
    handleFilters = (filter: { name: string; value: any; }) => {
        this.setState({
            filters: {
                ...this.state.filters,
                [filter.name]: filter.value
            }
        });
        this.props.dispatchSetUserFilters({ [filter.name]: filter.value });
    }

    clearFilters = () => {
        this.setState({ filters: { name: "", breed: "", owner: "", location: [], dateFrom: "", dateTo: "", weight: [] } });
    }


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
                const quotes = response.data.map(element => ({
                    dogName: element.dogName,
                    breed: element.breed,
                    weight: mapWeightToOptions(element.weight),
                    location: mapLocationsToOptions(element.location),
                    dateFrom: format(new Date(element.dateFrom), 'dd/MM/yyyy'),
                    dateTo: format(new Date(element.dateTo), 'dd/MM/yyyy')
                }));
                this.setState({ quotes: quotes })
            }).catch(error => {
                console.log(error);

            });
    };

    setSidebar = () => {
        if (this.state.sidebar === false) {
            this.setState({ sidebar: true })
        }
        if (this.state.sidebar === true) {
            this.setState({ sidebar: false })
        }
    };

    render() {
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
                <CustomButton className='filter-button' primary icon={<Filter />} label="Filters" onClick={this.setSidebar} />
                {this.state.sidebar && (
                    <Box
                        className="sidebar-box"
                        gridArea="sidebar"
                        background="white"
                        width="125%"
                        animation={[
                            { type: 'fadeIn', duration: 300 },
                            { type: 'slideRight', size: 'xlarge', duration: 150 },
                        ]}
                    >
                        <div className="filters">
                            <FormField>
                                <TextInput
                                    value={this.state.filters.name} onChange={this.handleChange}
                                    className=' filter_text'
                                    placeholder="Name"
                                    name="name">
                                </TextInput>
                            </FormField>
                            <FormField>
                                <TextInput value={this.state.filters.breed} onChange={this.handleChange} className='filter_text' placeholder="Breed" name="breed"></TextInput>
                            </FormField>
                            <CustomFilter selectedOptions={this.state.filters.weight} name="weight" onChange={this.handleFilters} options={['< 4kg', '4-10kg', '11-18kg', '19-34kg', ' > 35kg']} placeholder="Weight"></CustomFilter>
                            <CustomFilter selectedOptions={this.state.filters.location} name="location" onChange={this.handleFilters} options={['north', 'north-west', 'north-east', 'west', 'east', 'south', 'south-west', 'south-east']} placeholder="Location"></CustomFilter>
                            <div className="date-inputs">
                                <CustomDate label="Start Date" date={this.state.filters.dateFrom} name="from" onChange={this.handleDateChange} />
                                <CustomDate label="End Date" date={this.state.filters.dateTo} name="to" onChange={this.handleDateChange} />
                            </div>
                            <CustomButton className='clean-filter-button' secondary icon={<Trash />} onClick={this.clearFilters} />
                        </div>
                    </Box>
                )}
                <div className='add-service-button' ><CustomButton label="Add Service" primary icon={<Add />} onClick={this.redirectToAddService} /></div>
                <Box className='services-table' gridArea="main" justify="center" align="center">
                    <Box align="center" pad="small">
                        <DataTable
                            primaryKey='id'
                            columns={this.state.columns}
                            data={this.state.quotes}
                            step={25}
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
                </Box>
            </Grid>
        );
    };
}
const mapDispatchToProps = dispatch => ({
    dispatchSetUserFilters: (filter) => dispatch(setUserFilters(filter))
});

const mapStateToProps = ({ filter: { currentFilters } }) => ({
    currentFilters,
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps)
    (Services));