import React, { Component } from 'react';
import axios from 'axios';
import HomeComponent from './HomeComponent';
import  { Redirect } from 'react-router-dom'
import './topic.css';
import HomeHeader from './HomeHeader'
import logo from './logo1.png';



class AboutComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
          json: [],
          topic_json : [],
          isReply : false,
          isLike : false,
          isDelete : false,
          isEditBtn : false,
          isDeleteComment : false,
          isEditComment : false,
          cmntId : 0,
          isLiked : false
        }
      }

    fetch(){
        axios.get('http://ec2-18-191-141-43.us-east-2.compute.amazonaws.com:9000/topics/'+this.props.match.params.topic_id)
      .then((response) => {
        this.setState({
          json: response.data.topic,
          topic_json: response.data.topic.comments
        });
        if(!!window.sessionStorage.accessToken  && window.sessionStorage.accessToken !=="")
        {
            this.setState({
                isLiked : response.data.topic.isLiked
                })
        }
      })
    }


    componentDidMount(){
        this.fetch();
    }


    replyBtnClick(e)
    {
        this.setState({isReply : true});
    }
    editBtnClick(e)
    {
        this.setState({isEditBtn : true});
    }
      
    likeBtnClick(e){
        console.log("like btn clicked.....!!",this.state.isLiked)
        if (this.state.isLiked === false)
        {
            axios.post('http://ec2-18-191-141-43.us-east-2.compute.amazonaws.com:9000/topics/'+this.props.match.params.topic_id+"/likes");
        }
        if(this.state.isLiked === true)
        {
            axios.delete('http://ec2-18-191-141-43.us-east-2.compute.amazonaws.com:9000/topics/'+this.props.match.params.topic_id+"/likes")
        }
        
        this.setState(prevState => ({ isLiked : !prevState.isLiked})) 
        
    }

    deleteBtnClick(e){
        axios.delete('http://ec2-18-191-141-43.us-east-2.compute.amazonaws.com:9000/topics/'+this.props.match.params.topic_id)
      .then((response) => {
            this.setState({
                isDelete : true
            });
            alert("Post deleted successfully")
      })
    }
    Change(){
        this.setState({
            isDeleteComment : true
        });
    }

    Change1(value){
        this.setState({
            isEditComment : true,
            cmntId : value
        });
    }
    

 render (){
    if (this.state.isReply) {
        return <Redirect to = {{ pathname: "/topic/"+this.props.match.params.topic_id+"/comment" }} />;
    }
    if (this.state.isEditBtn) {
        return <Redirect to = {{ pathname: "/topic/"+this.props.match.params.topic_id+"/edit" }} />;
    }
    if (this.state.isDeleteComment) {
        return <Redirect to = {{ pathname: "/" }} />;
    }
    if (this.state.isEditComment) {
        return <Redirect to = {{ pathname: "/topic/"+this.props.match.params.topic_id+"/comment/"+this.state.cmntId+"/edit" }} />;
    }
    if (this.state.isDelete) {
        return <Redirect to = {{ pathname: "/" }} />;
    }
    const{json} = this.state
    const{topic_json} = this.state
    return (
    <div>
         <HomeHeader></HomeHeader>
        
         
        <div class="main-container">
            <div class="topic">
                {json.name}
            </div>
            <div class = "main-topic-footer">
                    <div class= "topic-img"></div>
                    <div class="topic-category">{json.category}</div>
            </div>
            <hr/>
            <div class="main-topic-container">
                <div class="user-icon">
                    <img class="follower-img" src={json.createdBy}/>
                </div>
                <div class="topic-content">
                    <div class="topic-sub-header">
                        <div class="username"> {json.username}</div>
                        <span class="date-created">
                            {window.sessionStorage.accessToken == "" || !window.sessionStorage.accessToken ? <div></div>: window.sessionStorage.accessToken !== json.username ? <div></div> :[<button type="button" className="editBtn" onClick={this.editBtnClick.bind(this)}><img className="editImg"src = "https://listimg.pinclipart.com/picdir/s/339-3390613_png-file-pencil-edit-icon-png-clipart.png"/></button>,
                        <button type="button" className="editBtn" onClick={this.deleteBtnClick.bind(this)}><img className="editImg"src = "https://image.flaticon.com/icons/png/512/61/61848.png"/></button>]
                         }
                        {json.createdAt ? json.createdAt.slice(8,10)+"/"+json.createdAt.slice(5,7):json.createdAt}
                         </span>
                    </div>
                    <div class="main-topic-content">
                    <div align = "justify"dangerouslySetInnerHTML={{ __html: json.content }} />
                        <div class="reply-btn">
                        { window.sessionStorage.accessToken == "" || !window.sessionStorage.accessToken ? <div></div>:this.state.isLiked ? <button type="button" onClick={this.likeBtnClick.bind(this)} className="likeBtn"><img  class= "favorited-btn" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/1200px-Heart_coraz%C3%B3n.svg.png" />
                        </button>: <button type="button" onClick={this.likeBtnClick.bind(this)} className="likeBtn"><img  class= "favorited-btn" src="https://image.flaticon.com/icons/png/128/121/121727.png"/>
                        </button>}

                        { window.sessionStorage.accessToken == "" || !window.sessionStorage.accessToken ? <div></div>:
                        <button type="button" className = "replyBtn" onClick={this.replyBtnClick.bind(this)}><img class="add-img" src="https://img.icons8.com/metro/420/reply-all-arrow.png"/> Reply</button>
                        }
                        </div>
                    </div>
                    <div class="topic-footer">
                        <div class="footer-1">  
                            <div class="footer-11">
                                <div class="footer-111">
                                    Created by
                                </div>
                                <div class="footer-112">
                                    <img class="follower-img" src={json.createdBy}/>
                                </div>
                            </div>
                            <div class="footer-12">
                                <div class="footer-121">
                                    Last reply
                                </div>
                                <div class="footer-122">
                                    <img class="follower-img" src={json.lastReply}/>
                                </div>
                            </div>
                        </div>
                        <div class="footer-2">
                            <div class="footer-21">
                                <div class="footer-211">
                                    {json.replyCount}
                                </div>
                                <div class="footer-212">
                                    reply
                                </div>
                            </div>
                            <div class="footer-22">
                                <div class="footer-221">
                                    {json.viewCount}
                                </div>
                                <div class="footer-222">
                                    views
                                </div>
                            </div>
                            <div class="footer-23">
                                <div class="footer-231">
                                    {json.userCount}
                                </div>
                                <div class="footer-232">
                                    users
                                </div>
                            </div>
                        </div>
                        <div class="footer-3">
                        {topic_json.map(data =>{
                            return(
                            <img class="follower-img-1" src={data.url} />
                        )})}
                        </div>
                    </div>
                </div>
            </div>
            <hr/>
            
            <List
                topicId =  {this.props.match.params.topic_id}
                isDeleteCommentChange = {this.Change.bind(this)}
                isEditCommentChange = {this.Change1.bind(this)}
                json = {this.state.topic_json}></List>
        </div>
    </div>)            
}
}

