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
            console.log('playerlist ', players); 
            this.setState({ playerList: players })
        });
        fetch(`/games/all`)
            .then(res => {
                return res.json()
            })
            .then(games => {
                console.log('games', games);
                this.setState({ gameList: games})
            })
    }

    createGame = () => {
        // this.displayPlayers();
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
                    <li key={game.id}>player1: {game.player1} player2: {game.player2}</li>)}
                </ul>
                <div id="id01" className="modal" style={{display: this.state.modalDisplay}}>
                    <span onClick={this.displayPlayers} className="close" title="Close Modal">&times;</span>
                    <div className="modal-content">
                        <div className="container">
                            <ul>
                                {this.state.playerList.map(player =>
                                <li key={player.id}>player1: {player.username} <button>Invite</button></li>)}
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