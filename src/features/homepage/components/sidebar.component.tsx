import React from "react";
import { Box, Nav, Button, Text } from "grommet";
import {SidebarButton} from './sidebar-button.component';

export const SideBar = (props: {menuList: any[]}) => ( 
        <Box width="auto" fill direction="row">
        <Nav background="background-color: #233329;
background-image: linear-gradient(315deg, #233329 0%, #63d471 74%);">
          {props.menuList.map( element => (
            <SidebarButton
              key={element.id}
              label={element.name}
              image ={element.imageUrl}
            />
          ))}
        </Nav>
      </Box>
)