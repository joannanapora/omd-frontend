import React from 'react';
import './main-menu.component.scss'
import { Calender } from '../main-page/calender/components/calender.component';
import { Journal } from '../main-page/journal/components/journal.component';


class MainPage extends React.Component<{}, { calender: any[], journal: any[] }> {
    constructor(props) {
      super(props);

      

        this.state = {
            calender: [],
            journal: [],
        }
    };

    render() {
        return (<div className = "main-menu">
            <Journal></Journal>
            <Calender></Calender>
            </div>)
    };
}


export default MainPage;