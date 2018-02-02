import React from 'react';
import { Link } from 'react-router-dom';

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


export default FetchThreads;