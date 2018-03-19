import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = { albums: albumData };
  }

  render() {
    return (
      <section className='library'>
      {
        this.state.albums.map( (album, index) =>
          <div className="mdl-grid">
            <div className="mdl-layout-spacer"></div>
              <div className="album-card demo-card-square mdl-card mdl-shadow--8dp mdl-cell mdl-cell--4-col">
                <div className="mdl-card__title mdl-card--expand">
                  <figure className="mdl-card__media">
                    <img className="album-image" src={album.albumCover} alt={album.title} />
                  </figure>
                </div>
                <div className="mdl-card__title mdl-card--expand">
                  <h2 className="mdl-card__title-text">{album.title}</h2>
                </div>
                <div className="mdl-card__supporting-text">
                  <p className="artist-text">{album.artist}</p>
                </div>
                <div className="mdl-card__supporting-text">
                  <p className="songs-count">{album.songs.length} songs</p>
                </div>
                <div className="mdl-card__actions mdl-card--border">
                  <Link to={`/album/${album.slug}`} key = {index} className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                    Listen Now
                  </Link>
                </div>
                </div>

            <div className="mdl-layout-spacer"></div>
          </div>
        )
      }
      </section>
    );
  }
}

export default Library;
