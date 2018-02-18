import React from 'react';
import firebase, { auth } from '../../Components/Constants/database.js';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './RichEditor.css';


class RichEditor extends React.Component {
    constructor(){
        super();
        this.userUID = auth.currentUser;
        this.postStorage = firebase.database().ref("forum-posts");
        this.state = { 
            text: '' ,
        } 
    }

    componentDidMount(){
        this.checkActiveInput();
    }
    
    handleChange = (value) => {
      this.setState({ text: value })
      
     }
    
    
     submitNewThread = (e) => {
        e.preventDefault();
        let { text } = this.state;
        let title = e.target.title.value
        let content = text;
        const WEKK = ['Saturday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const CATEGORY = document.querySelector('input[name="match"]:checked');
        const CATEGORY_ID = CATEGORY.id;
        const DATE_TODAY = new Date(),
        locale = 'en-us'
        this.postStorage.child(this.userUID).set({
            post_by: this.userUID.displayName,
            post_user_photoURL: this.userUID.photoURL,
            post_format_date: DATE_TODAY.toLocaleDateString(),
            post_date: DATE_TODAY.getTime(),
            post_title: title,
            post_content: text,
            post_category: CATEGORY.value,
        }).then(snap => {
            const { match , history } = this.props;
            history.goBack();
        })
    }
    
    
    checkActiveInput = () =>{
        const radios = document.threadForm.match;
        let prevValue = null;
        for(var i=0; i < radios.length; i++){
            radios[i].addEventListener('change', function(){ 
                document.getElementById(this.id).parentElement.className = 'selected';
                if(prevValue !== null){
                    prevValue.className = '';
                }
                prevValue = this.parentElement;
            })
        }
    }

    render(){
        return(
            <div className="editor-container">
                    <div className="editor-wrapper">
                    <form onSubmit={this.submitNewThread} name="threadForm">
                        <div className="editor-title">
                            <input ref={(input) => this.post_title = input} type="text" name="title" id="post-title" placeholder="New post title"/>
                        </div>
                        <div className="category-picker">
                            <ul>
                                <li>
                                    <input required className="hide-cat" type="radio" name="match" id="match_1" value="Off-Topic"/> 
                                	<label htmlFor="match_1"><div className='cat'>Off-topic</div></label> 
                                </li>
                                <li>
                                    <input required className="hide-cat" type="radio" name="match" id="match_2" value="General Gaming"/> 
                                	<label htmlFor="match_2"><div className='cat'>General Gaming</div></label> 
                                </li>
                                <li>
                                    <input required className="hide-cat" type="radio" name="match" id="match_3" value="Boasting"/> 
                                	<label htmlFor="match_3"><div className='cat'>Boasting</div></label> 
                                </li>
                            </ul>
                        </div>
                        <div className="editor-rich-textarea">
                        <ReactQuill name="editor" value={this.state.text}
                                onChange={this.handleChange} />
                        </div>
                        <div className="submit">
                                <button> complete </button>
                            </div>
                        </form>
                    </div>
                </div>
            )
    }
}


export default RichEditor;