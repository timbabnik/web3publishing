import React, { useEffect, useState } from 'react'
import CountdownTimer from '../components/CountdownTimer'
import Message from '../components/Message';
import Next from '../components/Next';
import Progress from '../components/Progress';
import Writing from '../components/Writing'
import WritingTwo from '../components/WritingTwo'
import WritingThree from '../components/WritingThree'
import { addDoc, collection, doc, onSnapshot, orderBy, query } from '@firebase/firestore';
import { db } from '../firebase';
import { useRouter } from 'next/router';
import { ethers } from 'ethers';
import Lock from "./Lock.json";

function Own() {

    const [chat, setChat] = useState("General Chat");
    const [generalChat, setGeneralChat] = useState(true);
    const [accounts, setAccounts] = useState("");

    const [message, setMessage] = useState("");
    const [messageTwo, setMessageTwo] = useState("");
    const [allMessages, setAllMessages] = useState([]);
    const [allMessagesTwo, setAllMessagesTwo] = useState([]);

    const [calc, setCalc] = useState("0");

    const [unlocked, setUnlocked] = useState(false);

    const [add, setAdd] = useState([]);
    const [addComment, setAddComment] = useState([]);

    const [random, setRandom] = useState(false);

    const [addresses, setAddressses] = useState([]);

    const [owner, setOwner] = useState("Creators");

    const [selected, setSelected] = useState("");
    const [inputComment, setInputComment] = useState("");
    const [getColor, setGetColor] = useState("")
    const [getAddress, setGetAddress] = useState("");

    const [getComments, setGetComments] = useState([]);
    const [owners, setOwners] = useState([]);
    const [creator, setCreator] = useState([]);
    const [title, setTitle] = useState([]);
    const [writings, setWritings] = useState([]);

    const [all, setAll] = useState(
        [{
            id: 1,
            address: "0xvasdfgsdf",
            desc: "Creative",
            color: "#05ad5d",
            comment: "Great Job",
        }, {
            id: 2,
            address: "fgsdfgsdfgsdfg",
            desc: "Character",
            color: "#055fad",
            comment: "Comment fasdf  asfasd fadfasdf adfasd fasdf asdfas dfas dfsdfsafasdfa sdf asfas fasdf asfasfdfasfsdffasdfasdf safasfsadfasdfasfasfad fasdfasdfasdfadfasdfasfsd fasdf   f"
        }, {
            id: 3,
            address: "hgjhkliuo76",
            desc: "Creative",
            color: "#05ad5d",
            comment: "Great Job",
        }, {
            id: 4,
            desc: "Character",
            color: "#055fad",
            comment: "Comment fasdf  asfasd fadfasdf adfasd fasdf asdfas dfas dfsdfsafasdfa sdf asfas fasdf asfasfdfasfsdffasdfasdf safasfsadfasdfasfasfad fasdfasdfasdfadfasdfasfsd fasdf   f"
        }, {
            id: 5,
            desc: "Creative",
            color: "#05ad5d",
            comment: "Great Job",
        }, {
            id: 6,
            desc: "Character",
            color: "#055fad",
            comment: "Comment fasdf  asfasd fadfasdf adfasd fasdf asdfas dfas dfsdfsafasdfa sdf asfas fasdf asfasfdfasfsdffasdfasdf safasfsadfasdfasfasfad fasdfasdfasdfadfasdfasfsd fasdf   f"
        }, {
            id: 7,
            desc: "Creative",
            color: "#05ad5d",
            comment: "Great Job",
        }, {
            id: 8,
            desc: "Character",
            color: "#055fad",
            comment: "Comment fasdf  asfasd fadfasdf adfasd fasdf asdfas dfas dfsdfsafasdfa sdf asfas fasdf asfasfdfasfsdffasdfasdf safasfsadfasdfasfasfad fasdfasdfasdfadfasdfasfsd fasdf   f"
        }, {
            id: 9,
            desc: "Creative",
            color: "#05ad5d",
            comment: "Great Job",
        }, {
            id: 10,
            desc: "Character",
            color: "#055fad",
            comment: "Comment fasdf  asfasd fadfasdf adfasd fasdf asdfas dfas dfsdfsafasdfa sdf asfas fasdf asfasfdfasfsdffasdfasdf safasfsadfasdfasfasfad fasdfasdfasdfadfasdfasfsd fasdf   f"
        }, {
            id: 11,
            desc: "Creative",
            color: "#05ad5d",
            comment: "Great Job",
        }, {
            id: 12,
            desc: "Character",
            color: "#055fad",
            comment: "Comment fasdf  asfasd fadfasdf adfasd fasdf asdfas dfas dfsdfsafasdfa sdf asfas fasdf asfasfdfasfsdffasdfasdf safasfsadfasdfasfasfad fasdfasdfasdfadfasdfasfsd fasdf   f"
        } , {
            id: 13,
            desc: "Comment",
            color: "#055fad",
            comment: "Comment fasdf  asfasd fadfasdf adfasd fasdf asdfas dfas dfsdfsafasdfa sdf asfas fasdf asfasfdfasfsdffasdfasdf safasfsadfasdfasfasfad fasdfasdfasdfadfasdfasfsd fasdf   f"
        }]);

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


const comments = [{
    id: 1,
    address: "0xvasdfgsdf",
    desc: "Creative",
    color: "#05ad5d",
    comment: "Great Job",
}, {
    id: 2,
    address: "fgsdfgsdfgsdfg",
    desc: "Character",
    color: "#055fad",
    comment: "Comment fasdf  asfasd fadfasdf adfasd fasdf asdfas dfas dfsdfsafasdfa sdf asfas fasdf asfasfdfasfsdffasdfasdf safasfsadfasdfasfasfad fasdfasdfasdfadfasdfasfsd fasdf   f"
}, {
    id: 3,
    address: "hgjhkliuo76",
    desc: "Creative",
    color: "#05ad5d",
    comment: "Great Job",
}, {
    id: 4,
    desc: "Character",
    color: "#055fad",
    comment: "Comment fasdf  asfasd fadfasdf adfasd fasdf asdfas dfas dfsdfsafasdfa sdf asfas fasdf asfasfdfasfsdffasdfasdf safasfsadfasdfasfasfad fasdfasdfasdfadfasdfasfsd fasdf   f"
}, {
    id: 5,
    desc: "Creative",
    color: "#05ad5d",
    comment: "Great Job",
}, {
    id: 6,
    desc: "Character",
    color: "#055fad",
    comment: "Comment fasdf  asfasd fadfasdf adfasd fasdf asdfas dfas dfsdfsafasdfa sdf asfas fasdf asfasfdfasfsdffasdfasdf safasfsadfasdfasfasfad fasdfasdfasdfadfasdfasfsd fasdf   f"
}, {
    id: 7,
    desc: "Creative",
    color: "#05ad5d",
    comment: "Great Job",
}, {
    id: 8,
    desc: "Character",
    color: "#055fad",
    comment: "Comment fasdf  asfasd fadfasdf adfasd fasdf asdfas dfas dfsdfsafasdfa sdf asfas fasdf asfasfdfasfsdffasdfasdf safasfsadfasdfasfasfad fasdfasdfasdfadfasdfasfsd fasdf   f"
}, {
    id: 9,
    desc: "Creative",
    color: "#05ad5d",
    comment: "Great Job",
}, {
    id: 10,
    desc: "Character",
    color: "#055fad",
    comment: "Comment fasdf  asfasd fadfasdf adfasd fasdf asdfas dfas dfsdfsafasdfa sdf asfas fasdf asfasfdfasfsdffasdfasdf safasfsadfasdfasfasfad fasdfasdfasdfadfasdfasfsd fasdf   f"
}, {
    id: 11,
    desc: "Creative",
    color: "#05ad5d",
    comment: "Great Job",
}, {
    id: 12,
    desc: "Character",
    color: "#055fad",
    comment: "Comment fasdf  asfasd fadfasdf adfasd fasdf asdfas dfas dfsdfsafasdfa sdf asfas fasdf asfasfdfasfsdffasdfasdf safasfsadfasdfasfasfad fasdfasdfasdfadfasdfasfsd fasdf   f"
} , {
    id: 13,
    desc: "Comment",
    color: "#055fad",
    comment: "Comment fasdf  asfasd fadfasdf adfasd fasdf asdfas dfas dfsdfsafasdfa sdf asfas fasdf asfasfdfasfsdffasdfasdf safasfsadfasdfasfasfad fasdfasdfasdfadfasdfasfsd fasdf   f"
}]

const addTo = (e) => {
    if (add < 1) {
        add.push(e);
        setGetAddress(e.address);
    }
    setRandom(!random);
    
}

const removeFrom = (e) => {
    add.splice(e, 1);
    addresses.splice(e, 1);
    setRandom(!random);
}

const addToBlog = () => {
    addresses.push(getAddress);
    console.log(add[0].comment)
    setRandom(!random);
}


const colored = [{
    id: 1,
    color: "#05ad5d",
    type: "Creative",
}, {
    id: 2,
    color: "#055fad",
    type: "Character",
}, {
    id: 3,
    color: "#ff5c5c",
    type: "Comment",
}, ]

const addCommentNew = () => {
    setAll([...all, {
        comment: inputComment,
        desc: selected,
        color: getColor,
        address: accounts,
    }])
    console.log(comments)
    setRandom(!random);
    setInputComment("");
}

const getData = (e, i) => {
    setSelected(e);
    setGetColor(i);
}

const connectMetamask = async() => {
    if (window.ethereum) {
        const account = await window.ethereum.request({
            method: "eth_requestAccounts",
        })
        setAccounts(account)
    }
}


const unlockContent = async() => {
    if (window.ethereum) {
        const account = await window.ethereum.request({
            method: "eth_requestAccounts",
        })
        setAccounts(account);
        setUnlocked(true);
    }
    
}

const addNewMessage = async () => {
    addDoc(collection(db, "blogs", idd, "comments"), {
        comment: inputComment,
        desc: selected,
        color: getColor,
        address: accounts,
      });
    setRandom(!random);
    setInputComment("");
}

const addNewOwner = async () => {
    addDoc(collection(db, "blogs", idd, "owners"), {
        address: getAddress,
      });
    setRandom(!random);
    setAdd([]);
 
    addDoc(collection(db, "blogs", idd, "more"), {
        comment: add[0].comment,
        desc: add[0].desc,
        color: add[0].color,
        address: accounts,
      });
}

const addMore = async () => {
    addDoc(collection(db, "blogs", idd, "more"), {
        comment: inputComment,
        desc: selected,
        color: getColor,
        address: accounts,
      });
    setRandom(!random);
}

useEffect(
    () => 
    onSnapshot(collection(db, "blogs", idd, "comments"),
    
    (snapshot) => setGetComments(snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
    }))))

