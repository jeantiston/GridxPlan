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
import Hashtags from './pages/Hashtags'
import Share from './pages/Share'
import Settings from './pages/Settings'
import AddImage from './pages/AddImage'
import ClientPreview from './pages/ClientPreview'
import ClientPostPreview from './pages/ClientPostPreview'


function App() {
  return (
    <Router basename='/planner/'>
    <div className="App">
        <Switch>
          <Nav>
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
            <Route exact path="/hashtags">
              <Hashtags />
            </Route>
            <Route exact path="/share">
              <Share />
            </Route>
            <Route exact path="/settings">
              <Settings />
            </Route>
            <Route exact path="/add">
              <AddImage />
            </Route>
          </Nav>
        </Switch>
      </div>
      </Router>
  );
}

export default App;
