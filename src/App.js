import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Board from './components/board';
import HeaderBar from './components/header';
import Statistics from './components/statistics';
import RecentGames from './components/recentGames';
import About from './components/about'

function App() {
    return (
        <Router>
        <div className="App">
            <HeaderBar />
            <Route path="/games/:id" component={Board} />
            <Route path="/statistics" component={Statistics} />
            <Route path="/" exact={true} component={RecentGames} />
            <Route path="/about" component={About} />
        </div>
        </Router>
    );
}

export default App;
