import React, { Component } from 'react';

//Stylesheet
import '../styles/PageBreak.css';

class PageBreak extends Component {
  render() {
    let background;
    switch (this.props.background) {
      case 'black':
        background = 'rgba(31,31,31)';
        break;
      case 'white':
        background = 'rgb(248, 248, 248)';
        break;
      default:
        background = 'transparent';
        break;
    }

    return (
      <div className="page-break" style={{ background: background }}>
        {this.props.children}
      </div>
    );
  }
}

export default PageBreak;
