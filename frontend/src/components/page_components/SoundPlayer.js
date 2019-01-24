import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

//Stylesheet
import '../../styles/SoundPlayer.css';

class SoundPlayer extends Component {
  constructor(props) {
    super(props);

    this.analyser = null;
    this.canvas = null;
    this.ctx = null;

    this.state = {
      width: null
    };

    //Bind functions
    this.frameLoop = this.frameLoop.bind(this);
  }

  buildSourceUrl(soundInfo) {
    return '/api/preview/beats/' + soundInfo.id + '/' + soundInfo.name.replace(/ /g, '-').toLowerCase();
  }

  componentDidMount() {
    this.setState({ width: document.getElementById('sound-player-container').scrollWidth });

    const audioEl = document.getElementById('audio');
    const playButton = document.getElementById('play-button');

    playButton.onclick = () => {
      if (audioEl.paused) {
        audioEl.play();
      } else {
        audioEl.pause();
      }
    };

    const audioCtx = new window.AudioContext();
    this.analyser = audioCtx.createAnalyser();

    this.canvas = document.getElementById('audio-canvas');
    this.ctx = this.canvas.getContext('2d');

    //Imma be straight up. I don't know what the next 3 lines do.
    const source = audioCtx.createMediaElementSource(audioEl);
    source.connect(this.analyser);
    this.analyser.connect(audioCtx.destination);

    //Initialize the animation
    this.frameLoop();
  }

  frameLoop() {
    window.requestAnimationFrame(this.frameLoop);

    let fArr = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(fArr);

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = 'rgb(53, 157, 241)';
    const numBars = 50;

    for (let i = 0; i < numBars; i++) {
      const barWidth = this.canvas.width / numBars;
      const barX = (barWidth + 2) * i;
      let barHeight;
      if (i < 20) {
        barHeight = -(fArr[i] / 2) - 5;
      } else {
        barHeight = -(fArr[i] / 2) - 5;
      }
      this.ctx.fillRect(barX, this.canvas.height, barWidth, barHeight);
    }
  }

  render() {
    return (
      <div id="sound-player-container">
        <canvas id="audio-canvas" width={this.state.width} />
        <audio id="audio">
          <source src={this.buildSourceUrl(this.props.sound)} type="audio/mpeg" />
          Your browser does not support HTML5 audio.
        </audio>
      </div>
    );
  }
}

export default withRouter(SoundPlayer);