, []);

useEffect(
    () => 
    onSnapshot(collection(db, "blogs", idd, "owners"),
    
    (snapshot) => setOwners(snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
    }))))

, []);

useEffect(
    () => 
    onSnapshot(collection(db, "blogs", idd, "more"),
    
    (snapshot) => setAddComment(snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
    }))))

, []);

useEffect(
    () => 
    onSnapshot(collection(db, "blogs", idd, "creator"),
    
    (snapshot) => setCreator(snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
    }))))

, []);

useEffect(
    () => 
    onSnapshot(collection(db, "blogs", idd, "title"),
    
    (snapshot) => setTitle(snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
    }))))

, []);



useEffect(() => {
    const collectionRef = collection(db, "blogs", idd, "writings");
    const q = query(collectionRef, orderBy("timestamp"));

    const unsub = onSnapshot(q, (snapshot) =>
      setWritings(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );

    return unsub;
  }, []);



let neki = "timo";

const router = useRouter()
  const {
    query: { idd },
  } = router


const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";


async function handleMint() {
    if (window.ethereum) {
            const account = await window.ethereum.request({
                method: "eth_requestAccounts",
            })
        setAccounts(account);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            address,
            Lock.abi,
            signer
        );
        try {
            const response = await contract.mint();
            console.log("response: ", response);
            setUnlocked(true);
        } catch (err) {
            console.log("error: ", err);
        }
    }
}

  return (
    <div className="">
        
        <div className="flex">
            
            <div className="middleTwo">
                <div className="absolute left-3 top-3 flex">
                    {
                        accounts ? (
                            <>
                            <div className="w-9 h-9 rounded-full bg-blue-300"></div>
                            <div>
                                <p className="ml-2 text-sm">{accounts}</p>
                            </div>
                            </>
                        ) : <div onClick={connectMetamask} className="bg-gray-300 rounded-lg justify-center flex p-2 items-center hover:cursor-pointer hover:bg-gray-200">
                                <img className="w-8" src="https://i.postimg.cc/mrT1hFKC/Meta-Mask-Fox-svg-2.png" />
                                <p className="text-sm font-bold ml-1">Connect Metamask</p>
                            </div>
                    }
                    
                </div>
                
                <div className="mainMiddleTwo">
                    <div className="width">
                    <img src="https://i.postimg.cc/YqC6ZDWn/r-HGt-Q0-Mi-Ke-Wl-X9-N9dk0-ZL9uf32vf-E58-Jz1-OD9v-Cvzg74-L46v-TXli-Vqa-DQ8g-K-b-DSf-CMfma-V87-Fmk-Lv-Ch1-G1qf-QVRyx-XFCCq8-Kwq4.png" className="h-96 w-96 rounded-xl" />
                    <div className="items-end flex justify-between">
                        <div className="flex flex-col">
                            <div className="flex items-center">
                            <p className="mt-20 text-center rounded-full text-gray-500 p-1 text-md mr-2">Creator:</p>
                            {
                                creator.map((data, index) => {
                                    return <a target="_blank" href={`http://etherscan.io/address/${data.data.address}`} key={index} className="bg-gray-100 mt-20 text-center rounded-full text-gray-500 p-2 text-sm mr-2 hover:bg-gray-200 hover:cursor-pointer">{data.data.address}</a>
                                })
                            }
                            </div>
                            <div className="flex items-center">
                            <p className="mt-6 text-center rounded-full text-gray-500 p-1 text-md mr-2">Co-Creator:</p>
                            {
                                owners.map((data, index) => {
                                    return <a target="_blank" href={`http://etherscan.io/address/${data.data.address}`} key={index} className="bg-gray-100 mt-6 text-center rounded-full text-gray-500 p-2 text-sm mr-2 hover:bg-gray-200 hover:cursor-pointer">{data.data.address}</a>
                                })
                            }
                            </div>
                        </div>
                        
                        <div onClick={handleMint} className="px-10 py-3 bg-blue-600 hover:bg-blue-700 hover:cursor-pointer rounded-lg w-28 flex justify-center items-center text-white mt-10">Collect</div>
                    </div>
                    {
                        title.map((data, index) => {
                            return <p className="text-3xl font-semibold mt-10">{data.data.title}</p>
                        })
                    }
                    {
                        writings.map((data, index) => {
                            return <p key={index} className="text-lg text-[#323232] mt-10">{data.writings}</p>
                        })
                    }
                    
                    
                    <div className="downWritingS">
                       {
                           addComment.map((data, index) => {
                            return <WritingThree key={index} desc={data.data.desc} color={data.data.color} comment={data.data.comment} />
                        })
                       }
                        <div className="downWritingSS">
                    {
                            add.map((data, index) => {
                                return <WritingThree onClick={() => removeFrom(index)} key={index} desc={data.desc} color={data.color} comment={data.comment} />
                            })
                        }
                        </div>
                        {add.length > 0 ? <div onClick={addNewOwner} className="h-12 w-28 bg-gray-200 rounded-xl mt-0 justify-center items-center flex text-gray-600 text-sm hover:bg-gray-300 hover:cursor-pointer">Add</div> : null}
                    </div>
                    <div onClick={handleMint} className="px-16 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg w-40 flex justify-center items-center text-white mt-14 hover:cursor-pointer">Collect</div>
                    </div>
                    <div className="down">
                        
                        {
                            unlocked ? ( 
                                <>
                                <div className="inputComment">
                                    <p className="text-3xl">Join the discussion</p>
                                    <div className="w-full mt-12">
                                        <div className="flex items-center">
                                            {
                                                colored.map((data, index) => {
                                                    return <div onClick={() => getData(data.type, data.color)} className={`text-xs border-[${data.color}] border rounded-full px-4 py-1 hover:cursor-pointer hover:bg-gray-200 mr-3`} style={{color: selected == data.type ? "white" : data.color, backgroundColor: selected == data.type ? data.color : null}}>{data.type}</div>
                                                })
                                            }
                                            {/*<div className="text-[#05ad5d] text-xs border-[#05ad5d] border rounded-full px-4 py-1 hover:cursor-pointer hover:bg-gray-200">Creative</div>
                                            <div className="text-[#055fad] text-xs border-[#055fad] border rounded-full px-4 py-1 ml-2 hover:cursor-pointer hover:bg-gray-200">Character</div>
                                        <div className="text-[#ff5c5c] text-xs border-[#ff5c5c] border rounded-full px-4 py-1 ml-2 hover:cursor-pointer hover:bg-gray-200">Comment</div>*/}
                                        </div>
                                        <input onKeyPress={(e) => {
                                                if (e.key === "Enter") {
                                                    addNewMessage()
                                                    
                                                }
                                            }} value={inputComment} onChangeCapture={(e) => setInputComment(e.target.value)} className="w-full h-10 bg-gray-50 border border-gray-200 rounded-full mt-4 pl-4 text-sm" />
                                    </div>
                                </div>
                                 <div className="downWriting">
                                     
                        {
                            getComments.map((data, index) => {
                                return <WritingTwo onClick={() => addTo(data.data)} key={index} color={data.data.color} desc={data.data.desc} comment={data.data.comment} />
                            })
                        }
                        </div>
                                </>
                            ) : (
                                <div className="downWriting">
                                    <Writing desc={"Comment"} color={"gray"} comment={"Great Job Great Job Great Job Great Job Great Job Great Job Great Job Great Job"} />
                                    <Writing desc={"Creative"} color={"gray"} comment={"Comment fasdf  asfasd fadfasdf adfasd fasdf asdfas dfas dfsdfsafasdfa sdf asfas fasdf asfasfdfasfsdffasdfasdf safasfsadfasdfasfasfad fasdfasdfasdfadfasdfasfsd fasdf   f Comment fasdf  asfasd fadfasdf adfasd fasdf asdfas dfas dfsdfsafasdfa sdf asfas fasdf asfasfdfasfsdffasdfasdf safasfsadfasdfasfasfad fasdfasdfasdfadfasdfasfsd fasdf   f"} />
                                    <Writing desc={"Creative"} color={"gray"} comment={"ojla ojla ojla ojla ojla ojla ojla"} />
                                    <Writing desc={"Character"} color={"gray"} comment={"fasdfasdf fasdfasdf fasdfasdf fasdfasdf fasdfasdf fasdfasdf fasdfasdf fasdfasdf fasdfasdf fasdfasdf fasdfasdf"} />
                                </div>
                            )
                        }
                       
                    </div>
                    
                </div>
                
            </div>
            
        </div>
        
    </div>
  )
}

export default Own