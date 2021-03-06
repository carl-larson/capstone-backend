import React from 'react';
import Row from './Row';
import ScoreBoard from './ScoreBoard'
import Cookies from 'js-cookie'

import './farkleStyle.css';

class Farkle extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            points: 0,
            
            playing: false,
            keepButtonOff: true,
            rollButtonOff: false,
            message: 'Roll dice to begin!',
            dice: [
                {
                    value: 1,
                    selected: false,
                    kept: false
                },
                {
                    value: 2,
                    selected: false,
                    kept: false
                },
                {
                    value: 3,
                    selected: false,
                    kept: false
                },
                {
                    value: 4,
                    selected: false,
                    kept: false
                },
                {
                    value: 5,
                    selected: false,
                    kept: false
                },
                {
                    value: 6,
                    selected: false,
                    kept: false
                }
            ]
        };
        this.comboSearch = this.comboSearch.bind(this);
        this.checkForCombos = this.checkForCombos.bind(this);
        this.rollDice = this.rollDice.bind(this);
        this.select = this.select.bind(this);
        this.sortDice = this.sortDice.bind(this);
        this.updatePoints = this.updatePoints.bind(this);
        this.keepAndUpdateScore = this.keepAndUpdateScore.bind(this);
        this.recursiveCounting = this.recursiveCounting.bind(this);
        this.checkForWinner = this.checkForWinner.bind(this);
        this.scorePass = this.scorePass.bind(this);
        
        this.scoreTrackerOne = [];
        this.scoreTrackerTwo = [];
        this.scoreBoardScore1 = this.props.location.state.score1;
        this.scoreBoardScore2 = this.props.location.state.score2;
        this.selectedDice = [];
        this.score = 0;
        this.allValidPoints = false;
        this.winner = null;
        // this.keptCount = 0;
        this.combos = [{values:'123456', worth: 2850},{values:'12345', worth: 1850}, {values:'23456', worth: 1850}, {values: '11', worth: 100},{values: '55', worth: 50},{values: '1', worth: 100},{values: '5', worth: 50},
        {values:'666666', worth: 1000},{values:'555555', worth: 1000},{values:'444444', worth: 1000},{values:'333333', worth: 1000},{values:'222222', worth: 1000},{values:'111111', worth: 3000},
        {values:'66666', worth: 1000},{values:'55555', worth: 1000},{values:'44444', worth: 1000},{values:'33333', worth: 1000},{values:'22222', worth: 1000},{values:'11111', worth: 2000},
        {values:'6666', worth: 400},{values:'5555', worth: 500},{values:'4444', worth: 600},{values:'3333', worth: 700},{values:'2222', worth: 800},{values:'1111', worth: 1100},
        {values:'666', worth: 600},{values:'555', worth: 400},{values:'444', worth: 400},{values:'333', worth: 300},{values:'222', worth: 200},{values:'111', worth: 800}
        ];
    }
    
    componentDidMount() {
        //turn score trackers into arrays and save them to state
        this.scoreTrackerOne = this.props.location.state.score1_tracker.split(',');
        this.scoreTrackerTwo = this.props.location.state.score2_tracker.split(',');
    }

    comboSearch(comboSearchString) {
        let comboSearchResults = false;
        let i = 0;
        // for(let i = 0; i < this.combos.length; i++) {
        while (comboSearchResults === false && i < this.combos.length) {
            if (comboSearchString.indexOf(this.combos[i].values) !== -1) {
                comboSearchResults = true;
            }
            i++;
        }
        return comboSearchResults;
    }

    checkForCombos() {
        let comboSearch = [];
        for (let i = 0; i < 6; i++) {
            if (this.state.dice[i].kept === false) {
                comboSearch.push(this.state.dice[i].value)
            }
        }
        comboSearch.sort();
        let comboSearchString = comboSearch.join('');
        let comboSearchResults = this.comboSearch(comboSearchString);
        if (comboSearchResults === true) {
            console.log('Found combo')
        } else {
            console.log('No combo found');
            this.score = 0;
            this.setState({message: 'Bust!', rollButtonOff: true, keepButtonOff: true})
            
        }
        return;
    }
