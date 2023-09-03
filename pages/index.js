import React, { useEffect, useRef, useState } from 'react'
import Explore from '../components/Explore'
import Mint from '../components/Mint'
import Navbar from '../components/Navbar'
import { Row, Form, Button } from "react-bootstrap"
import { addDoc, collection, doc, getDoc, onSnapshot } from '@firebase/firestore'
import { db } from '../firebase'
import { ethers } from 'ethers'
import { create } from 'ipfs-http-client'

import { Buffer } from 'buffer';
import Homepage from '../components/Homepage'
import Topics from '../components/Topics'
import Writing from '../components/Writing'
import WritingTwo from '../components/WritingTwo'
import Link from 'next/link'
import Gold from "../components/Gold"




function Home() {

const ref = useRef(null);



// Scroll down

const handleClick = () => {
  ref.current?.scrollIntoView({
    behavior: "smooth",
    
  });
}



  return (
    <div className="homepage">
      <div className="bg-[#1B3950] pb-52 w-full">
        <div className="w-full h-20 justify-between flex p-6 items-center pt-12">
          <div className="flex items-center">
            <img src="https://i.postimg.cc/TPJrPHJH/Logo-Makr-10.png" className="h-14 flex justify-center items-center text-2xl font-light p-3" />
            <p className="text-4xl font-thin text-[#FFDFBA]">alwrite</p>
          </div>
          <div className="flex items-center">
                      <Link href="/account">
                        <div  className="metamask">
                                
                               
                            </div>
                        </Link>          
          </div>
        </div>
        <Homepage onClick={handleClick} />
        </div>
        <Topics />
        <div ref={ref}></div>
        <div className="w-full bg-gray-300 mt-52 h-20 items-center flex justify-center flex-col">
          <p className=" text-center w-full text-md">If you are a writer contact us here:</p>
          <p className="text-md">alwrite.publishing@gmail.com</p>
        </div>
       
        
    </div>
  )
}

export default Home