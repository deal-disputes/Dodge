import React from 'react';
import ChampIcon from './content_type_icon_champion.png';
import { Link } from 'react-router-dom';



class ListChamp extends React.Component {
    
    render(){
        const { match , data} = this.props;
        const mapped = data.map((champ) => {
            const champSplashArt = champ.image.uri;
            return (
                <Link to={`${match.url}/${champ.name}`}><div className="champ-container" style={{backgroundImage: 'url('+champSplashArt +')'}}>
                    <div style={{backgroundImage: "url("+ChampIcon+")"}} className="champion-icon"></div>
                        <div className="champ-icon-contain">                    
                            <h1> {champ.name} </h1>
                        </div>
                    </div>
                </Link>
                )
        })
        return(
                <h1> POTA </h1>
            )
    }
}

export default ListChamp;