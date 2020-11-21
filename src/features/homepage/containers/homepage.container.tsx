import React from "react";
import {SideBar} from "../components/sidebar.component";
import "./homepage.container.scss";

import { Switch, Route } from 'react-router-dom';

import { Articles } from '../../articles/components/artciles.component' ;

import MainPage from '../../main-menu/components/main-menu.component';

import { Gallery } from '../../gallery/components/gallery.component';
 
class HomePage extends React.Component<{}, { sections: any[] }> {
  constructor(props: any) {
    super(props);

    this.state = {
      sections: [
        {
          name: "",
          imageUrl: 'https://www.flaticon.com/svg/static/icons/svg/628/628324.svg',
          id: 1,
          url: '/'
        },
        {
          name: "Articles",
          imageUrl: "",
          id: 2,
          url: '/articles'
        },
        {
          name: "Gallery",
          imageUrl: "",
          id: 3,
          url: '/gallery'
        },
        {
          name: "Shop",
          imageUrl: "",
          id: 4,
          url: '/shop'
        },
        {
          name: "Profile",
          imageUrl: "",
          id: 5,
          url: '/profile'
        },
      ],
    };
  }

  render() {
    return (
      <div className="homepage">
        <SideBar menuList={this.state.sections}/>
        <Switch>
        <Route exact path ='/' component = {MainPage}/>
        <Route path = '/articles' component = {Articles} />
        <Route path = '/gallery' component = {Gallery} />
        </Switch>
      </div>
    );
  }
}

export default HomePage;