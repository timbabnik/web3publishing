import React, { useState } from 'react'
import CountdownTimer from '../components/CountdownTimer'
import Message from '../components/Message';
import Next from '../components/Next';
import Progress from '../components/Progress';
import Writing from '../components/Writing'

function Dao() {

    const [chat, setChat] = useState("General Chat");
    const [generalChat, setGeneralChat] = useState(true);

    const [message, setMessage] = useState("");
    const [messageTwo, setMessageTwo] = useState("");
    const [allMessages, setAllMessages] = useState([]);
    const [allMessagesTwo, setAllMessagesTwo] = useState([]);

    const [calc, setCalc] = useState("0");

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
        <div className="w-full h-14 bg-[#FFFFFE] items-center flex border-b border-b-[#f0f0f0]">
            <div className="DaoNavbar">
                <div className="w-10 h-10 rounded-full bg-blue-300"></div>
                <div className="ml-2">
                    <p>Timo</p>
                    <p className="text-gray-400 text-sm">0x1fda...1gas8</p>
                </div>
            </div>
            <div className="text-2xl ml-5">{generalChat ? "General Chat" : "Writings..."}</div>
        </div>
        <div className="flex">
            <div className="suggest">
                <div className="vote">
                    <div className="ml-5 mt-6">
                        <CountdownTimer countdownTimestampMs={1673011500000} />
                    </div>
                    <p className="p-5 ml-0 text-2xl mt-5 font-bold">What should we do next?</p>
                    {
                        allMessagesTwo.map((e, data) => {
                            return <Next e={e} done={calc} submit={calculate} />
                        })
                    }
                    <input value={messageTwo} onChangeCapture={(e) => setMessageTwo(e.target.value)} placeholder="Write your idea ..." className="newIdea" />
                    <div onClick={sendMessageTwo} className="bg-blue-500 ml-5 mt-6 w-24 text-white p-2 justify-center flex items-center rounded-xl text-sm">Submit</div>
                </div>
               
                
                <div className="p-10 absolute bottom-0">
                    <div className="flex items-center">
                        <img src="https://i.postimg.cc/23pQFxbW/Logo-Makr-7.png" className="h-6" />
                        <p className="text-gray-500 ml-5">Settings</p>
                    </div>
                    <div className="flex items-center mt-6">
                        <img src="https://i.postimg.cc/23pQFxbW/Logo-Makr-7.png" className="h-6" />
                        <p className="text-gray-500 ml-5">Settings</p>
                    </div>
                    <div className="flex items-center mt-6">
                        <img src="https://i.postimg.cc/23pQFxbW/Logo-Makr-7.png" className="h-6" />
                        <p className="text-gray-500 ml-5">Settings</p>
                    </div>
                </div>
            </div>
            <div className="middle">
                {
                    generalChat ? (
                        <div className="justify-end flex flex-col w-full mr-16 absolute bottom-14 h-full">
                            {
                                allMessages.map((e, data) => {
                                    return <Message sporocilo={e} />
                                })
                            }
                        </div>
                    ) : (
                        <div className="absolute bottom-16 flex bg-blue-800 w-full justify-end">
                            <p>hahah</p>
                        </div>
                    )
                }
                
                    
                <input onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            sendMessage()
                            
                        }
                    }} value={message} onChangeCapture={(e) => setMessage(e.target.value)} className="inputt" placeholder="Write a message ..." />
                
            </div>
            <div className="suggest">
                <p className="p-5 text-2xl">Best writings</p>
                <div className="items-center flex flex-col">
                    <Writing />
                    <Writing />
                    <Writing />
                    <Writing />
                    <Writing />
                </div>
                <div onClick={() => setGeneralChat(false)} className="absolute right-7 bottom-5 bg-gray-100 p-3 rounded-full hover:bg-gray-200 hover:cursor-pointer">
                    <img src="https://i.postimg.cc/cCG1Rp6B/Logo-Makr-8.png" className="h-8" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dao