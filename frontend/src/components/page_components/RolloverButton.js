import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

//Stylesheet
import '../../styles/RolloverButton.css';

class RolloverButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      before: null,
      after: null,
      beforeStyle: { top: 6, left: null },
      afterStyle: { top: 45, left: null }
    };
  }

  componentDidMount() {
    const before = document.getElementById('before').offsetWidth;
    const after = document.getElementById('after').offsetWidth;
    const button = document.getElementById('rollover-button').offsetWidth;

    const beforeLeft = button / 2 - before / 2;
    const afterLeft = button / 2 - after / 2;
    this.setState({ before: beforeLeft, after: afterLeft, beforeStyle: { top: 6, left: beforeLeft }, afterStyle: { top: 45, left: afterLeft } });
  }

  handleMouseOver() {
    this.setState({ beforeStyle: { top: -45, left: this.state.before }, afterStyle: { top: 6, left: this.state.after } });
  }

  handleMouseOut() {
    this.setState({ beforeStyle: { top: 6, left: this.state.before }, afterStyle: { top: 45, left: this.state.after } });
  }

  render() {
    return (
      <Link
        to={this.props.to}
        id="rollover-button"
        className="button rollover-button-container"
        onMouseOver={this.handleMouseOver.bind(this)}
        onMouseOut={this.handleMouseOut.bind(this)}
      >
        <span className="rollover-before" id="before" style={this.state.beforeStyle}>
          {this.props.before}
        </span>
        <span className="rollover-after" id="after" style={this.state.afterStyle}>
          {this.props.after}
        </span>
      </Link>
    );
  }
}

export default withRouter(RolloverButton);