//LOOPS THROUGH THE THIS.COMBOS ARRAY TO COMPARE SELECTED DICE WITH SCORING COMBO OPTIONS,
//RECEIVES SELECTED DICE IN STRING FORM, RETURNS POINTS
    recursiveCounting(dice, points) {
        console.log(dice)
        let dice2 = '';
    // EXIT LOOP IF DICE STRING IS EMPTY
        if (dice === dice2 && points > 0) {
            this.setState({keepButtonOff: false});
            return points;
        }
        for(let i = 0; i < this.combos.length; i++) {
            if (dice.indexOf(this.combos[i].values) !== -1) {
                points += this.combos[i].worth;
                dice2 = dice.replace(this.combos[i].values, '');
                console.log('new dice string: ', dice2)
                this.recursiveCounting(dice2, points)
            }
        }
        return points;
    }

    updatePoints() {
        let dice = this.selectedDice.join('');
        console.log('original dice string: ', dice)
        let points = 0;
        //turns off keep button unless recursiveCounting() changes this to false
        this.setState({keepButtonOff: true})
        let returnedPoints = this.recursiveCounting(dice, points);
        this.setState({points: returnedPoints});
        return;
    }

    keepAndUpdateScore() {
        //Move selected points to kept points and reset selected points to zero
        this.score += this.state.points;
        this.setState({rollButtonOff: false, keepButtonOff: true, points: 0});
        //Empty the selected dice array to begin new round of selections
        this.selectedDice = [];
        let keptCount = 0;

        let diceArray = this.state.dice;

        for (let i = 0; i < 6; i++) {
            
            if (diceArray[i].kept === true) {
                //checking if all dice are in the kept column
                keptCount += 1;
                console.log(keptCount)
            } else if (diceArray[i].selected === true && diceArray[i].kept === false) {
                diceArray[i].kept = true;
            }
            
        } 
        if (keptCount === 6) {
            this.setState({message: 'Roll them all again!'})
        }
        this.setState({dice: diceArray})
        return keptCount;
    }


//PUT DICE INTO selectedDice ARRAY FOR SCORE PURPOSES
    sortDice(ind) {
        
        if (this.state.dice[ind].selected === true && this.state.dice[ind].kept === false) {
            this.selectedDice.push(this.state.dice[ind].value);
        }
        if (this.state.dice[ind].selected === false && this.state.dice[ind].kept === false) {
            const removeIndex = this.selectedDice.indexOf(this.state.dice[ind].value);
            if (removeIndex > -1) {
                this.selectedDice.splice(removeIndex, 1);
            }
        }
        
        this.selectedDice.sort();
        console.log("selected dice: ", this.selectedDice)
    }

