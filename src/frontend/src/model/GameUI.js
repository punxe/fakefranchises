import { React } from 'react';

import { useWebSocket, ACTIONS } from '../WebSocketContext';




export const GameUI = () => {

    const webSocket = useWebSocket();

    const rollDice = () => {
        webSocket.dispatch({ type: ACTIONS.ROLL_DICE });

    }
    const challengeDecision = (decision) => {
        if(decision == true){

        }else{

        }
    }

    const whoseTurn = webSocket.state.gameState.players[webSocket.state.gameState.whoseTurn];

    return (
        <div>

                <h3>{whoseTurn}'s turn</h3>
                {webSocket.state.username == whoseTurn?
                    <button onClick={rollDice}>Roll Dice</button> : null
                }
                <h2>Your Franchise Location: {webSocket.state.gameState.playerProperties[webSocket.state.username]}</h2>
            
                <h3>Player Stats</h3>
                {webSocket.state.gameState.players.map(p => 
                    <h4>{p}: Coins: {webSocket.state.gameState.playerCoins[p]} Location: {webSocket.state.gameState.playerLocations[p]}</h4>
                )}
        </div>
    )
}