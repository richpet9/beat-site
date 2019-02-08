import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import queryString from 'query-string';
import PageBreak from '../page_components/PageBreak';
import SoundPlayer from '../page_components/SoundPlayer';
import SoundList from '../page_components/SoundList';
import FilterMenu from '../page_components/FilterMenu';
import SoundPage from './SoundPage';

//Stylesheet
import '../../styles/Beats.css';

//temp
import { rows } from '../../database.example';

class Beats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      soundItems: rows,
      bpmFilter: {
        min: 60,
        max: 180
      },
      tagsFilter: []
    };

    this.setBPM = this.setBPM.bind(this);
    this.toggleTag = this.toggleTag.bind(this);
    this.getBPMFromUrl = this.getBPMFromUrl.bind(this);
  }

  componentWillMount() {
    this.newestBeat = rows[0];
    this.getBPMFromUrl();
  }

  getBPMFromUrl() {
    let query = queryString.parse(this.props.location.search);
    if (query.bpm) {
      const dashIndex = query.bpm.indexOf('-');
      const min = query.bpm.slice(0, dashIndex);
      const max = query.bpm.slice(dashIndex + 1);

      this.setBPM({ min: min, max: max });
    }
  }

  setBPM(bpm) {
    window.history.replaceState('Filters', bpm, '/beats?bpm=' + bpm.min + '-' + bpm.max);
    this.setState({ bpmFilter: { min: bpm.min, max: bpm.max } }, () => {
      this.getFilteredSounds();
    });
  }

  toggleTag(tag) {
    let res = this.state.tagsFilter;
    if (res.includes(tag)) {
      res.splice(res.indexOf(tag), 1);
    } else {
      res.push(tag);
    }
    this.setState({ tagsFilter: res }, () => {
      this.getFilteredSounds();
    });
  }

  getFilteredSounds() {
    const allItems = rows;
    let filtered = [];
    allItems.forEach(beat => {
      //check BPM
      let bpmCheck, tagsCheck;
      if (beat.bpm >= this.state.bpmFilter.min && beat.bpm <= this.state.bpmFilter.max) {
        bpmCheck = true;
      }
      //check tags
      if (this.state.tagsFilter.length === 0) {
        tagsCheck = true;
      } else {
        beat.tags.split(' ').forEach(beatTag => {
          if (this.state.tagsFilter.includes(beatTag)) {
            tagsCheck = true;
          }
        });
      }

      if (bpmCheck && tagsCheck) {
        filtered.push(beat);
      }
    });
    this.setState({ soundItems: filtered });
  }

  render() {
    return (
      <div id="beats-container" className="container fw">
        <Route
          exact
          path="/beats"
          render={props => (
            <div id="body-container" className="container fw flex-box">
              <FilterMenu {...props} currentFilters={{ tags: this.state.tagsFilter, bpm: this.state.bpmFilter }} setBPM={this.setBPM} toggleTag={this.toggleTag} />

              {this.state.soundItems.length > 0 ? (
                <SoundList
                  {...props}
                  paused={this.props.paused}
                  nowPlaying={this.props.nowPlaying}
                  toggleAudio={this.props.toggleAudio}
                  setNowPlaying={this.props.setNowPlaying}
                  soundItems={this.state.soundItems}
                />
              ) : (
                <h3 style={{ width: '100%' }}>No sounds found with matching filters.</h3>
              )}
            </div>
          )}
        />
        <Route
          path="/beats/:id/:beatName?"
          render={props => (
            <SoundPage
              {...props}
              paused={this.props.paused}
              nowPlaying={this.props.nowPlaying}
              toggleAudio={this.props.toggleAudio}
              seekAudio={this.props.seekAudio}
              setNowPlaying={this.props.setNowPlaying}
            />
          )}
        />
      </div>
    );
  }
}
export default withRouter(Beats);
