import React from "react";
import { Box, Nav } from "grommet";
import SidebarButton from '../sidebar-button/sidebar-button.component';
import './sidebar.component.scss';
import UserProfile from '../../features/user-profile/user-profile.container';

const SideBar = (props: { menuList: any[] }) => (
  <Box className="box-menu" fill direction="row">
    <Nav background='white'>
      {props.menuList.map(element => (
        <SidebarButton className='menu-button'
          url={element.url}
          key={element.id}
          label={element.name}
          image={element.imageUrl} />
      ))}
      <UserProfile />
    </Nav>
  </Box>
);

export default SideBar;