import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';

export default class LineChart extends Component{
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
                <Line
                    data={{
                        labels: this.props.lineLabels,
                        datasets: [
                          {
                            label: 'Ai valuation',
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