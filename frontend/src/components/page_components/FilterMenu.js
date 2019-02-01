import React, { Component } from 'react';
import RangeInput from './RangeInput';
import Collapsible from './Collapsible';

//Stylesheet
import '../../styles/FilterMenu.css';

//Temp database spoof
import { tags } from '../../database.example';

class FilterMenu extends Component {
  tags = null;

  componentWillMount() {
    this.retrieveTags();
  }

  retrieveData(data) {
    window.history.replaceState('Filters', data, '/beats?bpm=' + data.min + '-' + data.max);
  }

  retrieveTags() {
    this.tags = tags.map(tag => {
      tag = tag.slice(0, 1).toUpperCase() + tag.slice(1);
      return (
        <span>
          <label htmlFor={'tag-' + tag} className="filter-tag-label">
            <input type="checkbox" id={'tag-' + tag} className="filter-tag-input" />
            <span className="filter-tag-label-text">{tag}</span>
            <span className="filter-tag-checkbox" />
          </label>
        </span>
      );
    });
  }

  render() {
    return (
      <div id="filter-menu-container" className="container">
        <h3 className="normal">Filter</h3>
        <span className="filter-label">BPM</span>
        <RangeInput min={60} max={180} defaultLeft={0} defaultRight={100} sendDataTo={this.retrieveData} />

        <span className="filter-label">Tags</span>
        <Collapsible values={this.tags} idealLength={5} />
      </div>
    );
  }
}

export default FilterMenu;
