import Link from 'next/link'
import React from 'react'
import Nft from './Nft'

function Collection({tag, image, imageTwo, imageThree, imageFour, tagTwo, tagThree, tagFour, color}) {
  return (
    
    <Link href="/new" className="collection">
        <div className="flex pl-8 mt-2 border-b-blue-100 border-b-2 py-3 items-center">
          <div className="h-10 w-10 bg-blue-300 rounded-lg"></div>
          <p className="ml-2 text-xl font-light">First NFT Project</p>
          <p className="ml-28 bg-gray-500 p-2 rounded-full text-white text-xs">0x1g...34f</p>
        </div>
        <div className="flex flex-col justify-center items-center">
        <div className="flex mt-5">
            <Nft image={image} title={tag} color={color} />
            <Nft image={imageTwo} title={tagTwo} />
            
            
            
        </div>
        <div className="flex ">
            <Nft image={imageThree} title={tagThree} />
            <Nft image={imageFour} title={tagFour} />
       
        </div>
        </div>
    </Link>
  )
}

export default Collection