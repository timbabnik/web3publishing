import React, { useEffect, useRef, useState } from 'react'


import Writing from "../../components/Writing"
import WritingTwo from '../../components/WritingTwo'
import WritingThree from '../../components/WritingThree'
import WritingD from '../../components/WritingD'
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, serverTimestamp } from '@firebase/firestore';
import { db } from '../../firebase';
import { useRouter } from 'next/router';
import { ethers, BigNumber } from 'ethers';
import Lock from "../Lock.json";
import Gold from "../../components/Gold";
import Link from 'next/link'

function Own() {

    const [chat, setChat] = useState("General Chat");
    const [generalChat, setGeneralChat] = useState(true);
    const [accounts, setAccounts] = useState("");

    const [message, setMessage] = useState("");
    const [messageTwo, setMessageTwo] = useState("");
    const [allMessages, setAllMessages] = useState([]);
    const [allMessagesTwo, setAllMessagesTwo] = useState([]);

    const [calc, setCalc] = useState("0");

    const [unlocked, setUnlocked] = useState(true);

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
    const [writingsAdd, setWritingsAdd] = useState([]);

    const [querey, setQuerey] = useState("nic");
    const [error, setError] = useState("");
    const [getTotal, setGetTotal] = useState("");
    const [smartContract, setSmartContract] = useState("");
    
    const [getAllInfo, setGetAllInfo] = useState([]); 
    const [sold, setSold] = useState(false);

    const [totalSupply, setTotalSupply] = useState(0);
    const [totalSupplyTwo, setTotalSupplyTwo] = useState(0);

    const [bucket, setBucket] = useState(false);

    

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
    if (add < 1 && accounts[0] == getAllInfo.address) {
        add.push(e);
        setGetAddress(e.address);
    } else {
        alert("You are not the owner")
    }
    setRandom(!random);
    handleClick();
    console.log(accounts[0]);
    console.log(getAllInfo.address);
    
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
    type: "Add something",
}, {
    id: 2,
    color: "#055fad",
    type: "Link",
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
        setAccounts(account);
        fetchData();
    }
}

const fetchData = async () => {
      
    const docRef = doc(db, "blogs", postIds);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
    setTotalSupplyTwo(docSnap.data().id);
    console.log(totalSupply);
    } else {
    // doc.data() will be undefined in this case
    setSmartContract("No such document!");
    }
    
    setRandom(!random);
};



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
    addDoc(collection(db, "blogs", postIds, "comments"), {
        comment: inputComment,
        desc: selected,
        color: getColor,
        address: accounts,
      });
    setRandom(!random);
    setInputComment("");
}

const addNewOwner = async () => {
    if (accounts[0] == getAllInfo.address) {
        addDoc(collection(db, "blogs", postIds, "owners"), {
            address: getAddress,
          });
        setRandom(!random);
        setAdd([]);
     
        addDoc(collection(db, "blogs", postIds, "more"), {
            comment: add[0].comment,
            desc: add[0].desc,
            color: add[0].color,
            address: getAddress,
          });
    } else {
        alert("you are not the owner of this blog");
    }
    
    
    
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






let neki = "timo";




const address = "0xB20b2FE19a03F21ffBc31735fBF384DDdBec2fa9";


async function handleMint() {
    if (window.ethereum) {
            const account = await window.ethereum.request({
                method: "eth_requestAccounts",
            })
        setAccounts(account);
        fetchData();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            address,
            Lock.abi,
            signer
        );
        try {
            const response = await contract.mint([getAllInfo.id, getAllInfo.price, getAllInfo.image, getAllInfo.signature]);
            console.log("response: ", response);
            setUnlocked(true);
        } catch (err) {
            console.log("error: ", err);
        }
    }
}

async function handleMintMain() {
    if (window.ethereum) {
            const account = await window.ethereum.request({
                method: "eth_requestAccounts",
            })
        setAccounts(account);
        fetchData();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            address,
            Lock.abi,
            signer
        );
        try {
            const response = await contract.mint(getAllInfo.id, getAllInfo.image, getAllInfo.address);
            console.log("response: ", response);
            setUnlocked(true);
        } catch (err) {
            console.log("error: ", err);
        }
    }
}

