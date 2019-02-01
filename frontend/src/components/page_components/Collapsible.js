import React, { Component } from 'react';

//Stylesheet
import '../../styles/Collapsible.css';

class Collapsible extends Component {
  state = {
    showAll: false
  };

  showTheRest() {
    this.setState({ showAll: true });
  }

  showTheLess() {
    this.setState({ showAll: false });
  }

  render() {
    let theList = null,
      theRest = null;

    const { idealLength, values } = this.props;

    if (values.length > idealLength + 1) {
      theList = values.slice(0, idealLength);
      theRest = values.slice(idealLength);
    } else {
      theList = values;
    }

    return (
      <div className="collapsible-list">
        <ul>
          {theList.map(value => {
            return <li key={Math.random().toFixed(6)}>{value}</li>;
          })}

          {!this.state.showAll && (
            <span className="collapsible-button more" onClick={this.showTheRest.bind(this)}>
              MORE ({theRest.length})
            </span>
          )}

          {this.state.showAll &&
            theRest.map(value => {
              return <li>{value}</li>;
            })}

          {this.state.showAll && (
            <span className="collapsible-button less" onClick={this.showTheLess.bind(this)}>
              LESS
            </span>
          )}
        </ul>
      </div>
    );
  }
}

export default Collapsible;
