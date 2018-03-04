import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';

class App extends Component {
  render() {
    return (
      <div className="App mdl-layout mdl-js-layout">
        <header class="mdl-layout__header">
          <div class="mdl-layout-icon"></div>
          <div class="mdl-layout__header-row">
            <img id="logo" src="/assets/images/bloc_jams_logo.png" alt="bloc jams logo"/>
            <div class="mdl-layout-spacer"></div>
            <nav class="mdl-navigation">
              <Link to='/' class="mdl-navigation__link">Home</Link>
              <Link to='/library' class="mdl-navigation__link">Library</Link>
            </nav>
          </div>

          <h1>Bloc Jams</h1>
        </header>
        <div class="mdl-layout__drawer">
          <span class="mdl-layout__title">Bloc Jams</span>
          <nav class="mdl-navigation">
            <Link to='/' class="mdl-navigation__link">Home</Link>
            <Link to='/library' class="mdl-navigation__link">Library</Link>
          </nav>
        </div>
        <main class="mdl-layout__content">
          <Route exact path="/" component={Landing} />
          <Route path="/library" component={Library} />
          <Route path="/album/:slug" component={Album} />
        </main>
      </div>
    );
  }
}

export default App;
