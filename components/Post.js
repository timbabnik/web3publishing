import React from 'react'

function Post({title, description, image, address}) {
  return (
        <div className="flex mt-5">
            <div className="flex ml-10">
              <div className="h-20 w-20"></div>
              <img src={image} className="h-20 w-20 rounded-xl" />
              <div className="ml-4">
                  <p className="text-xl font-medium w-60">{title}</p>
                  <p className="text-xs font-light ml-1 mt-3">{address[0].slice(0,4)}...{address[0].slice(address[0].length - 4, address[0].length)}</p>
              </div>
            </div>
              <div className="ml-4 justify-end flex">
                <p className="text-md font-light ml-10 w-full">{description}</p>
              </div>
        </div>
  )
}

export default Post