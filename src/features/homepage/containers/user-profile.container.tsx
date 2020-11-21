import React from 'react';
import './user-profile.container.scss';
import { Avatar, Box } from "grommet";

class UserProfile extends React.Component<{}, { avatar: any, userName: any }> {
    constructor(props: any) {
      super(props);


        this.state = {
            avatar : '',
            userName: 'Sign in',
        }
    }


    render() {
        return (
          <div className = 'avatar-box'>
                  <Box direction="row" alignContent="center" gap="small" pad="large">
                    <Avatar size="large" src= "https://www.flaticon.com/svg/static/icons/svg/3069/3069172.svg" round="medium" />
                  </Box>
                  <div className = 'user-name'>{this.state.userName}</div>
                  </div>
              );
            }
        }


export default UserProfile; 