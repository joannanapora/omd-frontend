import React from "react";
import { withRouter } from 'react-router-dom';

import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../store/user/user.selectors';

import { connect } from 'react-redux';
import { setCurrentUser } from '../../store/user';

import "./user-profile.container.scss";
import CustomButton from '../../shared/custom-button/custom-button.component';

class UserProfile extends React.Component<{ currentUser, dispatchSetCurrentUser, history }, {}> {
  constructor(props: any) {
    super(props);
  }

  handleLogout = event => {
    event.preventDefault();
    this.props.dispatchSetCurrentUser(null);
  }

  redirectToAccountCreated = () => {
    const { history } = this.props;
    if (history) history.push('/sign-in');
  }

  render() {
    return (
      <div className="user-area">
        {
          this.props.currentUser ?
            <CustomButton label="Log Out" onClick={this.handleLogout} className='log-out' />
            :
            <CustomButton label="Log In" onClick={this.redirectToAccountCreated} className='log-in' />
        }
      </div>
    );
  }
}



const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  dispatchSetCurrentUser: (user) => dispatch(setCurrentUser(user))
});

export default withRouter
  (connect(
    mapStateToProps,
    mapDispatchToProps)
    (UserProfile));
