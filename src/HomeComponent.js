import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom'
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
      isLogOut : false
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

    render(){
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
        <img class= "home-logo-img" src={logo} alt="logo-img"/> 
        <div className = "leftAling">
          { window.sessionStorage.accessToken == ""   || window.sessionStorage.accessToken == undefined? <button type="button" class="home-header-btn" onClick={this.SignUpClick.bind(this)}>Sign Up</button>:<button type="button" class="home-header-btn" onClick={this.createTopicBtnClick.bind(this)}>Create Topic</button>}
          { window.sessionStorage.accessToken == "" || window.sessionStorage.accessToken == undefined? <button type="button" class="home-header-btn" onClick={this.LogInClick.bind(this)}>Log In</button>:<button type="button" class="home-header-btn" onClick={this.LogOutBtnClick.bind(this)}>Log Out</button>}
            </div>
        </div>
        <div class="home-main-container">
                <div class="home-content"></div>
            </div>
        </div>
        )}
    }



class HomeComponent extends Component {


    constructor(props) {
        super(props);
        this.state = {
          json: [],
          category : "all",
          update : false
        }
      }

    fetch(){
      if(this.state.category === "all")
      {
          axios.get('http://ec2-18-191-141-43.us-east-2.compute.amazonaws.com:9000/topics')
          .then((response) => {
            console.log('resonse is', response.data.topic)
            this.setState({
              json: response.data.topic
            });
          })
        }
      
      else
      {
          axios.get('http://ec2-18-191-141-43.us-east-2.compute.amazonaws.com:9000/categories/'+this.state.category)
          .then((response) => {
            console.log('resonse is', response.data.topic)
            this.setState({
              json: response.data.topic
            });
          })
        }
      }
      componentDidUpdate()
      {
        if(this.state.update)
        {
          this.setState({
            update : false
          })
          this.fetch()
        }
      }


    componentDidMount(){
        console.log('fetching...')
        this.fetch();
    }

    selectChange(e){
      this.setState(prevState => ({
        update : true,
        category : document.getElementById("cat").value
      }))
    }





 render (){
     const{json} = this.state
     return (
     <div>
         <HomeHeader></HomeHeader>
         <div class="home-main-container">
         Filter  :  
         <select class="home-select-tag" onChange = {this.selectChange.bind(this)}id="cat">
         <option value="all" >All</option>
                    <option value="discourse">Discourse</option>
                    <option value="videos">Videos</option>
                    <option value="movies">Movies</option>
                    <option value="tech">Tech</option>
         </select>
         </div>
         <TopicList
         json = {this.state.json}
         ></TopicList>
        </div>
 )
}
}



class TopicList extends Component{
  render()
  {
    const{json} = this.props;
    var items = json.map(data => <  TopicItem data = {data}
      />);
  return (
    <div>
        {items}
    </div>
  )
  }
}

class TopicItem extends Component{

  render()
  {
    const{data} = this.props;
    return(
      <div key={data.id}>
                   <div>
                      
                       <div class="home-main-container">
            <div class="home-sub-container">
                <div class="home-topic">
                    <div className="home-topic-description">
                    <Link to={"/topic/"+data.id}>{data.name}</Link></div>
                    <div class = "home-topic-footer">
                        {data.category == "discourse" && 
                        <div class= "home-topic-img home-topic-img-1"></div>}
                        {data.category == "tech" && 
                        <div class= "home-topic-img home-topic-img-2"></div>}
                        {data.category == "videos" && 
                        <div class= "home-topic-img home-topic-img-3"></div>}
                        {data.category == "elections" && 
                        <div class= "home-topic-img home-topic-img-4"></div>}
                        {data.category == "movies" && 
                        <div class= "home-topic-img home-topic-img-5"></div>}
                        <div class="home-topic-category">{data.category}</div>
                    </div>
                </div>
                <div class="home-topic-follower">
                {data.likedUserIcon.map(function(data1){
                    return(
                        <div>
                        <img class="home-follower-img-1" src={data1.url}/>
                        </div>                        
                    )})}
                     </div>
                 <div class="home-topic-data-1">
                    {data.likes}
                </div>
                <div class="home-topic-data-2">
                    {data.comments}
                </div>
                <div class="home-topic-data-3">
                    {data.createdAt.slice(8,10)+"/"+data.createdAt.slice(5,7)}
                </div>
                
            </div>
                <hr/>
                   </div>
                   </div>
      </div>
    )
  }
}









export default HomeComponent;