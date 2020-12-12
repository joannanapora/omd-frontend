import React from "react";
import { Link } from 'react-router-dom';
import { Box, Nav } from "grommet";
import SidebarButton from '../sidebar-button/sidebar-button.component';
import './sidebar.component.scss';
import UserProfile from '../../features/user-profile/user-profile.container'



const SideBar = (props: { menuList: any[], }) => (
  <Box className="box-menu" fill direction="row">
    <Nav align='center' justify='center' background='white'>
      <Link to='/about-us'><div className='paw'><img alt='paw' src="https://www.flaticon.com/svg/static/icons/svg/676/676163.svg" /></div></Link>
      {props.menuList.map(element => (
        <SidebarButton
          className='menu-button'
          url={element.url}
          key={element.id}
          label={element.name}
          image={element.imageUrl}
          disabled={element.disabled} />
      ))}
      <UserProfile />
    </Nav>
  </Box>
);



export default SideBar;