class List extends Component{
    render()
    {
      const{json} = this.props;
      var items = json.map(data => <Comments  data = {data}
        topicId =  {this.props.topicId}
        isDeleteCommentChange = {this.props.isDeleteCommentChange}
        isEditCommentChange = {this.props.isEditCommentChange}
        />);
    return (
      <div>
          {items}
      </div>
    )
    }
  }

class Comments extends Component{

    constructor(props) {
        super(props);
        this.state = {
        }
      }
    deleteBtnClick(cmntId){
        axios.delete('http://ec2-18-191-141-43.us-east-2.compute.amazonaws.com:9000/topics/'+this.props.topicId+"/comments/"+cmntId
        )
      .then((response) => {
          
            this.props.isDeleteCommentChange()
            
      })
    }
    editBtnClick(cmntId)
    {
        this.props.isEditCommentChange(cmntId)
    }


    render(){
        
        const{data} = this.props
        return(
            <div key={data.id} >
                   <div>
                <div class="main-topic-container">
                <div class="user-icon">
                        <img class="follower-img-1" src= {data.url}/>
                </div>
                <div class="topic-content">
                    <div class="topic-sub-header">
                        <div class="username"> {data.username}</div>
                        {window.sessionStorage.accessToken == "" || !window.sessionStorage.accessToken ? <div></div>:window.sessionStorage.accessToken !== data.username ? <div></div> :[
                            <button type="button" className="editBtn" onClick={this.editBtnClick.bind(this,data.id)}><img className="editImg"src = "https://listimg.pinclipart.com/picdir/s/339-3390613_png-file-pencil-edit-icon-png-clipart.png"/></button>,
                            <button type="button" className="editBtn" onClick={this.deleteBtnClick.bind(this,data.id)}><img className="editImg"src = "https://image.flaticon.com/icons/png/512/61/61848.png"/></button>    
                        ]}
                        <div class="date-created">{data.createdAt.slice(8,10)+"/"+data.createdAt.slice(5,7)}</div>
                    </div>
                    <div class="main-topic-content">
                    <div dangerouslySetInnerHTML={{ __html: data.content }} />
                    </div>
                </div>
            </div>
            <hr/>
            </div>
            </div>
        )
    }
}
export default AboutComponent;
