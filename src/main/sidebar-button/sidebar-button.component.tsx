import React from "react";
import { NavLink, Link } from "react-router-dom";

import { Button, Text } from "grommet";

import "./sidebar-button.component.scss";


const SidebarButton = ({ url, label, ...rest }) => (
  <NavLink tag={Link} className="nav-sidebar" exact activeClassName="underline" to={url}>
    <Button className=' menu-button' plain {...rest}>
      <Text
        size="medium">{label}</Text>
    </Button>
  </NavLink>
);

export default SidebarButton;
