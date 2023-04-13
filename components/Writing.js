import React from 'react'

function Writing({color, desc}) {
  return (
    
    <div className="writingTwoo">
        
    <div className="w-full flex flex-col items-center">
      <div className="flex items-center pl-3  border-b border-gray-100 rounded-t-xl py-2 w-full">
        <div className="flex items-center">
          <div className="h-5 w-5 rounded-full bg-gray-800"></div>
          <p className="ml-1 text-xs text-gray-500">0x1f...fa1</p>
        </div>
        <div className="px-3 ml-4 text-xs py-1 rounded-full" style={{background: color, color: "white"}}>{desc}</div>
      </div>
      <img src="https://i.postimg.cc/wx2mgzk4/Logo-Makr-3qjf-Yl.png" className=" w-12 mt-20 mb-20" />
    </div>


</div>
  )
}

export default Writing