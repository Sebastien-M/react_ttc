import React, {Component} from 'react';

class Tile extends Component {
    render() {
        return (
            <div className="cell" onClick={this.props.onClick}>{this.props.state}</div>
        )
    }
}

export default Tile;
