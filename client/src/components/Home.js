import React from 'react'
import { Link } from 'react-router-dom'

class Home extends React.Component {
    state = {

    }
    render() {
        return (
            <div className="homeIntro">
                <h2>Welcome to Farkle!</h2>
                <h3>Sign up and log in to play the game.</h3>
                <h4><Link to='/farklerules'>Click here to learn the rules.</Link></h4>
            </div>
        )
    }
}

export default Home