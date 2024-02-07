import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/icon/logo.png';
import logout from '../assets/icon/logout.svg';
import "../style/style.css"

const Navbar = () => {
    const navigate = useNavigate();
    const handellogout = () => {
        localStorage.removeItem("Token");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        navigate("/login")
      }
    return (
        <>
            <div className='navbar'>
                <div className='navbarwrapper'>
                    <div className='logo'>
                    <Link to='/'><img src={logo} alt='' /></Link>
                    </div>
                    {(localStorage.getItem("Token")) ? (
                    <div>
                        <p>Hello ! {localStorage.getItem("name")}</p>
                    </div>):''}
                    <div>
                        {(!localStorage.getItem("Token")) ? (
                            <div>
                                <Link to="/login"><button className='button1' >Login</button></Link>
                                <Link to="/createuser"> <button className='button2'>Register Now</button></Link>
                            </div>
                        ) : (
                            <div className='logout'>
                            <Link to="/dashboard"><p>Dashboard</p></Link>
                            <div>
                            <Link to="/login" onClick={handellogout}><button className='button1'>Logout<img src={logout}alt=''/></button></Link>
                            </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar