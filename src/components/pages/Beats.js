import React, { Component } from 'react';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import SoundList from '../page_components/SoundList';
import SoundPage from './SoundPage';

//Stylesheet
import '../../styles/Beats.css';

class Beats extends Component {
  render() {
    return (
      <div id="beats-container" className="container">
        <SoundList />
      </div>
    );
  }
}
export default withRouter(Beats);
