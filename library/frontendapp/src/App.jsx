import React from "react";
import "./App.scss";
import {
   Login, Register 
  } from "./assets/components/login/Index";

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
      <header className="App-header">
      <Router>
        <Switch>
          <Route path="/logged" component={Home} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
      </header>
    </div>
  );
}

export default App;

