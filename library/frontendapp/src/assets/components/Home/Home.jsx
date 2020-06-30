import React from 'react';
import isLoggedIn from '../../helpers/is_logged_in';
import { Redirect, Link } from 'react-router-dom';
import CONFIG from '../../config';
import store from 'store';
import Table from '../Table/Table';
import './Home.scss';

export class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            token: null,
        }
    }

    componentDidMount() {

        const token = store.get('token');
        this.setState({token: token});       
        
        fetch(CONFIG.server+'/library/borrowed/', {
            method: 'GET',
            headers: {'Content-Type': 'application/json',
                        'Authorization': 'Token ' + token},
        })
        .then(data => {
            if(!data.ok) { throw data } // if got any exception from server 
            return data.json()   
        })
        .then( data => {
            this.setState({books: data.content})

        })
        .catch( error => console.log(error))
      }

    handleLogout = event => {
        const { history } = this.props;
        store.remove('loggedIn');
        store.remove('token');
        history.push('/login');
    };


    render() {
        if(!isLoggedIn()) {
            return <Redirect to="/login" />
        }
        return (
            <div className="base-container">
                <Table books={this.state.books} headers={['Title', 'author', 'return date']}/>
                <button className="btn-logout" onClick={this.handleLogout}>Logout</button>
            </div>    
        )};

}