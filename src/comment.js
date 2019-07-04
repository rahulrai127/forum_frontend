import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom'
import  { Redirect } from 'react-router-dom'
import './community.css';
import './newTopic.css';
import HomeHeader from './HomeHeader'

class Comment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          isCreated: false,
          isCancled: false
        }
      }
      CancelBtnClick(e){
        this.setState({isCancled : true});
      }
    CreateBtnClick(e){
        e.preventDefault();
        if(document.getElementById("myTextarea").value=="")
        {
            alert("please fill all the details to continue ")
        }
        else{
            axios.post('http://ec2-18-191-141-43.us-east-2.compute.amazonaws.com:9000/topics/'+this.props.match.params.topic_id+"/comments", {
                "comment" : {
                    "content": document.getElementById("myTextarea").value,
                }
            },{headers: {
                "Authorization" : window.sessionStorage.accessToken
              }
            }
            )
        .then((res) => {
            if(res.data == "please login to continue")
            {
                alert("please login to create a comment")
            }
            else if(res.data == "unauthorized")
            {
                alert("please logout and login again to create a comment")
            }
            else{
                alert("your comment is created successfully")
                this.setState({isCreated : true});
            }
            console.log(res)
        })
        .catch((error) => {
          console.error(error)
        })
        }
    }

    render() {

        if (this.state.isCreated) {
            return <Redirect to = {{ pathname: "/topic/"+this.props.match.params.topic_id }} />;
        }
        if (this.state.isCancled) {
            return <Redirect to = {{ pathname: "/topic/"+this.props.match.params.topic_id }} />;
        }
      return (
        <div>
            <HomeHeader></HomeHeader>
        
        <div class="new-topic-main-container">
            <div class="new-topic-main-header">
                Add a comment
            </div>
            <div class="new-topic-sub-container">
                <textarea id="myTextarea" class="new-topic-myTextarea" placeholder="Type here, use markdown,BB code or html to format." rows="40"></textarea>
                <button type="button"class="new-topic-add-btn" onClick={this.CreateBtnClick.bind(this)}> Add Comment</button>
                <button class="new-topic-cancel-btn" onClick={this.CancelBtnClick.bind(this)}>Cancel</button>
            </div>
        </div>
        </div>
      )
    }
  }

  export default Comment;  