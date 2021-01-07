import React from "react";
import "./homepage.container.scss";
import { connect } from 'react-redux';

import { Switch, Route, withRouter } from "react-router-dom";
import { setCurrentUser } from '../store/user';

import SideBar from "../homepage/sidebar/sidebar.component";
import Services from "../features/services/services.component";
import Contact from "../features/contact/contact.components";
import MyProfile from "../features/my-profile/my-profile.component";
import Register from "../features/sign-up/register.container";
import SignIn from "../features/sign-in/sign-in.container";
import AccountCreated from "../features/sign-up/account-created/account-created.component";
import GalleryPage from '../features/gallery/gallery.component';
import DonatePage from '../features/donate/donate.component';
import MyGallery from '../features/gallery/my-gallery/my-gallery.component';

import { createStructuredSelector } from 'reselect';
import { selectHomePageTabs } from '../store/homepage/homepage.selectors';
import { selectCurrentUser } from '../store/user/user.selectors';


const HomePage = ({ dispatchSetCurrentUser, tabs, currentUser }) => {

  const handleLogout = () => {
    dispatchSetCurrentUser(null);
    localStorage.removeItem('accessToken');
  };

  const getTabsBasedOnUserState = (tabs) => {
    tabs = tabs.map(t => t.name === "Sign Out" ? {
      ...t,
      onClick: handleLogout,
    } : t);

    if (currentUser) {
      return tabs.filter(s => {
        return s.name !== "Sign In"
      }
      );
    } else {
      return tabs.filter(s => {
        return s.name !== "Sign Out" && s.name !== "Messages" && s.name !== "My Profile"
      });
    }
  };

  const menuList: any[] = getTabsBasedOnUserState(tabs);

  return (
    <div className="homepage">
      <div className='sidebar'>
        <SideBar menuList={menuList} />
      </div>
      <div className="homepage-right">
        <Switch>
          <Route path="/services" component={Services} />
          <Route path="/my-profile" component={MyProfile} />
          <Route path='/contact-us' component={Contact} />
          <Route path="/sign-in" component={SignIn} />
          <Route path='/register' component={Register} />
          <Route path='/confirmation' component={AccountCreated} />
          <Route exact path='/gallery' component={GalleryPage} />
          <Route path='/gallery/my-gallery' component={MyGallery} />
          <Route path='/donate' component={DonatePage} />
        </Switch>
      </div>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  dispatchSetCurrentUser: (user) => dispatch(setCurrentUser(user))
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  tabs: selectHomePageTabs,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
