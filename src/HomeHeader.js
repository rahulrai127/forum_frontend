import React, { Component } from 'react';
import './community.css';
import  { Redirect } from 'react-router-dom'
import './login.css';
import logo from './logo1.png';

class HomeHeader extends Component{

  constructor(props) {
    super(props);
    this.state = {
      isSignedUpClicked: false,
      isLoginClicked: false,
      isLoggedIn : false,
      isCreateTopic : false,
      isLogOut : false,
      isLogoClick : false
    }
  }
  SignUpClick(e){
    this.setState({isSignedUpClicked : true});
  }
  LogInClick(e){
    this.setState({isLoginClicked : true});
  }
  createTopicBtnClick(e){
    this.setState({isCreateTopic : true});
  }
  LogOutBtnClick(e){
    window.sessionStorage.accessToken = ""
    this.setState({isLogOut : true});
    
  }
  logoClick(e)
    {
        console.log("inside logo click")
        this.setState({
            isLogoClick : true
        })
    }

    render(){

        if (this.state.isLogoClick) {
            return <Redirect to = {{ pathname: "/" }} />;
        }
        if (this.state.isLogOut) {
          return <Redirect to = {{ pathname: "/" }} />;
      }
        if (this.state.isSignedUpClicked) {
            return <Redirect to = {{ pathname: "/register" }} />;
        }
        if (this.state.isLoginClicked) {
            return <Redirect to = {{ pathname: "/login" }} />;
        }
        if (this.state.isCreateTopic) {
            return <Redirect to = {{ pathname: "/new_topic" }} />;
        }
        return(
            <div>

        <div class="home-logo-container">
            
        </div>
        <div class="home-main-header">
        <img class= "home-logo-img" src={logo} alt="logo-img" onClick={this.logoClick.bind(this)}/> 
        <div className = "leftAling">
          { window.sessionStorage.accessToken == "" || window.sessionStorage.accessToken == undefined ? <button type="button" class="home-header-btn" onClick={this.SignUpClick.bind(this)}>Sign Up</button>:<button type="button" class="home-header-btn" onClick={this.createTopicBtnClick.bind(this)}>Create Topic</button>}
          { window.sessionStorage.accessToken == "" || window.sessionStorage.accessToken == undefined? <button type="button" class="home-header-btn" onClick={this.LogInClick.bind(this)}>Log In</button>:<button type="button" class="home-header-btn" onClick={this.LogOutBtnClick.bind(this)}>Log Out</button>}
            </div>
        </div>
        <div class="home-main-container">
                <div class="home-content"></div>
            </div>
          {console.log(!undefined)}
        </div>
        )}
    }


export default HomeHeader;