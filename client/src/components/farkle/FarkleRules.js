import React from 'react'

function FarkleRules() {

    return(
        <div className="App">
            <h2>How to Play Farkle!</h2>
            <p className="rulesBlock">Six dice are rolled and then scoring dice are selected for points (see table below). 
                Any dice that do not score points can be rolled again for another round of scoring. 
                If there is any time when no dice can score points, the player busts!
                The player must end their turn and "pass the dice" to the next player before they bust 
                for their points to count. First player to 5000 points wins.
            </p>
            <div className="rulesTableDiv">
                <table className="rulesTable">
                    <tbody>
                    <thead><td>Dice</td><td>Points</td></thead>
                    <tr><td>One</td><td>100</td></tr>
                    <tr><td>Five</td><td>50</td></tr>
                    <tr><td>Three of a kind</td><td>3x Face value</td></tr>
                    <tr><td>Three ones</td><td>1000</td></tr>
                    <tr><td>Four of a kind</td><td>1000</td></tr>
                    <tr><td>Five of a kind</td><td>1500</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default FarkleRules