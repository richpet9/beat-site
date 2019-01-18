import React, { Component } from 'react';
import FeatCats from './FeatCats';
import PageBreak from './PageBreak';

//Stylesheet
import '../styles/Home.css';

class Home extends Component {
  render() {
    return (
      <div id="home-container" className="container">
        <div id="banner-container">
          <h1>A collection of music,</h1>
          <h1>from a musical collective.</h1>
        </div>
        <FeatCats />
        <PageBreak>
          <h1>You may ask yourself</h1>
          <p>Why choose denegri beats?</p>
          <h1>Well I'm gonna show you.</h1>
          <p>Pick a damn category</p>
        </PageBreak>
      </div>
    );
  }
}

export default Home;
