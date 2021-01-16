import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import { Box, DropButton, Header, Nav, ResponsiveContext } from "grommet";
import { IMenuList } from '../../models/interfaces/index';

import SidebarButton from "../sidebar-button/sidebar-button.component";
import "./sidebar.component.scss";

const SideBar = ({ menuList }: { menuList: IMenuList[] }) => {

  const [open, setOpen]: [boolean, any] = useState(false);

  const renderDropDownMenu = () => {
    return (
      <Box hoverIndicator width='small' pad='small' align='center' >
        <Nav direction="column">
          {menuList.map((element) => (
            <SidebarButton
              className="menu-button"
              url={element.url}
              key={element.id}
              label={element.name}
              onClick={element.onClick}
            />
          ))}
        </Nav>
      </Box>
    );
  };

  return (
    <Header
      gap="medium"
      className="sidebar-header"
      background="white"
      pad="small"
    >
      <Box direction="row" align="center">
        <Link to="/all-dogs">
          <div className="paw">
            <img
              alt="paw"
              src="https://www.flaticon.com/svg/static/icons/svg/676/676163.svg"
            />
          </div>
        </Link>
      </Box>
      <ResponsiveContext.Consumer>
        {(responsive) =>
          responsive === "small" ? (
            <DropButton
              label="Open"
              open={open}
              onOpen={() => setOpen(true)}
              onClose={() => setOpen(false)}
              dropContent={renderDropDownMenu()}
              dropProps={{ align: { top: "bottom" } }}
            />
          ) : (
              <Nav align="end" direction="row">
                {menuList.map((element) => (
                  <SidebarButton
                    className="menu-button"
                    url={element.url}
                    key={element.id}
                    label={element.name}
                    onClick={element.onClick}
                  />
                ))}
              </Nav>
            )
        }
      </ResponsiveContext.Consumer>
    </Header>
  );
};

export default withRouter(SideBar);
