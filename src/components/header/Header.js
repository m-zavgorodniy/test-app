import React from 'react';
import './Header.css';
import logo from '../../images/logo.svg';

const Header = (props) => (
  <header className="Header">
    <div className="Header-logo">
      <img className="Header-logo-img" src={logo}  alt="Beezer" />
    </div>
    <div className="Header-title">Dashboard</div>
  </header>
)

export default Header;
