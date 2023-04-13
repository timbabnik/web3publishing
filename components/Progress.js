import React, { useState } from 'react'

function Progress({ done }) {

    const [style, setStyle] = useState({});

    setTimeout(() => {
        const newStyle = {
            opacity: 1,
            width: `${done}%`
        }

        setStyle(newStyle);
    }, 1000);

  return (
    <div className="skill-box">
                    <div className="skill-bar">
                        <span className="skill-per html" style={{width: `${done}%`}}>
                            
                        </span>
                    </div>
    </div>
  )
}

export default Progress