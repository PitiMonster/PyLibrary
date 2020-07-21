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
import Borrowed from './assets/components/Borrowed/Borrowed'


function App() {
  // calculate stuff
  return (
    <div className="App">
      <div className='App-body'>   
            <Router>
              <Switch>
                
                {/* <Route path='/search' component={Search} />
                <Route path='/borrowed' component={Borrowed} /> */}

                <Route path="/login" component={Login} />
                <Route path='/register' component={Register} /> 
                <Route path="/" component={Home} />
              </Switch>
            </Router>
      </div>
    </div>
  );
}

export default App;