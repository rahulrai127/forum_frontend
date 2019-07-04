import React , { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import HomeComponent from './HomeComponent'
import AboutComponent from './AboutComponent';
import TeamComponent from './TeamComponent';
import HeaderComponent from './HeaderComponent';
import NotFoundComponent from './NotFoundComponent';
import Login from './login'
import Register from './register'
import NewTopic from './newTopic'
import Comment from './comment'
import UpdateTopic from './update_topic'
import UpdateComment from './update_comment'

function App() {
  return (
    <Router>
        <div>
          <HeaderComponent></HeaderComponent>

          <Switch>
            <Route exact path='/' component={HomeComponent}></Route>
            <Route exact path='/topic/:topic_id' component={AboutComponent}></Route>
            <Route exact path='/login' component={Login}></Route>
            <Route exact path='/register' component={Register}></Route>
            <Route exact path='/new_topic' component={NewTopic}></Route>
            <Route exact path='/topic/:topic_id/comment' component={Comment}></Route>
            <Route exact path='/topic/:topic_id/edit' component={UpdateTopic}></Route>
            <Route exact path='/topic/:topic_id/comment/:comment_id/edit' component={UpdateComment}></Route>
            <Route component={NotFoundComponent}></Route>
            
          </Switch>
        </div>
      </Router>
  );
}

export default App;