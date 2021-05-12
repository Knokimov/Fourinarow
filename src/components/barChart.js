import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';

export default class BarChart extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data1: {
              }
        } 
    }

    render() {
       return (
            <div>
                <h2> {this.props.title} </h2>
                <Bar
                    data={{
                        labels: ['Column 1', 'Column 2', 'Column 3', 'Column 4', 'Column 5', 'Column 6', 'Column 7'],
                        datasets: [
                          {
                            label: 'Popular First Moves',
                            backgroundColor: 'rgba(53,58,64,255)',
                            borderColor: 'rgba(53,58,64,255)',
                            borderWidth: 1,
                            hoverBackgroundColor: 'rgba(22,139,255,255)',
                            hoverBorderColor: 'rgba(22,139,255,255)',
                            data: this.props.chartData
                          }
                        ]
                      }}
                    width={100}
                    height={100}
                    options={{
                    maintainAspectRatio: false
                    }}
                />
        </div>
        )
    }
}