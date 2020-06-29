import React from 'react';
import isLoggedIn from '../../helpers/is_logged_in';
import { Redirect, Link } from 'react-router-dom';
import CONFIG from '../../config';
import store from 'store';

export class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            token: null,
        }
    }

    componentDidMount(){

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
            console.log(data)
            this.setState({books: data.content})
            console.log(this.state.books)

            // this.mapBooks();
        })
        .catch( error => console.log(error))
      }

    mapBooks = () => {
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
        {this.state.books.map((book, index) => {
            console.log(book.title)
            return <React.Fragment key={index}>
                <div className="book">{book.title}</div>
            </React.Fragment>
        })}
    }

    // {this.state.visibleCountries.map((country, index) => { 
    //     return <React.Fragment key = {index}>
    //         {countryCard({
    //         imgSrc: country.flag, 
    //         name: country.name,
    //         population: country.population,
    //         buttonText: "View",
    //         callback: null
    //     })}

    
    

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
                
                <button className="btn" onClick={this.handleLogout}>Logout</button>

                {console.log(this.state.data)}
                {this.state.books.map((book, index) => {
                    console.log('xdddd')
                    console.log(book.book.title);
                    return <React.Fragment key={index}>
                        <div className="book">{book.book.title}</div>
                    </React.Fragment>
                })}
            </div>    
        )};

}