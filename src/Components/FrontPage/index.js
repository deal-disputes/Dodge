import React from 'react';
import './FrontPage.css';
import AdminPanel from '../AdminPanel/AdminPanel';
import firebase , { auth } from '../Constants/database';


class FrontPage extends React.Component {
    constructor(props){
        super(props);
        this.userRef = firebase.database().ref("users");
        this.state = {
            front: null
        }
    }
    
    componentDidMount(){
      this.authListener = auth.onAuthStateChanged((user) =>{
                if(user){
                    this.validateAccount(user);
                }
            });
        }
    
    componentWillUnmount(){
        this.authListener && this.authListener();
    }
    
    componentWillMount(){
        const { location, toggleGlobalHeader} = this.props;
        const userID = auth.currentUser;
        if(location.code == 404) {
            toggleGlobalHeader();
        } 
    }
    

    validateAccount = (userObj) => {
            this.userRef.once('value').then(snap => {
                if(snap.hasChild(userObj.uid)){
                    this.getRole(userObj);
                } else {
                    this.userRef.child(userObj.uid).push({
                        email: userObj.email,
                        role: 'Member'
                    });
                }
            });
    }
    
    getRole = (userObj) => {
        this.userRef.child(userObj.uid).once('child_added', snap => {
            if(snap.val().role == 'Admin'){
                this.setState({
                    front: <AdminPanel/>
                });
                } else {
                this.setState({
                    front: null
                });  
            }
        });
    }
    
    render(){
        return (
            <div>
                <div className="community-posts-container">
                {this.state.front}
                    <div className="title-wrapper">
                        <h1> Trending from Community </h1>
                    </div>
                    <div className="posts-wrapper">
                     <div className="large-container">
                        <div className="community-post trending large-post">
                        
                        </div>
                     </div>
                     <div className="small-container">
                        <div className="community-post trending small-post">
                        
                        </div>
                        <div className="community-post trending small-post">
                        
                        </div>
                        <div className="community-post trending small-post">
                        
                        </div>
                        <div className="community-post trending small-post">
                        
                        </div>
                    </div>
                    <div className="clear-both"></div>
                    </div>
                </div>
            </div>
            )
    }
}

    
export default FrontPage;