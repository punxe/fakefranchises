import { React, useState } from 'react';

import { useWebSocket, ACTIONS } from '../WebSocketContext';

import { ChallengeClaimCard } from './ChallengeClaimCard';


export const GameUI = () => {

    const webSocket = useWebSocket();

    const [claimDecisionMade, setClaimDecisionMade] = useState(false);

    const rollDice = () => {
        webSocket.dispatch({ type: ACTIONS.ROLL_DICE });

    }
    const claimTrue = () => {
        claim(true);
    }
    const claimFalse = () => {
        claim(false);
    }
    const resetClaimDecisionMade = () => {
        if (claimDecisionMade == true) {
            setClaimDecisionMade(false);
        }
    }
    const claim = (decision) => {
        setClaimDecisionMade(true);
        if (decision == true) {
            webSocket.dispatch({ type: ACTIONS.CLAIM });
        } else {
            webSocket.dispatch({ type: ACTIONS.NO_CLAIM });
        }
    }
    const checkAllClaimed = () => {
        let nullAmount = 0;
        for (let i = 0; i < webSocket.state.gameState.players.length; i++) {
            if (webSocket.state.gameState.playerClaims[webSocket.state.gameState.players[i]] == "null") {
                nullAmount++;
            }
        }
        if (nullAmount == 1) {
            return true;
        } else {
            return false;
        }

    }

    const challengeClaims = () => {
        let ret = [];
        for (let i = 0; i < webSocket.state.gameState.players.length; i++) {

            if (webSocket.state.gameState.playerClaims[webSocket.state.gameState.players[i]] == "true") {
                ret.push(
                    <ChallengeClaimCard i={i} key='i' />
                );
            }
        }
        return ret;
    }



    const whoseTurn = webSocket.state.gameState.players[webSocket.state.gameState.whoseTurn];


    return (
        <div>
            {webSocket.state.gameState.winner != 'ThereIsNoWinnerYet00112233445566778899' ?
                <h1>The Winner Is {webSocket.state.gameState.winner}</h1>
                :
                <div>
                    {webSocket.state.gameState.playerBankrupt[webSocket.state.username] == "false" ?
                        <h2>Your Franchise Location: {webSocket.state.gameState.playerProperties[webSocket.state.username]}</h2>
                        :
                        <h2>You Are Bankrupt</h2>
                    }

                    <h3>{whoseTurn}'s turn</h3>


                    {webSocket.state.username == whoseTurn ? (
                        webSocket.state.gameState.lastMove[0] != webSocket.state.username ?
                            <button onClick={rollDice}>Roll Dice</button>
                            : null)

                        : null
                    }
                    {webSocket.state.gameState.lastMove.length == 1 ?
                        <div>
                            <h2>Waiting for {whoseTurn} to roll</h2>
                            {resetClaimDecisionMade()}
                            {challengeClaims()}
                        </div>
                        :
                        (
                            <div>
                                <h2>{webSocket.state.gameState.lastMove[0]} rolled a {webSocket.state.gameState.lastMove[1]} and moved from location {webSocket.state.gameState.lastMove[2]} to location {webSocket.state.gameState.lastMove[3]}</h2>
                                {
                                    (webSocket.state.gameState.lastMove[0] == webSocket.state.username) || claimDecisionMade == true || webSocket.state.gameState.playerBankrupt[webSocket.state.username] == "true" ?
                                        checkAllClaimed() == true ?
                                            <div>
                                                {(webSocket.state.gameState.lastMove[0] == webSocket.state.username) ? null :
                                                    <h3>Waiting for {whoseTurn} to challenge claims</h3>
                                                }
                                                {
                                                    challengeClaims()
                                                }
                                            </div>
                                            :
                                            <h3>Waiting for other players to claim or challenge franchise</h3>
                                        :

                                        <div>
                                            <button onClick={claimTrue}>Claim Franchise</button>
                                            <button onClick={claimFalse}>Don't Claim Franchise</button>
                                        </div>

                                }
                            </div>
                        )
                    }

                    <h3>Player Stats</h3>
                    {webSocket.state.gameState.players.map(p =>
                        webSocket.state.gameState.playerBankrupt[p] == "false" ?
                            <h4>{p}: Coins: {webSocket.state.gameState.playerCoins[p]} Location: {webSocket.state.gameState.playerLocations[p]}</h4>
                            :
                            <h4>{p}: Bankrupt </h4>
                    )}
                </div>
            }
        </div>
    )
}