import React from "react";
import loginImg from "../../login.svg";

export class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            credentials: {username: '', password: ''}
        }
    }

    login = event => {
        fetch('http://127.0.0.1:8000/custom_auth/sign-in/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state.credentials)
        })
        .then( data => data.json())
        .then(
            data => {
                console.log(data);
            }
        )
        .catch(error => console.error(error))
    }

    onChange = event => {
        const cred = this.state.credentials;
        cred[event.target.name] = event.target.value;
        this.setState({credentials: cred});
    }

    render(){
        return (
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
                    <button className="btn" type="button" onClick={this.login}>Login</button>
                </div>
            </div>
        );
    }
}