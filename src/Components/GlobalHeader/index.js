import React from 'react';
import './GlobalHeader.css';
import firebase , { auth } from '../Constants/database';
import { Link } from 'react-router-dom';

// Temporary local , will be fetch with loopback in mid production
const ARTS = [
    {
        key: 1,
        artist: 'LINGER FTC',
        artURL: 'https://fanart.na.leagueoflegends.com/media/user_uploads/arts/20170612/t/aa8cd44a-82ab-4f87-8d29-3c33d16b63f8_1000x1000_scaled.jpg',
        profile: 'https://www.artstation.com/artist/lingerftc'
    },
    {
        key: 2,
        artist: 'Chewiebaka',
        artURL: 'https://fanart.na.leagueoflegends.com/media/user_uploads/arts/20180108/y/8afdc77a-1c08-4868-920b-5e5b0f6ad8d4_1000x1000_scaled.jpeg',
        profile: 'https://chewiebaka.deviantart.com/'
    },
    {
        key: 3,
        artist: 'Jasper_Sandner',
        artURL: 'https://fanart.na.leagueoflegends.com/media/user_uploads/arts/20180104/w/41de366b-f37d-4f6b-ae25-b88ba279fab7_1000x1000_scaled.jpg',
        profile: 'https://jaspersandner.deviantart.com/gallery/'
    },
    {   
        key: 4,
        artist: 'SIX_HANDS',
        artURL: 'https://fanart.na.leagueoflegends.com/media/user_uploads/arts/20170607/u/4089b373-b175-4812-a8a1-c74ff107ec94_1000x1000_scaled.jpg',
        profile: 'https://www.artstation.com/six_hands'
    },
    {
        key: 5,
        artist: 'HOZURE',
        artURL: 'https://fanart.na.leagueoflegends.com/media/user_uploads/arts/20161014/g/4ac5800c-6cb3-474b-bbf0-453fdb48ef88_1000x1000_scaled.png',
        profile: 'http://hozure.deviantart.com/'
    },
    {
        key: 6,
        artist: 'SIX_HANDS',
        artURL: 'https://fanart.na.leagueoflegends.com/media/user_uploads/arts/20171215/f/7800bc3e-4960-4b1d-9998-103fabbff6a2_1000x1000_scaled.jpg',
        profile:'https://www.artstation.com/six_hands'
    },
    {
        key: 7,
        artist: 'Jay Zhou',
        artURL: 'https://fanart.na.leagueoflegends.com/media/user_uploads/arts/20170610/m/5d885cc3-4d76-4129-b152-56bc650d2c24_1000x1000_scaled.jpg',
        profile: 'http://headcrabed.deviantart.com/'
    },
    {
        key: 8,
        artist: 'Leekent',
        artURL: 'https://fanart.na.leagueoflegends.com/media/user_uploads/arts/20180109/e/4509ba59-f778-4e4e-bf76-7e0e8515180b_1000x1000_scaled.jpg',
        profile: 'https://leekent.deviantart.com/'
    }
    ]
//-------------------------------------------//

class GlobalHeader extends React.Component{
    constructor(props){
        super(props);
        this.state = {
         announcement: null
        }
        this.AnnouncementRef = firebase.database().ref('admin-features');
        this.currentSlideIndex = 0;
        this.timeOut;
    }
    
    
    renderSlides = (index) => {
        let i;
        let slides = document.getElementsByClassName('slide');
        for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";  
         } 
       this.currentSlideIndex++;
       if(this.currentSlideIndex > slides.length) { this.currentSlideIndex = 1 }
       slides[this.currentSlideIndex-1].style.display = "block";  
       this.timeOut = setTimeout(this.renderSlides, 4000);
    }
    
    componentDidMount(){
        this.renderSlides(this.currentSlideIndex);
    }
    
    componentWillMount(){
    this.AnnouncementRef.child('announcement').on('child_added', snap => {
            this.setState({
                announcement: snap.val()
            })
        })
    }
    componentWillUnmount(){
        clearTimeout(this.timeOut);
    }
    
    logout = () => {
        auth.signOut().then(() => {
            return (
                    <div className="signing-out">
                        <h1> Signing Out... </h1>
                    </div>
                )
        }).catch(error => {
            console.log(error)
        })
    }
    render(){
        const { announcement } = this.state;
        const user = firebase.auth().currentUser;
        const slide = ARTS.map((item) => 
                <div className="slide fade" style={{backgroundImage: "url(" + item.artURL + ")"}} key={item.key}>
                    <div className="artist">
                        <div className="artist-profile"> Artist: <a href={item.profile} target="_blank">{item.artist}</a></div>
                    </div>
                </div>
        )
        return (
              <div className="global-header">
                <div className="logo">
                    <Link to="/"><h1> DODGE! </h1></Link>
                    <span> A League of Legends Community </span>
                </div>
                <div className="slider-box">
                   <div className="slider-contents">
                        {slide}
                    </div>
                    <div className="navigator">
                        <div className="nav-wrapper">
                            <div className="nav-link">
                                { user ? 
                                <button className="logout" onClick={this.logout}> Logout </button>
                                : <Link to="/login"> Login </Link>
                                }
                            </div>
                            <div className="nav-link">
                                <Link to="/"> Home </Link>
                            </div>
                            <div className="nav-link">
                                <Link to="/community"> Community </Link>
                            </div>
                            <div className="nav-link">
                                <Link to="/champions"> Champions </Link>
                            </div>
                            <div className="nav-link">
                                <Link to="/gallery"> Gallery </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="announcement">
                        { announcement ? <h1>Announcement: {announcement} </h1> : null }
                </div>
              </div>
            )
    }
}


export default GlobalHeader;