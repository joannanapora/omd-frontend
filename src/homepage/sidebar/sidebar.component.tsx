import React from "react";
import { Link } from 'react-router-dom';
import { Anchor, Box, Header, Menu, Nav, ResponsiveContext } from "grommet";
import SidebarButton from '../sidebar-button/sidebar-button.component';
import './sidebar.component.scss';
import UserProfile from '../../features/user-profile/user-profile.container'



const SideBar = (props: { menuList: any[], }) => (
  <Header background="white" pad="small">
    <Box direction="row" align="center" gap="medium">
      <Link to='/about-us'><div className='paw'><img alt='paw' src="https://www.flaticon.com/svg/static/icons/svg/676/676163.svg" /></div></Link>
    </Box>
    <ResponsiveContext.Consumer>
      {responsive =>
        responsive === 'small' ? (
          <Menu
            label="Click me"
            items={[
              { label: 'This is', onClick: () => { } },
              { label: 'The Menu', onClick: () => { } },
              { label: 'Component', onClick: () => { } },
            ]}
          />
        ) : (
            <Nav align='center' direction="row">
              {props.menuList.map(element => (
                <SidebarButton
                  size='small'
                  className='menu-button'
                  url={element.url}
                  key={element.id}
                  label={element.name}
                  image={element.imageUrl}
                  disabled={element.disabled} />
              ))}
              <UserProfile />
            </Nav>
          )
      }
    </ResponsiveContext.Consumer>
  </Header>

  // <Box className="box-menu" fill direction="row">
  //   <Nav align='center' justify='center' background='white'>
  //     <Link to='/about-us'><div className='paw'><img alt='paw' src="https://www.flaticon.com/svg/static/icons/svg/676/676163.svg" /></div></Link>
  //     {props.menuList.map(element => (
  //       <SidebarButton
  //         className='menu-button'
  //         url={element.url}
  //         key={element.id}
  //         label={element.name}
  //         image={element.imageUrl}
  //         disabled={element.disabled} />
  //     ))}
  //     <UserProfile />
  //   </Nav>
  // </Box>
);



export default SideBar;