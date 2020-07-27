import React from 'react';

class Row extends React.Component {
    // constructor (props) {
    //     super(props);
    //     this.state = {
    //         value: Number(props.value),
    //         selected: props.selected,
    //         kept: props.kept
    //     }
    // }

    render() {
        let value = this.props.value;
        let selected = this.props.selected;
        let kept = this.props.kept;
        // console.log(value, selected, kept)
        let xRolledPosition = 0;
        let xKeptPosition = -64;
        let yPosition = -((value - 1) * 64);
        
        let selectedcolor = 'gray';
        let keptcolor = 'gray';
        // selected ? bordercolor = 'red' : bordercolor = 'gray';
        if (selected && !kept) {
            selectedcolor = 'red';
        } else if (selected && kept) {
            selectedcolor = 'gray';
            keptcolor = 'red';
            xRolledPosition = -64;
            xKeptPosition = 0;
        } else {
            selectedcolor = 'gray';
            keptcolor = 'gray';
            xRolledPosition = 0;
            xKeptPosition = -64;
        }
        let rolledPosition = `${xRolledPosition}px ${yPosition}px`;
        let keptPosition = `${xKeptPosition}px ${yPosition}px`;

        return (
            <div className='row'>
                <div className='rolled dice'
                    style={{backgroundPosition: rolledPosition, borderColor: selectedcolor}}>
                </div>
                <div className='kept dice' style={{backgroundPosition: keptPosition, borderColor: keptcolor}}>
                </div>
            </div>
        )
    }
}

export default Row