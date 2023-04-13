import React, { useState } from 'react'
import CountdownTimer from '../components/CountdownTimer'
import Message from '../components/Message';
import Next from '../components/Next';
import Progress from '../components/Progress';
import Writing from '../components/Writing'
import Link from 'next/link';

function Read() {

    const [chat, setChat] = useState("General Chat");
    const [generalChat, setGeneralChat] = useState(true);

    const [message, setMessage] = useState("");
    const [messageTwo, setMessageTwo] = useState("");
    const [allMessages, setAllMessages] = useState([]);
    const [allMessagesTwo, setAllMessagesTwo] = useState([]);

    const [calc, setCalc] = useState("0");

    const [unlocked, setUnlocked] = useState(false);

    const sendMessage = () => {
        if (message == "") {
            return;
        } else {
            setAllMessages([...allMessages, message]);
            setMessage("");
        }
    }

    const sendMessageTwo = () => {
        if (messageTwo == "") {
            return;
        } else if (allMessagesTwo.length < 10) {
            setAllMessagesTwo([...allMessagesTwo, messageTwo]);
            setMessageTwo("");
        }
    }

 
const calculate = () => {
    const calcc = 3/8*100;
    setCalc(calcc);
    
    
}
    

  return (
    <div className="">
        
        <div className="flex">
            
            <div className="middleTwo">
                <div className="absolute left-3 top-3 flex">
                    <div className="w-9 h-9 rounded-full bg-blue-300"></div>
                    <div>
                        <p className="ml-2 text-sm">0x1fb...fa21</p>
                        <p className="ml-2 text-xs text-gray-400">Timo Babnik</p>
                    </div>
                </div>
                
                <div className="mainMiddle">
                <img src="https://i.postimg.cc/YqC6ZDWn/r-HGt-Q0-Mi-Ke-Wl-X9-N9dk0-ZL9uf32vf-E58-Jz1-OD9v-Cvzg74-L46v-TXli-Vqa-DQ8g-K-b-DSf-CMfma-V87-Fmk-Lv-Ch1-G1qf-QVRyx-XFCCq8-Kwq4.png" className="h-96 w-96 rounded-xl" />
                    <p className="text-3xl font-semibold mt-20">Preface</p>
                    <p className="text-lg text-[#323232] mt-10">The following essay is a homage to collecting enabled by web3. It is a living document, minted as a collectible Writing NFT. By collecting it, you encourage me to keep refining and elaborating these views, which will be updated here.</p>
                    <p className="text-lg text-[#323232] mt-10">The technology underpinning web3 enables ownership of digital media – including images, music, and writing. Some have said that this brings property rights to the internet. A common framing is that the web has evolved from read-only (web 1), to read + write (web 2.0), to read + write + own (web3).</p>
                    <Link href="/Own" className="px-16 py-4 bg-blue-600 rounded-lg w-28 flex justify-center items-center text-white mt-10">
                        Collect
                    </Link>
                </div>
                
            </div>
            <div className="suggest">
                {
                    unlocked ? (
                        <div className="items-center flex flex-col p-10 rounded-xl border-gray-400 border-2">
                        <img src="https://i.postimg.cc/wx2mgzk4/Logo-Makr-3qjf-Yl.png" className="h-20" />
                        <p className="mt-6 text-[#808080] text-md">Collect this story and start build on top of it</p>
                        </div>
                    ) : (
                        <>
                            <p className="p-5 text-2xl mt-20 ml-8">Best writings</p>
                            <div className="scroll">
                                <Writing color={"gray"} />
                                <Writing color={"gray"} />
                                <Writing color={"gray"} />
                                <Writing color={"gray"} />
                             
                            </div>
                        </>
                    )
                }
               
               
                {/*<div onClick={() => setGeneralChat(false)} className="inputDown">
                    <input className="h-10 w-80 bg-green-200 rounded-full ml-5" />
                    <img src="https://i.postimg.cc/cCG1Rp6B/Logo-Makr-8.png" className="h-8" />
                </div>*/}
            </div>
        </div>
        <div className="w-full h-32 bg-gray-100">fasdf</div>
    </div>
  )
}

export default Read