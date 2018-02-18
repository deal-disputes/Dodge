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
                    this.getRole(user.uid);
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
    
    
    getRole = (UID) => {
        this.userRef.child(UID).once('value', snap => {
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