async function handleOwners() {
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
            const response = await contract.addCoOwner(accounts[0]);
            console.log("response: ", response);
        } catch (err) {
            console.log("error: ", err);
        }
    }

    addNewOwner();
}

const router = useRouter();
const { postIds } = router.query;

  // useEffect will run on each render only if the `slug` changes,
  // so on initial render once `useRouter` has the query then it'll run the effect
  useEffect(() => {

    const fetchData = async () => {
      
        onSnapshot(collection(db, "blogs", postIds, "title"),
    
        (snapshot) => setTitle(snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
        }))))
      
    };

    if (postIds) {
      fetchData();
    }
  }, [postIds]);



  

  useEffect(() => {

    const fetchData = async () => {
      
        onSnapshot(collection(db, "blogs", postIds, "comments"),
    
    (snapshot) => setGetComments(snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
    }))))
      
    };

    if (postIds) {
      fetchData();
    }
  }, [postIds]);

  useEffect(() => {

    const fetchData = async () => {
      
        onSnapshot(collection(db, "blogs", postIds, "owners"),
    
    (snapshot) => setOwners(snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
    }))))
      
    };

    if (postIds) {
      fetchData();
    }
  }, [postIds]);

  useEffect(() => {

    const fetchData = async () => {
      
        onSnapshot(collection(db, "blogs", postIds, "more"),
    
    (snapshot) => setAddComment(snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
    }))))
      
    };

    if (postIds) {
      fetchData();
    }
  }, [postIds]);

  useEffect(() => {

    const fetchData = async () => {
      
        onSnapshot(collection(db, "blogs", postIds, "creator"),
    
    (snapshot) => setCreator(snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
    }))))
      
    };

    if (postIds) {
      fetchData();
    }
  }, [postIds]);



  {/*useEffect(() => {

    const fetchData = async () => {
      
        const docRef = doc(db, "blogs", postIds);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
        setTotalSupply(docSnap.data().id);
        console.log("8");
        } else {
        // doc.data() will be undefined in this case
        setSmartContract("No such document!");
        }
      
    };

    if (postIds) {
      fetchData();
    }
  }, [postIds]);*/}


  useEffect(() => {

    const fetchData = async () => {
      
        const collectionRef = collection(db, "blogs", postIds, "writings");
    const q = query(collectionRef, orderBy("timestamp"));

    const unsub = onSnapshot(q, (snapshot) =>
      setWritings(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );

    return unsub;
      
    };

    if (postIds) {
      fetchData();
    }
  }, [postIds]);




  useEffect(() => {

    const fetchData = async () => {
      
        const collectionRef = collection(db, "blogs", postIds, "add");
    const q = query(collectionRef, orderBy("timestamp"));

    const unsub = onSnapshot(q, (snapshot) =>
      setWritingsAdd(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );

    return unsub;
      
    };

    if (postIds) {
      fetchData();
    }
  }, [postIds]);



const testttt = () => {
    setQuerey(router.query.postIds);
    console.log(querey);
    setRandom(!random);
}



const provider = new ethers.providers.JsonRpcProvider("https://eth-goerli.g.alchemy.com/v2/C3B22DW-WlW_J0xdDCASSMsDnlvLKTVP")
const contractForNft = new ethers.Contract(address, Lock.abi, provider); 

const unlockGated = async () => {
    const first = await contractForNft.balanceOf(accounts[0], getAllInfo.id);
    if(ethers.utils.formatEther(first)* (10 ** 18) > 0){
        setUnlocked(true);
    } else {
        setError("You do not own an NFT")
    }
}

useEffect(() => {
    
    const neki = async () => {
        const getTotalSupply =  await contractForNft.mintedNfts(totalSupplyTwo);
        setTotalSupply(ethers.utils.formatEther(getTotalSupply)* (10 ** 18)) 
    }

    if (postIds) {
        neki();
      }

}, [postIds, random])



const test = async() => {

    const docRef = doc(db, "blogs", postIds);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
    setSmartContract(docSnap.data().contract);
    } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    }

}


