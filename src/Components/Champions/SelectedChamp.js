import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../Widgets/Loader';



class SelectedChamp extends React.Component {
    constructor(props){
        super(props)
            this.state = {
                selectedChampion: null, 
                relatedChampsBox: {
                    wrapper: {
                        style:  {display: 'none'}
                    },
                    container: {
                        style:  {maxWidth: '20px'}
                    },
                    active: false
                }
        }
    }
    
    componentDidMount(){
        const { match } = this.props;
        this.searchAPI(match.params.champName.toLowerCase())
    }
    
    searchAPI = (slug) => {
        const { match, history } = this.props;
        const PATH_BASE = 'https://universe-meeps.leagueoflegends.com/v1/en_ph/champions/';
        const PATH_SEARCH = slug;
        const PATH_TYPE = '/index.json';
        fetch(`${PATH_BASE}${PATH_SEARCH}${PATH_TYPE}`)
            .then(res => res.json())
            .then((res) => {
                this.setSelection(res);
            }).catch(err => {
                if(err){
                    this.setState({
                        fetchError: true
                    })
                }
            })
            
    }
    
    
    setSelection = (selectedChamp) => {
        const { history } = this.props;
        this.setState({
            selectedChampion: selectedChamp
        })
        history.push({
            pathname: `/champions/select/${selectedChamp.champion.slug}`,
            champName: selectedChamp.champion.name
        })
    }
    
    redir = () => {
    const { history } = this.props;
        history.push({
         pathname: '/champions',
         referer: 'SelectedChamp'
        })
    }
    
    toggleRelatedChamps = (e) => {
        const { relatedChampsBox } = this.state;
        if(relatedChampsBox.active){
            e.target.innerText = ">"
            this.setState({
                relatedChampsBox: {
                    wrapper: {
                        style: {display: 'none'}
                    },
                    container: {
                        style: {maxWidth: '20px'}
                    },
                        active: false
                },
            })
        } else {
            e.target.innerText = "x"
            this.setState({
                relatedChampsBox: {
                    wrapper: {
                        style:  {display: 'block'}
                    },
                    container: {
                        style:  {maxWidth: '100%'}
                    },
                        active: true
                },
            })
        }
    }
    
    render(){
        const { match } = this.props;
        const { selectedChampion, fetchError, relatedChampsBox } = this.state;
        const relatedChampions = selectedChampion ? selectedChampion["related-champions"].map(i => {
            return (
                    <div className="champion-container">
                        <div onClick={()=> this.searchAPI(i.slug)} className="champion">
                            <div style={{backgroundImage: "url(" +i.image.uri+")"}}></div>
                        </div>
                    </div>
                )
        }) : <h1> not ok </h1>
        return (
            <div>
            { fetchError ? 
            <div className="fetch-error"> 
                <div className="navigator-champselect">
                    <button onClick={this.redir}> Return to Champions </button>
                </div>
                <h1> An error occured : Unable to retrieved data </h1>
            </div> 
            : 
            <div className="champ-loader">
                 <Loading/>
            </div> }
            
            { selectedChampion ? 
            <div className="champ-information">
                <div className="navigator-champselect">
                    <button onClick={this.redir}> Return to Champions </button>
                </div>
                <div className="champ-content">
                    <div className="champ-details">
                    <div className="champ-splash-wrapper">
                        { selectedChampion.champion.video ?
                        <video autoplay="" loop="true" preload="auto" src={selectedChampion.champion.video.uri}></video>
                        :
                        <div className="champ-art" style={{backgroundImage: 'url('+selectedChampion.champion.image.uri+')'}}></div>
                        }                    </div>
                        <div className="champ-details-wrapper">
                            <div className="faction">
                                <h3>{selectedChampion.champion["associated-faction-slug"]} </h3>
                            </div>
                            <div className="champion-name">
                                <div className="champion-max">
                                    <h1>{selectedChampion.champion.name}</h1> 
                                </div>
                            </div>
                            <div className="champion-title">
                                <h2> {selectedChampion.champion.title} </h2>
                            </div>
                        </div>
                        <div className="champion-biography-wrapper">
                            <div className="champion-quote">
                                <h3>{selectedChampion.champion.biography.quote}</h3>
                                <div className="from-champion">
                                    <p> ~{selectedChampion.champion.name} </p>
                                </div>
                            </div>
                            <div className="divider"></div>
                            <div className="champion-lore">
                                <h3> {selectedChampion.champion.name } biography </h3>
                                <h5>
                                    {selectedChampion.champion.biography.short}
                                </h5>
                                <div className="read-more">
                                    <Link to={`${match.url}/story`}>-READ MORE</Link>
                                </div>
                            </div>
                        </div>
                        <div className="divider"></div>
                        <div className="related-champions" style={relatedChampsBox.container.style}>
                            <div className="related-champ-wrapper" style={relatedChampsBox.wrapper.style}>
                                <div className="champions-wrapper">
                                        {relatedChampions}
                                </div>
                            </div>
                            <div className="toggler">
                               <span onClick={this.toggleRelatedChamps}> > </span>
                               <div className="clear-both"></div>
                            </div>
                        </div>
                    </div> 
                </div>
            </div> : null}
            </div>
        )
    }
}

export default SelectedChamp;