import React, { useContext, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navb.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/Scontext';

const Nav = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const navCheckRef = useRef(); 

  const closeMenu = () => {
    if (navCheckRef.current) {
      navCheckRef.current.checked = false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
    closeMenu(); 
  };

  return (
    <div className="navbar">
      <input type="checkbox" id="nav-check" ref={navCheckRef} />

      <div className="nav-header">
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          <img src={assets.logo} alt="Logo" className="logo" />
        </Link>
        <div className="nav-btn">
          <label htmlFor="nav-check">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>
      </div>

      <ul className="navbar-menu">
        <li onClick={() => { setMenu("home"); closeMenu(); }}>
          <Link to="/">Home</Link>
        </li>
        <li onClick={() => { setMenu("order"); closeMenu(); }}>
          <Link to="/order">Order</Link>
        </li>
        <li onClick={() => { setMenu("mobile-app"); closeMenu(); }}>
          <Link to="/mobile">Mobile</Link>
        </li>
        <li onClick={() => { setMenu("contact-us"); closeMenu(); }}>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>

      <div className="navbar-right">
        <div className="navbar-search">
          <Link to="/cart" onClick={closeMenu}><img src={assets.basket_icon} alt="Basket" /></Link>
          <div className={getTotalCartAmount() ? "dot" : ""}></div>
        </div>

        {!token ? (
          <button onClick={() => { setShowLogin(true); closeMenu(); }}>Sign-in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="Profile" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => { navigate('/myorders'); closeMenu(); }}>
                <img src={assets.bag_icon} alt="Orders" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="Logout" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
