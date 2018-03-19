import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      duration: album.songs[0].duration,
      isPlaying: false,
      isHovered: false

    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

  componentDidMount(){
    this.eventListeners = {
    timeupdate: e => {
      this.setState({ currentTime: this.audioElement.currentTime });
    },
    durationchange: e => {
      this.setState({ duration: this.audioElement.duration });
    },
    volumechange: e => {
      this.setState({ volume: this.audioElement.volume })
    }
  };
  this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
  this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
  this.audioElement.addEventListener('volumechange', this.eventListeners.volumechange);

}

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.removeEventListener('volumechange', this.eventListeners.volumechange);


  }


  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) { this.setSong(song); }
      this.play();
    }
  }

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex (song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play(newSong);
  }

  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex (song => this.state.currentSong === song);
    const newIndex = currentIndex + 1;
    if (newIndex >= this.state.album.songs.length) {return};
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play(newSong);
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }

  handleVolumeChange(e) {
    const newVolume = e.target.value;
    this.audioElement.volume = newVolume;
    this.setState({ currentVolume: newVolume });
  }

  formatTime(time) {
    if (!time) {
      return "-:--"
    }
    const min = Math.floor(time / 60) % 60;
    const sec = Math.floor(time % 60);
    if (sec < 10) {
      return min + ":0" + sec;
    }
      else {
        return min + ":" + sec;
      }
    }



  render() {
    return(
    <div className="mdl-grid">
      <div className="album">
        <div className="album-image demo-card-square mdl-card mdl-shadow--8dp">
          <div className="mdl-card__title mdl-card--expand">
            <figure className="mdl-card__media">
              <img id="album-cover-art" src={this.state.album.albumCover} alt="album cover"/>
          </figure>
          </div>
        </div>
        <div className="album-info">
          <div className="album-title">
            <h1 id="album-title">{this.state.album.title}</h1>
          </div>
          <div className="artist">
            <h2 id="artist">{this.state.album.artist}</h2>
          </div>
          <div className="release-info">
            <h3 id="release-info">{this.state.album.releaseInfo}</h3>
          </div>
        </div>
    </div>

          <table className="mdl-data-table mdl-js-data-table mdl-shadow--4dp" id="song-list">
              <colgroup>
                <col id="song-number-column" />
                <col id="song-title-column" />
                <col id="song-duration-column" />
              </colgroup>
            <tbody>
              {this.state.album.songs.map( (song, index) =>
                <tr className="song" key={index} onClick={() => this.handleSongClick(song)}
                  onMouseEnter={() => this.setState({isHovered: index+1})}
                  onMouseOut={() => this.setState({isHovered: false})}>
                  <td className="song-actions mdl-data-table__cell--non-numeric">
                    <button className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect mdl-button--colored" id="song-action-btns">
                      {(this.state.currentSong.title === song.title) ?
                        <span className={this.state.isPlaying ? "ion-pause" : "ion-play"}></span>
                        :
                        (this.state.isHovered === index+1) ?
                        <span className="ion-play"></span>
                        :
                        <span className="song-number">{index+1}</span>
                      }
                      </button>
                  </td>
                  <td></td>
                  <td className ="song-title mdl-data-table__cell--non-numeric">{song.title}</td>
                  <td className="song-duration mdl-data-table__cell--non-numeric">{this.formatTime(song.duration)}</td>
                </tr>
                )}
            </tbody>

          </table>



          <div className="player-bar mdl-cell mdl-cell--6-col">
            <PlayerBar
              isPlaying={this.state.isPlaying}
              currentSong={this.state.currentSong}
              currentTime={this.audioElement.currentTime}
              duration={this.audioElement.duration}
              handleSongClick={() => this.handleSongClick(this.state.currentSong)}
              handlePrevClick={() => this.handlePrevClick()}
              handleNextClick={() => this.handleNextClick()}
              handleTimeChange={(e) => this.handleTimeChange(e)}
              handleVolumeChange={(e) => this.handleVolumeChange(e)}
              formatTime={(time) => this.formatTime(time)}
            />
          </div>
          </div>

    );
  }
}

export default Album;
