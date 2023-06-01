import React, { useState } from 'react'

function Idea({title, click, deleteIdea, time, color, categ}) {

  const [deletee, setDeletee] = useState(false);

  return (
    <div className="flex flex-col items-center">
                            <div className="accIdea" style={{backgroundColor: color}}>
                                <p className="text-gray-600">{title}</p>
                                <div className="flex items-center">
                                    <p className="text-white bg-[#3E616C] mt-5 rounded-full p-1 text-xs px-2">{time}</p>
                                    <p className="text-white bg-[#6c3e3e] mt-5 rounded-full p-1 text-xs px-2 ml-2">{categ}</p>
                                    {
                                      deletee ? (
                                        <div onClick={deleteIdea} className="mt-5 border-red-500 border text-red-500 rounded-full hover:bg-red-500 hover:text-white ml-5 px-5 hover:cursor-pointer">Delete</div>
                                      ) : (
                                        <img onClick={() => setDeletee(true)} src="https://i.postimg.cc/DZgrH9tP/Logo-Makr-14.png" className="h-10 mr-6 hover:bg-gray-600 rounded-full hover:cursor-pointer p-2 transition-all mt-5" />
                                      )
                                    }
                                </div>
                            </div>
                            
                        </div>
  )
}

export default Idea