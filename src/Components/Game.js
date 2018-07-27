import React, {Component} from "react";
import Board from './Board';
import Timer from './Timer';

class Game extends Component {
    render() {
        return (
            <div>
                <Board/>
                <Timer/>
            </div>
        )
    }
}

export default Game;
