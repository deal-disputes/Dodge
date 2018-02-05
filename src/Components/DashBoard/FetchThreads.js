import React from 'react';
import Thread from './Thread';


class FetchThreads extends React.Component{

    render(){
     const {threads, match, user } = this.props;
     const fetchThreads = threads.length && user ? threads.map(i => {
            return (
                    <Thread to={i.post_snap_key} user={user} data={i} match={match}/>
                )
        }) : <span> No data to show or you don't have permission to view this page </span>
        return (
            <div>
                {fetchThreads}
            </div>
            )
    }
}


export default FetchThreads;