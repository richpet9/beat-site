import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import SoundList from '../page_components/SoundList';
import FilterMenu from '../page_components/FilterMenu';
import SoundPage from './SoundPage';

//Stylesheet
import '../../styles/Beats.css';

class Beats extends Component {
  render() {
    return (
      <div id="beats-container" className="container fw">
        <Route
          exact
          path="/beats"
          render={props => (
            <div id="body-container" className="container fw flex-box">
              <FilterMenu />
              <SoundList
                {...props}
                paused={this.props.paused}
                nowPlaying={this.props.nowPlaying}
                toggleAudio={this.props.toggleAudio}
                setNowPlaying={this.props.setNowPlaying}
              />
            </div>
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
