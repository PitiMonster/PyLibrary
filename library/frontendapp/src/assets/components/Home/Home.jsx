import React from 'react';
import isLoggedIn from '../../helpers/is_logged_in';
import { Redirect, Route, Link } from 'react-router-dom';
import { Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import CONFIG from '../../config';
import store from 'store';
import Table from '../Table/Table';
import './Home.scss';
import BorrowingInfo from '../BookInfo/BorrowingInfo'
export class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            token: null,
            history: null,
        }
    }

    componentWillReceiveProps (props) {
        this.getBooks();
    }


    componentDidMount() {
        this.getBooks(); 
      }

    getBooks = () => {
        const token = store.get('token');
        this.setState({token: token});   
        
        const { history } = this.props;
        this.setState({history: history})
        
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
    handleLogout = () => {  
        store.remove('loggedIn');
        store.remove('token');
        this.state.history.push('/login');
    };

    setVisible = (visible) => {
        this.setState({visible : visible})
    }
    render() {
        if(!isLoggedIn()) {
            return <Redirect to="/login" />
        }
        
        return (

            <div className="base-container">

                <Table books={this.state.books} headers={['Title', 'author', 'return date']} history={this.state.history}/>
                <button className="btn-logout" onClick={this.handleLogout}>Logout</button>
                <Route path="/home/borrowings/:borrwingId" component={BorrowingInfo} />

            </div>    
        )};

}