import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const navLinkStyles = ({isActive}) =>{
    return {
        fontWeight: isActive? 'bold' : 'normal',
        color: isActive? 'black' : 'gray',
        textDecoration: isActive? 'underline' : 'none',
    }
}

const Header = () => {
    return (
        <div>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container">
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <NavLink style={navLinkStyles} className='fs-5 me-3' to='register'>Registration</NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink style={navLinkStyles} className='fs-5' to='login'>Login</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;