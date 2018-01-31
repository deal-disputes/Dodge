import React from 'react';
import './index.css';
import SelectedChamp from './SelectedChamp';
import { Route, Link } from 'react-router-dom';
import ChampIcon from './content_type_icon_champion.png';
import Loading from '../../Widgets/Loader';
class ChampionsList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            data_champions: null,

        }
    }
    
    
    componentDidMount(){
        this.getChampions();
    }
    
    getChampions = () => {
        fetch('https://universe-meeps.leagueoflegends.com/v1/en_ph/champion-browse/index.json')
          .then(res => res.json())
          .then(result => {
            this.setChampions(result);
          }).catch(error => {
              console.log("Something went wrong")
          })
    }
    
    setChampions = (result) => {
        this.setState({
            data_champions: result.champions
        })
    }
    
    render(){
        const { data_champions } = this.state;
        const { match } = this.props;
        const mapped = data_champions ? data_champions.map((champ) => {
            const champSplashArt = champ.image.uri;
            return (
                <Link to={`${match.url}/select/${champ.slug}`}>
                <div className="champ-container fade" style={{backgroundImage: 'url('+champSplashArt +')'}}>
                        <div className="champ-icon-contain">                    
                            <h1> {champ.name} </h1>
                             <div style={{backgroundImage: "url("+ChampIcon+")"}} className="champion-icon"></div>
                        </div>
                    </div>
                </Link>
                )
        }) : <Loading/>
        return (
        <div className="list-container">
            <div className="list-wrapper">
                <h1> Champions</h1>
                <div className="divider"></div>
                <div className="champions-container">
                    {mapped}
                </div>
            </div>

        </div>
            )
    }
}


export default ChampionsList;