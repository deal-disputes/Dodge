import React from 'react';
import firebase from '../Constants/database';




class AdminPanel extends React.Component{
    constructor(props){
        super(props)
        this.AdminBoardRef = firebase.database().ref('admin-features');
    
    }

    Announce = () => {
        this.AdminBoardRef.child('announcement').update({
            announcement: this.input.value
        })
    }
    
    render(){
        return (
                <div className="admin-dashboard">
                    <h1> Admin </h1>
                    <input type="text" name="announce" ref={(input) => this.input = input}/>
                    <button onClick={this.Announce}> Announce </button>
                </div>
            )
    }
}

export default AdminPanel;