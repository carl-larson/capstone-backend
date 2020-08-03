import React from 'react'

class ScreenBorder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: []
        }
    }
    componentDidMount() {
        let screenWidth = window.innerWidth;
        let borderCount = Math.floor(screenWidth / 64);
        // let greenSquare = <div className="greenSquare" />
        let tempArray = [];
        
        for (let i = 0; i < borderCount; i++) {
            tempArray.push(i)
        }
        this.setState({array: tempArray})
        // return borderReturn;
    }

    render() {
        return (
            <div className="greenSquareRow">{this.state.array.map(square => {
                return <div className="greenSquare" />
            })}</div>
        )
    }
    
}

export default ScreenBorder