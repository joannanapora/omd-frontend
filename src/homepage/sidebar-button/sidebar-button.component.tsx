import React from "react";
import { Box, Avatar, Button, Text } from "grommet";
import { Link } from "react-router-dom";
import "./sidebar-button.component.scss";

const SidebarButton = ({ url, image, label, ...rest }) => (
  <Link className="menu-option" to={url}>
    <Button className=' menu-button' plain {...rest}>
      {({ hover }) => (
        <Box className='menu-box'
          background={hover && !image ? "none" : undefined}
          pad={{ horizontal: "medium", vertical: "medium" }}
        >
          <Text size="large">{label}</Text>
          {image ? (
            <Avatar className="logo" size="large" src={image} round="large" />
          ) : null}
        </Box>
      )}
    </Button>
  </Link>
);

export default SidebarButton;
