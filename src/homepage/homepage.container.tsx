import React from "react";
import "./homepage.container.scss";

import { Switch, Route } from "react-router-dom";

import SideBar from "../homepage/sidebar/sidebar.component";
import MainPage from "../features/main-menu/main-menu.component";
import Articles from "../features/articles/artciles.component";
import Gallery from "../features/gallery/gallery.component";
import Shop from "../features/shop/shop.component";
import Contact from "../features/contact/contact.components";

import Register from "../features/sign-up/register.container";
import SignIn from "../features/sign-in/sign-in.container";

class HomePage extends React.Component<{}, { sections: any[] }> {
  constructor(props: any) {
    super(props);

    this.state = {
      sections: [
        {
          name: "",
          imageUrl:
            "https://www.flaticon.com/svg/static/icons/svg/628/628324.svg",
          id: 1,
          url: "/",
        },
        {
          name: "ARTICLES",
          imageUrl: "",
          id: 2,
          url: "/articles",
        },
        {
          name: "GALLERY",
          imageUrl: "",
          id: 3,
          url: "/gallery",
        },
        {
          name: "SHOP",
          imageUrl: "",
          id: 4,
          url: "/shop",
        },
        {
          name: "CONTACT",
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
        <div>
          <SideBar menuList={this.state.sections} />
        </div>
        <div className="homepage-right">
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path="/articles" component={Articles} />
            <Route path="/gallery" component={Gallery} />
            <Route path="/shop" component={Shop} />
            <Route path='/contact' component={Contact} />
            <Route path="/sign-in" component={SignIn} />
            <Route path='/register' component={Register} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default HomePage;