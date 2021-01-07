import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { Box, DropButton, Header, Menu, Nav, ResponsiveContext } from "grommet";
import SidebarButton from "../sidebar-button/sidebar-button.component";
import "./sidebar.component.scss";

const SideBar = (props: { menuList: any[] }, { history }) => {
  const [open, setOpen] = useState(false);

  const renderDropDownMenu = () => {
    return (
      <Box hoverIndicator width='small' pad='small' align='center' >
        <Nav direction="column">
          {props.menuList.map((element) => (
            <SidebarButton
              className="menu-button"
              url={element.url}
              key={element.id}
              label={element.name}
              image={element.imageUrl}
              disabled={element.disabled}
              onClick={element.onClick}
            />
          ))}
        </Nav>
      </Box>
    );
  };

  // const dropMenuList = props.menuList.map(
  //   (menuElement) => {
  //     return {
  //       label: menuElement.name,
  //       onClick: () => { console.log('LOL') }
  //     };
  //   }
  // );

  return (
    <Header
      gap="medium"
      className="sidebar-header"
      background="white"
      pad="small"
    >
      <Box direction="row" align="center">
        <Link to="/about-us">
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
            // <Menu
            //   label="Click me"
            //   items={dropMenuList}
            // />
            <Nav align="end" direction="row">
              {props.menuList.map((element) => (
                <SidebarButton
                  className="menu-button"
                  url={element.url}
                  key={element.id}
                  label={element.name}
                  image={element.imageUrl}
                  disabled={element.disabled}
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
