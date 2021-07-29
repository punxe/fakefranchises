import { React, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import SockJS from "sockjs-client";
import Stomp from "stompjs";

import {EntryPage} from './pages/EntryPage';
import {HomePage} from './pages/HomePage';
import {GamePage} from './pages/EntryPage';

function App() {

  const [stompClient, setStompClient] = useState();

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/game/:teamCode">
            <GamePage />
          </Route>
          <Route path="/game/:teamCode">
            <HomePage />
          </Route>
          <Route path="/">
            <EntryPage stompClient={stompClient}/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
