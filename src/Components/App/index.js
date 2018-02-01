import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import firebase, { auth } from '../Constants/database';
import Login from '../Login';
import FrontPage from '../FrontPage';
import GlobalHeader from '../GlobalHeader';
import DashBoard from '../DashBoard';
import RouteNotFound from '../404';
import ChampionsList from '../Champions/ChampionsList'
import SelectedChamp from '../Champions/SelectedChamp'
import SelectedThread from '../SelectedThread/SelectedThread';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: null,
      loading: true,
      threads: [],
      letShowGlobalHeader: true,
    }
    this.postStorage = firebase.database().ref("forum-posts");
    this.checkAuth = this.checkAuth.bind(this);
  }
  

  componentWillMount(){
    this.checkAuth();
  }
  
  componentDidMount(){
    this.postStorage.on('value', snap => {
      console.log('Oops, theres no existing data');
          if(snap.val() === null) {
            this.setState({
              loading: false
            })
          }
    })
  }
  
  
  getThreads = (user) => {
    const currentThreads  = this.state.threads;
    console.log('Invoked getThreads')
    this.postStorage.on("child_added", snap => {
                    currentThreads.push({
                        post_title: snap.val().post_title,
                        post_content: snap.val().post_content,
                        user_photoURL: snap.val().post_user_photoURL,
                        post_by: snap.val().post_by,
                        post_category: snap.val().post_category,
                        post_format_date: snap.val().post_format_date,
                        post_snap_key: snap.key
                    })
                    this.setState({
                        threads: currentThreads,
                        loading: false
                    })
              console.log('getThreads: Threads successfully fetch')
          })
      }
  
  
  setThreads = (threads) => {
       if(threads.length){
          this.setState({
            loading: false,
            threads: threads
        })
    }
}

  
  

  checkAuth(threads){
    auth.onAuthStateChanged(user => {
            if(user){
            console.log('User authenticated: Fetch Threads')
              this.getThreads(user)
              this.setState({
                user: user
              })
            } else {
                this.setState({
                  loading: false,
                  threads: []
                })
              console.log('User not authenticated: Dont show threads')
            } 
    })  
}
  
  hideGlobalHeader = () => {
    if(this.state.letShowGlobalHeader){
      this.setState({
        letShowGlobalHeader: false
      })
    } else {
      this.setState({
        letShowGlobalHeader: true
      })
    }
  }
  

  render() {
    const { letShowGlobalHeader, user, threads, loading } = this.state;
    return (
      <div className="App">
      { letShowGlobalHeader ? 
        <GlobalHeader/> : null }
        <Switch>
          <Route path="/" exact render={(props) => <FrontPage toggleGlobalHeader={this.hideGlobalHeader} {...props}/>}/>
          <Route path="/login" render={(props) => <Login user={user} {...props}/>}/>
          <Route path="/champions" exact render={(props) => <ChampionsList {...props}/>}/>
          <Route path="/champions/select/:champName" render={(props) => <SelectedChamp {...props}/>}/>
          <Route path="/community" exact render={(props) => <DashBoard threads={threads} loading={loading} user={user} {...props}/>}/>
          <Route path="/community/thread/:thread" render={(props) => <SelectedThread datatoQuery={threads} {...props}/>}/>
          <Route path="*" render={(props) => <RouteNotFound {...props} toggleGlobalHeader={this.hideGlobalHeader}/>} />
        </Switch>
      </div>
    );
  }
}


export default App;
