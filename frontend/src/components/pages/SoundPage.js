import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

//Stylesheet
import '../../styles/SoundPage.css';

import { rows } from '../../database.example';

class BeatPage extends Component {
  soundInfo = null;

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

  render() {
    const tagsSplit = this.soundInfo.tags.split(' ');

    if (this.soundInfo) {
      return (
        <div id="sound-page-container">
          <h1 className="normal">{this.soundInfo.name.toUpperCase()}</h1>
          <h3 className="light">
            {this.soundInfo.bpm} BPM/{this.soundInfo.plays} PLAYS
          </h3>
          <h6 style={{ margin: '75px 0' }}>I really should figure out how I'm gonna play the sounds.</h6>
          <div className="sound-tags">
            {tagsSplit.map(tag => (
              <span key={tag} className="sound-tag">
                <Link to={'/beats?tags=' + tag}>{tag.toUpperCase()}</Link>
              </span>
            ))}
          </div>
          <div className="purchase-button-container">
            <input type="button" className="purchase-button button" value={'$' + this.soundInfo.price} />
            <span className="hover-text">Add to cart</span>
          </div>
        </div>
      );
    } else {
      return this.soundNotFound(this.props.match.params.id);
    }
  }
}

export default withRouter(BeatPage);
