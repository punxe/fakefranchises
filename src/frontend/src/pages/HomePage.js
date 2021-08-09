import { React} from 'react';


import { ChatBox } from '../chat/ChatBox';
import { OnlineUserList } from '../model/OnlineUserList';
import { ProfileCard } from '../model/ProfileCard';
import { RoomList } from '../model/RoomList';


//import "./HomePage.css";


export const HomePage = () => {
  return (
    <div className="HomePage">
      <ProfileCard />
      <h1>HomePage</h1>
      

      <RoomList />
      <ChatBox />

      
      <OnlineUserList />
    </div>
  );
}