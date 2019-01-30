import React, { Component } from 'react';
import RangeInput from './RangeInput';

//Stylesheet
import '../../styles/FilterMenu.css';

class FilterMenu extends Component {
  retrieveData(data) {
    window.history.replaceState('Filters', data, '/beats?bpm=' + data.min + '-' + data.max);
  }

  render() {
    return (
      <div id="filter-menu-container" className="container">
        <h3 className="normal">Filter</h3>
        <span className="filter-label">BPM</span>
        <RangeInput min={60} max={180} defaultLeft={0} defaultRight={100} sendDataTo={this.retrieveData} />
      </div>
    );
  }
}

export default FilterMenu;
