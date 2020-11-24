import React from 'react';
import './main-menu.component.scss'

import Calender from './calender/calender.component';
import Journal from './journal/journal.component';


class MainPage extends React.Component<{}, { calender: any[], journal: any[] }> {
    constructor(props) {
        super(props);



        this.state = {
            calender: [],
            journal: [],
        }
    };

    render() {
        return (<div className="main-menu">
            <Calender />
            <Journal />
        </div>)
    };
}


export default MainPage;