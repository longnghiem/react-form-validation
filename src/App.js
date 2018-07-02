import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Redirect,
  Prompt,
  Switch} from 'react-router-dom';
import InfoComponent from './components/InfoComponent'
import Skills from './components/Skills'
import Portfolio from './components/Portfolio'


class App extends Component {
  constructor(){
    super()
    this.state = {
      info:{},
      skills:{
        otherDisciplines: [],
        location: [],
        primaryDisciplines:''
      }
    }
  }

  submit = (newData, list) => {
    this.setState({
      [list]: newData
    },()=>{console.log(this.state);})
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <header>
              <h1>Let's talk</h1>
              <p>Think you have what it takes? Show us.</p>
              <ul className='navBar'>
                <li><NavLink exact to="">Info</NavLink></li>
                <li><NavLink exact to="/skills">Skills</NavLink></li>
                <li><NavLink exact to="/portfolio">Portfolio</NavLink></li>
              </ul>
            </header>
            <Switch>
              <Route exact path="/" render = {(props)=>{
                  return <InfoComponent {...props} submit={this.submit}/>
                }}/>
              <Route exact path="/skills" render = {(props)=>{
                  return <Skills {...props} submit={this.submit}/>
                }}/>
              <Route exact path="/portfolio" component={Portfolio}/>
            </Switch>
          </div>
        </Router>

      </div>
    );
  }
}

export default App;
