import { React } from 'react';

import { useWebSocket, ACTIONS } from '../WebSocketContext';


export const ChallengeClaimCard = ({ i }) => {

    const webSocket = useWebSocket();
    const challenge = () => {
        webSocket.dispatch({ type: ACTIONS.CHALLENGE, payload: { challenged: webSocket.state.gameState.players[i] } });
    }
    const noChallenge = () => {
        webSocket.dispatch({ type: ACTIONS.NO_CHALLENGE, payload: { challenged: webSocket.state.gameState.players[i] } });
    }
    return (
        <div>
            {webSocket.state.gameState.challengeResults[i][0] == 0 ?
                <div>
                    <h3>{webSocket.state.gameState.players[i]} claims that they have a franchise on location {webSocket.state.gameState.playerLocations[webSocket.state.gameState.players[webSocket.state.gameState.whoseTurn]]}</h3>
                    {webSocket.state.username == webSocket.state.gameState.players[webSocket.state.gameState.whoseTurn] ?
                        <div>
                            <button onClick={challenge}>Challenge Claim</button>
                            <button onClick={noChallenge}>Let it be</button>
                        </div>
                        :
                        null
                    }
                </div>
                :
                webSocket.state.gameState.challengeResults[i][0] == 2 ?
                    <h3>{webSocket.state.gameState.players[webSocket.state.gameState.prevTurn]} did not challenge {webSocket.state.gameState.players[i]}'s claim</h3>
                    :
                    webSocket.state.gameState.challengeResults[i][1] == 1 ?
                        <h3>{webSocket.state.gameState.players[webSocket.state.gameState.prevTurn]} successfully challenged {webSocket.state.gameState.players[i]}'s claim</h3>
                        :
                        <h3>{webSocket.state.gameState.players[webSocket.state.gameState.prevTurn]} unsuccessfully challenged {webSocket.state.gameState.players[i]}'s claim</h3>
            }
        </div>

    )

}