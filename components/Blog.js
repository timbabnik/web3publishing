import React from 'react'

function Blog({title}) {
  return (
    <div className="flex flex-col items-center">
      <div className="accPost">
        <div>
          <p className="font-bold text-2xl">{title}</p>
          <p className="text-gray-500 bg-gray-100 mt-2 rounded-full p-1 text-xs px-2">24. march 2023</p>
        </div>
        <div className="flex items-center">
         {/*<img src="https://i.postimg.cc/hjJFPZfR/Logo-Makr-9-ZOd-HL-2.png" className="h-10 mr-6 hover:bg-gray-600 rounded-full hover:cursor-pointer p-2 transition-all" />*/}
          <img src="https://i.postimg.cc/3RD3dczH/Logo-Makr-12.png" className="h-5 mr-6" />
        </div>
      </div>
    </div>
  )
}

export default Blog