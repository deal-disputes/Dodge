import React from 'react';
import { provider, auth } from '../Constants/database';
import { Link } from 'react-router-dom';
import './Login.css';


class Login extends React.Component{
    componentWillMount(){
     this.authListener = auth.onAuthStateChanged(user => {
            if(user){
                this.props.history.push({
                    pathname: '/',
                    code: 3000
                });
            } 
         })
    }
    

    componentWillUnmount(){
        this.authListener && this.authListener();
    }
    
    login = (e) => {
        e.preventDefault()
        auth.signInWithPopup(provider).then(res => {
            }).catch(error => {
                console.log(error.message);
        })
    }
    render(){
        return (
            <div className="login-wrapper">
                <h1> Login to DODGEPH</h1>
                <form onSubmit={this.login}>
                <div className="upper-row">
                    <input type="text" name="username" placeholder="Username"/>
                    <input type="password" name="password" placeholder="Password"/>
                </div>
                <div className="middle-row">
                    <Link to="/password_recovery"> Forgot password? </Link>
                    <button>Sign in</button>
                    <div className="clear-both"></div>
                </div>
                <div className="bottom-row">
                    <div className="bottom-row-content">
                        <h3> Login with </h3>
                        <div className="provider-btn-wrapper">
                            <button id="google" className="provider-btn">Google+</button>
                        </div>
                        <div className="provider-btn-wrapper">
                            <button id="twitter" className="provider-btn">Twitter</button>
                        </div>
                        <div className="provider-btn-wrapper">
                            <button id="facebook" className="provider-btn">Facebook</button>
                        </div>
                    </div>
                </div>
                </form>
                <div className="sign-up-wrapper">
                    <div className="sign-up-content">
                    <div className="sign-up-texts">
                        <h3> Not a member? </h3>
                        <h3> Sign up </h3>
                    </div>
                        <button id="sign-up-btn">SIGN UP</button>
                    </div>
                </div>
                <div className="clear-both"></div>
            </div>
            )
    }
}




export default Login;