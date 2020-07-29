import React from 'react'
import Cookies from 'js-cookie'

class PlayerPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: Cookies.get('username'),
            player: '',
            gameList: []
        }
    }

    componentDidMount() {
        fetch(`/players/${this.state.username}`)
            // .then(res => {
            //     // console.log('res', res);
            //     return res.json()
            // })
            .then(playerName => { 
                console.log(playerName); 
                this.setState({ player: playerName.username })
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

    render() {
        return (
            <div className="App">
                <h2>Player: {this.state.player}</h2>
                <ul>
                    {this.state.gameList.map(game =>
                    <li key={game.id}>player1: {game.player1_id} player2: {game.player2_id}</li>)}
                </ul>
            </div>
        )
    }
}

export default PlayerPage