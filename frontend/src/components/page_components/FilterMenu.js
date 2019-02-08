import React, { Component } from 'react';
import RangeInput from './RangeInput';
import Collapsible from './Collapsible';

//Stylesheet
import '../../styles/FilterMenu.css';

//Temp database spoof
import { tags } from '../../database.example';

class FilterMenu extends Component {
  constructor(props) {
    super(props);

    //database example
    this.allTags = tags;

    this.handleBPM = this.handleBPM.bind(this);
    this.handleTags = this.handleTags.bind(this);
  }

  handleBPM(data) {
    this.props.setBPM({ min: data.min, max: data.max });
  }

  handleTags(tag, e) {
    this.props.toggleTag(tag);
  }

  render() {
    const { currentFilters } = this.props;
    return (
      <div id="filter-menu-container" className="container">
        <h3 className="normal">Filter</h3>
        <span className="filter-label">BPM</span>
        <RangeInput min={60} max={180} defaultLeft={0} defaultRight={100} sendDataTo={this.handleBPM} />

        <span className="filter-label">Tags</span>
        <Collapsible idealLength={5}>
          {this.allTags.map(tag => {
            return (
              <span key={tag + Math.random() * 20}>
                <label htmlFor={'tag-' + tag} className="filter-tag-label">
                  <input
                    type="checkbox"
                    id={'tag-' + tag}
                    className="filter-tag-input"
                    checked={currentFilters.tags.includes(tag)}
                    onChange={this.handleTags.bind(this, tag)}
                  />
                  <span className="filter-tag-label-text">{tag.slice(0, 1).toUpperCase() + tag.slice(1)}</span>
                  <span className="filter-tag-checkbox" />
                </label>
              </span>
            );
          })}
        </Collapsible>
      </div>
    );
  }
}

export default FilterMenu;
