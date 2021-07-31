import './menu-bar.css'
import React from 'react'
import { NavDropdown} from 'react-bootstrap';


const Menuicon = ({title,cont}) => {
    return (
      <>
        <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                {title}
            </a>
            <ul className="dropdown-menu">
                { 
                
                  cont.map( (ct) => (
                    ct==1 
                        ? <li key={ct}><a className="dropdown-item " href="/evenements">page{ct}</a></li> 
                        : ((ct==17 || ct==18 || ct==19) && !localStorage.getItem('token')) 
                                ? <li key={ct}><a className="dropdown-item disabled_url">page{ct}</a></li>
                                : <li key={ct}><a className="dropdown-item" href="">page{ct}</a></li>   
                    ))
                }
            </ul>
        </li>
      </>
    )
}

export default Menuicon



