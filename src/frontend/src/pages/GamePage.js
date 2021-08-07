import { React } from 'react';

import { ChatBox } from '../chat/ChatBox';
import { OnlineUserList } from '../model/OnlineUserList';

export const GamePage = () => {
    return (
        <div className="GamePage">
          <h1>Ready Up</h1>
          
          <ChatBox />
          <OnlineUserList />

        </div>
      );
}