import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

//Stylesheet
import '../../styles/SoundPlayer.css';

class SoundPlayer extends Component {
  constructor(props) {
    super(props);

    //These are global variables for use in other methods
    this.analyser = null;
    this.canvas = null;
    this.ctx = null;

    //Width is the width of the canvas, progress is for the bar
    this.state = {
      width: null,
      progress: 0
    };

    //Bind functions
    this.frameLoop = this.frameLoop.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  //This method builds the source URL for the sound
  buildSourceUrl(soundInfo) {
    return '/api/preview/beats/' + soundInfo.id + '/' + soundInfo.name.replace(/ /g, '-').toLowerCase();
    //return '/dev_sounds/ad-' + soundInfo.name.replace(/ /g, '-').toLowerCase() + '-p.mp3';
  }

  //Whent he component mounts, handle pretty much everything
  componentDidMount() {
    //First, set the width to the container's width
    this.setState({ width: document.getElementById('sound-player-container').scrollWidth });

    //Get the audio element
    const audioEl = document.getElementById('audio');

    //Cross-platform enabling
    window.AudioContext = window.AudioContext || window.webkitAudioContext;

    //Create an audio context and set global analyser
    const audioCtx = new window.AudioContext();
    this.analyser = audioCtx.createAnalyser();

    //Set our other global variables
    this.canvas = document.getElementById('audio-canvas');
    this.ctx = this.canvas.getContext('2d');

    //Imma be straight up. I don't know what the next 3 lines do.
    const source = audioCtx.createMediaElementSource(audioEl);
    source.connect(this.analyser);
    this.analyser.connect(audioCtx.destination);

    //Initialize the animation
    this.frameLoop();

    //Some controls!
    const playButton = document.getElementById('play-button');
    const pauseButton = document.getElementById('pause-button');

    playButton.onclick = () => {
      this.playAudio(playButton, pauseButton, audioEl);
    };

    pauseButton.onclick = () => {
      this.pauseAudio(playButton, pauseButton, audioEl);
    };

    //When we press any key ew it's so inefficient
    document.body.addEventListener('keydown', this.handleKeyPress);
    document.body.controls = { play: playButton, pause: pauseButton, audio: audioEl };

    //Add a listener to update the progress
    audioEl.addEventListener('timeupdate', () => {
      //Update the progress
      this.setState({ progress: (audioEl.currentTime / audioEl.duration) * 100 + '%' });
    });

    //Add a listener for clicking on the progress bar (seeking)
    document.getElementById('progress-bar-container').addEventListener('click', e => {
      const clickPos = (e.layerX - this.canvas.offsetLeft) / this.canvas.offsetWidth;
      const clickTime = clickPos * audioEl.duration;
      audioEl.currentTime = clickTime;
    });
  }

  //This method runs every frame (~60fps)
  frameLoop() {
    window.requestAnimationFrame(this.frameLoop);

    //Create an array with the number of bins of the analyser
    let fArr = new Uint8Array(this.analyser.frequencyBinCount);
    //Fill the array
    this.analyser.getByteFrequencyData(fArr);

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
      const barHeight = -(fArr[i] / 2) - 5;
      //Create the bar for this frame
      this.ctx.fillRect(barX, this.canvas.height, barWidth, barHeight);
    }
  }

  pauseAudio(playButton, pauseButton, audioEl) {
    audioEl.pause();
    playButton.style.display = 'inline-block';
    pauseButton.style.display = 'none';
  }

  playAudio(playButton, pauseButton, audioEl) {
    audioEl.play();
    playButton.style.display = 'none';
    pauseButton.style.display = 'inline-block';
  }

  handleKeyPress(e) {
    //If we pressed space (32)
    if (e.keyCode === 32) {
      if (e.target.controls.audio.paused) {
        this.playAudio(e.target.controls.play, e.target.controls.pause, e.target.controls.audio);
      } else {
        this.pauseAudio(e.target.controls.play, e.target.controls.pause, e.target.controls.audio);
      }
    }
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.handleKeyPress);
  }

  render() {
    return (
      <div id="sound-player-container">
        <canvas id="audio-canvas" width={this.state.width} />
        <div id="progress-bar-container">
          <div id="progress-bar" style={{ width: this.state.progress }} />
        </div>
        <audio id="audio">
          <source src={this.buildSourceUrl(this.props.sound)} type="audio/mpeg" />
          Your browser does not support HTML5 audio.
        </audio>
      </div>
    );
  }
}

export default withRouter(SoundPlayer);
