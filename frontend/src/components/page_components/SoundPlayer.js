import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

//Stylesheet
import '../../styles/SoundPlayer.css';

class SoundPlayer extends Component {
  constructor(props) {
    super(props);

    //These are global variables for use in other methods
    this.audioCtx = null;
    this.analyser = this.props.analyser;
    this.canvas = null;
    this.ctx = null;
    this.stopAnimation = false;

    //Width is the width of the canvas, progress is for the bar
    this.state = {
      width: null,
      progress: 0
    };

    //Bind functions
    this.frameLoop = this.frameLoop.bind(this);
  }

  componentDidMount() {
    this.setState({ width: document.getElementById('audio-canvas').offsetWidth });
    this.canvas = document.getElementById('audio-canvas');
    this.ctx = this.canvas.getContext('2d');

    this.checkAnalyser();
  }

  //CheckAnalyser checks if the audio analyser is loaded in window, and loops if not
  checkAnalyser() {
    setTimeout(() => {
      if (window.analyser) {
        this.frameLoop();
      } else {
        this.checkAnalyser();
      }
    }, 20);
  }

  //This method runs every frame (~60fps)
  frameLoop() {
    if (!this.stopAnimation) {
      window.requestAnimationFrame(this.frameLoop);

      //Create an array with the number of bins of the analyser
      let fArr = new Uint8Array(window.analyser.frequencyBinCount);
      //Fill the array
      window.analyser.getByteFrequencyData(fArr);

      //Clear the canvas, set bar color, set number of bars and width
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.fillStyle = 'rgb(53, 157, 241)';
      const numBars = 50;
      const barWidth = this.canvas.width / numBars;

      //For every bar
      for (let i = 0; i < numBars; i++) {
        //Set the barX location
        const barX = (barWidth + 2) * i;
        //Set bar height
        let barHeight;
        //If we aren't on the page for the current sound, do not move the bars
        if (this.props.sound !== this.props.nowPlaying) {
          barHeight = -5;
        } else {
          barHeight = -(fArr[i] / 2) - 5;
        }

        //Create the bar for this frame
        this.ctx.fillRect(barX, this.canvas.height, barWidth, barHeight);
      }
    }
  }

  updateProgress = () => {
    //Update the progress
    const progress = document.getElementById('progress-bar');
    const audioEl = document.getElementById('audio-controller');
    progress.style.width = (audioEl.currentTime / audioEl.duration) * 100 + '%';
  };

  componentWillUnmount() {
    document.getElementById('audio-controller').removeEventListener('timeupdate', this.updateProgress);
    this.stopAnimation = true;
  }

  render() {
    return (
      <div id="sound-player-container">
        <canvas id="audio-canvas" width={this.state.width} />
        <div id="progress-bar-container">
          <div id="progress-bar" style={{ width: this.state.progress }} />
        </div>
      </div>
    );
  }
}

export default withRouter(SoundPlayer);
