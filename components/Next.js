import React, { useState } from 'react'
import Progress from './Progress'

function Next({done, e, submit}) {

    const [check, setCheck] = useState(false);
    const [calc, setCalc] = useState("");

    const click = () => {
        setCheck(true);
        const calcc = 1/8*100;
        setCalc(calcc);
    }

  return (
    <div className="progress">
        <div className="flex items-center mt-10">
            {
                check ? (
                    <div className="h-5 w-5 rounded-full border-gray-400 border-2 bg-green-500"></div>
                ) : (
                    <div onClick={submit} className="h-5 w-5 rounded-full border-gray-400 border-2 hover:bg-gray-200 hover:cursor-pointer"></div>
                )
            }
            <p className="ml-2 rounded-xl mt-0 text-gray-700 ">{e}</p>
        </div>
        <Progress done={done} />
    </div>
  )
}

export default Next