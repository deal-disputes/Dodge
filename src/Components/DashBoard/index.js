import React  from 'react';
import BoardCSS from './BoardCSS.css';
import RichEditor from '../../Widgets/RichEditor';
import firebase , { auth } from '../Constants/database';
import Loading from '../../Widgets/Loader';
import FetchThreads from './FetchThreads';

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
        const { user, history } = this.props;
        if(user){
            history.push({
                pathname: `/thread/create/new`
            })
        } else {
            this.setState({
                errors: {
                    text: 'You need to log in to create a new thread'
                },
                errorVisible: true
            })
        }
    }
    
    
    
    render(){
        const { match, user, threads, loading} = this.props;
        const { errorVisible, errors} = this.state;
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

export default DashBoard;