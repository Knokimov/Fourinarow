import React, { Component } from 'react';
import BarChart from './barChart';
import DoughnutChart from './doughnutChart';
import LineChart from './lineChart';
import dataTransformation from './dataTransformation';


export default class Statistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            barChart1: [],
            doughnutChart1: [],
            doughnutChart2: [],
            lineChart1: [],
            lineLabels: new dataTransformation().lineChartLabels(),
            finishedGames: ""
        }
    }

    async componentDidMount() {
        const url = 'http://localhost:5000/games/';
        const response = await fetch(url);
        const data = await response.json();
        const last50 = data.slice(-50);
        this.setState({
            barChart1: new dataTransformation().barChart(data),
            doughnutChart1: new dataTransformation().doughnutChart(last50),
            doughnutChart2: new dataTransformation().doughnutChart2(last50),
            lineChart1: new dataTransformation().lineChart(last50),
            finishedGames: new dataTransformation().finsishedGames(data),
            movesmade: data.movesmade,
            ai: data.ai,
            player: data.player});
    }

    render() {
         return (
            <section>
                <h1> Amount of finished games: {this.state.finishedGames} </h1>
                <BarChart title = "First moves" chartData = {this.state.barChart1} ></BarChart>
                <DoughnutChart title = "Players color preference" chartData = {this.state.doughnutChart1} ></DoughnutChart>
                <DoughnutChart title = "Winning percentage by color" chartData = {this.state.doughnutChart2} ></DoughnutChart>
                <LineChart title = "Ai valuation" lineLabels = {this.state.lineLabels} chartData = {this.state.lineChart1} ></LineChart>
            </section>  
        )
    }
}