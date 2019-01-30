import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from './ProgressBar';

//Stylesheet
import '../../styles/NowPlaying.css';

class NowPlaying extends Component {
  render() {
    const { sound, paused, toggleAudio, seekAudio } = this.props;
    return (
      <div id="now-playing-container" className="flex-box">
        <h4 id="now-playing-label" className="flex-vcenter">
          Now Playing:{' '}
          {sound && (
            <Link to={'/beats/' + sound.id + '/' + sound.name.replace(/ /g, '-').toLowerCase()} id="now-playing-link" className="normal">
              {sound.name}
            </Link>
          )}
        </h4>
        <input type="button" className="button" id="now-playing-pause" value="&#10074;&#10074;" onClick={toggleAudio} />
        <ProgressBar seekAudio={seekAudio} />
      </div>
    );
  }
}

export default NowPlaying;
