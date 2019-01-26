import React, { Component } from 'react';

//Stylesheet
import '../../styles/NowPlaying.css';

class NowPlaying extends Component {
  render() {
    if (this.props.sound) {
      return (
        <div id="now-playing-container">
          <h4>Now Playing: {this.props.sound.name}</h4>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default NowPlaying;
