import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Modal from 'react-awesome-modal';  
import BarChart from './charts';
import './chart.css';

function getRandomArray(numItems) {
  // Create random array of objects
  let names = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let data = [];
  for(var i = 0; i < numItems; i++) {
    data.push({
      label: names[i],
      value: Math.round(20 + 80 * Math.random())
    });
  }
  return data;
}

function getRandomDateArray(numItems) {
  // Create random array of objects (with date)
  let data = [];
  let baseTime = new Date('2018-05-01T00:00:00').getTime();
  let dayMs = 24 * 60 * 60 * 1000;
  for(var i = 0; i < numItems; i++) {
    data.push({
      time: new Date(baseTime + i * dayMs),
      value: Math.round(20 + 80 * Math.random())
    });
  }
  return data;
}

function getData() {
  let data = [];

  data.push({
    title: 'Visits',
    data: getRandomDateArray(150)
  });

  data.push({
    title: 'Categories',
    data: getRandomArray(20)
  });

  data.push({
    title: 'Categories',
    data: getRandomArray(10)
  });

  data.push({
    title: 'Data 4',
    data: getRandomArray(6)
  });

  return data;
}

const theData = [{
  title: "Visits",
  data: [
    { label: 'A', value: 74 },
    { label: 'B', value: 70 },
    { label: 'C', value: 42 },
    { label: 'D', value: 89 },
    { label: 'E', value: 84 }
  ]
},
{title: "Visits",
data: [
  { label: 'A', value: 74 },
  { label: 'B', value: 70 },
  { label: 'C', value: 42 },
  { label: 'D', value: 89 },
  { label: 'E', value: 84 }
]},
{title: "Visits",
  data: [
    { label: 'A', value: 74 },
    { label: 'B', value: 70 },
    { label: 'C', value: 100 },
    { label: 'D', value: 89 },
    { label: 'E', value: 84 }
  ]}

]

export default class Statistics extends Component {
  constructor(props) {
    
    super(props);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onChangeResponse = this.onChangeResponse.bind(this);

    this.state = {
      movesmade: '',
      refutation: '',
      ongoing: '1',
      whatever: 'Not it mane',
      ai: '',
      player: '',
      data: theData
    }
  }

  onChangeInput(e) {
    this.setState({
      input: e.target.value
    })
  }

  onChangeResponse(e) {
    this.setState({
      response: e.target.value
    })
  }


  render() {
    return (

        <section>
                    <Link to="" className="nav-link" > Statistics </Link>
            {/* <BarChart
              data={this.state.data[2].data}
              title={this.state.data[2].title}
              color="#B08EA2"
            /> */}
                </section>
               
    )
  }
}