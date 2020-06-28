import React from 'react';
import isLoggedIn from '../../helpers/is_logged_in'
import { Redirect } from 'react-router-dom';


export class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            //TODO 
        }
    }

    render() {
        if(!isLoggedIn()) {
            return <Redirect to="/login" />
        }
        return (
        <div className="XD">ELO ELO 3 2 0 </div>
        )};

}