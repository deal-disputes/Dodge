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
    
    
    showReactions = (e) => {
        console.log(e.target)
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
        
        this.postStorage.child(t + "/reactions/").on('value', snap => {
            const val = snap.val() !== null ? Object.values(snap.val()) : null;
            // const val = Object.values(snap.val())
            // this.postStorage.child(t + "/reactions/").push({
            //         from: user.displayName,
            //         fromUID: user.uid,
            //         reactionID: reactionType
            //  })
            console.log(val)
            if(val && val.find(sp => sp.fromUID == this.props.user.uid)){
                console.log('already exists')
            } else {
                this.postStorage.child(t + "/reactions/").push({
                    from: user.displayName,
                    fromUID: user.uid,
                    reactionID: reactionType
             })
            }
        });


    }
    
    render(){
    const {data, to, match, user} = this.props;
    const {visibility} = this.state;
    const reactions = data.reactions ? Object.keys(data.reactions).map((keyName, keyIndex) => {
                        return (
                            <a href="#" role="button" class="react-list" id={data.reactions[keyName].reactionID}></a>
                            )
                    }) : <span>no reactions</span>
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
                                <div className="board-hints">
                                <div className="reactions-container">
                                 <ul>
                                    <li><a href="#" role="button" class="react-hover" onMouseOver={this.showReactions}>
                                        React
                                    </a></li>
                                <li>
                                    <div className="reactions">
                                        <ul>
                                            <li>{reactions}</li>
                                        </ul>
                                    </div>
                                </li>
                                 </ul>
                                </div>
                                    <div className="thread-post-detail">
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
                                </div>
                                <div className="clear-both"></div>
                            </div>
                        </div>
        )
    }
}

export default Thread;