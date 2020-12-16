import React from "react";
import { Link } from 'react-router-dom';
import { Anchor, Box, Header, Menu, Nav, ResponsiveContext } from "grommet";
import SidebarButton from '../sidebar-button/sidebar-button.component';
import './sidebar.component.scss';



const SideBar = (props: { menuList: any[], }) => (
  <Header gap='medium' className='sidebar-header' background="white" pad="small" >
    <Box direction="row" align="center">
      <Link to='/about-us'><div className='paw'><img alt='paw' src="https://www.flaticon.com/svg/static/icons/svg/676/676163.svg" /></div></Link>
    </Box>
    <ResponsiveContext.Consumer>
      {responsive =>
        responsive === 'small' ? (
          <Menu
            label="Click me"
            items={[
              { label: 'Click me', onClick: () => { } },
              { label: 'Click me', onClick: () => { } },
              { label: 'Click me', onClick: () => { } },
            ]}
          />
        ) : (
            <Nav align='end' direction="row">
              {props.menuList.map(element => (
                <SidebarButton
                  className='menu-button'
                  url={element.url}
                  key={element.id}
                  label={element.name}
                  image={element.imageUrl}
                  disabled={element.disabled}
                  onClick={element.onClick} />
              ))}
            </Nav>
          )
      }
    </ResponsiveContext.Consumer>
  </Header>
);



export default SideBar;