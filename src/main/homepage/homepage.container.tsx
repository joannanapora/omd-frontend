import React from "react";
import { connect } from 'react-redux';

import { Switch, Route, withRouter } from "react-router-dom";

import AccountCreated from "../../features/register-tab/account-created/account-created.component";
import MyGallery from '../../features/gallery-tab/my-gallery/my-gallery.component';
import GalleryPage from '../../features/gallery-tab/gallery/gallery.component';
import Register from "../../features/register-tab/register/register.container";
import AllDogs from '../../features/services-tab/services/services.component';
import MyProfile from "../../features/my-profile-tab/my-profile.component";
import Contact from "../../features/contact-tab/contact.components";
import DonatePage from '../../features/donate-tab/donate.component';
import SignIn from "../../features/login-tab/sign-in.container";
import SideBar from "../sidebar/sidebar.component";
import "./homepage.container.scss";

import { selectHomePageTabs } from '../../store/homepage/homepage.selectors';
import { selectCurrentUser } from '../../store/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import { setCurrentUser } from '../../store/user';


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
          <Route exact path='/' component={AllDogs} />
          <Route path="/all-dogs" component={AllDogs} />
          <Route path="/my-profile" component={MyProfile} />
          <Route path='/contact-us' component={Contact} />
          <Route path="/sign-in" component={SignIn} />
          <Route path='/register' component={Register} />
          <Route path='/confirmation' component={AccountCreated} />
          <Route exact path='/gallery' component={GalleryPage} />
          <Route path='/my-gallery' component={MyGallery} />
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
