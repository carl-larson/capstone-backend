import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import '../App.css'

const Navigation = () => {
    const [ playButtons, setPlayButtons ] = useState('none'); 
    const [ topNavButtons, setTopNavButtons ] = useState('none'); 
    const displayTopNav = () => {
        console.log('clicked')
        if (topNavButtons === 'none') {
            setTopNavButtons('block');
        } else if (topNavButtons === 'block') {
            setTopNavButtons('none');
        }
    }
    const displayButtons = () => {
        if (playButtons === 'none') {
            setPlayButtons('block');
        } else if (playButtons === 'block') {
            setPlayButtons('none');
        }
    }

    return (
        <div className="Header">
            <span className="menuButton" onClick={displayTopNav}></span>
            <h1>Farkle!</h1>
            <div className='topNav' style={{display: topNavButtons}}>
                <span className="navButton"><Link className="navButtonLink" to="/">Home</Link></span>
                <span className="navButton"><Link className="navButtonLink" to="/login">Log In</Link></span>
                <span className="navButton"><Link className="navButtonLink" to="/signup">Sign Up</Link></span>
                <span className="navButton" onClick={displayButtons}>Play a Game</span>
            </div>
            <div className="playButtons" style={{display: playButtons}}>
                <span className="navButton"><Link className="navButtonLink" to="/farkle">Farkle</Link></span>
                <span className="navButton"><Link className="navButtonLink" to="/playerpage">Players</Link></span>
            </div>
        </div>
    )
}

export default Navigation