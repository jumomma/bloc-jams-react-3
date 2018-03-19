import React, { Component } from 'react';

class PlayerBar extends Component {
  render() {
    return (
      <div className="player-bar">
        <div id="buttons">
           <button className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect mdl-button--colored" id ="previous" onClick={this.props.handlePrevClick}>
             <span className="ion-skip-backward"></span>
           </button>
           <button className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect mdl-button--colored" id="play-pause" onClick={this.props.handleSongClick} >
             <span className={this.props.isPlaying ? 'ion-pause' : 'ion-play'}></span>
           </button>
           <button className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect mdl-button--colored" id="next" onClick={this.props.handleNextClick}>
             <span className="ion-skip-forward"></span>
           </button>
         </div>
         <section id="time-control">
           <div className="current-time">{this.props.formatTime(this.props.currentTime)}</div>
           <input
              type="range"
              className="mdl-slider mdl-js-slider"
              value={(this.props.currentTime / this.props.duration) || 0}
              max="1"
              min="0"
              step="0.01"
              onChange={this.props.handleTimeChange}
            />
           <div className="total-time">{this.props.formatTime(this.props.duration)}</div>
         </section>
         <section id="volume-control">
           <div className="icon ion-volume-low"></div>
           <input
              type="range"
              className="mdl-slider mdl-js-slider"
              value={this.props.currentVolume}
              max="1"
              min="0"
              step="0.01"
              onChange={this.props.handleVolumeChange}
            />
           <div className="icon ion-volume-high"></div>
         </section>
      </div>
    );
  }
}

export default PlayerBar;
