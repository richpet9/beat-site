import React, { Component } from 'react';

//Stylesheet
import '../../styles/ProgressBar.css';

class ProgressBar extends Component {
  constructor(props) {
    super(props);

    this.state = { handleX: 0 };
    this.updateProgress = this.updateProgress.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const audio = document.getElementById('audio-controller');
    audio.addEventListener('timeupdate', this.updateProgress);
  }

  updateProgress() {
    const audio = document.getElementById('audio-controller');
    const currentTime = audio.currentTime;
    const duration = audio.duration;

    const width = document.getElementById('now-playing-prog-container').offsetWidth;
    const posX = (currentTime / duration) * width;
    this.setState({ handleX: posX ? posX : 0 });
  }

  handleClick(e) {
    e.preventDefault();
    const bar = document.getElementById('now-playing-prog-bar');
    const time = (e.pageX - bar.parentNode.offsetLeft) / bar.offsetWidth;
    this.props.seekAudio(time);
  }

  render() {
    return (
      <div id="now-playing-prog-container">
        <div id="now-playing-prog-bar" onClick={this.handleClick} />
        <div id="now-playing-handle" style={{ left: this.state.handleX }} />
      </div>
    );
  }
}

export default ProgressBar;
