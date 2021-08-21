import { React, useRef } from 'react';
import { useHistory } from "react-router-dom";

import { useWebSocket, ACTIONS } from '../WebSocketContext';

import "./EntryPage.css"

export const EntryPage = () => {

  const webSocket = useWebSocket();

  const nameInput = useRef("username");
  console.log("app loaded");

  const history = useHistory();

  const homePageRoute = "/home";
  const randomNames = ['Tatsumi', 'Hajime', 'Light', 'Bell', 'Rin', 'Orcbolg', 'Diablo', 'Maple', 'Yumeko', 'Ryuko', 'Shinichi', 'Kazuma', 'Mob', 'Sora', 'Shiro', 'Saitama', 'Ainz', 'Subaru', 'Seiya', 'Rimuru', 'Naofumi'];
  const connect = () => {
    if (nameInput.current.value.length <= 10) {
      webSocket.dispatch({ type: ACTIONS.CONNECT, payload: { name: nameInput.current.value } });
      history.push(homePageRoute);
    } else {
      nameInput.current.value = "max username length is 10 characters";
    }
  }

  const randomUsername = () => {
    return `${randomNames[Math.floor(randomNames.length * Math.random())]} ${randomNames[Math.floor(randomNames.length * Math.random())]} ${randomNames[Math.floor(randomNames.length * Math.random())]}`
  }

  return (
    <div className="EntryPage">
      <h1>Fake Franchises</h1>
      <div>
      <input defaultValue={randomUsername()} ref={nameInput} type="text" />

      <button onClick={connect}>Enter Game</button>
      </div>
      <div className="yuuugeParagraph">
        <p><b>How to Play:</b>
          <br />There are a number of properties equal to double the amount of players in the game.
          <br />All players are given a space as a property on which they build a franchise. Only they can see it.
          <br />Everyone starts on property 0. It is possible to get this space as a property.
          <br />
          <br /><b>Turn phase:</b>
          <br />1. Roll 6-sided dice and move that many spaces. You will land on a property.
          <br />2. All other players are given the option to "claim property" or "not claim property". You can pick either option regardless of whether you own a franchise on that property.
          <br />3. You are given the option to challenge these claims. If the player that claims property actually did not own a franchise there, the challenge will be successful.
          <br />
          <br />A successful challenge gives you 2 coins from the other player.
          <br />However, an unsuccessful challenge gives the other player 2 coins from you, and they get a new random property.
          <br />If a claim is not challenged, then you give 1 coin to the player making the claim
          <br />
          <br />When you get a negative amount of coins, you become bankrupt and are out of the game
          <br />The winner is the last player with money when everyone else is bankrupt
          <br />
          <br />Known Bugs: (shhhhh, don't read this lol)
          <br />[Can't have two duplicate usernames] [If any player disconnects after game starts, the game stops] [You need to enter website from the root URL only every time]
          <br />[No back to room button after game ends, you need to re-enter through root URL] [Spaghetti Code] [No actual "game board", it's just numbers] [Bad visual design]
          <br />
          <br />Source Code: https://github.com/punxe/fakefranchises
          <br />
          <br />Contact me on Discord: exe#1111
        </p>
      </div>
    </div>
  );
}