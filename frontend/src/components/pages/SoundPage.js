import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import SoundPlayer from '../page_components/SoundPlayer';
import RolloverButton from '../page_components/RolloverButton';

//Stylesheet
import '../../styles/SoundPage.css';

import { rows } from '../../database.example';

class BeatPage extends Component {
  constructor(props) {
    super(props);

    this.soundInfo = null;
    this.state = { playDisplay: 'block', pauseDisplay: 'none' };

    this.toggleAudio = this.toggleAudio.bind(this);
  }

  componentWillMount() {
    rows.forEach(row => {
      if (row.id === Number(this.props.match.params.id)) {
        this.soundInfo = row;
        window.history.replaceState('SoundPage', this.soundInfo.name, '/beats/' + this.soundInfo.id + '/' + this.soundInfo.name.replace(/ /g, '-').toLowerCase());
      }
    });
  }

  soundNotFound(id) {
    return (
      <div>
        <h1>404 - A sound could not be found with that ID</h1>
        <p>ID: {id}</p>
      </div>
    );
  }

  toggleAudio() {
    if (this.soundInfo !== this.props.nowPlaying) {
      this.props.setNowPlaying(this.soundInfo);
    }
    this.props.toggleAudio();
  }

  render() {
    if (this.soundInfo) {
      const tagsSplit = this.soundInfo.tags.split(' ');
      return (
        <div id="sound-page-container">
          {(this.props.paused || this.soundInfo !== this.props.nowPlaying) && (
            <input type="button" className="button audio-control" id="play-button" value="&#9658;" onClick={this.toggleAudio} />
          )}
          {!this.props.paused && this.soundInfo === this.props.nowPlaying && (
            <input type="button" className="button audio-control" id="pause-button" value="&#10074;&#10074;" onClick={this.toggleAudio} />
          )}
          <h1 className="normal" id="sound-name">
            {this.soundInfo.name}
          </h1>
          <h3 className="light" id="sound-meta">
            {this.soundInfo.bpm} BPM/{this.soundInfo.plays} PLAYS
          </h3>

          <SoundPlayer sound={this.soundInfo} nowPlaying={this.props.nowPlaying} seekAudio={this.props.seekAudio} />

          <div className="sound-tags">
            {tagsSplit.map(tag => (
              <span key={tag} className="sound-tag">
                <Link to={'/beats?tags=' + tag}>{tag.toUpperCase()}</Link>
              </span>
            ))}
          </div>

          <RolloverButton before={'$' + this.soundInfo.price.toFixed(2)} after="Purchase" to="" />
        </div>
      );
    } else {
      return this.soundNotFound(this.props.match.params.id);
    }
  }
}

export default withRouter(BeatPage);
