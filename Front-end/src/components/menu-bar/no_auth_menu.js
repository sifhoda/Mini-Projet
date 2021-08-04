import './menu-bar.css'
import React from 'react'


const No_Auth_Menu = () => {
    return (
      <>
        <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">
                Menu1
            </a>
            <ul className="dropdown-menu">
                <li><a className="dropdown-item " href="/evenements">page1</a></li>
                <li><a className="dropdown-item" href="/">page2</a></li> 
                <li><a className="dropdown-item" href="/">page3</a></li> 
                <li><a className="dropdown-item" href="/">page4</a></li> 
                <li><a className="dropdown-item" href="/">page5</a></li> 
            </ul>
        </li>

        <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">
                Menu2
            </a>
            <ul className="dropdown-menu">
                <li><a className="dropdown-item " href="/">page6</a></li>
                <li><a className="dropdown-item" href="/">page7</a></li> 
                <li><a className="dropdown-item" href="/">page8</a></li> 
                <li><a className="dropdown-item" href="/">page9</a></li> 
                <li><a className="dropdown-item" href="/">page10</a></li>
            </ul>  
        </li>


        <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">
                Menu3
            </a>
            <ul className="dropdown-menu">
                <li><a className="dropdown-item " href="/">page11</a></li>
                <li><a className="dropdown-item" href="/">page12</a></li> 
                <li><a className="dropdown-item" href="/">page13</a></li> 
                <li><a className="dropdown-item" href="/">page14</a></li> 
            </ul>  
        </li>

        <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">
                Menu4
            </a>
            <ul className="dropdown-menu">
                <li><a className="dropdown-item " href="/">page15</a></li>
                <li><a className="dropdown-item" href="/">page16</a></li> 
                <li><a className="dropdown-item disabled_url" href="/eeee">page17</a></li> 
                <li><a className="dropdown-item disabled_url" href="/">page18</a></li> 
                <li><a className="dropdown-item disabled_url" href="/">page19</a></li>
            </ul>  
        </li>
      </>
    )
}

export default No_Auth_Menu



