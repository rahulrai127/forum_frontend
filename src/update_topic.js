import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom'
import  { Redirect } from 'react-router-dom'
import './community.css';
import './newTopic.css';
import HomeHeader from './HomeHeader'

class UpdateTopic extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          isCreated: false,
          isCancled: false,
          json : [],
          titleValue : '',
          contentValue : '',
          categoryValue : ''
        }
      }

      fetch(){
        axios.get('http://ec2-18-191-141-43.us-east-2.compute.amazonaws.com:9000/topics/'+this.props.match.params.topic_id)
      .then((response) => {
        this.setState({
          json: response.data.topic,
          titleValue : response.data.topic.name,
          contentValue : response.data.topic.content,
          categoryValue : response.data.topic.category 

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
        var topic =document.getElementById("topic-name").value;
        var content =document.getElementById("myTextarea").value;
        if(document.getElementById("topic-name").value== ""|| document.getElementById("myTextarea").value=="")
        {
            alert("please fill all the details to continue ")
        }
        else{
            axios.patch('http://ec2-18-191-141-43.us-east-2.compute.amazonaws.com:9000/topics/'+this.props.match.params.topic_id, {
                "topic" : {
                    "title" : document.getElementById("topic-name").value,
                    "category": document.getElementById("cat").value,
                    "content": document.getElementById("myTextarea").value,
                }
            }
            )
        .then((res) => {
                this.setState({isCreated : true});
        })
        .catch((error) => {
          console.error(error)
        })
        }
    }

    handleChange(e)
    {
        this.setState({
            titleValue : document.getElementById("topic-name").value,
            categoryValue : document.getElementById("cat").value,
            contentValue: document.getElementById("myTextarea").value,
        })
    }
    render() {
        const{json} = this.state;
        const{contentValue} = this.state;
        const{titleValue} = this.state;
        const{categoryValue} = this.state;
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
                Updating Topic
            </div>
            <div class="new-topic-sub-container">
                <input type="text" id= "topic-name"  value={titleValue} onChange={this.handleChange.bind(this)}/>
                <select class="category-and-tag" name="categories" id="cat" value={categoryValue} onChange={this.handleChange.bind(this)}>
                    <option value="uncategories">Uncategories</option>
                    <option value="discourse">Discourse</option>
                    <option value="videos">Videos</option>
                    <option value="movies">Movies</option>
                    <option value="tech">Tech</option>
                </select>
                <input type="text" class="new-topic-category-and-tag" placeholder="optional tags"/>
                <textarea id="myTextarea" class="new-topic-myTextarea" placeholder="Type here, use markdown,BB code or html to format." rows="40" value={contentValue} onChange={this.handleChange.bind(this)}> </textarea>
                <button type="button"class="new-topic-add-btn" onClick={this.CreateBtnClick.bind(this)}>Update Topic</button>
                <button class="new-topic-cancel-btn" onClick={this.CancelBtnClick.bind(this)}>Cancel</button>
            </div>
        </div>
        </div>
      )
    }
  }

  export default UpdateTopic;  