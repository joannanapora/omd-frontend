import React from "react";
import "./user-profile.container.scss";
import { Link } from "react-router-dom";
import { ReactComponent as Paw } from '../../assets/Paw_Print.svg';

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
