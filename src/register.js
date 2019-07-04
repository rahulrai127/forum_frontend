import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom'
import './community.css';
import  { Redirect } from 'react-router-dom'
import './register.css';
import HomeHeader from './HomeHeader'





class Register extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
          isSignedUp: false,
          isCancled: false
        }
      }
    
      handleCancelClick(e){
        this.setState({ isCancled: true })
      }

    handleClick(e) {
        e.preventDefault();
        console.log(document.getElementById("username").value," ",document.getElementById("password").value," ",document.getElementById("email").value);
        if(document.getElementById("username").value == "" ||document.getElementById("password").value==" "||document.getElementById("email").value=="")
        {
            alert("please fill all the field to continue");
        }
        else{
        axios.post('http://ec2-18-191-141-43.us-east-2.compute.amazonaws.com:9000/users',
            {
                "user" : {
                             
                         "username" : document.getElementById("username").value,
                         "password" : document.getElementById("password").value,
                         "email" : document.getElementById("email").value
                }
            }
        )
      .then((response) => {
        console.log('resonse is', response.data)
        window.sessionStorage.accessToken = response.data.user.username;
        alert("you are registered and logged in")
        this.setState({ isSignedUp: true })
      })
    }     
        
    }
    render(){
        if (this.state.isSignedUp) {
            // redirect to home if signed up
            return <Redirect to = {{ pathname: "/" }} />;
        }
        if (this.state.isCancled) {
            // redirect to home if signed up
            return <Redirect to = {{ pathname: "/" }} />;
        }
        return (
          <div>
            <HomeHeader></HomeHeader>
          
            <div class="register-main-container">
            <div class="register-main-header">
            Register
            </div>
            <hr/>
            <div class="register-btn-collections">
                <button class="register-external-login-btn-1 register-external-login-btn"><div class = "register-external-name"><img class = "register-img" src="https://www.freeiconspng.com/uploads/facebook-f-logo-white-background-21.jpg"/>with Facebook</div></button>
                <button class="register-external-login-btn-2 register-external-login-btn"><div class = "register-external-name"><img class = "register-img" src="https://i.stack.imgur.com/22WR2.png"/>with Google</div></button>
                <button class="register-external-login-btn-3 register-external-login-btn"><div class = "register-external-name"><img class = "register-img" src="http://chittagongit.com/download/419235"/>with Github</div></button>
                <button class="register-external-login-btn-4 register-external-login-btn"><div class = "register-external-name"><img class = "register-img" src="https://s3.ap-southeast-1.amazonaws.com/images.deccanchronicle.com/dc-Cover-652ovhkibhg82kh6on274ihkn1-20180121012859.Medi.jpeg"/>with Twitter</div></button>
            </div>
            <hr/><br/>
            <div class="register-text">
            Email 
            </div>
            <input type="text" id="email"/> 
            <div class="register-info">Never shown to public</div>
            <br/>
            <div class="register-text">
            Username 
            </div>
            <input type="text" id="username"/>
            <div class="register-info">Unique, No space, Short</div>
            <br/>

            <div class="register-text">
            Name 
            </div>
            <input type="text" id="text"/>
            <div class="register-info">Your full name (optional)</div>
            <br/>

            <div class="register-text">
            Password 
            </div>
            <input type="password" id="password"/>
            <div class="register-info">at least 10 character</div>
            <br/>
            <hr/>
            
            <div class="register-btn-collections">
                    <button type='button' class="register-footer-login-btn " onClick={this.handleClick.bind(this)}><div class = "footer-login">Register</div></button>
                    <button class="register-footer-register-btn " onClick={this.handleCancelClick.bind(this)}><div class = "footer-resgister">Cancel</div></button>
            </div>
            
        </div>
        </div>
        )
    }
}

  export default Register;