import { Switch } from 'antd';
import Link from 'next/link';
import React, {useState, useEffect, useRef, use} from 'react'
import Blog from '../components/Blog';
import Idea from '../components/Idea';
import { db } from '../firebase';
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, serverTimestamp, where } from '@firebase/firestore';
import { create } from 'ipfs-http-client'
import imagee from "../public/ai2.jpg";
import { ethers, BigNumber } from 'ethers';
import Award from "./Award.json";

function account() {

    const [accounts, setAccounts] = useState("");
    const [posts, setPosts] = useState([]);
    const [id, setId] = useState("7kBT4l8KJFkCL4qZW0CU");
    const [refresh, setRefresh] = useState(false);
    const [wallet, setWallet] = useState(0);
    const [balanceOverlay, setBalanceOverlay] = useState(false);



    // Connect with Metamask

    const connectMetamask = async() => {
        if (window.ethereum) {
            const account = await window.ethereum.request({
                method: "eth_requestAccounts",
            })
            setAccounts(account);
            setId(account);
        }

        setRefresh(!refresh);
      }





    // Get all the posts written by the signed Metamask account

    useEffect(() => {

        onSnapshot(collection(db, "accounts", id[0], "posts"),
    
        (snapshot) => setPosts(snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
        }))))

    }, [refresh]);

    

  

  // Get Balance and a chance to withdraw your funds

  function balanceAndWithdraw() {
    setBalanceOverlay(!balanceOverlay);
    getBalance();
  }

 

  // Smart Contract address

  const addressss = "0x5FbDB2315678afecb367f032d93F642f64180aa3";




  // Provider for smart contract

  const providerrr = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");




  // Interact with a smart contract

  const contractAward = new ethers.Contract(addressss, Award.abi, providerrr); 




  // Get Balance from Smart contract - wallet[address]

  const getBalance = async () => {
      const haha = await contractAward.wallet(accounts[0]);
      setWallet(ethers.utils.formatEther(haha) * 10 + 11);
      console.log(ethers.utils.formatEther(haha) * 10);
  };




  // Withdraw your funds function

  async function withdraw() {
    if (window.ethereum) {
            const account = await window.ethereum.request({
                method: "eth_requestAccounts",
            })
        setAccounts(account);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          addressss,
          Award.abi,
            signer
        );
        try {
            const response = await contract.withdraw();
            
            console.log(response);
            console.log(responseTwo);
            
        } catch (err) {
            console.log("error: ", err);
        }
    }
  }


  const [getMessages, setGetMessages] = useState([]);
  const [getGroups, setGetGroups] = useState([]);
  const [checkOwner, setCheckOwner] = useState(false);


  useEffect(() => {

    const fetchData = async () => {
      
        onSnapshot(collection(db, "accounts", accounts[0], "groups"),
    
    (snapshot) => setGetGroups(snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
    }))))
      
    };

    if (accounts) {
      fetchData();
    }
  }, [accounts]);




  const testestes = () => {
    const messagesQuery = query(
      collection(db, "allGroups", getGroups[0].id, "messages"),
      orderBy("timestamp", "asc") // Sort by timestamp in ascending order
    );
  
    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setGetMessages(messages);
    });
  
    setCheckOwner(true);
  
    return () => {
      // Unsubscribe from the Firestore listener when the component unmounts
      unsubscribe();
    };
  
    
  }; 
  
  
  
  const testestestest = () => {
      const messagesQuery = query(
        collection(db, "allGroups", getGroups[0].data.groupId, "messages"),
        orderBy("timestamp", "asc") // Sort by timestamp in ascending order
      );
    
      const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
        const messages = snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setGetMessages(messages);
      });
    
      return () => {
        // Unsubscribe from the Firestore listener when the component unmounts
        unsubscribe();
      };
    
      
    }; 


    const openGroup = () => {
        
        if (getGroups[0].data.owner.toUpperCase() == accounts[0].toUpperCase()) {
          testestes();
        } else {
          testestestest();
        }
    }


  



  return (
    <div className="acc">
        
      {balanceOverlay && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
          }}
          onClick={balanceAndWithdraw}>
              <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "500px",
              height: "300px",
              backgroundColor: "#f2f2f2",
              borderRadius: "10px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center"
            }}
        ><div className="flex-col items-center justify-center flex">
                <p className="text-xl">Your balance: {wallet}</p>
                <div onClick={withdraw} className="p-2 px-5 bg-blue-600 justify-center items-center rounded-xl mt-10 hover:cursor-pointer">
                    <p className="text-white">Withdraw</p>
                </div>
            </div>
        </div>
        
        </div>
      )}
                   
        <div className="mainUp" style={{paddingTop: 10, paddingBottom: 10}}>
        <div className=" flex" >
            
                    {
                        accounts ? (
                            <>
                            <div onClick={openGroup} className="w-11 h-11 rounded-full bg-blue-300 ml-4"></div>
                            <div>
                                <p className="ml-2 text-sm text-gray-500">{accounts[0].slice(0,4)}...{accounts[0].slice(accounts[0].length - 4, accounts[0].length)}</p>
                                <div className="ml-2 text-md text-black">
                                
                            </div>
                            </div>
                            {/*<div onClick={balanceAndWithdraw} className="flex items-center hover:bg-gray-200 p-2 rounded-xl cursor-pointer">
                            <div className="w-11 h-11 rounded-full bg-blue-300"></div>
                            <div>
                                <p className="ml-2 text-sm text-gray-500">{accounts[0].slice(0,4)}...{accounts[0].slice(accounts[0].length - 4, accounts[0].length)}</p>
                                <div className="ml-2 text-md text-black">
                                <p>Get balance</p>
                            </div>
                            </div>
                            
                        </div>*/}
                            
                            </>
                        ) : <div onClick={connectMetamask} className="border-gray-500 border rounded-lg justify-center flex p-2 items-center hover:cursor-pointer hover:bg-gray-200 text-gray-500 hover:text-black ml-4">
                                <img className="w-6" src="https://i.postimg.cc/mrT1hFKC/Meta-Mask-Fox-svg-2.png" />
                                <p className="text-xs font-bold ml-1">Connect Metamask</p>
                            </div>
                    }
                    
                </div>
                <Link href="/Add">
        <div className=" flex bg-[#12323b] p-3 rounded-xl hover:bg-[#254149] mr-4">
            <p className="text-white text-md px-3 py-1">Write a New Post</p>
        </div>
        
        </Link>
        </div>
        
        {
            posts.length == 0 ? (
                <div className="posts">
                    <img src="https://i.postimg.cc/cHgkvZz1/undraw-writer-q06d-removebg-preview.png" className="h-64 mt-0" />
                    <p>You have no posts.</p>
                </div>
            ) : (
                <div className="posts">
            
            <div className="postsTwo">
            <div className="flex mb-5 mt-32">
                <p className={`"text-[#46606B]"} mr-7 font-bold text-xl hover:cursor-pointer mt-5`}></p>
            </div>
            <div className="w-full">
            {
                            posts.map((data, index) => {
                                return <Link key={index} href={`/posts/${data.data.id}`}><Blog title={data.data.title} key={index} /></Link>
                            })
                        }
                </div>
            </div>
            <div className="w-full bg-white h-full flex flex-col justify-center items-center">
  <div className="flex flex-col flex-grow mt-28 w-full">
    <p className="mt-0 h-12 w-full bg-white border-gray-200 border-b">fsdafas</p>
    
    <div className="flex h-96 flex-col flex-grow overflow-y-auto" >
                                {getMessages.map((data, index) => {
                                    // Check if data.data.owner and accounts[0] are both strings and then compare them
                                    const isOwner =
                                    typeof data.data.owner === 'string' &&
                                    typeof accounts[0] === 'string' &&
                                    data.data.owner.toUpperCase() === accounts[0].toUpperCase();

                                    const messageClass = isOwner
                                    ? "bg-blue-500 text-white rounded-lg p-2 max-w-md self-end"
                                    : "bg-gray-200 text-black rounded-lg p-2 max-w-md self-start";

                                    const messageClassTwo = isOwner
                                    ? "text-gray-400 text-xs rounded-lg p-2 max-w-md self-end"
                                    : "text-gray-400 text-xs rounded-lg p-2 max-w-md self-start";

                                    return (
                                    <div key={index} className={`mb-0 flex ${isOwner ? "justify-end" : "justify-start"} items-center w-full p-2`}>
                                        {
                                            !isOwner && (
                                                data.data.isOwner ? (
                                                    <div className={`h-6 w-6 rounded-full mr-2 bg-black flex justify-center items-center`}>
                                                        <img src="https://i.postimg.cc/28fsnQtc/9rx-X5-X-Logo-Makr.png" className="h-3" />
                                                    </div>
                                                ) : (
                                                    <div className={`h-6 w-6 rounded-full mr-2`} style={{backgroundColor: data.data.color}}></div>
                                                )
                                            )
                                        }
                                        
                                        <div className="">
                                        <p className={messageClass}>{data.data.message}</p>
                                       
                                        </div>
                                       
                                    </div>
                                    );
                                })}
                            </div>
  </div>
  <input
    className="outline-none focus-border-gray-200 bg-gray-100 rounded-full pl-4 h-10 w-full mb-4"
    style={{ maxWidth: '98%' }}
    placeholder="Aa ..."
  />
</div>


        </div>
            )
        }
        
        
            
    </div>
  )
}

export default account