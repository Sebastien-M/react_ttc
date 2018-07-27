import React, {Component} from 'react';
import logo from './logo.svg';
import Game from './Components/Game';
import Chart from './Components/Chart';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Tic Tac Toe</h1>
                </header>
                <Game/>
                <Chart/>
            </div>
        );
    }
}

export default App;
