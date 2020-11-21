import React from "react";
import {SideBar} from "../components/sidebar.component";
import "./homepage.container.scss";

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Articles } from '../../articles/components/artciles.component' ;

import MainPage from '../../main-menu/components/main-menu.component';

import { Gallery } from '../../gallery/components/gallery.component';

import '../plant.svg';
 
class HomePage extends React.Component<{}, { sections: any[] }> {
  constructor(props: any) {
    super(props);

    this.state = {
      sections: [
        {
          name: "",
          imageUrl: `https://www.flaticon.com/svg/static/icons/svg/628/628324.svg`,
          id: 1,
        },
        {
          name: "articles",
          imageUrl: "",
          id: 2,
        },
        {
          name: "gallery",
          imageUrl: "",
          id: 3,
        },
        {
          name: "shop",
          imageUrl: "",
          id: 4,
        },
        {
          name: "profile",
          imageUrl: "",
          id: 5,
        },
      ],
    };
  }

  render() {
    return (
      <div className="homepage">
        <SideBar menuList={this.state.sections}/>
        <BrowserRouter>
        <Switch>
        <Route exact path ='/' component = {MainPage}/>
        <Route path = '/articles' component = {Articles} />
        <Route path = '/gallery' component = {Gallery} />
        </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default HomePage;