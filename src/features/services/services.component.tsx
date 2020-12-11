import React from 'react';

import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import './services.styles.scss';
import Filter from '../../shared/custom-filter/custom-filter.component';
import CustomButton from '../../shared/custom-button/custom-button.component';
import { setUserFilters } from '../../store/filters';


import { Box, DataTable, FormField, TextInput } from 'grommet';
import { Add, Subtract, LinkPrevious } from 'grommet-icons';

interface IQuote {
    dogName: string;
    dogImage: string;
    owner: string;
    id: number;
    location: string;
    breed: string;
    date: string;
    weight: string;
}

class Services extends React.Component<{ history, currentFilters, dispatchSetUserFilters, animate: any, multiple: any }, { quotes: IQuote[], columns: any[], filters: any }> {
    constructor(props) {
        super(props);

        const quotes = [
            {
                dogName: "Dusty",
                breed: "Border Collie",
                dogImage: "https://www.flaticon.com/svg/static/icons/svg/53/53086.svg",
                owner: "Adrianna",
                location: "West",
                date: "15.11.2020",
                id: 41,
                weight: "10kg"
            },
            {
                dogName: "Kropek",
                breed: "White Shepherd",
                dogImage: "https://www.flaticon.com/svg/static/icons/svg/53/53086.svg",
                owner: "Joanna",
                location: "North-West",
                date: "12.05.2020",
                weight: "4kg",
                id: 42
            },
            {
                dogName: "Kropek",
                breed: "White Shepherd",
                dogImage: "https://www.flaticon.com/svg/static/icons/svg/53/53086.svg",
                owner: "Joanna",
                location: "North-West",
                date: "12.05.2020",
                weight: "4kg",
                id: 43
            },
            {
                dogName: "Kropek",
                breed: "White Shepherd",
                dogImage: "https://www.flaticon.com/svg/static/icons/svg/53/53086.svg",
                owner: "Joanna",
                location: "North-West",
                date: "12.05.2020",
                weight: "4kg",
                id: 54
            },
            {
                dogName: "Kropek",
                breed: "White Shepherd",
                dogImage: "https://www.flaticon.com/svg/static/icons/svg/53/53086.svg",
                owner: "Joanna",
                location: "North-West",
                date: "12.05.2020",
                weight: "4kg",
                id: 75
            }, {
                dogName: "Kropek",
                breed: "White Shepherd",
                dogImage: "https://www.flaticon.com/svg/static/icons/svg/53/53086.svg",
                owner: "Joanna",
                location: "North-West",
                date: "12.05.2020",
                weight: "4kg",
                id: 56
            },
            {
                dogName: "Kropek",
                breed: "White Shepherd",
                dogImage: "https://www.flaticon.com/svg/static/icons/svg/53/53086.svg",
                owner: "Joanna",
                location: "North-West",
                date: "12.05.2020",
                weight: "4kg",
                id: 87
            }, {
                dogName: "Kropek",
                breed: "White Shepherd",
                dogImage: "https://www.flaticon.com/svg/static/icons/svg/53/53086.svg",
                owner: "Joanna",
                location: "North-West",
                date: "12.05.2020",
                weight: "4kg",
                id: 98
            }, {
                dogName: "Kropek",
                breed: "White Shepherd",
                dogImage: "https://www.flaticon.com/svg/static/icons/svg/53/53086.svg",
                owner: "Joanna",
                location: "North-West",
                date: "12.05.2020",
                weight: "4kg",
                id: 1009
            }, {
                dogName: "Kropek",
                breed: "White Shepherd",
                dogImage: "https://www.flaticon.com/svg/static/icons/svg/53/53086.svg",
                owner: "Joanna",
                location: "North-West",
                date: "12.05.2020",
                weight: "4kg",
                id: 13210
            },
            {
                dogName: "Kropek",
                breed: "White Shepherd",
                dogImage: "https://www.flaticon.com/svg/static/icons/svg/53/53086.svg",
                owner: "Joanna",
                location: "North-West",
                date: "12.05.2020",
                weight: "4kg",
                id: 11321
            },
            {
                dogName: "Kropek 12",
                breed: "White Shepherd",
                dogImage: "https://www.flaticon.com/svg/static/icons/svg/53/53086.svg",
                owner: "Joanna",
                location: "North-West",
                date: "12.05.2020",
                weight: "4kg",
                id: 32122
            },
        ];

        this.state = {
            filters: {
                breed: "",
                name: "",
                owner: "",
                date: [],
                location: [],
                weight: [],
            },
            columns: [
                // { header: "#id", property: 'id' },
                { header: "Name", property: 'dogName' },
                { header: "Breed", property: 'breed' },
                { header: "Weight", property: "weight" },
                { header: "Location", property: "location" },
                { header: "Date", property: "date" },
                { header: "Owner", property: "owner" }],
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
        }

    }

