import React from 'react'
import { Link } from 'react-router'

const Navbar = props =>
  <nav className="navigation">
    <Link to='dashboard' className='nav-link'>Dashboard</Link>
    <Link to='events' className='nav-link'>Events</Link>
    {props.signedIn ?
      <Link to='logout' className="nav-link">Log Out</Link>
      :
      <Link to='login' className='nav-link'>Login</Link>
    }
    {props.signedIn ?
      null
      :
      <Link to='signup' className="nav-link">Signup</Link>
    }
  </nav>

export default Navbar
