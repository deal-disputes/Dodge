import React from 'react';
import Loading from '../../Widgets/Loader';
import './index.css';
import SelectedThread  from './SelectedThread';


class SelectedThreadContainer extends React.Component{
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
                    <SelectedThread  datatoQuery={datatoQuery} selection={selection}/>
                </div>
            )
    }
}



export default SelectedThreadContainer;