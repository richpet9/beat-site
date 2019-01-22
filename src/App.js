import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Header from './components/page_components/Header';
import Home from './components/pages/Home';
import Beats from './components/pages/Beats';

//Root stylesheet
import './styles/App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/" component={Home} />
          <Route path="/kits" component={Kits} />
          <Route path="/beats" component={Beats} />
          <Route path="/loops" component={Loops} />
          <Route path="/contact" component={Contact} />
        </div>
      </Router>
    );
  }
}

const Kits = props => {
  return (
    <div id="home-container" className="container">
      <h3>LET'S GET THESE KITS</h3>
      <p>now spend money on my midi</p>
    </div>
  );
};

const Loops = props => {
  return (
    <div id="home-container" className="container">
      <h3>WHO WANTS SOME LOOPS</h3>
      <p>now spend money on my midi</p>
    </div>
  );
};

const Contact = props => {
  return (
    <div id="home-container" className="container">
      <h3>DON'T YOU EVER CONTACT ME, YOU.</h3>
    </div>
  );
};

export default App;
