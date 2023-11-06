import React, { useState } from 'react'

function Writing({color, comment, desc, onClick, address, author}) {

    const [border, setBorder] = useState(false);
    

  return (

    
    <div className="writingTwo" style={{ borderWidth: border ? 1 : 1, borderColor: "lightgray" }}>
    <div className="w-full flex flex-col">
      <div className="flex items-center pl-3 border-b border-gray-100 rounded-t-xl py-2 w-full">
        <div className="flex items-center">
          <div className="h-5 w-5 rounded-full bg-gray-800"></div>
          <p className="ml-1 text-xs text-gray-500">{address.slice(0, 4)}...{address.slice(address.length - 4, address.length)}</p>
        </div>
        <div className="px-3 ml-4 text-xs py-1 rounded-full" style={{ background: color, color: "white" }}>{desc}</div>
      </div>
      <p className="ml-2 text-md text-gray-600 p-2">{comment}</p>

      {/* Add light gray border just above the button with some spacing */}
      {
        author && (
        <div className="mt-auto">
          <div className="border-t border-gray-200 mt-3 pt-3">
            <button
            onClick={onClick}
              className="ml-2 text-sm text-blue-500 border border-blue-500 rounded-md p-2 self-start"
              style={{
                transition: "background-color 0.3s ease",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "blue";
                e.target.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "";
                e.target.style.color = "";
              }}
            >
              Add to writers´group
            </button>
          </div>
        </div>)
      }
    </div>
  </div>
  )
}

export default Writing