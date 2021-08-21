import { React, useState } from 'react';

import { useWebSocket, ACTIONS } from '../WebSocketContext';

import { ChallengeClaimCard } from './ChallengeClaimCard';

import "./GameUI.css"

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

    let whatToReturn = [];
    if (webSocket.state.gameState.winner != 'ThereIsNoWinnerYet00112233445566778899') {
        whatToReturn.push(
            <div className="winMessage">
                <h1>The Winner Is {webSocket.state.gameState.winner}</h1>
                <p>Its too hard to code a play again button so if you want to play again you have to go back to the main menu and create another room. ):</p>
            </div>
        );
    } else {
        whatToReturn.push(
            <div className="turnText">
                <h1>{whoseTurn}'s turn</h1>
            </div>
        );
        whatToReturn.push(
            <div className="playerStats">
                <h3>Player Stats</h3>
                <div className="statsArea">
                    {
                        webSocket.state.gameState.players.map(p =>
                            webSocket.state.gameState.playerBankrupt[p] == "false" ?
                                <h4>{p}: Coins: {webSocket.state.gameState.playerCoins[p]} Location: {webSocket.state.gameState.playerLocations[p]}</h4>
                                :
                                <h4>{p}: Bankrupt </h4>
                        )
                    }
                </div>
            </div>
        );
        if (webSocket.state.gameState.playerBankrupt[webSocket.state.username] == "false") {
            whatToReturn.push(
                <div className="locationText">
                    <h2>Your Franchise Location: &gt;&gt; {webSocket.state.gameState.playerProperties[webSocket.state.username]} &lt;&lt; </h2>
                </div>
            )
        } else {
            whatToReturn.push(
                <div className="locationText">
                    <h2>You Are Bankrupt</h2>
                </div>
            );
        }
        if (webSocket.state.gameState.lastMove.length == 1) {
            if(webSocket.state.username == whoseTurn){
                whatToReturn.push(
                    <div className="roll">
                        <h1>It's Your Turn! Roll the Dice!</h1>
                        <button onClick={rollDice}>Roll Dice</button>
                    </div>
                );
            }else{
                whatToReturn.push(
                    <div className="roll">
                        <h1>Waiting for {whoseTurn} to roll</h1>
    
    
                    </div>
    
                );
            }
            
           
            whatToReturn.push(
                <div className="challengeClaimArea franchiseLogic" >
                    {resetClaimDecisionMade()}
                    {challengeClaims()}
                </div>
            );
        } else {
            whatToReturn.push(
                <div className="roll">
                    <h2>{webSocket.state.gameState.lastMove[0]} rolled a {webSocket.state.gameState.lastMove[1]} and moved from location {webSocket.state.gameState.lastMove[2]} to location {webSocket.state.gameState.lastMove[3]}</h2>
                </div>
            );
            if (webSocket.state.gameState.lastMove[0] == webSocket.state.username || claimDecisionMade == true || webSocket.state.gameState.playerBankrupt[webSocket.state.username] == "true") {
                if (checkAllClaimed() == true) {
                    whatToReturn.push(
                        <div className="franchiseLogic">
                            {(webSocket.state.gameState.lastMove[0] == webSocket.state.username) ?
                                <h2>You need to resolve these claims:</h2>
                                :
                                <h2>Waiting for {whoseTurn} to challenge claims</h2>
                            }
                            <div className="challengeClaimArea">
                                {
                                    challengeClaims()
                                }
                            </div>
                        </div>
                    );
                } else {
                    whatToReturn.push(
                        <div className="franchiseLogic">
                            <h2>Waiting for other players to claim or challenge franchise</h2>
                        </div>
                    );
                }
            } else {
                whatToReturn.push(
                    <div className="franchiseLogic">
                        <h2>Claim this franchise location?</h2>
                        <button onClick={claimTrue}>Claim Franchise</button>
                        <button onClick={claimFalse}>Don't Claim Franchise</button>
                    </div>
                );
            }
        }

       
    }

    return (
        <div className="GameUI">

            {whatToReturn}

        </div>
    )
}