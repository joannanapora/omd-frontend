import React from "react";
import "./homepage.container.scss";

import { Switch, Route } from "react-router-dom";

import SideBar from "../homepage/sidebar/sidebar.component";
import Info from '../features/info/info.component';
import Services from "../features/services/services.component";
import Contact from "../features/contact/contact.components";
import MyProfile from "../features/my-profile/my-profile.component";
import Register from "../features/sign-up/register.container";
import SignIn from "../features/sign-in/sign-in.container";
import AccountCreated from "../features/sign-up/account-created/account-created.component";
import AddService from '../features/services/add-service.component';

class HomePage extends React.Component<{}, { sections: any[] }> {
  constructor(props: any) {
    super(props);

    this.state = {
      sections: [
        {
          name: "About us",
          imageUrl: "",
          id: 1,
          url: "/info",
        },
        {
          name: "Services",
          imageUrl: "",
          id: 2,
          url: "/services",
        },
        {
          name: "Messages",
          imageUrl: "",
          id: 3,
          url: "/info",
        },
        {
          name: "My Profile",
          imageUrl: "",
          id: 4,
          url: "/my-profile",
        },
        {
          name: "Contact Us",
          imageUrl: "",
          id: 5,
          url: "/contact-us",
        },
      ],
    };
  }

  render() {
    return (
      <div className="homepage">
        <div className='sidebar'>
          <SideBar menuList={this.state.sections} />
        </div>
        <div className="homepage-right">
          <Switch>
            <Route path="/info" component={Info} />
            <Route path="/services" component={Services} />
            <Route path="/my-profile" component={MyProfile} />
            <Route path='/contact-us' component={Contact} />
            <Route path="/sign-in" component={SignIn} />
            <Route path='/register' component={Register} />
            <Route path='/confirmation' component={AccountCreated} />
            <Route path='/add-service' component={AddService} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default HomePage;
