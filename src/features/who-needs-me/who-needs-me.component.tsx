import React from 'react';
import './who-needs-me.component.scss';
import Filter from '../../shared/custom-filter/custom-filter.component';
import { Box, Button, DataTable, TextInput } from 'grommet';
import { Add, Subtract } from 'grommet-icons';
import { setUserFilters } from '../../store/filters';
import { connect } from 'react-redux';

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

class WhoNeedsMe extends React.Component<{ dispatchSetUserFilters, animate: any, multiple: any }, { quotes: IQuote[], columns: any[], filters: any }> {
    constructor(props) {
        super(props);

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
                { header: "Name", property: 'dogName' },
                { header: "Breed", property: 'breed' },
                { header: "Weight", property: "weight" },
                { header: "Location", property: "location" },
                { header: "Date", property: "date" },
                { header: "Owner", property: "owner" }],
            quotes: [
                {
                    dogName: "Dusty",
                    breed: "Border Collie",
                    dogImage: "https://www.flaticon.com/svg/static/icons/svg/53/53086.svg",
                    owner: "Adrianna",
                    location: "West",
                    date: "15.11.2020",
                    id: 1,
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
                    id: 2
                }]
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

            <Box className="who-needs-me" background="white" border gap="medium" pad="large" width="xlarge">
                <h1>Who needs help?</h1>
                <div className="inputs">
                    <div>
                        <TextInput
                            value={this.state.filters.name}
                            onChange={this.handleChange}
                            size='medium'
                            className=' filter_text'
                            placeholder="Name"
                            name="name">
                        </TextInput>
                    </div>
                    <div>
                        <TextInput value={this.state.filters.breed} onChange={this.handleChange} size='medium' className='filter_text' placeholder="Breed" name="breed"></TextInput>

                    </div>
                    <div>
                        <TextInput value={this.state.filters.owner} onChange={this.handleChange} size='medium' className='filter_text' placeholder="Owner" name="owner"></TextInput>

                    </div>
                </div>
                <div className="filters">
                    <Filter selectedOptions={this.state.filters.date} name="date" onChange={this.handleFilters} options={['today - 2 days', '3-7 days', '8-15 days', 'in the future']} placeholder="When?"></Filter>
                    <Filter selectedOptions={this.state.filters.location} name="location" onChange={this.handleFilters} options={['north', 'north-west', 'north-east', 'west', 'east', 'south', 'south-west', 'south-east']} placeholder="Location"></Filter>
                    <Filter selectedOptions={this.state.filters.weight} name="weight" onChange={this.handleFilters} options={['< 4kg', '4-10kg', '11-18kg', '19-34kg', ' > 35kg']} placeholder="Weight"></Filter>
                </div>
                <div className="add-quote">
                    <Button
                        color="brand"
                        primary
                        icon={<Add />}
                        label="Add Quote"
                        onClick={() => { }}
                    />
                    <Button
                        color="brand"
                        primary
                        icon={<Subtract />}
                        label="Clear Filters"
                        onClick={this.clearFilters}
                    />
                </div>
                <Box align="center" pad="large">
                    <DataTable
                        columns={this.state.columns}
                        data={this.state.quotes}
                        step={10}
                        pad={{ horizontal: 'large', vertical: 'medium' }}
                        background={{
                            header: 'dark-3',
                            body: ['light-1', 'light-3'],
                            footer: 'dark-3',
                        }}
                        border={{ body: 'bottom' }}
                        rowProps={{ Eric: { background: 'accent-2', pad: 'large' } }}
                    />
                </Box>
            </Box >
        )
    };
};

const mapDispatchToProps = dispatch => ({
    dispatchSetUserFilters: (filter) => dispatch(setUserFilters(filter))
});


export default connect(
    null,
    mapDispatchToProps)
    (WhoNeedsMe);