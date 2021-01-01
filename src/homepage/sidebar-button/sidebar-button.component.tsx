import React from "react";
import { Button, Text } from "grommet";
import { NavLink, Link } from "react-router-dom";
import "./sidebar-button.component.scss";


const SidebarButton = ({ url, image, label, ...rest }, history) => (
  <NavLink tag={Link} className="nav-sidebar" exact activeClassName="underline" to={url}>

    <Button className=' menu-button' plain {...rest}>
      <Text
        size="medium">{label}</Text>
    </Button>
  </NavLink>
);

export default SidebarButton;
