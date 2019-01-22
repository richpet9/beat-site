import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import Nav from './Nav';

//Stylesheet
import '../../styles/Header.css';

class Header extends Component {
  onClickHome() {
    const tracker = document.getElementById('active-tracker');
    tracker.style.opacity = 0;
  }

  render() {
    return (
      <header id="header">
        <h1 id="brand-name">
          <NavLink to="/" onClick={this.onClickHome}>
            DENEGRI
          </NavLink>
        </h1>
        <Nav navItems={['kits', 'loops', 'beats', 'contact']} />
      </header>
    );
  }
}

export default Header;
