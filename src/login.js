import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom'
import  { Redirect } from 'react-router-dom'
import './community.css';
import './login.css';
import HomeHeader from './HomeHeader'

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          isLoggedIn: false,
          isCancled: false
        }
      }
      CancelBtnClick(e){
        this.setState({isCancled : true});
      }

    LoginBtnClick(e){
        console.log("i am here")
        e.preventDefault();
        var username =document.getElementById("username").value;
        var password =document.getElementById("password").value;
        if(document.getElementById("username").value== ""|| document.getElementById("password").value=="")
        {
            alert("please fill all the details to continue ")
        }
        else{
            axios.post('http://ec2-18-191-141-43.us-east-2.compute.amazonaws.com:9000/session', {
                "user" : {
                   "email" : document.getElementById("username").value,
                   "password" : document.getElementById("password").value
                }
        })
        .then((res) => {
            if(res.data == "either of email or password is incorrect")
            {
                alert("Invalid details....Please try again..!!!");
            }
            else{
            window.sessionStorage.accessToken = res.data.user.username;
            alert("you are successfully logged in")
            this.setState({isLoggedIn : true});
            console.log(res)
            }
            
        })
        .catch((error) => {
          console.error(error)
        })
        }
        
    }

    render() {
        if (this.state.isLoggedIn) {
            return <Redirect to = {{ pathname: "/" }} />;
        }
        if (this.state.isCancled) {
            return <Redirect to = {{ pathname: "/" }} />;
        }
        
      return (
        <div>
          <HomeHeader></HomeHeader>
        
        <div class="login-main-container">
            <div class="login-centre1">
            <div class="login-main-header">
            Log In
            </div>
            <hr/>
            <div class="login-btn-collections">
                <button class="login-external-login-btn-1 login-external-login-btn"><div class = "login-external-name"><img class="login-img" src="https://www.freeiconspng.com/uploads/facebook-f-logo-white-background-21.jpg"/>with Facebook</div></button>
                <button class="login-external-login-btn-2 login-external-login-btn"><div class = "login-external-name"><img class="login-img" src="https://i.stack.imgur.com/22WR2.png"/>with Google</div></button>
                <button class="login-external-login-btn-3 login-external-login-btn"><div class = "login-external-name"><img class="login-img" src="http://chittagongit.com/download/419235"/>with Github</div></button>
                <button class="login-external-login-btn-4 login-external-login-btn"><div class = "login-external-name"><img class="login-img" src="https://s3.ap-southeast-1.amazonaws.com/images.deccanchronicle.com/dc-Cover-652ovhkibhg82kh6on274ihkn1-20180121012859.Medi.jpeg"/>with Twitter</div></button>
                <button class="login-external-login-btn-5 login-external-login-btn"><div class = "login-external-name"><img class="login-img" src="https://cdn1.iconfinder.com/data/icons/education-set-01/512/email-open-512.png"/>with email</div></button>
            </div>
            <hr/><br/>
            Email <br/>
            <input type="text" id="username" required="required" placeholder="Email"/> 
            <br/>
            Password
            <input type="password" id="password" required="required" placeholder="Password"/>
            <div class="login-forgot-password">I forgot my password</div>
            <br/>
            <hr/>
            <div class="login-btn-collections">
                    <button type='button' class="login-footer-login-btn " onClick={this.LoginBtnClick.bind(this)}><div class = "login-footer-login">Log In</div></button>
                    <button type='button' class="login-footer-register-btn " onClick={this.CancelBtnClick.bind(this)}> <div class = "login-footer-resgister">Cancel</div></button>
            </div>
            </div>
        </div>
        </div>
      )
    }
  }

  export default Login;