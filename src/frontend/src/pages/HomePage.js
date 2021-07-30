import { React, useRef } from 'react';
import { Router, Route, Switch } from "react-router-dom";

import SockJS from "sockjs-client";
import Stomp from "stompjs";

export const HomePage = ({stompClient}) => {
    return (
        <div>
          <h1>HomePage</h1>
        </div>
      );
}