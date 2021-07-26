import './menu-bar.css'
import React from 'react'
import Menuicon from './menu-dropdown'
import axios from 'axios';
import { NavDropdown,Navbar,Nav,Container} from 'react-bootstrap';


const Menubar = ({ logo , menu1 ,tasks }) => {
  
    return (
        <>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="/#">LOGO</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <Menuicon title="Menu1" cont={[1,2,3,4,5]}/>
                  <Menuicon title="Menu2" cont={[6,7,8,9,10]}/>
                  <Menuicon title="Menu3" cont={[11,12,13,14]}/>
                  <Menuicon title="Menu4" cont={[15,16,17,18,19]}/>
                </Nav>
                <Nav>
                <Nav.Link href="/#">se connecter</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
            </Navbar>
        </>

    )
}


export default Menubar
