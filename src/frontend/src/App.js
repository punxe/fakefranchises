import { React } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


import {EntryPage} from './pages/EntryPage';
import {HomePage} from './pages/HomePage';
import {GamePage} from './pages/GamePage';

import { WebSocketProvider } from './WebSocketContext';

function App() {


  return (
    <WebSocketProvider>
    <div className="App">
      <Router>
        <Switch>
          <Route path="/game/:teamCode">
            <GamePage />
          </Route>
          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="/">
            <EntryPage />
            </Route>
        </Switch>
      </Router>
    </div>
    </WebSocketProvider>
  );
}

export default App;
