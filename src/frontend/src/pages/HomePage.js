import { React } from 'react';


import { ChatBox } from '../chat/ChatBox';
import { OnlineUserList } from '../model/OnlineUserList';
import { ProfileCard } from '../model/ProfileCard';
import { RoomList } from '../model/RoomList';


import "./HomePage.css";


export const HomePage = () => {
  return (
    <div className="HomePage">
      <div className="name">
      <ProfileCard />
      </div>
      <h1 className="header" >Join a Room</h1>

      <div className="chat">
      <ChatBox />
      </div>

      <div  className="users">
      <OnlineUserList />
      </div>
      
      <div className="rooms">
      <RoomList />
      </div>

    </div>
  );
}