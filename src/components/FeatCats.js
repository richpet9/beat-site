import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

//Stylesheet
import '../styles/FeatCats.css';

class FeatCats extends Component {
  handleMouseOver() {}

  render() {
    return (
      <div id="category-showcase">
        <ul>
          <li>
            <Link to="/kits" onMouseOver={this.handleMouseOver}>
              DRUM KITS
            </Link>
          </li>
          <li>
            <Link to="/loops" onMouseOver={this.handleMouseOver}>
              LOOPS & SAMPLES
            </Link>
          </li>
          <li>
            <Link to="/kits" onMouseOver={this.handleMouseOver}>
              MIDI KITS
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default FeatCats;
