import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import SoundPlayer from '../page_components/SoundPlayer';
import RolloverButton from '../page_components/RolloverButton';

//Stylesheet
import '../../styles/SoundPage.css';

import { rows } from '../../database.example';

class SoundPage extends Component {
  constructor(props) {
    super(props);

    this.soundInfo = null;
    this.state = { playDisplay: 'block', pauseDisplay: 'none' };

    this.toggleAudio = this.toggleAudio.bind(this);
  }

  componentWillMount() {
    this.soundInfo = this.fetchSoundInfo(this.props.match.params.id);
    window.history.replaceState('SoundPage', this.soundInfo.name, '/beats/' + this.soundInfo.id + '/' + this.soundInfo.name.replace(/ /g, '-').toLowerCase());
  }

  componentDidUpdate() {
    if (this.soundInfo.id !== Number(this.props.match.params.id)) {
      this.soundInfo = this.fetchSoundInfo(this.props.match.params.id);
      window.history.replaceState('SoundPage', this.soundInfo.name, '/beats/' + this.soundInfo.id + '/' + this.soundInfo.name.replace(/ /g, '-').toLowerCase());
      this.forceUpdate();
    }
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

  fetchSoundInfo(id) {
    let res = false;
    rows.forEach(row => {
      if (row.id === Number(id)) {
        res = row;
      }
    });
    return res;
  }

  render() {
    if (this.soundInfo) {
      const tagsSplit = this.soundInfo.tags.split(' ');
      return (
        <div id="sound-page-container" className="container">
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

          <SoundPlayer
            sound={this.soundInfo}
            nowPlaying={this.props.nowPlaying}
            setNowPlaying={this.props.setNowPlaying}
            toggleAudio={this.props.toggleAudio}
            seekAudio={this.props.seekAudio}
          />

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

export default withRouter(SoundPage);
