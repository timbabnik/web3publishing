import React from 'react'
import Link from 'next/link'

function Blogs({onClick}) {
  return (
    <div className="items-center justify-center mt-52 mb-20 flex flex-col">
        <div className="upper">
            <div className="allUp">
                <p className="text-white font-bold text-4xl md:text-7xl text-center lg:text-left">LET YOUR READERS<br/> BECOME CO-AUTHORS<br/>OF YOUR WRITINGS</p>
                <p className="undertitle">Create mintable writings. Let your readers comment. Add their insights to your blog so they can become co-authors verified by the blockchain.</p>
                <div onClick={onClick} className="mt-5 bg-[#FFDFBA] w-32 justify-center items-center flex p-3 rounded-lg hover:bg-[rgb(255,191,119)] hover:cursor-pointer">
                    <p className="text-black">Learn more</p>
                </div>
            </div>
            <img src="https://i.postimg.cc/XYXkXvbN/Group-20-4-removebg-preview-2.png"  className="imageMain"/>
        </div>
    </div>
    
  )
}

export default Blogs