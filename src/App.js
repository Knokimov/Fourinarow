import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route} from "react-router-dom";
import SolverList from './components/solver';
import Board from './components/board';
import HeaderBar from './components/header'


function App() {
  return (
    <Router>
    <div className="App">
      <HeaderBar />
      <br/> 
      <Route path="/games/:id" component={Board} />
    </div>
    {/* <div class ="loader-wrapper">
      <span class = "loader"><span class = "loader-inner"></span></span>
    </div> */}

    </Router>
  );
}

export default App;
