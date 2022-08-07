import {NavLink} from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHouse, faFlag, faEnvelope, faVirus, faGlobe, faBriefcaseMedical} from '@fortawesome/free-solid-svg-icons'
import './Navbar.css'
import logo from '../../images/logo.svg'

library.add(faHouse, faFlag, faEnvelope, faVirus, faGlobe, faBriefcaseMedical)
function Navbar(){
    return(
        <nav className='navbar'>
            <ul className='nav-bar'>
                <li className='logo'>
                    <NavLink to="/" className="nav-link">
                        <img src={logo} alt="logo"/>
                        <span className='nav-link-logo'>CovSearch</span>
                    </NavLink>
                </li>
                <li className='nav-items'>
                    <NavLink to="/" className="nav-link">
                    <FontAwesomeIcon icon="fa-soliid fa-briefcase-medical" className='fa-primary fa-secondary nav-icon'/>
                        <span className='link-text active-link'>Home</span>
                    </NavLink>
                </li>
                <li className='nav-items'>
                    <NavLink to="/dashboard" className="nav-link">
                    <FontAwesomeIcon icon="fa-solid fa-globe" className='fa-primary fa-secondary nav-icon' />
                        <span className='link-text active-link'>Dashboard</span>
                    </NavLink>
                </li>
                <li className='nav-items'>
                    <NavLink to="/search" className="nav-link">
                        <FontAwesomeIcon icon="fa-solid fa-flag" className='fa-primary fa-secondary nav-icon'/>
                        <span className='link-text active-link'>Search</span>
                    </NavLink>
                </li>
                <li className='nav-items'>
                    <NavLink to="/contact" className="nav-link">
                        <FontAwesomeIcon icon="fa-solid fa-envelope" className='fa-primary fa-secondary nav-icon'/>
                        <span className='link-text active-link'>Contact</span>
                    </NavLink>
                </li>
                <div className="copyright-div">
                    <p className="copyright">Copyright &copy; 2022</p>
                </div>
            </ul>
        </nav>
    )
}

export default Navbar