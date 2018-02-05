import React from 'react';





const Reactions = ({count, react, to}) => {
    const a = Array(count).fill().map((e, i) => {
       return (
           <a href="#" role="button" class="react-btn" id={`${"r"}${i+1}`} onClick={(e) => react(e, to)}></a>
           )
    });
    
    return a;
}



export default Reactions;