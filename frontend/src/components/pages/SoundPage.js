import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

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
    if (this.soundInfo) {
      return (
        <div id="sound-page-container">
          <h1 className="normal">{this.soundInfo.name.toUpperCase()}</h1>
          <h3 className="light">
            {this.soundInfo.bpm} BPM/{this.soundInfo.plays} PLAYS
          </h3>
        </div>
      );
    } else {
      return this.soundNotFound(this.props.match.params.id);
    }
  }
}

export default withRouter(BeatPage);
