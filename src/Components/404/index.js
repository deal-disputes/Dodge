import React from 'react';
import './404.css';


class RouteNotFound extends React.Component{
    
    constructor(props){
        super()
        this.state = {
            prevPath: ''
        }
    }
    
    componentWillMount(){
        const { toggleGlobalHeader } = this.props;
    
    }
    
    redir = () => {
    const { history } = this.props;
        history.push({
         pathname: history.goBack(),
         code: 404
        })
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.location !== this.props.location) {
          this.setState({ prevPath: this.props.location })
        }
      }
      
    render(){
    const { match } = this.props;
    return (
        <div id="body">
            <h1> Error: {match.url} not found </h1>
            <button onClick={this.redir}> Take me back </button>
        </div>
        )
    }
}


export default RouteNotFound;