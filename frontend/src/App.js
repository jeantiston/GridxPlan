import './App.css';

import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Nav from './components/Nav'
// import PostBar from './components/PostBar'

import GridGallery from './pages/GridGallery'
import EditPost from './pages/EditPost'
import Share from './pages/Share'
import Settings from './pages/Settings'
import ClientPreview from './pages/ClientPreview'
import ClientPostPreview from './pages/ClientPostPreview'


function App() {
  return (
    <Router basename='/planner/'>
      <div className="App">
        <Switch>
          <Nav>
            <div className="wrapwrap">
              <div className="wrap">
                <Route exact path="/">
                  <GridGallery />
                </Route>
                <Route exact path="/preview/:username">
                  <ClientPreview />
                </Route>
                <Route exact path="/preview/:username/:postId">
                    <ClientPostPreview />
                </Route>
                <Route exact path="/edit/:postId">
                    <EditPost />
                </Route>
                <Route exact path="/share">
                  <Share />
                </Route>
                <Route exact path="/settings">
                  <Settings />
                </Route>
              </div>
            </div>
          </Nav>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
