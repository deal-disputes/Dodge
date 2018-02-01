import React from 'react';
import Loading from '../../Widgets/Loader';
import './SelectedThread.css';



class SelectedThread extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            selection: null,
        }
    }
    
    componentWillMount(){
        const { match } = this.props;
        this.setState({
            selection: match.params.thread
        })
    }
    
    render(){
        // const { datatoQuery } = this.props;
        const { selection } = this.state;
        const { datatoQuery } = this.props;
        return(
                <div>
                    <FindSelection datatoQuery={datatoQuery} selection={selection}/>
                </div>
            )
    }
}


const FindSelection = ({datatoQuery, selection}) => {
    let selectedData = datatoQuery.find(i => i.post_snap_key === selection);
    console.log(selectedData)
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
                </div>
            </div>
         : <Loading/> }
        </div>
        )
}
export default SelectedThread;