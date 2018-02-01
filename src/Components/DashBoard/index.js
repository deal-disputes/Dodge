import React  from 'react';
import BoardCSS from './BoardCSS.css';
import RichEditor from '../../Widgets/RichEditor';
import firebase , { auth } from '../Constants/database';
import { Link } from 'react-router-dom';
import Loading from '../../Widgets/Loader';

class DashBoard extends React.Component{
    constructor(){
        super()
        this.state = {
           errors: {
               text: null
           },
           errorVisible: false
            
        }
    }

    
    toggleEditor = () => {
        const { user, match , history } = this.props;
        if(user){
            this.props.history.push({
                pathname: `/thread/create/new`
            })
        } else {
            this.setState({
                errors: {
                    text: 'You need to be logged in to create a thread'
                },
                errorVisible: true
            })
        }
    }
    
    render(){
        const { match, user, threads, loading} = this.props;
        const { errorVisible, errors  } = this.state;
        return (
               <div className="dashboard-main">
                <div className="boards">
                    <div className="dashboard-controls">
                        <div className="controls-main">
                            <div className="new-post-btn">
                                <button onClick={this.toggleEditor}> Write new </button>
                                { errorVisible ? 
                                        <span id="error"> {errors.text} </span>
                                        :
                                        null
                                }
                            </div>
                        </div>
                   </div>
                    <div className="main-board-wrapper">
                        <div className="bd-1">
                            <div className="main-board-title">
                                <h1> summoner's rift </h1>
                            </div>
                            <div className="board-cat">
                                <ul>
                                    <li> introductions </li>
                                    <li> club recruitment </li>
                                    <li> esports </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="latests-threads">
                        {loading ? 
                            <Loading/> 
                                :
                            <FetchThreads user={user} threads={threads} match={match}/>
                        }
                    </div>
                </div>
               </div>
            )
    }
}

const FetchThreads = ({threads, match, user}) => {
     const fetchThreads = threads.length && user ? threads.map(i => {
            return (
                    <div className="bd-2">
                            <div className="board-title">
                                <Link to={`${match.path}/thread/${i.post_snap_key}`}>
                                <h1>{i.post_title}</h1>
                                </Link>
                            </div>
                            <div className="board-details">
                                <div className="reactions-container">
                                reactions
                                </div>
                                <div className="board-hints">
                                    <ul>
                                        <li> 
                                            <div className="thread-category">
                                                <span>{i.post_category}</span>
                                            </div>
                                        </li>
                                        <li> 
                                            <div className="thread-op-details">
                                                <img className="th-pic-30x30" src={i.user_photoURL} alt="user profile picture"/>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="thread-comments-count">
                                                <span>0 response</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="thread-date-posted">
                                                <span>{i.post_format_date}</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="clear-both"></div>
                            </div>
                        </div>
                )
        }) : <span> No data to show or you don't have permission to view this page </span>
        
        return fetchThreads;
}
export default DashBoard;