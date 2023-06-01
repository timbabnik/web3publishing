import React from 'react'

function Category({query, data, color}) {
  return (
    <div onClick={query} style={{backgroundColor: color}} className={`border-[#28525c] p-4 rounded-xl w-32 h-14 justify-center items-center flex mx-3 my-3 text-[#fff] hover:text-white hover:cursor-pointer text-sm`}>
        <p className="mx-1">{data}</p>
    </div>
  )
}

export default Category