// THIS METHOD IS FOR CHANGING THE selected STATUS OF THE DICE WHEN CLICKED
// AND CALLS THE sortDice METHOD TO ARRANGE THE selectedDice ARRAY
    select(ind) {
        if(this.state.playing && this.state.rollButtonOff) {
            console.log('clicked');
            let diceList = [...this.state.dice];
            let selectDie = diceList[ind];
            if (selectDie.kept === false) {
                selectDie.selected ? selectDie.selected = false : selectDie.selected = true;
                this.sortDice(ind);
            } else {
                return;
            }
            //Check that at least one die is selected to allow keeping:
            
            this.setState({dice: diceList});
            let oneSelected = false;
            for(let i = 0; i < 6; i++) {
                if (this.state.dice[i].selected === true) {
                    oneSelected = true;
                }
            }
            if (oneSelected === true) {this.setState({keepButtonOff: false})}
            else {this.setState({keepButtonOff: true})};
            this.updatePoints();
        } else {return}
    }

    rollDice() {
        //Begins the game
        this.setState({playing: true, rollButtonOff: true})
        
        //Keep all selected dice and move selected points to kept score (calls
        // same method that the keep button does)
        //Returns kept count
        let keptCount = 0;

        let newRoll = 0;
        //Make a new dice array to mutate
        let diceArray = this.state.dice;
        // console.log(diceArray);
        
        //Roll new numbers on all non-selected non-kept dice.
        //If die is selected, update to kept = true.
        for (let i = 0; i < 6; i++) {
            if (diceArray[i].selected === false) {
                newRoll = Math.ceil(Math.random()*6);
                diceArray[i].value = newRoll;
            }
            if (diceArray[i].kept === true) {
                //checking if all dice are in the kept column
                keptCount += 1;
                console.log(keptCount)
            }
        }
        //if all dice are in the kept column, unselect and unkeep and reroll all dice
        if (keptCount === 6) {
            for (let j = 0; j < 6; j++) {
                diceArray[j].selected = false;
                diceArray[j].kept = false;
            }
            keptCount = 0;
            this.rollDice();
        }
        
        //Set state dice array to the new values and update the message after the game begins
        this.setState({dice: diceArray, message: 'Select dice to keep or score and pass.'});
        this.checkForCombos();
    }

    checkForWinner(oldInfo) {
        // Update player turn without winner
        let newTurn = oldInfo.turn;
        newTurn === 1 ? newTurn = 2 : newTurn = 1;
        // Player 1 can't win on their turn
        if (oldInfo.turn === 2) {
            // if player 2 has 5000, check if player 1 also does;
            if (this.scoreBoardScore2 > 4999) {
                
                if (this.scoreBoardScore1 < 5000) {
                    //if player 1 does not, player 2 wins
                    this.winner = oldInfo.player2;
                    this.setState({message: 'You win!'});
                    newTurn = 0;
                } else { 
                    //if both players have over 5000 points see who has more
                    if (this.scoreBoardScore1 > this.scoreBoardScore2) {
                        this.winner = oldInfo.player1;
                        this.setState({message: `${oldInfo.player1} wins!`});
                        newTurn = 0;
                    } else if (this.scoreBoardScore1 < this.scoreBoardScore2) {
                        this.winner = oldInfo.player2;
                        this.setState({message: 'You win!'});
                        newTurn = 0;
                    } 
                }
            } else if (this.scoreBoardScore1 > 4999) {
                this.winner = oldInfo.player1;
                this.setState({message: `${oldInfo.player1} wins!`});
                newTurn = 0;
            }
        } else if (this.scoreBoardScore1 > 4999) {
            this.setState({message: 'Player 2 gets one more chance!'})
        }
        return newTurn;
    }

    scorePass() {
        this.setState({playing: false, rollButtonOff: true, keepButtonOff: true})
        let oldInfo = this.props.location.state;
        console.log("here's the old info");
        console.log(oldInfo);
        let gameID = oldInfo.id;
        //Choose which score tracker array to use from constructor
        let scoreTrackerArray = [];
        let scoreTrackerUpdate1 = oldInfo.score1_tracker;
        let scoreTrackerUpdate2 = oldInfo.score2_tracker;
        let scoreUpdate1 = oldInfo.score1;
        let scoreUpdate2 = oldInfo.score2;
        //make score being submitted into a string
        let currentScoreString = this.score.toString();
        //Add current score string to correct score tracker array and join back into string
        //intentionally join them with a comma by leaving .join() blank
        if (oldInfo.turn === 1) {
            scoreTrackerArray = this.scoreTrackerOne;
            scoreTrackerArray.push(currentScoreString);
            scoreTrackerUpdate1 = scoreTrackerArray.join();
            scoreUpdate1 += this.score;
            this.setState({message: `Now it's ${oldInfo.player2}'s turn`})
        } else {
            scoreTrackerArray = this.scoreTrackerTwo;
            scoreTrackerArray.push(currentScoreString);
            scoreTrackerUpdate2 = scoreTrackerArray.join();
            scoreUpdate2 += this.score;
            this.setState({message: `Now it's ${oldInfo.player1}'s turn`})
        };
        
        //Moved turn deciding into the checkForWinner method
        let newTurn = oldInfo.turn;
        
        
        // Update scores for display and to check for winner
        this.scoreBoardScore1 = scoreUpdate1;
        this.scoreBoardScore2 = scoreUpdate2;
        //Update turn number to let other player go and also
        //Updates winner variable and add message if there is a winner
        //  and update turn to 0 
        newTurn = this.checkForWinner(oldInfo);
        console.log(this.state.message)
        //Authorization in player router
        let cookieToken = Cookies.get('token');
        //Build new fetch json to PUT changes to game info
        const scoreAndPass = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'authorization': `bearer:${cookieToken}` },
            body: JSON.stringify({ 
                id: gameID,
                player1: oldInfo.player1,
                player2: oldInfo.player2,
                turn: newTurn,
                score1: scoreUpdate1,
                score2: scoreUpdate2,
                score1_tracker: scoreTrackerUpdate1,
                score2_tracker: scoreTrackerUpdate2,
                winner: this.winner
            })
        };
        
        console.log("here's the new info")
        console.log(scoreAndPass.body)
        fetch('/games', scoreAndPass)
            .then(response => response.json())
            .then(data => console.log('game created', data.player2));
    }

    render() {
        let die = this.state.dice;
        let gameInfo = this.props.location.state;
        return (
            <div className='board'>
                
                <div  className='diceButtons'>
                    <h4>{this.state.message}</h4>
                    <button onClick={this.rollDice} disabled={this.state.rollButtonOff}>Roll!</button>
                    <button onClick={this.keepAndUpdateScore} disabled={this.state.keepButtonOff}>Keep Points</button>
                    <button onClick={this.scorePass} disabled={!this.state.playing}>Score and Pass</button>
                </div>
                <div className='diceBoard'>
                    <div onClick={() => this.select(0)}><Row className='row1' value={die[0].value} selected={die[0].selected} kept={die[0].kept}></Row></div>
                    <div onClick={() => this.select(1)}><Row className='row2' value={die[1].value} selected={die[1].selected} kept={die[1].kept}></Row></div>
                    <div onClick={() => this.select(2)}><Row className='row3' value={die[2].value} selected={die[2].selected} kept={die[2].kept}></Row></div>
                    <div onClick={() => this.select(3)}><Row className='row4' value={die[3].value} selected={die[3].selected} kept={die[3].kept}></Row></div>
                    <div onClick={() => this.select(4)}><Row className='row5' value={die[4].value} selected={die[4].selected} kept={die[4].kept}></Row></div>
                    <div onClick={() => this.select(5)}><Row className='row6' value={die[5].value} selected={die[5].selected} kept={die[5].kept}></Row></div>
                </div>
                <ScoreBoard scoreTrackerOne={this.scoreTrackerOne} scoreTrackerTwo={this.scoreTrackerTwo} points={this.state.points} score={this.score} player1={gameInfo.player1} player2={gameInfo.player2} score1={this.scoreBoardScore1} score2={this.scoreBoardScore2}/>
            </div>

        )
    }
}

export default Farkle