    handleChange = (event) => {
        if (event.target.name === "name") {
            this.setState({
                filters: {
                    ...this.state.filters,
                    name: event.target.value
                }
            }
            )
        } if (event.target.name === "breed") {
            this.setState({
                filters: {
                    ...this.state.filters,
                    breed: event.target.value
                }
            }
            )
        } if (event.target.name === "owner") {
            this.setState({
                filters: {
                    ...this.state.filters,
                    owner: event.target.value
                }
            }
            )
        };
        this.props.dispatchSetUserFilters({ [event.target.name]: event.target.value });

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
        this.setState({ filters: { name: "" } });
        this.setState({ filters: { breed: "" } });
        this.setState({ filters: { owner: "" } });
        this.setState({ filters: { location: [] } });
        this.setState({ filters: { date: [] } });
        this.setState({ filters: { weight: [] } });
    }



    render() {
        return (

            <Box className="services" background="white" border gap="small" pad="medium" width="large">
                <h1>Services</h1>
                <div className="inputs">
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
                    <FormField>
                        <TextInput value={this.state.filters.owner} onChange={this.handleChange} className='filter_text' placeholder="Owner" name="owner"></TextInput>
                    </FormField>
                </div>
                <div className="filters">
                    <Filter selectedOptions={this.state.filters.date} name="date" onChange={this.handleFilters} options={['today - 2 days', '3-7 days', '8-15 days', 'in the future']} placeholder="When?"></Filter>
                    <Filter selectedOptions={this.state.filters.location} name="location" onChange={this.handleFilters} options={['north', 'north-west', 'north-east', 'west', 'east', 'south', 'south-west', 'south-east']} placeholder="Location"></Filter>
                    <Filter selectedOptions={this.state.filters.weight} name="weight" onChange={this.handleFilters} options={['< 4kg', '4-10kg', '11-18kg', '19-34kg', ' > 35kg']} placeholder="Weight"></Filter>
                </div>
                <div className="add-service-buttons">
                    <CustomButton
                        primary
                        icon={<Add />}
                        label="add service"
                        onClick={this.redirectToAddService}
                    />
                    <CustomButton
                        primary
                        icon={<Subtract />}
                        label="delete filters"
                        onClick={this.clearFilters}
                    />
                </div>
                <div className='services-table'>
                    <Box align="center" pad="large">
                        <DataTable
                            primaryKey='id'
                            columns={this.state.columns}
                            data={this.state.quotes}
                            step={25}
                            pad={{ horizontal: 'medium', vertical: 'xsmall' }}
                            background={{
                                header: 'dark-3',
                                body: ['light-1', 'light-3'],
                                footer: 'dark-3',
                            }}
                            border={{ body: 'bottom' }}
                            rowProps={{ Eric: { background: 'accent-2', pad: 'large' } }}
                        />
                    </Box>
                </div>
            </Box >
        )
    };
};

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