import React from "react";
import loginImg from "../../../../library.png";
import CONFIG from '../../../config'
import store from 'store';
import { Link } from 'react-router-dom'
import isLoggedIn from '../../../helpers/is_logged_in'

export class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            credentials: {username: '', password: ''}, 
            error: false, 
        }
    }

    login = event => {

        const { history } = this.props;
        store.set('loggedIn', false);
        fetch(CONFIG.server+'/custom_auth/sign-in/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state.credentials)
        })
        .then(data => {
            if(!data.ok) { throw data } // if got any exception from server
            
            return data.json();
        }
        )
        .then(
            (data) =>
            {
                store.set('loggedIn', true); // this user is loggedIn 
                store.set('token', data.token);
                console.log(store.get('token'));
                history.push({
                    pathname: '/home',
                    token: data.token,
                }); // redirect to /home
        
            })
        .catch(
        (error) => {
            this.setState({ error: true });
            console.log(error);
        });
    }

    onChange = event => {
        const cred = this.state.credentials;
        cred[event.target.name] = event.target.value;
        this.setState({credentials: cred});
    }

    render(){

        const err = this.state.error;
        let error_message; 
        if (err) { 
            error_message = <div className="error-message">Wrong username/password!</div>
        } else {
            error_message = <div></div>
        }
        // if (store.get('loggedIn') == true) {
        //     return <Redirect to="/logged" />
        // }
        return (
            <div className="login">
                <div className="base-container">
                    <div className="header">Login</div>
                    <div className="content">
                        <div className="image">
                            <img src={loginImg} alt=""/>
                        </div>
                        <div className="form">
                            <div className="form-group">
                                <label htmlFor="email">Username</label>
                                <input
                                    type="email"
                                    name="username"
                                    placeholder="Email"
                                    value={this.state.credentials.username}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={this.state.credentials.password}
                                    onChange={this.onChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="footer">
                        {/* <button className="button-inline" type="button" onClick={this.login}>Login</button>
                        <Link to='/register'>
                            <button className="button-inline" type="button">Register</button>
                        </Link> */}
                        <button className="btn" type="button" onClick={this.login}>Login</button>

                        <div className="sign">
                            <div type='text'>Don't have an account?</div>
                            <Link to='/register'>
                                <div type='link'>Sign up!</div>
                            </Link>
                        </div>
                        
                    </div>
                    {error_message}
                </div>
            </div>   
        );
    }
}