import React, { Component } from 'react';
import SoundItem from './SoundItem';

//Stylesheet
import '../../styles/SoundList.css';

//For test purposes
import { rows } from '../../database.example';

class SoundList extends Component {
  render() {
    return (
      <div className="sound-list-container">
        <ul>
          {rows.map(row => {
            return (
              <li key={row.id}>
                <SoundItem
                  id={row.id}
                  name={row.name}
                  date={row.date_uploaded}
                  bpm={row.bpm}
                  plays={row.plays}
                  tags={row.tags}
                  purchases={row.purchases}
                  price={row.price}
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
