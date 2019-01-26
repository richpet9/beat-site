import React, { Component } from 'react';
import SoundItem from './SoundItem';

//Stylesheet
import '../../styles/SoundList.css';

//For test purposes
import { rows } from '../../database.example';

class SoundList extends Component {
  constructor(props) {
    super(props);

    this.state = { nowPlaying: null };
  }

  render() {
    return (
      <div className="sound-list-container">
        <ul>
          {rows.map(row => {
            return (
              <li key={row.id}>
                <SoundItem
                  sound={row}
                  paused={this.props.paused}
                  currentSound={row === this.props.nowPlaying}
                  toggleAudio={this.props.toggleAudio}
                  setNowPlaying={this.props.setNowPlaying}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default SoundList;
