import React, { useEffect, useState } from 'react'

function Nft({image, title, color}) {

  const [colorr, setColorr] = useState("");

  useEffect(() => {
    if (title == "Favorite") {
      setColorr("#b87cfc")
    } else if ( title == "Creative") {
      setColorr("#7cb6fc")
    } else if ( title == "Love") {
      setColorr("#fc7c7c")
    } else if ( title == "Money") {
      setColorr("#ff9d4d");
    } 
    
    else {
      setColorr("#c4ddff");
    }
  }, []);

  return (
    <div>
        
       <div></div>
        <img src={image} width={180} className="p-4" style={{borderRadius: 30}} />
       
    </div>
  )
}

export default Nft