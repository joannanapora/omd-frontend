import React from "react";
import "./homepage.container.scss";

import { Switch, Route } from "react-router-dom";

import SideBar from "../homepage/sidebar/sidebar.component";
import Info from '../features/info/info.component';
import WhoNeedsMe from "../features/who-needs-me/who-needs-me.component";
import Shop from "../features/shop/shop.component";
import Contact from "../features/contact/contact.components";

import Register from "../features/sign-up/register.container";
import SignIn from "../features/sign-in/sign-in.container";
import AccountCreated from "../features/sign-up/account-created/account-created.component";

class HomePage extends React.Component<{}, { sections: any[] }> {
  constructor(props: any) {
    super(props);

    this.state = {
      sections: [
        {
          name: "INFO",
          imageUrl: "",
          id: 1,
          url: "/articles",
        },
        {
          name: "Who needs me?",
          imageUrl: "",
          id: 4,
          url: "/gallery",
        },
        {
          name: "DOGallery",
          imageUrl: "",
          id: 3,
          url: "/shop",
        },
        {
          name: "Contact Us",
          imageUrl: "",
          id: 5,
          url: "/contact",
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
            <Route path="/articles" component={Info} />
            <Route path="/gallery" component={WhoNeedsMe} />
            <Route path="/shop" component={Shop} />
            <Route path='/contact' component={Contact} />
            <Route path="/sign-in" component={SignIn} />
            <Route path='/register' component={Register} />
            <Route path='/confirmation' component={AccountCreated} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default HomePage;
