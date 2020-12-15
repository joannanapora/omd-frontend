import React from "react";
import { Box, Button, Text } from "grommet";
import { Link } from "react-router-dom";
import "./sidebar-button.component.scss";


const SidebarButton = ({ url, image, label, ...rest }, history) => (
  <Link className="menu-option" to={url}>
    <Button className=' menu-button' plain {...rest}>
      {({ hover }) => (
        <Box className='menu-box'
          background={hover && !image ? "none" : undefined}
          pad={{ horizontal: "small", vertical: "small" }}
        >
          <Text
            size="large">{label}</Text>
        </Box>
      )}
    </Button>
  </Link>
);

export default SidebarButton;
