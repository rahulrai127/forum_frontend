import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom'
import  { Redirect } from 'react-router-dom'
import './community.css';
import './newTopic.css';
import HomeHeader from './HomeHeader'

class NewTopic extends React.Component {

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
        console.log("i am here")
        e.preventDefault();
        var topic =document.getElementById("topic-name").value;
        var content =document.getElementById("myTextarea").value;
        if(document.getElementById("topic-name").value== ""|| document.getElementById("myTextarea").value=="")
        {
            alert("please fill all the details to continue ")
        }
        else{
            axios.post('http://ec2-18-191-141-43.us-east-2.compute.amazonaws.com:9000/topics', {
                "topic" : {
                    "title" : document.getElementById("topic-name").value,
                    "category": document.getElementById("cat").value,
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
                alert("please login to create a post")
            }
            else{
                alert("your post is created successfully")
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
            return <Redirect to = {{ pathname: "/" }} />;
        }
        if (this.state.isCancled) {
            return <Redirect to = {{ pathname: "/" }} />;
        }
      return (
        <div>
        <HomeHeader></HomeHeader>
        <div class="new-topic-main-container">
            <div class="new-topic-main-header">
                Create a new Topic
            </div>
            <div class="new-topic-sub-container">
                <input type="text" id= "topic-name" placeholder="Type title, or place a link here"/>
                <select class="category-and-tag" name="categories" id="cat">
                    <option value="uncategories">Uncategories</option>
                    <option value="discourse">Discourse</option>
                    <option value="videos">Videos</option>
                    <option value="movies">Movies</option>
                    <option value="tech">Tech</option>
                </select>
                <input type="text" class="new-topic-category-and-tag" placeholder="optional tags"/>
                <textarea id="myTextarea" class="new-topic-myTextarea" placeholder="Type here, use markdown,BB code or html to format." rows="40"></textarea>
                <button type="button"class="new-topic-add-btn" onClick={this.CreateBtnClick.bind(this)}><img class="new-topic-add-img new-topic-img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEX///8AAAAhISG7u7suLi62trbAwMDb29vp6ekkJCTf39/t7e2goKAxMTGqqqqzs7PKjZzcAAAB2UlEQVR4nO3bO1IrQRREQX0Q6APS/nf7PJ5TBqPpgWpFHr8jKv3bu93oDvs1HYbvGR8hYX+EhP0RvpDw8/rx0673KYWnBY/eCZsijBFWRRgjrIowRlgVYYywKsIYYVWEMcKqCGOEVRHGCKsijBFWRRgjrIowRlgVYYywKsIYYVWEMcKqCGOEVRHGCKsijBFWRRgjrIowRlgVYYywKsIYYVWEMcKqCGNTCS+rhJfxg94G97VfJdxfDoPb7TfrOeHwCFdESDgowhW9vvCxQHjcbsZ/4edxbKfzAuH5cRrbPQivCwb1dwvCj78eNbQz4fQRzh/h/BHOH+H8Ec4f4fwRzh/h/BHOH+H8Ec4f4fwRzh/h/BHOH+H8Ec4f4fwRzl8Svv5N1N/etR3fx/YIwuEtub48bTdjQ+FxgfBXri+HR0g4KMIVEf6WcPRXse/PeU8Kx/9dG95llfBr/KDhHVYJ3zbbNS7CGGFVhDHCqghjhFURxgirIowRVkUYI6yKMEZYFWGMsCrCGGFVhDHCqghjhFURxgirIowRVkUYI6yKMEZYFWGMsCrCGGFVhDHCqghjhFURxgirIowRVkUYI6yKMEZY1bfwfjv/tNt9SuFTETZESNgfIWF/bcJ/iBIyzMzckkAAAAAASUVORK5CYII="/> Create Topic</button>
                <button class="new-topic-cancel-btn" onClick={this.CancelBtnClick.bind(this)}>Cancel</button>
            </div>
        </div>
        </div>
      )
    }
  }

  export default NewTopic;  