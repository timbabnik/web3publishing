import React, { useState } from 'react'

function DisplayedNfts({image}) {

    const [change, setChange] = useState(false);
    const [changeTwo, setChangeTwo] = useState(false);
    const [changeThree, setChangeThree] = useState(false);
    const [changeFour, setChangeFour] = useState(false);

    const [show, setShow] = useState(false);
    const [desc, setDesc] = useState(false);
    const [color, setColor] = useState("");

    const firstHover = () => {
        setShow(true);
        setDesc("My Favorite");
        setColor("#00a13b")
    }

    const secondHover = () => {
        setShow(true);
        setDesc("Most Creative");
        setColor("#2a92d1")
    }

    const thirdHover = () => {
        setShow(true);
        setDesc("The Best");
        setColor("#d12d2a")
    }

    const fourthHover = () => {
        setShow(true);
        setDesc("Most valuable");
        setColor("#ffc124")
    }

    
    

  return (
    <div className="flex flex-col items-center relative">
        { show ?(
        <p className={`absolute top-3 text-white w-48 rounded-2xl py-1 pl-3`} style={{background: color}}>{desc}</p>) : (<p className="aboslute top-0"></p>)}
                            <div 
                                style={{border: `1px solid rgba(0, 0, 0, 0.3)`, borderWidth: 1, padding: 3, borderRadius: 20, display: "flex", width: 200, justifyContent: "space-between", marginTop: 50}}
                            >   
                                    <img onClick={() => setChange(!change)}  src={change ? "https://i.postimg.cc/d00b3HTP/Logo-Makr-5hnvs-G-2.png" : "https://i.postimg.cc/k4GwgpXR/Logo-Makr-3-SSF7r.png"} className="w-7 h-7 hover:cursor-pointer" onMouseEnter={firstHover} onMouseLeave={() => setShow(false)} />
                                    <img onClick={() => setChangeTwo(!changeTwo)}  src={changeTwo ? "https://i.postimg.cc/L8mq66rW/Logo-Makr-7-CFzs-G.png" : "https://i.postimg.cc/Zq2j0L9f/Logo-Makr-6-STRtk.png"} className="w-7 h-7 hover:cursor-pointer" onMouseEnter={secondHover} onMouseLeave={() => setShow(false)} />
                                    <img onClick={() => setChangeThree(!changeThree)}  src={changeThree ? "https://i.postimg.cc/W3D52VkC/Logo-Makr-5o-G51-U.png" : "https://i.postimg.cc/x8TP4pB1/Logo-Makr-5m-Jy-Rc.png"} className="w-7 h-7 hover:cursor-pointer" onMouseEnter={thirdHover} onMouseLeave={() => setShow(false)} />
                                    <img onClick={() => setChangeFour(!changeFour)}  src={changeFour ? "https://i.postimg.cc/7Yw4Bt70/Logo-Makr-5o-G51-U-2.png" : "https://i.postimg.cc/G2bP4SLx/Logo-Makr-5rv4zi.png"} className="w-7 h-7 hover:cursor-pointer" onMouseEnter={fourthHover} onMouseLeave={() => setShow(false)} />
                                  
                                
                                
                               
                                
                            </div> 
                            
                            <img src={image} width={200} className="rounded-lg mt-2 mx-5" />
                            <input className="input" placeholder="Describe the nft" />
                            <br />
                            </div>
  )
}

export default DisplayedNfts