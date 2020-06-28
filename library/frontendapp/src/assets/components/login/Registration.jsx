import React from "react";
import loginImg from "../../../login.svg";
import CONFIG from '../../config'

export class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            credentials: {
                username: '',
                email: '',
                password1: '',
                password2: ''
            }
        }
    }

    register = event => {
        fetch(CONFIG.server+'/custom_auth/sign-up/', { 
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state.credentials)
        }).catch(error => console.error(error))
    }

    inputChanged = event => {
        const cred = this.state.credentials;
        cred[event.target.name] = event.target.value;
        this.setState({credentials: cred});
    }

    render(){
        return (
            <div className="base-container">
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
                    <button className="btn" type="button" onClick={this.register}>Register</button>
                </div>
            </div>
        );
    }
}