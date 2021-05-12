import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';

export default class DoughnutChart extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data1: {
              }
        } 
    }

// Blue rgba(22,139,255,255)
// Black rgba(53,58,64,255)

    render() {
       return (
            <div>
                <h2> {this.props.title} </h2>
                <Doughnut
                    data={{
                        labels: ['Black', 'Blue'],
                        datasets: [
                          {
                            label: 'Popular First Moves',
                            backgroundColor: ["rgba(53,58,64,255)","rgba(22,139,255,255)"],
                            borderColor: ["rgba(53,58,64,255)","rgba(22,139,255,255)"],
                            borderWidth: 1,
                            hoverBackgroundColor: ["rgba(53,58,64,1)","rgba(22,139,255,1)"],
                            hoverBorderColor: ["rgba(53,58,64,1)","rgba(22,139,255,1)"],
                            data: this.props.chartData
                          }
                        ]
                      }}
                    width={100}
                    height={50}
                    options={{
                    maintainAspectRatio: false
                    }}
                />
        </div>
        )
    }
}