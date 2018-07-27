import React, {Component} from 'react';
import Tile from './Tile';
import WinChecker from './WinChecker';
import ee from './Emitter'
import API from './Api';

class Board extends Component {
    constructor() {
        super();
        this.state = {squares: Array(9).fill(null)};
        this.state.turn = 0;
        this.state.turn_value = 'O';
        this.state.winner = false;
        this.state.equality = false;
    }

    componentWillMount() {
        ee.addListener('next_player', (info) => {
            this.setIaTileValue();
            this.setState({turn_value: (this.state.turn % 2 === 0 ? 'X' : 'O')});
            this.setState({turn: this.state.turn + 1});
            if (!this.state.winner) {
                ee.emit('timer', 'start');
            }
        });
    }

    static checkIfWinner(board) {
        let checker = new WinChecker();
        return checker.determineWinner(board);
    }

    setTileState(tile_num) {
        if (this.state.winner) {
            return;
        }
        let squares = this.state.squares.slice();
        if (squares[tile_num] !== null) return;
        ee.emit('player_move', this.state.turn_value);

        this.setState({
            turn_value: (this.state.turn % 2 === 0 ? 'X' : 'O')
        });
        squares[tile_num] = this.state.turn_value;
        this.setState({
            squares: squares,
            turn: this.state.turn + 1,
            winner: Board.checkIfWinner(squares),
        }, () => {
            this.determineBestMove();
            if (this.state.winner) {
                ee.emit('timer', 'stop');
                ee.emit('chart', 'update');
                this.saveBoard();
            }
        });

    }

    saveBoard() {
        API.saveHistory(this.state.squares).then((resp) => {
            console.log(resp);
        });
    }

    determineBestMove() {
        let win_moove = false;
        let squares = this.state.squares.slice();
        for (let i = 0; i < this.state.squares.length; i++) {
            if (squares[i] === null) {
                squares[i] = this.state.turn_value;
                if (Board.checkIfWinner(squares)) {
                    console.log(squares);
                    win_moove = true;
                    return squares;
                }
                squares[i] = null;

                let opponent = (this.state.turn_value === 'X' ? 'O' : 'X');
                squares[i] = opponent;
                if (Board.checkIfWinner(squares)) {
                    console.log(squares);
                    squares[i] = this.state.turn_value;
                    win_moove = true;
                    return squares;
                }
                squares[i] = null;

            }
        }
        if (win_moove) {
            return squares;
        }
        else if (squares[4] === null) {
            squares[4] = this.state.turn_value;
            return squares;
        }
        else {
            for (let i = 0; i < squares.length; i++) {
                if (squares[i] === null) {
                    squares[i] = this.state.turn_value;
                    return squares;
                }
            }
        }
        return squares;
    }

    setIaTileValue() {
        if (this.state.winner) {
            return;
        }
        let squares = this.determineBestMove();
        this.setState({
            squares: squares,
            winner: Board.checkIfWinner(squares),
        }, () => {
            if (this.state.winner) {
                ee.emit('timer', 'stop');
            }
        });
    }

    startButtonDisplay(){
        // let button =

        if((this.state.squares.every((element)=>element === null))){
            return <button className='btn waves-effect waves-light blue-grey darken-4' onClick={() => {
                ee.emit('timer', 'start');
            }}>Start Game
            </button>
        }

    }

    resetBoard() {
        this.setState({
            squares: Array(9).fill(null),
            turn: 0,
            turn_value: 'O',
            winner: false,
            equality: false,
        });
        ee.emit('timer', 'reset');
    }

    render() {
        return (<div>
            <div className="chip" style={{marginTop: 1 + 'em'}}>
                Current Player: {this.state.turn_value}
            </div>
            <div className="grid">
                <Tile onClick={() => {
                    this.setTileState(0)
                }} state={this.state.squares[0]}/>
                <Tile onClick={() => {
                    this.setTileState(1)
                }} state={this.state.squares[1]}/>
                <Tile onClick={() => {
                    this.setTileState(2)
                }} state={this.state.squares[2]}/>
                <Tile onClick={() => {
                    this.setTileState(3)
                }} state={this.state.squares[3]}/>
                <Tile onClick={() => {
                    this.setTileState(4)
                }} state={this.state.squares[4]}/>
                <Tile onClick={() => {
                    this.setTileState(5)
                }} state={this.state.squares[5]}/>
                <Tile onClick={() => {
                    this.setTileState(6)
                }} state={this.state.squares[6]}/>
                <Tile onClick={() => {
                    this.setTileState(7)
                }} state={this.state.squares[7]}/>
                <Tile onClick={() => {
                    this.setTileState(8)
                }} state={this.state.squares[8]}/>
            </div>
            <button className='btn waves-effect waves-light blue-grey darken-4' onClick={() => {
                this.resetBoard()
            }}>Reset Game
            </button>
            {this.startButtonDisplay()}
            {/*<button className='btn waves-effect waves-light blue-grey darken-4' onClick={() => {*/}
            {/*this.saveBoard()*/}
            {/*}}>Save Game</button>*/}
            <h3>{this.state.winner}</h3>
        </div>)
    }
}

export default Board;
