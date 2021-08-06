import { React } from 'react';



export const Room = ({room}) => {
    console.log(room);
    return(
        <div>
            <h4>Code: {room.code} || Host: {room.host} || Player Count: {Object.keys(room.players).length} || Game In Progress: {room.gameStarted ? 'Yes' : 'No'}</h4>
        </div> 
        
    )
    
}