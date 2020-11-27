import React from "react";
import { Link } from "react-router-dom";


import "./user-profile.container.scss";


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
        <div className='coala' >
          <img alt="user-profile" src="https://www.flaticon.com/svg/static/icons/svg/676/676163.svg" />
        </div>
        <Link to='/sign-in'>
          <h1>sign in</h1>
        </Link>
      </div>
    );
  }
}

export default UserProfile;
