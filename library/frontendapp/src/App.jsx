// external imports
import React from "react";
import store from 'store'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// internal imports
import "./App.scss";
import {Home} from './assets/components/Home/Home'
import {
        Login, Register
    } from "./assets/components/Auth/Index";
import Search from './assets/components/Search/Search'


function App() {
  // calculate stuff
  return (
    <div className="App">
      <div className='App-body'>      
            <Router>
              <Switch>
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <Route path='/register' component={Register} />
                <Route path='/search/:searchType/:searchKey' component={Search} />
              </Switch>
            </Router>
      </div>
    </div>
  );
}

export default App;