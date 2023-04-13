import React, { useState } from 'react'

function Task({item}) {

    const [zamenjaj, setZamenjaj] = useState(false);

  return (
    <div onClick={() => setZamenjaj(!zamenjaj)} className={`w-40 h-10 ${zamenjaj ? "bg-green-400" : "bg-red-400"} my-2`}>{item}</div>
  )
}

export default Task