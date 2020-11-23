import React from "react";
import "./user-profile.container.scss";
import { Link } from "react-router-dom";

class UserProfile extends React.Component<{}, { avatar: any; userName: any }> {
  constructor(props: any) {
    super(props);

    this.state = {
      avatar: "",
      userName: "Sign in",
    };
  }

  render() {
    return (
      <div className="user-area">
        <div className = 'coala' >
          <img alt="user-profile" src ="https://www.flaticon.com/svg/static/icons/svg/3069/3069172.svg" />
        </div>
        <Link>
          <h1>Sign In</h1>
        </Link>
      </div>
    );
  }
}

export default UserProfile;
