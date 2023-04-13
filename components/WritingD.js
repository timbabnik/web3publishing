import React, { useState } from 'react'

function Writing({color, comment, desc, onClick, address, coAuthor, closed}) {

    const [border, setBorder] = useState(false);

  return (

    <div onClick={onClick} className="writingThree" style={{borderWidth: border ? 1 : 1, borderColor: "lightgray"}}>
        
            <div className="w-full flex flex-col">
              <div className="flex items-center pl-3  border-b border-gray-100 rounded-t-xl py-2 w-full justify-between pr-10">
                <div className="flex items-center">
                    <div className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-gray-800"></div>
                    <p className="ml-1 text-xs text-gray-500">{address.slice(0,4)}...{address.slice(address.length - 4, address.length)}</p>
                    </div>
                    <div className="px-3 ml-4 text-xs py-1 rounded-full" style={{background: color, color: "white"}}>{desc}</div>
                </div>
                {/*<p className="mr-3 bg-gray-200 rounded-full p-2 px-3 text-xs hover:bg-gray-300 hover:transition-all text-gray-700">Remove</p>*/}
              </div>
              <p className="ml-2 text-md text-gray-600 p-2">{comment}</p>
              
            </div>
            <div className="flex ml-4 mt-12">
                            <div onClick={coAuthor} className="h-10 w-28 bg-gray-200 rounded-xl mt-0 justify-center items-center flex text-gray-600 text-xs hover:bg-gray-300 hover:cursor-pointer">Co-author</div>
                            <div onClick={closed} className="h-10 w-28 bg-blue-300 rounded-xl mt-0 justify-center items-center flex text-white text-xs hover:bg-blue-400 hover:cursor-pointer ml-4">Close</div>
                        </div>
    </div>
  )
}

export default Writing