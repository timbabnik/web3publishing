import Link from 'next/link'
import React, { useState } from 'react'
import CountdownTimer from './CountdownTimer'

function Mint() {

  const [url, setUrl] = useState("EYZ8BInunJP1BNPFgsKR");

  return (
    <div className="flex items-center justify-center mt-20">
       
        <img src="https://i.postimg.cc/VLKRNPwP/plli-Fnbx-NYjoejm2-ZADp-N5-AJl2-a-T0cf-Vyc-YG89-LB-ew-Rww-I6-Vf-LBs-O-hpp792cq-WVCL7-A-u-Rh-Y9a5e8n-GZ-5y-Dhg046a5h5oa-SB.webp" className="h-96 w-96 rounded-xl" />
        <div className="mx-32">
            <p className="text-md uppercase text-gray-600">Artist Name</p>
            <p className="text-5xl font-bold">Name of the Art</p>
            <CountdownTimer countdownTimestampMs={1673011500000} />
            <div className="flex ml-0 w-80 h-10 justify-between">
                <p className="text-xs text-gray-500 mt-1 ml-3">DAYS</p>
                <p className="text-xs ml-7 text-gray-500 mt-1">HOURS</p>
                <p className="text-xs ml-4 mr-2 text-gray-500 mt-1">MINUTES</p>
                <p className="text-xs mr-0 text-gray-500 mt-1">SECONDS</p>
            </div>
            <Link href={{
                  pathname: `/${url}`,
                  query: { idd: url },
                }}>
              <div className="hover:cursor-pointer">
                  <div className="bg-blue-600 p-3 rounded-lg w-32 justify-center items-center flex"><p className="text-white">View Art</p></div>
              </div>
            </Link>
        </div>
    </div>
  )
}

export default Mint