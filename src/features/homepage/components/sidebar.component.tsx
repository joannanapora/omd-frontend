import React from "react";
import { Box, Nav } from "grommet";
import {SidebarButton} from './sidebar-button.component';
import './sidebar-button.component.scss';
import UserProfile from '../containers/user-profile.container';

export const SideBar = (props: {menuList: any[]}) => ( 
        <Box className = "box-menu" fill direction="row">
        <Nav background='white'>
          {props.menuList.map( element => (
            <SidebarButton className= 'menu-button'
              url = {element.url}
              key={element.id}
              label={element.name}
              image ={element.imageUrl}/>
              ))}
          <UserProfile/>
        </Nav>
      </Box>

)