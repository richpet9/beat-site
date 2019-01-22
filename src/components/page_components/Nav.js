import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, withRouter } from 'react-router-dom';

//Stylesheet
import '../../styles/Nav.css';

class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = { currentNav: this.props.location.pathname };
  }

  //This handles showing the active tracker when going directly to route
  componentDidMount() {
    this.handleNavClick(this.state.currentNav.substr(1));
  }

  //This handles showing the active tracker when navigating from outside the navbar
  componentDidUpdate() {
    //Only set the state if it's different: prevent infinite looping
    if (this.state.currentNav != this.props.location.pathname) {
      this.setState({ currentNav: this.props.location.pathname });
    }
    this.handleNavClick(this.state.currentNav.substr(1));
  }

  //This handles what to do when clicking a nav item
  handleNavClick(item) {
    const tracker = document.getElementById('active-tracker');
    let el;

    //Check if we are navigating to root or a page
    if (item == '') {
      el = document.getElementById('kits');
      tracker.style.opacity = 0;
    } else {
      el = document.getElementById(item);

      const rect = el.getBoundingClientRect();
      const headerRect = document.getElementById('header').getBoundingClientRect();

      //Reposition the active box
      //Because header is sticky, we have to offset left by the header's
      //This is due to CSS parenting
      tracker.style.left = rect.left - headerRect.left + 'px';
      tracker.style.top = rect.top + 'px';
      tracker.style.width = rect.right - rect.left + 'px';
      tracker.style.height = rect.bottom - rect.top + 'px';

      tracker.style.opacity = 1;
    }
  }

  render() {
    return (
      <nav>
        <ul>
          {this.props.navItems.map(item => (
            <li key={item}>
              <NavLink id={item} to={'/' + item} activeStyle={{ color: 'white' }} onClick={this.handleNavClick.bind(this, item)}>
                {item.toUpperCase()}
              </NavLink>
            </li>
          ))}
        </ul>

        <div id="active-tracker" />
      </nav>
    );
  }
}

export default withRouter(Nav);
