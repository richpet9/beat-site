import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import SoundList from '../page_components/SoundList';
import SoundPage from './SoundPage';

//Stylesheet
import '../../styles/Beats.css';

class Beats extends Component {
  render() {
    return (
      <div id="beats-container" className="container">
        <Route
          exact
          path="/beats"
          render={props => (
            <SoundList
              {...props}
              paused={this.props.paused}
              nowPlaying={this.props.nowPlaying}
              toggleAudio={this.props.toggleAudio}
              setNowPlaying={this.props.setNowPlaying}
            />
          )}
        />
        <Route
          path="/beats/:id/:beatName?"
          render={props => (
            <SoundPage
              {...props}
              paused={this.props.paused}
              nowPlaying={this.props.nowPlaying}
              toggleAudio={this.props.toggleAudio}
              seekAudio={this.props.seekAudio}
              setNowPlaying={this.props.setNowPlaying}
            />
          )}
        />
      </div>
    );
  }
}
export default withRouter(Beats);
