import React from 'react';
import Loading from '../../Widgets/Loader';



const SelectedThread = ({datatoQuery, selection}) => {
    let selectedData = datatoQuery.find(i => i.post_snap_key === selection);
    return(
        <div>
        { selectedData !== undefined ?
            <div className="thread-container">
                <div className="cn-bg-1">
                    <div className="photo-url">
                        <img src={selectedData.user_photoURL}/>
                    </div>
                    <div className="thread-details">
                        <div className="thread-title">
                            <h1> {selectedData.post_title} </h1>
                        </div>
                        <div className="info-thread">
                           <p> Posted by <span className="thread-starter">{selectedData.post_by} </span> 
                           on {selectedData.post_format_date} </p>
                        </div>
                    </div>
                    <div className="thread-contents" dangerouslySetInnerHTML={{ __html: selectedData.post_content }}>
                        
                    </div>
                </div>
            </div>
         : <Loading/> }
        </div>
        )
}


export default SelectedThread;