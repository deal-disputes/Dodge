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
    this.checkAuth = this.checkAuth.bind(this);
  }
  

  componentWillMount(){
    this.checkAuth();
  }
  
  componentDidMount(){
      this.getThreads();
  }
  
  
  getThreads = async() => {
    this.postStorage = firebase.database().ref("forum-posts");
    const currentThreads  = this.state.threads;
    try {
    this.postStorage.on("child_added", snap => {
                    currentThreads.push({
                        post_title: snap.val().post_title,
                        post_content: snap.val().post_content,
                        post_by: snap.val().post_by,
                        post_category: snap.val().post_category,
                        post_format_date: snap.val().post_format_date,
                        post_snap_key: snap.key
                    })
                    this.setThreads(currentThreads);
            })
            
      } catch (e) {
         console.log(e)
      }
  }
  
  setThreads = (threads) => {
       if(threads.length){
          this.setState({
            loading: false,
            threads: threads
        })
    }
}

  
  

  async checkAuth(){
    await auth.onAuthStateChanged(user => {
      try {
            if(user){
                this.setState({
                  user: user
                })
            } else {
                this.setState({
                  loading: false
                })
            }
            
        }catch(e){
            console.log(e)
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
          <Route path="/community/thread/:thread" render={(props) => <SelectedThread {...props}/>}/>
          <Route path="*" render={(props) => <RouteNotFound {...props} toggleGlobalHeader={this.hideGlobalHeader}/>} />
        </Switch>
      </div>
    );
  }
}


          // <PrivateRoute path="/community" user={user} component={DashBoard}/>
          
          
// const ControlledDashBoard = ({component: Component, threads, ...rest}) => {
//   return (
//       <Route {...rest} render={(props) => threads ? 
//         <Component threads={threads} {...props}/>
//             :
//           null }/>
//           )
//     }
// const PrivateRoute = ({component: Component, user, ...rest}) => {
//   return (
//       <Route {...rest} 
//           render={(props) => user !== null ? 
//             <Component {...props}/>
//             :
//             <Redirect to={{pathname: '/login', state: {
//               from: props.location
//             }}}/>}/>
//     )
// }
export default App;
