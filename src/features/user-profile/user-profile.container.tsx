import React from "react";
import { Link } from "react-router-dom";

import "./user-profile.container.scss";
import { connect } from 'react-redux';
import { setCurrentUser } from '../../store/user';

class UserProfile extends React.Component<{ currentUser, dispatchSetCurrentUser }, { email: string; password: string }> {
  constructor(props: any) {
    super(props);


    this.state = {
      email: "",
      password: "",
    }
  }


  handleLogout = event => {
    event.preventDefault();
    this.props.dispatchSetCurrentUser(null);
  }


  render() {
    return (
      <div className="user-area">
        <div className='img-container' >
          <img onClick={this.handleLogout} alt="paw" src="https://www.flaticon.com/svg/static/icons/svg/676/676163.svg" />
        </div>
        {
          this.props.currentUser ?
            <button onClick={this.handleLogout} className='status'>Sign Out</button>
            :
            <button><Link to='/sign-in' ><div className='status' > Sign In</div></Link></button>
        }
      </div>
    );
  }
}

const mapStateToProps = ({ user: { currentUser } }) => ({
  currentUser,
});

const mapDispatchToProps = dispatch => ({
  dispatchSetCurrentUser: (user) => dispatch(setCurrentUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (UserProfile);
