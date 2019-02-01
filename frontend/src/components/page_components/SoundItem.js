import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Stylesheet
import '../../styles/SoundItem.css';

class SoundItem extends Component {
  toggleAudio() {
    if (!this.props.currentSound) {
      this.props.setNowPlaying(this.props.sound);
    }
    this.props.toggleAudio();
  }

  render() {
    const { id, name, tags, date, bpm, plays, purchases, price } = this.props.sound;
    const splitTags = tags.split(' ');

    return (
      <div className="sound-container" id={'sound-' + id}>
        {(!this.props.currentSound || this.props.paused) && <input type="button" className="sound-play button" value="&#9658;" onClick={this.toggleAudio.bind(this)} />}
        {this.props.currentSound && !this.props.paused && (
          <input type="button" className="sound-pause button" value="&#10074;&#10074;" onClick={this.toggleAudio.bind(this)} />
        )}
        <div className={this.props.currentSound && !this.props.paused ? 'sound-left current' : 'sound-left'}>
          <div className="sound-name">
            <Link to={'/beats/' + id + '/' + name.replace(/ /g, '-').toLowerCase()}>{name}</Link>
          </div>
          <div className="sound-meta-info">
            <span className="sound-bpm">{bpm} BPM</span>/<span className="sound-plays">{plays} PLAYS</span>
          </div>
        </div>
        <div className="sound-right">
          <div className="sound-tags">
            {splitTags.map(tag => (
              <span key={tag} className="sound-tag">
                <Link to={'/beats?tags=' + tag}>{tag.toUpperCase()}</Link>
              </span>
            ))}
          </div>
          <input type="button" className="sound-price button" value={'$' + price.toFixed(2)} />
        </div>
      </div>
    );
  }
}

export default SoundItem;
