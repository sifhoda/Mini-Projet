import './menu-bar.css'
import React from 'react'
import { NavDropdown} from 'react-bootstrap';


const Menuicon = ({title,cont}) => {
    return (
        <>
            <NavDropdown title={title} id="collasible-nav-dropdown">
                
                { cont.map( (ct) => (
                   ct!=1 ? <NavDropdown.Item href="" key={ct}>page{ct} </NavDropdown.Item> 
                      : <NavDropdown.Item href="/evenements" key={ct}>page{ct} </NavDropdown.Item> 
                )) }
            </NavDropdown>
        </>
    )
}

export default Menuicon



