import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './page_components/Header';
import Home from './pages/Home';
import Beats from './pages/Beats';
import Contact from './pages/Contact';

//Root stylesheet
import '../styles/App.css';
import NowPlaying from './page_components/NowPlaying';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { nowPlaying: null, audioUrl: null, paused: null };
    this.audio = null;
    this.audioCtx = null;
    this.analyser = null;

    this.setNowPlaying = this.setNowPlaying.bind(this);
    this.toggleAudio = this.toggleAudio.bind(this);
    this.seekAudio = this.seekAudio.bind(this);
  }

  componentDidMount() {
    this.audio = document.getElementById('audio-controller');

    //Cross-platform enabling
    window.AudioContext = window.AudioContext || window.webkitAudioContext;

    //Create an audio context and set global analyser
    this.audioCtx = new window.AudioContext();
    this.analyser = this.audioCtx.createAnalyser();

    //Imma be straight up. I don't know what the next 3 lines do.
    const source = this.audioCtx.createMediaElementSource(this.audio);
    source.connect(this.analyser);
    this.analyser.connect(this.audioCtx.destination);

    window.analyser = this.analyser;
  }

  //This method builds the source URL for the sound
  buildSourceUrl(soundInfo) {
    //return '/api/preview/beats/' + soundInfo.id + '/' + soundInfo.name.replace(/ /g, '-').toLowerCase();
    return '/dev_sounds/ad-' + soundInfo.name.replace(/ /g, '-').toLowerCase() + '-p.mp3';
  }

  setNowPlaying(soundInfo) {
    if (soundInfo !== this.state.nowPlaying) {
      this.setState({ nowPlaying: soundInfo, audioUrl: this.buildSourceUrl(soundInfo) });
      this.audio.load();
    }
  }

  toggleAudio(onlyPlay) {
    if (this.audio.paused || onlyPlay) {
      this.audio.play();
      this.setState({ paused: false });
    } else {
      this.audio.pause();
      this.setState({ paused: true });
    }
  }

  seekAudio(time) {
    this.audio.currentTime = time;
    this.toggleAudio(true); //onlyPlay = true
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/kits" component={Kits} />
            <Route
              path="/beats"
              render={props => (
                <Beats
                  {...props}
                  paused={this.state.paused}
                  nowPlaying={this.state.nowPlaying}
                  toggleAudio={this.toggleAudio}
                  seekAudio={this.seekAudio}
                  setNowPlaying={this.setNowPlaying}
                />
              )}
            />
            <Route path="/loops" component={Loops} />
            <Route path="/contact" component={Contact} />
            <Route component={NoMatch} />
          </Switch>

          <NowPlaying sound={this.state.nowPlaying} />

          <audio id="audio-controller" loop>
            <source src={this.state.audioUrl} type="audio/mpeg" />
            Your browser does not support HTML5 audio.
          </audio>
        </div>
      </Router>
    );
  }
}

const Kits = props => {
  return (
    <div id="home-container" className="container">
      <h3>LET'S GET THESE KITS</h3>
      <p>now spend money on my midi</p>
    </div>
  );
};

const Loops = props => {
  return (
    <div id="home-container" className="container">
      <h3>WHO WANTS SOME LOOPS</h3>
      <p>now spend money on my midi</p>
    </div>
  );
};

const NoMatch = props => {
  return (
    <div id="home-container" className="container">
      <h1>404 &mdash; That page cannot be found</h1>
    </div>
  );
};

export default App;
