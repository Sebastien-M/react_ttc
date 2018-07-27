import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ee from './Emitter'


const TIMER = 5000;
const SECOND = 1000;

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.time = TIMER;
        this.state.interval = null;
        // this.state.timer = this.start();
        this.state.timer = null;
    }

    componentWillMount() {
        ee.addListener('player_move', (player) => {
            this.reset();
            this.start();
        });
        ee.addListener('timer', (action) => {
            if (action === 'stop') {
                this.stop();
            }
            else if (action === 'start') {
                this.start();
            }
            else if (action === 'reset') {
                this.reset();
            }
        });
    }

    componentWillUnmount() {

    }

    start() {
        if (this.state.timer) {
            this.setState({timer: null});
            this.reset();
        }
        let interval = setInterval(() => {
            this.setState({time: this.state.time - 100});
            if (this.state.time <= 0) {
                this.stop(this.state.timer);
                ee.emit('next_player', 'next');
                // this.start();
            }
        }, 100);
        this.setState({timer: interval});
        return interval;
    }

    stop() {
        clearInterval(this.state.timer);
    }

    reset() {
        this.stop();
        this.setState({time: TIMER});
    }

    render() {
        return (
            <div>
                <p>{(this.state.time / SECOND)}s</p>
                <span id='buttons' className='col-md-4'>
                </span>
            </div>
        )
    }
}

export default Timer