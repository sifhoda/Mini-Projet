import './menu-bar.css'
import React from 'react'
import { Navbar,Nav,Container} from 'react-bootstrap';

import { useAuth } from '../../contexts/user_auth_context';
import No_Auth_Menu from './no_auth_menu';
import Auth_Menu from './auth_menu';


const Menubar = ({auth}) => {

  const { currentUser } = useAuth();

  function user_state(){
    if(auth){
      localStorage.clear();
      window.location.href="/"
    }else{
      window.location.href="/authentification"
    }
  }

  return (
      <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
          <Navbar.Brand href="/#">LOGO</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                {
                  auth  
                  ? <>
                      <Auth_Menu />
                    </>
                  : (
                    <>
                      <No_Auth_Menu />
                    </>
                  )
                }
              </Nav>
              <Nav>
              <Nav.Link onClick={user_state.bind()} >{ auth ? "se déconnecter" : "se connecter"}</Nav.Link>
              </Nav>
          </Navbar.Collapse>
          </Container>
          </Navbar>
      </>

  )
}


export default Menubar
