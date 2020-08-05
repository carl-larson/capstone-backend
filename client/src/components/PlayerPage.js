import React from 'react'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'

import './playerPage.css'

class PlayerPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: Cookies.get('username'),
            player: Cookies.get('username'),
            modalDisplay: 'none',
            gameList: [],
            playerList: []
        }
    }

    componentDidMount() {
        // fetch(`/players/${this.state.username}`)
        //     .then(res => {
        //         console.log('res', res);
        //         return res.json()
        //     })
        //     .then(playerName => { 
        //         console.log(playerName); 
        //         this.setState({ player: playerName.username })
        //     });
        fetch(`/players`)
        .then(res => {
            console.log('res', res);
            return res.json()
        })
        .then(players => { 
            let playerList = players.filter(name => name !== this.state.username)
            console.log('playerlist ', players, playerList); 
            this.setState({ playerList: playerList })
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        fetch(`/games/${this.state.username}`)
            .then(res => {
                return res.json()
            })
            .then(games => {
                console.log('games', games);
                this.setState({ gameList: games })
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    invitePlayer = (opponent) => {
        let cookieToken = Cookies.get('token')
        console.log(cookieToken)
        const newGameRequest = {
            method: 'POST',
            headers: { 'authorization': `bearer ${cookieToken}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                player1: this.state.username,
                player2: opponent,
                turn: 1,
                score1: 0,
                score2: 0,
                score1_tracker: '0',
                score2_tracker: '0',
                winner: null
            })
        };
        fetch('/games', newGameRequest)
            .then(response => response.json())
            .then(data => console.log('game created', data.player2));
        this.setState({modalDisplay: 'none'});
        fetch(`/games/${this.state.username}`)
            .then(res => {
                return res.json()
            })
            .then(games => {
                console.log('games', games);
                this.setState({ gameList: games })
            })
    }

    displayPlayers = () => {
        this.state.modalDisplay === 'none' ? this.setState({modalDisplay: 'block'}) : this.setState({modalDisplay: 'none'});
        // console.log("displaying players", this.state.modalDisplay);
        // let modal = document.getElementById('id01').style.display;
        // modal === "none" ? modal = "block" : modal = "none";
    }

    deleteGame = (gameId, index) => {
        let listGames = this.state.gameList;
        listGames.splice(index, 1);
        this.setState({gameList: listGames})

        let cookieToken = Cookies.get('token')
        // console.log(cookieToken)
        const deleteGameRequest = {
            method: 'DELETE',
            headers: { 'authorization': `bearer ${cookieToken}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                id: gameId
            })
        };
        fetch('/games', deleteGameRequest)
            .then(response => response.json())
            .then(data => console.log('deleted game: ', data.id));
        
    }

    render() {
        
        return (
            <div className="App">
                <div className = "mainDiv">
                    <h2>Player: {this.state.player}</h2>
                    <button className="createButton" onClick={this.displayPlayers}>Create Game</button>
                    <table className="playerTable">
                        <tbody>
                            <tr><th colSpan='5'>Your Games</th></tr>
                            <tr><th>Whose turn?</th><th>Player 1</th><th>Player 2</th><th>Winner!</th><th>Delete</th></tr>
                            {this.state.gameList.map((game, index) => {
                                let buttonDisplay = 'none';
                                let playerTurn = '';
                                let bgcolor = 'black';
                                if (game.turn === 1) {playerTurn = game.player1}
                                else if (game.turn === 2) {playerTurn = game.player2}
                                else {playerTurn = ''}
                                if (playerTurn === this.state.username) {buttonDisplay = 'inline-block'}
                                if (game.winner) {bgcolor = 'gray'}
                                    return (<tr key={index} style={{backgroundColor: bgcolor}}><td><button className="joinGameButton" style={{display: buttonDisplay}}><Link to={{pathname: '/farkle', state: {...game}}}>Your turn!</Link></button></td>
                                        <td>{game.player1}</td>
                                        <td>{game.player2}</td>
                                        <td>{game.winner}</td>
                                        <td onClick={() => this.deleteGame(game.id, index)}>♻</td>
                                    </tr>)
                                }
                            )}
                        </tbody>
                    </table>
                    <button className="playerDelete">Delete Player Account</button>
                </div>
                
                <div id="id01" className="modal" style={{display: this.state.modalDisplay}}>
                    
                    <div className="modal-content">
                        <div className="container">
                            <table className="opponentTable">
                                <tbody>
                                    <tr><th colSpan='2'>Choose an Opponent</th></tr>
                                    <tr><th>Player</th><th>Invite?</th></tr>
                                    {this.state.playerList.map(player =>
                                    <tr key={player.id}><td>{player.username}</td><td><button onClick={() => {this.invitePlayer(player.username)}}>Invite</button></td>
                                    </tr>
                                    )}
                                </tbody>
                            </table>
                            <span onClick={this.displayPlayers} className="close" title="Close Modal">&times;</span>
                        </div>
                        <div className="container" style={{backgroundColor: "#f1f1f1"}}>
                            <button type="button" onClick={this.displayPlayers} className="cancelbtn">Cancel</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default PlayerPage