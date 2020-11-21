import React from "react";
import { Box, Nav } from "grommet";
import {SidebarButton} from './sidebar-button.component';
import './sidebar-button.component.scss';
import UserProfile from '../containers/user-profile.container';

export const SideBar = (props: {menuList: any[]}) => ( 
        <Box className = "box-menu" width="auto" fill direction="row">
        <Nav background="background-color: #233329;
          background-image: linear-gradient(315deg, #233329 0%, #63d471 74%);">
          {props.menuList.map( element => (
            <SidebarButton
              url = {element.url}
              key={element.id}
              label={element.name}
              image ={element.imageUrl}/>
              ))}
          <UserProfile/>
        </Nav>
      </Box>

)