import React from 'react'

function Idea({title, click}) {
  return (
    <div className="flex flex-col items-center">
                            <div className="accIdea">
                                <p className="text-gray-600">{title}</p>
                                <div className="flex items-center">
                                    <p className="text-gray-500 bg-gray-100 mt-5 rounded-full p-1 text-xs px-2">24. march 2023</p>
                                    <img onClick={click} src="https://i.postimg.cc/hjJFPZfR/Logo-Makr-9-ZOd-HL-2.png" className="h-10 mr-6 hover:bg-gray-600 rounded-full hover:cursor-pointer p-2 transition-all mt-5" />
                                </div>
                            </div>
                            
                        </div>
  )
}

export default Idea