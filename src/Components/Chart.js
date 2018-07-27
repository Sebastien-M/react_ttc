import React, {Component} from 'react';
import {Doughnut} from 'react-chartjs-2';
import WinChecker from './WinChecker';
import Api from './Api';
import ee from './Emitter';

class Chart extends Component {
    constructor() {
        super();
        this.state = {chart_data: {}}
    }

    componentWillMount() {
        this.getChartData();
        ee.addListener('chart',(action)=>{
            if(action === 'update'){
                this.getChartData();
            }
        })
    }

    getChartData(){
        let api_data = Api.getHistory();
        api_data.then((data) => {
            api_data = data.data;
            this.setState({chart_data: api_data});
        });
    }

    loadChartData() {
        let data_value = this.countWinners(this.state.chart_data);
        let labels = ["X", "O", "Draw"];
        return {
            labels: labels,
            title: {
                text: "Chart Title",
            },
            datasets: [{
                label: "My First dataset",
                // backgroundColor: Chart.generateColorForLabels(labels),
                backgroundColor: ['#ff940a', '#0f77af', '#4c4c4c'],
                data: data_value
            }],
            options: {
                title: {
                    display: true,
                    text: 'Custom Chart Title',
                    position: 'top'
                }
            }
        };
    }

    countWinners(data) {
        let cross = 0;
        let circle = 0;
        let draw = 0;
        let winner = null;
        let win_checker = new WinChecker();

        for (let i = 0; i < data.length; i++) {
            let board = JSON.parse(data[i].history);
            winner = win_checker.determineWinner(board);
            if (winner.includes('X')) {
                cross++;
            }
            else if (winner.includes('O')) {
                circle++;
            }
            else {
                draw++;
            }
        }
        return [cross, circle, draw]
    }

    static generateColorForLabels(labels) {
        let colors = [];
        for (let i = 0; i < labels.length; i++) {
            colors.push(Chart.generateHexaColor())
        }
        return colors;
    }

    static generateHexaColor() {
        return '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
    }

    render() {
        return (
            <div>
                <ul className="collapsible container">
                    <li>
                        <div className="collapsible-header"><i className="medium material-icons">pie_chart</i>Stats
                        </div>
                        <div className='collapsible-body'>
                            <Doughnut data={this.loadChartData()}/>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }


}

export default Chart;