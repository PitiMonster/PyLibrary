// external imports
import React from "react";
import { Link } from 'react-router-dom'

// internal imports
import loginImg from "../../../../library.png";
import CONFIG from '../../../config'

export class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            credentials: {
                username: '',
                email: '',
                password1: '',
                password2: ''
            },
            error: false,
        }
    }

    register = () => {

        const { history } = this.props;

        fetch(CONFIG.server+'/custom_auth/sign-up/', { 
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state.credentials)
        })
        .then( data => {
            console.log(data.status);
            if (data.status !== 201) {
                throw data
            }
            history.push('/login') // redirect to login page after successful register
        })
        .catch(error => {            
            this.setState({error: true})
            console.error(error)
        })
    }

    inputChanged = event => {
        const cred = this.state.credentials;
        cred[event.target.name] = event.target.value;
        this.setState({credentials: cred});
    }

    displayErrorMess = () => {
        const err = this.state.error;
    }

    handleOnSubmit = e => {
        e.preventDefault();
        this.register();
    }

    render(){
        const err = this.state.error
        let error_message
        if (err) {
            error_message = <div className="error-message">Wrong data provided!</div>;
        }
        else {
            error_message = <div></div>;
        }


        return (
            <form onSubmit={this.handleOnSubmit}>
                <div className="login">
                    <div className="base-container">
                        <div className="register">
                            <div className="header">Register</div>
                            <div className="content">
                                <div className="image">
                                    <img src={loginImg} alt=""/>
                                </div>
                                <div className="form">
                                    <div className="form-group">
                                        <label htmlFor="username">Username</label>
                                        <input 
                                            type="text" 
                                            name="username" 
                                            placeholder="Username" 
                                            value={this.state.credentials.username}
                                            onChange={this.inputChanged}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input 
                                            type="email" 
                                            name="email" 
                                            placeholder="Email" 
                                            value={this.state.credentials.email}
                                            onChange={this.inputChanged}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password1">Password</label>
                                        <input 
                                            type="password" 
                                            name="password1" 
                                            placeholder="Password" 
                                            value={this.state.credentials.password1}
                                            onChange={this.inputChanged}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password2">Password confirmation</label>
                                        <input 
                                            type="password"
                                            name="password2"
                                            placeholder="Password" 
                                            value={this.state.credentials.password2}
                                            onChange={this.inputChanged}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="footer"> 

                                <button className="btn" type="submit">Register</button>

                                <div className="sign">
                                    <div type='text'>Already registered?</div>
                                    <Link to='/login'>
                                        <div type='link'>Sign in!</div>
                                    </Link>
                                </div>
                                
                                {error_message}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}