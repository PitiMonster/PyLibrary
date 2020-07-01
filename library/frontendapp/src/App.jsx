import React from "react";
import "./App.scss";
import {
   Login, Register 
  } from "./assets/components/Auth/Index";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {Home} from './assets/components/Home/Home'

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
              </Switch>
            </Router>
      </div>
    </div>
  );
}

export default App;