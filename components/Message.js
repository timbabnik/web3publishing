import React from 'react'

function Message({sporocilo}) {
  return (
    <div className="flex justify-end">
       <p className="bg-blue-600 p-3 rounded-xl my-2 text-white">{sporocilo}</p>
    </div>
  )
}

export default Message