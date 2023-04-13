import React from 'react'

function Navbar() {
  return (
    <div className="h-16 w-full bg-blue-100 items-center flex justify-between">
        <div className="flex items-center">
            <div className="h-10 w-10 bg-blue-900 rounded-full ml-10"></div>
            <p className="text-2xl font-light ml-2">DisplayNFT</p>
        </div>
        <div className="flex">
            <p className="text-md mr-10 font-bold">Explore</p>
            <p className="text-md mr-10 font-bold">Collections</p>
            <p className="text-md mr-10 font-bold">Profile</p>
        </div>
    </div>
  )
}

export default Navbar