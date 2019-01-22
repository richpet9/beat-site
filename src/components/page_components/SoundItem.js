import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

//Stylesheet
import '../../styles/SoundItem.css';

//For test purposes
import { rows } from '../../database.example';

class SoundItem extends Component {
  render() {
    const { id, name, tags, date, bpm, plays, purchases, price } = this.props;
    const splitTags = tags.split(' ');

    return (
      <div className="sound-container" id={'sound-' + id}>
        <input type="button" className="sound-play button" value="&#9658;" />
        <div className="sound-left">
          <div className="sound-name">{name.toUpperCase()}</div>
          <span className="sound-bpm">{bpm} BPM</span>/<span className="sound-plays">{plays} PLAYS</span>
        </div>
        <div className="sound-right">
          <div className="sound-tags">
            {splitTags.map(tag => (
              <span key={tag} className="sound-tag">
                {tag.toUpperCase()}
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
