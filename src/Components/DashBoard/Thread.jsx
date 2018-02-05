import React from 'react';
import { Link } from 'react-router-dom';
import Reactions from './Reactions';
import firebase, { auth } from '../../Components/Constants/database.js';

    
    
class Thread extends React.Component{
    constructor(){
        super();
        this.state = {
            visibility: false
        }
        this.postStorage = firebase.database().ref("forum-posts");
    }
    
    
    showReactions = () => {
       this.setState({
           visibility: true
       }) 
    }

    initReact = (e, t) => {
        e.preventDefault()
        const { user } = this.props;
        const reactionType = e.target.id;
        this.setState({
            visibility: false
        })
        
        this.postStorage.child(t + "/reactions").push({
            from: user.displayName,
            fromUID: user.uid,
            reactID: reactionType
        })

    }
    
    render(){
    const {data, to, match} = this.props;
    const {visibility} = this.state;
    const reactions = Object.keys(data.reactions).map((keyName, keyIndex) => {
                        return (
                            <a href="#" role="button" class="react-btn" id={data.reactions[keyName].reactID}></a>
                            )
                    })
    return (
                        <div className="bd-2" id={data.post_snap_key}>
                            <div className="board-title">
                                <Link to={`${match.path}/thread/${data.post_snap_key}`}>
                                <h1>{data.post_title}</h1>
                                </Link>
                            </div>
                            <div className="board-details">
                            { visibility ? 
                                <div className="reaction-lists">
                                        <Reactions to={data.post_snap_key} react={this.initReact} count={5}/>
                                </div> : null }
                                <div className="reactions-container" onMouseOver={this.showReactions}>
                                     <a href="#" role="button" class="react-hover">
                                            <span> React </span>
                                      </a>
                                </div>
                                <div className="reactions">
                                    <ul>
                                        <li>{reactions}</li>
                                    </ul>
                                </div>
                                <div className="board-hints">
                                    <ul>
                                        <li> 
                                            <div className="thread-category">
                                                <span>{data.post_category}</span>
                                            </div>
                                        </li>
                                        <li> 
                                            <div className="thread-op-details">
                                                <img className="th-pic-30x30" src={data.user_photoURL} alt="user profile picture"/>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="thread-comments-count">
                                                <span>0 response</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="thread-date-posted">
                                                <span>{data.post_format_date}</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="clear-both"></div>
                            </div>
                        </div>
        )
    }
}

export default Thread;