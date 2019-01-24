import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

//Stylesheet
import '../../styles/RolloverButton.css';

class RolloverButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      beforeStyle: { top: 6 },
      afterStyle: { top: 45 }
    };
  }

  handleMouseOver() {
    this.setState({ beforeStyle: { top: -45 }, afterStyle: { top: 6 } });
  }

  handleMouseOut() {
    this.setState({ beforeStyle: { top: 6 }, afterStyle: { top: 45 } });
  }

  render() {
    return (
      <Link to="" className="button rollover-button-container" onMouseOver={this.handleMouseOver.bind(this)} onMouseOut={this.handleMouseOut.bind(this)}>
        <span className="rollover-before" style={this.state.beforeStyle}>
          {this.props.before}
        </span>
        <span className="rollover-after" style={this.state.afterStyle}>
          {this.props.after}
        </span>
      </Link>
    );
  }
}

export default withRouter(RolloverButton);
