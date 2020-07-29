import React from 'react'
import Cookies from 'js-cookie'
import './playerPage.css'

class PlayerPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: Cookies.get('username'),
            player: '',
            modalDisplay: 'none',
            gameList: [],
            playerList: []
        }
    }

    componentDidMount() {
        fetch(`/players/${this.state.username}`)
            .then(res => {
                console.log('res', res);
                return res.json()
            })
            .then(playerName => { 
                console.log(playerName); 
                this.setState({ player: playerName.username })
            });
        fetch(`/players`)
        .then(res => {
            console.log('res', res);
            return res.json()
        })
        .then(players => { 
            let playerList = players.filter(name => name !== this.state.username)
            console.log('playerlist ', players, playerList); 
            this.setState({ playerList: playerList })
        });
        fetch(`/games/${this.state.username}`)
            .then(res => {
                return res.json()
            })
            .then(games => {
                console.log('games', games);
                this.setState({ gameList: games })
            })
    }

    invitePlayer = (opponent) => {
        const newGameRequest = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                player1: this.state.username,
                player2: opponent,
                turn: 1,
                score1: 0,
                score2: 0,
                score1_tracker: '0',
                score2_tracker: '0'
            })
        };
        fetch('/games', newGameRequest)
            .then(response => response.json())
            .then(data => console.log('game created', data.id));
    }

    displayPlayers = () => {
        this.state.modalDisplay === 'none' ? this.setState({modalDisplay: 'block'}) : this.setState({modalDisplay: 'none'});
        console.log("displaying players", this.state.modalDisplay);
        // let modal = document.getElementById('id01').style.display;
        // modal === "none" ? modal = "block" : modal = "none";
    }

    render() {
        // let modalStyle = this.modalDisplay;
        return (
            <div className="App">
                <h2>Player: {this.state.player}</h2>
                <button onClick={this.displayPlayers}>Create Game</button>
                <ul>
                    {this.state.gameList.map(game =>
                    <li key={game.id}>player1: {game.player1} player2: {game.player2}</li>
                    )}
                </ul>
                <div id="id01" className="modal" style={{display: this.state.modalDisplay}}>
                    <span onClick={this.displayPlayers} className="close" title="Close Modal">&times;</span>
                    <div className="modal-content">
                        <div className="container">
                            <ul>
                                {this.state.playerList.map(player =>
                                <li key={player.id}>Player: {player.username}
                                    <button onClick={() => {this.invitePlayer(player.username)}}>Invite</button>
                                </li>
                                )}
                            </ul>
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