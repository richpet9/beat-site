import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Stylesheet
import '../../styles/NowPlaying.css';

class NowPlaying extends Component {
  render() {
    const { sound, paused } = this.props;
    return (
      <div id="now-playing-container" style={!paused ? { bottom: 0 } : { bottom: -54 }}>
        <h4>
          Now Playing:{' '}
          {sound && (
            <Link to={'/beats/' + sound.id + '/' + sound.name.replace(/ /g, '-').toLowerCase()} id="now-playing-link" className="normal">
              {sound.name}
            </Link>
          )}
        </h4>
      </div>
    );
  }
}

export default NowPlaying;
