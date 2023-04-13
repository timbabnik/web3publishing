import React, { useState } from 'react'

function Writing({color, comment, desc, onClick, address}) {

    const [border, setBorder] = useState(false);

  return (

    <div onClick={onClick} className="writingTwo" style={{borderWidth: border ? 1 : 1, borderColor: "lightgray"}}>
        
            <div className="w-full flex flex-col">
              <div className="flex items-center pl-3  border-b border-gray-100 rounded-t-xl py-2 w-full">
                <div className="flex items-center">
                  <div className="h-5 w-5 rounded-full bg-gray-800"></div>
                  <p className="ml-1 text-xs text-gray-500">{address.slice(0,4)}...{address.slice(address.length - 4, address.length)}</p>
                </div>
                <div className="px-3 ml-4 text-xs py-1 rounded-full" style={{background: color, color: "white"}}>{desc}</div>
              </div>
              <p className="ml-2 text-md text-gray-600 p-2">{comment}</p>
            </div>
        
        
    </div>
  )
}

export default Writing