import React from "react";
import "./homepage.container.scss";
import { connect } from 'react-redux';

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

import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../store/user/user.selectors';

class HomePage extends React.Component<{ mapStateToProps, currentUser }, { sections: any[] }> {
  constructor(props: any) {
    super(props);

    this.state = {
      sections: [
        {
          name: "Services",
          imageUrl: "",
          id: 1,
          url: "/services",

        },
        {
          name: "Gallery",
          imageUrl: "",
          id: 2,
          url: "/services",
        },
        {
          name: "Messages",
          imageUrl: "",
          id: 3,
          url: "/messages",
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

  getMenuList(): any[] {
    if (!this.props.currentUser) {
      return this.state.sections.map(s => {
        if (s.name === "Messages" || s.name === "My Profile") {
          return { ...s, disabled: true };
        }
        return s;
      });
    } else {
      return this.state.sections.map(s => ({
        ...s,
        disabled: false
      }));
    }
  }


  render() {
    const menuList: any[] = this.getMenuList();

    return (
      <div className="homepage">
        <div className='sidebar'>
          <SideBar menuList={menuList} />
        </div>
        <div className="homepage-right">
          <Switch>
            <Route path="/info" component={Info} />
            <Route path="/services" component={Services} />
            <Route path="/my-profile" component={MyProfile} />
            <Route path='/contact-us' component={Contact} />
            <Route path="/sign-in" component={SignIn} />
            <Route path='/register' component={Register} />
            <Route path='/about-us' component={Info} />
            <Route path='/confirmation' component={AccountCreated} />
            <Route path='/add-service' component={AddService} />
          </Switch>
        </div>
      </div>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps, null)(HomePage);
