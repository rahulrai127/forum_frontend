import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom'
import  { Redirect } from 'react-router-dom'
import './community.css';
import './newTopic.css';
import HomeHeader from './HomeHeader'

class UpdateComment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          isCreated: false,
          isCancled: false,
          json : [],
          contentValue : ''
        }
      }

      fetch(){
        axios.get('http://ec2-18-191-141-43.us-east-2.compute.amazonaws.com:9000/topics/'+this.props.match.params.topic_id+"/comments/"+this.props.match.params.comment_id)
      .then((response) => {
        this.setState({
          json: response.data.comment,
          contentValue : response.data.comment.content
        });
      })
    }


    componentDidMount(){
        this.fetch();
    }


      CancelBtnClick(e){
        this.setState({isCancled : true});
      }
    CreateBtnClick(e){
        console.log("i am here")
        e.preventDefault();
        if(document.getElementById("myTextarea").value=="")
        {
            alert("please fill all the details to continue ")
        }
        else{
            axios.patch('http://ec2-18-191-141-43.us-east-2.compute.amazonaws.com:9000/topics/'+this.props.match.params.topic_id+"/comments/"+this.props.match.params.comment_id, {
                "comment" : {
                    "content": document.getElementById("myTextarea").value,
                }
            },{headers: {
                "Authorization" : window.sessionStorage.accessToken
              }
            }
            )
        .then((res) => {
            if(res.data == "please login to continue" || res.data == "unauthorized")
            {
                alert("please login to update a comment")
            }
            else if(res.data == "user is unauthorized to update this comment")
            {
                alert("you are unauthorised to update the comment")
            }
            else{
                alert("your comment is updated successfully")
                this.setState({isCreated : true});
            }
            console.log(res)
        })
        .catch((error) => {
          console.error(error)
        })
        }
    }

    handleChange(e)
    {
        this.setState({
            contentValue: document.getElementById("myTextarea").value,
        })
    }

    render() {
        const{json} = this.state;
        const{contentValue} = this.state;
        if (this.state.isCreated) {
            return <Redirect to = {{ pathname: "/topic/"+this.props.match.params.topic_id }} />;
        }
        if (this.state.isCancled) {
            return <Redirect to = {{ pathname: "/topic/"+this.props.match.params.topic_id }} />;
        }
      return(
        <div>
          <HomeHeader></HomeHeader>
        <div class="new-topic-main-container">
            <div class="new-topic-main-header">
                Updating Comment
            </div>
            <div class="new-topic-sub-container">
                <textarea id="myTextarea" class="new-topic-myTextarea" placeholder="Type here, use markdown,BB code or html to format." rows="40" value={contentValue} onChange={this.handleChange.bind(this)}> </textarea>
                <button type="button"class="new-topic-add-btn" onClick={this.CreateBtnClick.bind(this)}>Update Comment</button>
                <button class="new-topic-cancel-btn" onClick={this.CancelBtnClick.bind(this)}>Cancel</button>
            </div>
        </div>
        </div>

      )
    }
  }

  export default UpdateComment;  