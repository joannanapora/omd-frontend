import React from "react";
import "./homepage.container.scss";
import { connect } from 'react-redux';

import { Switch, Route, withRouter } from "react-router-dom";
import { setCurrentUser } from '../store/user';

import SideBar from "../homepage/sidebar/sidebar.component";
import Info from '../features/info/info.component';
import Services from "../features/services/services.component";
import Contact from "../features/contact/contact.components";
import MyProfile from "../features/my-profile/my-profile.component";
import Register from "../features/sign-up/register.container";
import SignIn from "../features/sign-in/sign-in.container";
import AccountCreated from "../features/sign-up/account-created/account-created.component";
import AddService from '../features/services/add-service.component';
import Messages from '../features/messages/messages.component';
import Gallery from '../features/gallery/gallery.component';
import DonatePage from '../features/donate/donate.component';

import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../store/user/user.selectors';

class HomePage extends React.Component<{ history, dispatchSetCurrentUser, mapStateToProps, currentUser }, { sections: any[] }> {
  constructor(props: any) {
    super(props);

    this.state = {
      sections: [
        {
          name: "Donate OMD",
          id: 0,
          url: "/donate",
        },
        {
          name: "Services",
          id: 1,
          url: "/services",
        },
        {
          name: "Gallery",
          id: 2,
          url: "/gallery",
        },
        {
          name: "Messages",
          id: 3,
          url: "/messages",
        },
        {
          name: "My Profile",
          id: 4,
          url: "/my-profile",
        },
        {
          name: "Contact Us",
          id: 5,
          url: "/contact-us",
        },
        {
          name: "Sign In",
          id: 6,
          url: "/sign-in",
        },
        {
          name: "Sign Out",
          id: 7,
          url: "/sign-in",
          onClick: this.handleLogout,
        }
      ]
    };
  }

  handleLogout = (event) => {
    this.props.dispatchSetCurrentUser(null);
  }

  getSignInState(sections) {
    if (this.props.currentUser) {
      return sections.filter(s => {
        return s.name !== "Sign In"
      }
      );
    } else {
      return sections.filter(s => {
        return s.name !== "Sign Out" && s.name !== "Messages" && s.name !== "My Profile"
      });
    }
  }


  render() {
    const menuList: any[] = this.getSignInState(this.state.sections);

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
            <Route path='/messages' component={Messages} />
            <Route path='/gallery' component={Gallery} />
            <Route path='/donate' component= {DonatePage}/>
          </Switch>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  dispatchSetCurrentUser: (user) => dispatch(setCurrentUser(user))
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
