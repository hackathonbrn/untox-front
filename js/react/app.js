import React, { Component } from 'react'
import { connect } from 'react-redux';
import { sendComment } from './reducer/comment/action'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Home from './pages/home'
import Comments from './pages/comments'

export default class App extends Component {
    
    render() {
        return (
            <Router>
                <div className="menu">
                    <Link to="/">Home</Link>
                    <Link to="/comments/">Comments</Link>
                </div>
                <div>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/comments" component={Comments} />
                </div>
            </Router>
        );
    }
}
