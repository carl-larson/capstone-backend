import React from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'


import '../App.css'

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topNavButtons: 'none',
            username: Cookies.get('username')
        }
    }
    // const [ playButtons, setPlayButtons ] = useState('none'); 
    // const [ topNavButtons, setTopNavButtons ] = useState('none'); 
    displayTopNav = () => {
        console.log('clicked');
        if (this.state.topNavButtons === 'none') {
            this.setState({topNavButtons: 'block'});
        } else if (this.state.topNavButtons === 'block') {
            this.setState({topNavButtons: 'none'});
        }
    }
    
    logout = () => {
        console.log("logging out");
        Cookies.remove('username');
        Cookies.remove('token');
        this.setState({username: null});
    }
    
    render() {
        let authButtons;
        let isLoggedIn = false;
        if (this.state.username) {
            isLoggedIn = true;
        } else {
            isLoggedIn = false;
        }
        if (isLoggedIn === true) {
            authButtons = 
            <div className="loginButtons">
                <span className="navButton" onClick={this.logout}>Log Out</span>
                <span><h3>{this.state.username}</h3></span>
            </div>
        } else {
            authButtons = 
            <div className="loginButtons">
                <span className="navButton"><Link className="navButtonLink" to="/login">Log In</Link></span>
                <span className="navButton"><Link className="navButtonLink" to="/signup">Sign Up</Link></span>
            </div>
        }
    

        return (
            <div className="Header">
                <span className="menuButton" onClick={this.displayTopNav}></span>
                <h1>Farkle!</h1>
                {authButtons}
                <div className='topNav' style={{display: this.state.topNavButtons}}>
                    <span className="navButton"><Link className="navButtonLink" to="/">Home</Link></span>
                    <span className="navButton"><Link className="navButtonLink" to="/farkle">Farkle</Link></span>
                    <span className="navButton"><Link className="navButtonLink" to="/farklerules">How to Play</Link></span>
                    <span className="navButton"><Link className="navButtonLink" to="/playerpage">Players</Link></span>
                </div>
            </div>
        )
    }
}

export default Navigation