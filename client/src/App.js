import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Login from './components/forms/Login';
import Signup from './components/forms/Signup';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
    <Router>
 
    <NavBar />
<Switch>
    <Route exact path='/login' component={Login}/>
    <Route exact path='/signup' component={Signup}/>
   
    </Switch>
  

    
  
    
    </Router>
  
   
    </div>
  );
}

export default App;