useEffect(() => {

    const fetchData = async () => {
      
        const docRef = doc(db, "blogs", postIds);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
            setGetAllInfo(docSnap.data());
            console.log(getAllInfo.writings);
        } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        }
      
    };
  
    
    if (postIds) {
        fetchData();
      }
    
  }, [postIds]);


const addCoauthor = async () => {
    addDoc(collection(db, "blogs", postIds, "add"), {
        writings: add[0].comment,
        timestamp: serverTimestamp(),
        co: true,
      });
    setRandom(!random);
    setAdd([]);
}


const ref = useRef(null);

const handleClick = () => {
  ref.current?.scrollIntoView({
    behavior: "smooth",
    
  });
}



  return (
    <div className="">
        
        <div className="flex">
            
            <div className="middleTwo">
                <div className="absolute right-3 top-3 flex">
                    {
                        accounts ? (
                            <>
                            <div className="w-9 h-9 rounded-full bg-blue-300"></div>
                            <div>
                                <p className="ml-2 text-sm">{accounts[0].slice(0,4)}...{accounts[0].slice(accounts[0].length - 4, accounts[0].length)}</p>
                            </div>
                            </>
                        ) : <div onClick={connectMetamask} className="bg-gray-300 rounded-lg justify-center flex p-2 items-center hover:cursor-pointer hover:bg-gray-200">
                                <img className="w-8" src="https://i.postimg.cc/mrT1hFKC/Meta-Mask-Fox-svg-2.png" />
                                <p className="text-sm font-bold ml-1">Connect Metamask</p>
                            </div>
                    }
                    
                </div>
                <Link href="/">
                <div className="absolute left-3 top-3 flex">
                    <img src="https://i.postimg.cc/KzSwXFDx/Logo-Makr-1xya-Fv.png" className="h-8" />
                    
                </div>
                </Link>
                <div className="mainMiddleTwo">
                    <div className="width">
                    <img src={getAllInfo.slika} className=" w-full rounded-xl" />
                    <div className="items-end flex justify-between">
                        <div className="flex flex-col">
                            <div className="flex items-center">
                            <p className="mt-20 text-center rounded-full text-gray-500 p-1 text-md mr-2">Creator:</p>
                            <a target="_blank" href={`http://etherscan.io/address/${getAllInfo.address}`}  className="bg-gray-100 mt-20 text-center rounded-full text-gray-500 p-2 text-sm mr-2 hover:bg-gray-200 hover:cursor-pointer">{getAllInfo.address}</a>
                            </div>
                            <div className="flex mt-6">
                                {
                                    owners.length == 0 ? (
                                        <p></p>
                                    ) : (
                                        <p className=" text-center rounded-full text-gray-500 p-1 text-md mr-2">Co-Creator:</p>
                                    )
                                }
                            
                            <div className="flex flex-col">
                            {
                                owners.map((data, index) => {
                                    return <a target="_blank" href={`http://etherscan.io/address/${data.data.address}`} key={index} className="bg-gray-100 mb-3 text-center rounded-full text-gray-500 p-2 text-sm mr-2 hover:bg-gray-200 hover:cursor-pointer">{data.data.address}</a>
                                })
                            }
                            </div>
                            
                            </div>
                            {/*<div className="flex mt-3">
                                <p className=" text-center rounded-full text-gray-500 p-1 text-md mr-2">NFT address:</p>
                                
                                <a target="_blank" href={`http://etherscan.io/address/${smartContract}`} className="bg-gray-100 text-center rounded-full text-gray-500 p-2 text-sm mr-2 hover:bg-gray-200 hover:cursor-pointer">{smartContract}</a>
                                
                        </div>*/}
                           
                        </div>
                        
                        <div onClick={() => setSold(true)} className={`px-4 py-4 ${sold ? "bg-gray-400" : "bg-[#33626d]"} ${sold ? "hover:bg-gray-400" : "hover:bg-[#28525c]"} rounded-lg w-40 flex justify-center items-center text-white mt-10 hover:cursor-pointer`}>{sold ? "Sold out" : "Collect"}</div>
                    </div>
                    {
                        title.map((data, index) => {
                            return <p className="text-3xl font-semibold mt-10">{data.data.title}</p>
                        })
                    }
                    <p  dangerouslySetInnerHTML={{__html:getAllInfo.title}} className="text-3xl font-semibold mt-10" ></p>
                    {
                        writings.map((data, index) => {
                            return <p key={index} dangerouslySetInnerHTML={{__html:data.writings}} className="text-lg text-[#323232] mt-10" style={{borderLeftColor: data.co ? "lightblue" : "white", borderLeftWidth: 2, paddingLeft: data.co ? 10 : 0, paddingBottom: data.co ? 5 : 0}}></p>
                        })
                    }
                    <p  dangerouslySetInnerHTML={{__html:getAllInfo.writings}} className="text-lg text-[#323232] mt-10" ></p>
                    {
                        writingsAdd.map((data, index) => {
                            return <div style={{borderLeftColor: data.co ? "lightblue" : "white", borderLeftWidth: 1, paddingLeft: data.co ? 10 : 0, paddingBottom: data.co ? 5 : 0}}>
                                        <p key={index} className="text-lg text-[#323232] mt-10 py-3" >{data.writings}</p>
                                       
                                   </div>
                        })
                    }
                    
                    <div ref={ref}></div>
                    <div className="downWritingS">
                       {
                           addComment.map((data, index) => {
                            return <Gold key={index} desc={data.data.desc} color={"#FFDFBA"} comment={data.data.comment} address={data.data.address[0]} />
                        })
                       }
                        <div className="downWritingSS">
                    {
                            add.map((data, index) => {
                                return <WritingD closed={() => removeFrom(index)} coAuthor={addNewOwner} onClick={() => removeFrom(index)} key={index} desc={data.desc} color={data.color} comment={data.comment} address={data.address[0]} />
                            })
                        }
                        </div>
                        {/*{add.length > 0 ? 
                        <div className="flex">
                            <div onClick={addCoauthor} className="h-12 w-28 bg-gray-200 rounded-xl mt-0 justify-center items-center flex text-gray-600 text-sm hover:bg-gray-300 hover:cursor-pointer">Co-author</div>
                            <div onClick={addNewOwner} className="h-12 w-28 bg-blue-100 rounded-xl mt-0 justify-center items-center flex text-gray-600 text-sm hover:bg-gray-300 hover:cursor-pointer ml-4">Create NFT</div>
                        </div> : null}*/}
                    </div>
                    {/*<div onClick={handleMint} className="px-16 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg w-40 flex justify-center items-center text-white mt-14 hover:cursor-pointer">Collect</div>*/}
                    <div className="bg-gray-100 w-full py-10 mt-10 rounded-t-lg flex justify-around items-center">
                        <div className="w-1/2">
                          <div className="bg-gray-200 rounded-lg p-4">
                            <p className="font-bold text-xl">0.00 ETH</p>
                            <p className="text-sm text-gray-500">FREE</p>
                          </div>
                          <div className="bg-gray-200 rounded-lg p-4 mt-5">
                            {
                                accounts ? (
                                    <p className="font-bold text-xl">100/100</p>
                                ) : (
                                    <p>100/100</p>
                                )
                            }
                            <p className="text-sm text-gray-500">sold out</p>
                          </div>
                          <div onClick={() => setSold(true)}  className={`px-4 py-4 ${sold ? "bg-gray-400" : "bg-[#33626d]"} ${sold ? "hover:bg-gray-400" : "hover:bg-[#28525c]"} rounded-lg w-40 flex justify-center items-center text-white mt-10 hover:cursor-pointer`}>{sold ? "Sold out" : "Collect"}</div>
                        </div>
                        <div className=" rounded-lg w-72 h-72 bg-white justify-center items-center flex relative">
                          <img src="https://i.postimg.cc/TPJrPHJH/Logo-Makr-10.png" className="h-10 m-2 absolute top-0 left-0" />
                            {
                                title.map((data, index) => {
                                    return <p className="text-center px-12">{data.data.title}</p>
                                })
                            }
                        </div>
                    </div>
                    <div className="h-16 w-full bg-blue-600 bg-gradient-to-b from-gray-100 to-[#3E616C]"></div>
                    <div className="w-full h-80 bg-[#3E616C] rounded-b-lg justify-center items-center flex flex-col">
                        <img src="https://i.postimg.cc/9XbPzy3b/Logo-Makr-47n3jk-2.png" className="h-32" />
                        <p className="text-center w-64 text-white text-sm mt-2">Collect random thoughts, writings, quotes from the author</p>
                        <div onClick={() => setBucket(true)} className="border-[#F6E0C2] border px-10 py-2 mt-5 rounded-lg hover:cursor-pointer hover:bg-[#F6E0C2] hover:text-black text-white">
                            {bucket ? "Sold out" : "Collect"}
                        </div>
                    </div>
                    </div>
                    <div className="down">
                        
                        {
                            unlocked ? ( 
                                <>
                                <div className="inputComment">
                                    { accounts ? (
                                    <>
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
                                    </>) : (
                                     <div onClick={connectMetamask} className="bg-gray-300 rounded-lg justify-around flex p-2 items-center hover:cursor-pointer hover:bg-gray-200 px-4 w-40">
                                        <img className="w-8" src="https://i.postimg.cc/mrT1hFKC/Meta-Mask-Fox-svg-2.png" />
                                        <p className="text-sm font-bold ml-1">Comment</p>
                                    </div>
                                    ) }
                                </div>
                                 <div className="upper">
                                   
                        {
                            getComments.map((data, index) => {
                                return <WritingTwo onClick={() => addTo(data.data)} key={index} color={data.data.color} desc={data.data.desc} comment={data.data.comment} address={data.data.address[0]} />
                            })
                        }
                        </div>
                                </>
                            ) : (
                                <div className="downWriting">
                                    <p>{error}</p>
                                    {
                                        accounts ? (
                                            <div onClick={unlockGated} className="bg-gray-400 text-white px-10 py-4 rounded-lg hover:cursor-pointer hover:bg-gray-500">Unlock</div>
                                        ) : (
                                            <div onClick={connectMetamask} className="bg-gray-300 rounded-lg justify-center flex p-2 items-center hover:cursor-pointer hover:bg-gray-200">
                                                <img className="w-8" src="https://i.postimg.cc/mrT1hFKC/Meta-Mask-Fox-svg-2.png" />
                                                <p className="text-sm font-bold ml-1">Unlock gated content</p>
                                            </div>
                                        )
                                    }
                                    
                                    <div className="upper">
                                      <div className="blogs">
                                        <Writing desc={"Comment"} color={"gray"} comment={"Great Job Great Job Great Job Great Job Great Job Great Job Great Job Great Job"} />
                                        <Writing desc={"Link"} color={"gray"} comment={"Comment fasdf  asfasd fadfasdf adfasd fasdf asdfas dfas dfsdfsafasdfa sdf asfas fasdf asfasfdfasfsdffasdfasdf safasfsadfasdfasfasfad fasdfasdfasdfadfasdfasfsd fasdf   f Comment fasdf  asfasd fadfasdf adfasd fasdf asdfas dfas dfsdfsafasdfa sdf asfas fasdf asfasfdfasfsdffasdfasdf safasfsadfasdfasfasfad fasdfasdfasdfadfasdfasfsd fasdf   f"} />
                                      </div>
                                      <div className="blogs">
                                        <Writing desc={"Add something"} color={"gray"} comment={"ojla ojla ojla ojla ojla ojla ojla"} />
                                        <Writing desc={"Comment"} color={"gray"} comment={"fasdfasdf fasdfasdf fasdfasdf fasdfasdf fasdfasdf fasdfasdf fasdfasdf fasdfasdf fasdfasdf fasdfasdf fasdfasdf"} />
                                      </div>
                                    </div>
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