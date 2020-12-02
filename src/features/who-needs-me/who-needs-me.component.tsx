import React from 'react';
import './who-needs-me.component.scss';
import Filter from '../../shared/custom-filter/custom-filter.component';
import { Box, Button, DataTable, TextInput } from 'grommet';
import { Add, BackTen, FormPreviousLink } from 'grommet-icons';


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

class WhoNeedsMe extends React.Component<{ animate: any, multiple: any }, { quotes: IQuote[], columns: any[] }> {
    constructor(props) {
        super(props);

        this.state = {
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

    render() {
        return (

            <Box className="who-needs-me" background="white" border gap="medium" pad="large" width="xlarge">
                <div className="add-quote">
                    <Button
                        color="brand"
                        primary
                        icon={<Add />}
                        label="Add Quote"
                        onClick={() => { }}
                    />
                </div>
                <h1>Who needs help?</h1>
                <div className="inputs">
                    <div>
                        <TextInput size='medium' className=' filter_text' placeholder="Name"></TextInput>

                    </div>
                    <div>
                        <TextInput size='medium' className='filter_text' placeholder="Breed"></TextInput>

                    </div>
                    <div>
                        <TextInput size='medium' className='filter_text' placeholder="Owner"></TextInput>

                    </div>
                </div>
                <div className="filters">
                    <Filter options={['today - 2 days', '3-7 days', '8-15 days', 'in the future']} name="When?"></Filter>
                    <Filter options={['north', 'north-west', 'north-east', 'west', 'east', 'south', 'south-west', 'south-east']} name="Location"></Filter>
                    <Filter options={['< 4kg', '4-10kg', '11-18kg', '19-34kg', ' > 35kg']} name="Weight"></Filter>
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


export default WhoNeedsMe;