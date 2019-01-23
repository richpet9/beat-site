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
        <Route exact path="/beats" component={SoundList} />
        <Route path="/beats/:id" component={SoundPage} />
      </div>
    );
  }
}
export default withRouter(Beats);
