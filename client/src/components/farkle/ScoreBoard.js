import React from 'react'

class ScoreBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            player1: 'Player Name 1',
            player2: 'Player Name 2',
            score1: 0,
            score2: 0
            // selectedPoints: this.props.points,
            // keptPoints: this.props.score
        }
    }

    render() {
        return (
            <div className='App'>
                <div className='scoreBoard'>
                    <span className='messageBox'>{this.props.message}</span>
                    <span className='scoreBox'>
                        <p>{this.state.player1}: {this.state.score1}</p>
                        <p>{this.state.player2}: {this.state.score2}</p>
                    </span>
                    <span className='currentPoints'>
                        <p>Selected Points: {this.props.points}</p>
                        <p>Kept Points: {this.props.score}</p>
                    </span>
                </div>
            </div>
        )
    }
}

export default ScoreBoard