import React, { useEffect, useRef, useState } from 'react'


import Writing from "../../components/Writing"
import WritingTwo from '../../components/WritingTwo'
import WritingThree from '../../components/WritingThree'
import WritingD from '../../components/WritingD'
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, serverTimestamp } from '@firebase/firestore';
import { db } from '../../firebase';
import { useRouter } from 'next/router';
import { ethers, BigNumber } from 'ethers';
import Alwrite from "../Alwrite.json";
import Gold from "../../components/Gold";
import Link from 'next/link'
import Category from '../../components/Category'

import { ConnectWallet, useAddress, useNetworkMismatch, ChainId, useChain, useChainId, useSwitchChain } from "@thirdweb-dev/react";
import SunIcon from '../../components/icons/Sunicon'
import { Switch } from 'antd'
import MoonIcon from '../../components/icons/Moonicon'
import {Helmet} from "react-helmet";
import Head from 'next/head'
import Award from "../Award.json";

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

    const [allIdeas, setAllIdeas] = useState([]);
    const [ideaChange, setIdeaChange] = useState(false);

    const [mintNumber, setMintNumber] = useState(0);
    const [firstCheck, setFirstCheck] = useState(false);
    const [secondCheck, setSecondCheck] = useState(false);
    const [thirdCheck, setThirdCheck] = useState(false);
    const [royaltySilver, setRoyaltySilver] = useState(true);
    const [royaltySilverTwo, setRoyaltySilverTwo] = useState(true);

    const [firstMint, setFirstMint] = useState(true);
    const [secondMint, setSecondMint] = useState(false);
    const [thirdMint, setThirdMint] = useState(true);

    const [youStartFirst, setYouStartFirst] = useState(true);

    const [getInfo, setGetInfo] = useState([]);

    const [getMintNumber, setGetMintNumber] = useState(0);

    const [isDarkOverlayVisible, setIsDarkOverlayVisible] = useState(false);
    const [isDarkOverlayVisibleTwo, setIsDarkOverlayVisibleTwo] = useState(false);
    const [getNumber, setGetNumber] = useState("");

    const [getCategories, setGetCategories] = useState([]);
    const [randdd, setRanddd] = useState([]);

    const [testZa, setTestZa] = useState("");
    const [switchToOp, setSwitchToOp] = useState(false);
    const [errorr, setErrorr] = useState();

    const [changeNetNet, setChangeNetNet] = useState(false);
    const [isNightMode, setIsNightMode] = useState(false);

   

  

    

 



// Add co-author function - Not used currently

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


// Remove from adding a co-author function - Not used currently

const removeFrom = (e) => {
    add.splice(e, 1);
    addresses.splice(e, 1);
    setRandom(!random);
}



// Colors of different comments categoris - Add something, Link, Comment

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




// Get data for colored comments

const getData = (e, i) => {
    setSelected(e);
    setGetColor(i);
}



// Connect with Metamask

const connectMetamask = async() => {
    if (window.ethereum) {
        const account = await window.ethereum.request({
            method: "eth_requestAccounts",
        })
        setAccounts(account);
        
    }
}




// Comment function

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



// Add new co-author - Not used currently

const addNewOwner = async () => {

    if (window.ethereum) {
        const account = await window.ethereum.request({
            method: "eth_requestAccounts",
        })
    setAccounts(account);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
        goerliAddress,
        Alwrite.abi,
        signer
    );
    try {
        const response = contract.addAuthor(getAddress[0], getAllInfo.id);
        console.log(response);
        setUnlocked(true);

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
    } catch (err) {
        console.log("error: ", err);
    }
}    
    
}







// smart contract address

const address = "0xB20b2FE19a03F21ffBc31735fBF384DDdBec2fa9";






const router = useRouter();
const { postIds } = router.query;








  // Get all the comments of this post

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




  // Get all the owners/authors of the post - Currentyl only one

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



  // Comment added to the original post making the person who commented a co-author of the post - Not used currently

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







  // Get writings for posts on homepage

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




  // Get writings for all the posts except the posts on homepage

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






// Interact with smart contract info

const provider = new ethers.providers.JsonRpcProvider("https://eth-goerli.g.alchemy.com/v2/C3B22DW-WlW_J0xdDCASSMsDnlvLKTVP")
const contractForNft = new ethers.Contract(address, Alwrite.abi, provider); 





// Unlock gated content - Not used currently

const unlockGated = async () => {
    const first = await contractForNft.balanceOf(accounts[0], getAllInfo.id);
    if(ethers.utils.formatEther(first)* (10 ** 18) > 0){
        setUnlocked(true);
    } else {
        setError("You do not own an NFT")
    }
}





// Get all the data of a post

useEffect(() => {

    const fetchData = async () => {
      
        const docRef = doc(db, "blogs", postIds);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
            setGetAllInfo(docSnap.data());
            console.log(getAllInfo.id, getAllInfo.image, getAllInfo.address, 0);
            setIdeaChange(!ideaChange);
        } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        }
      
    };
  
    
    if (postIds) {
        fetchData();
      }
    
  }, [postIds]);







const ref = useRef(null);


// Scroll to this

const handleClick = () => {
  ref.current?.scrollIntoView({
    behavior: "smooth",
    
  });
}




// Smart contract addresses

const addresss = "0x67a074B718114fbb3D98776bEA1d4E733f09f49E";
const realAddress = "0x19A5aC322861fA701F62a9039A1F81902f91b3b9";

const goerliAddress ="0xefb3892159deAf0cbF8E65D34B56788470e73D2d";

const [changeNet, setChangeNet] = useState(false);






// Mint free NFT

async function handleMint() {
    if (window.ethereum) {
            const account = await window.ethereum.request({
                method: "eth_requestAccounts",
            })
        setAccounts(account);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            goerliAddress,
            Alwrite.abi,
            signer
        );
        try {
            const response = contract.mint(getAllInfo.id, getAllInfo.json, getAllInfo.address);
            console.log(response);
            setUnlocked(true);
        } catch (err) {
            console.log("error: ", err);
        }
    }
}








 // Overlay for random ideas NFT to choose from different categoris - Not used currently

  function handleDarkOverlayClick() {
    setIsDarkOverlayVisible(!isDarkOverlayVisible);
    fetchCategories();
    getMinted();
    setGetNumber(Math.floor(Math.random() * 3));
  }




// Overlay for Free NFT

  function handleDarkOverlayClickTwo() {
    setIsDarkOverlayVisibleTwo(!isDarkOverlayVisibleTwo);
  }




  // Get all categories for random NFTs - Not used currentyl

const fetchCategories = async () => {
    const ideasRef = collection(db, 'accounts', getAllInfo.address, "ideas");
    const snapshot = await getDocs(ideasRef);

    const categoriesSet = new Set();

    snapshot.docs.forEach((doc) => {
      const category = doc.data().category; // Replace with your actual field name
      if (category) {
        categoriesSet.add(category);
      }
    });

    const categoriesArray = Array.from(categoriesSet);
    setGetCategories(categoriesArray);
  };




  // Mint quote, thought, idea NFT 

  const queryData = async (id) => {
    // Initialize Firebase app
    if (window.ethereum) {
        const account = await window.ethereum.request({
            method: "eth_requestAccounts",
        })
    setAccounts(account);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
        goerliAddress,
        Alwrite.abi,
        signer
    );
    try {
        const testRef = collection(db, 'accounts', getAllInfo.address, id);
        const unsubscribe = onSnapshot(testRef, (snapshot) => {
        const updatedDataList = snapshot.docs.map((doc) => doc.data());
        const calc = Math.floor(Math.random() * updatedDataList.length);
        const response = contract.mint(updatedDataList[calc].id, updatedDataList[calc].image, updatedDataList[calc].address);
        console.log(response);
        });
        
        setUnlocked(true);
    } catch (err) {
        console.log("error: ", err);
    }
}
  
    // Cleanup function to unsubscribe from the snapshot listener
    return () => {
      unsubscribe();
    };
  };





  // Interact with smart contract info

  const providerr = new ethers.providers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/mKlWQflwnRw-lMHtYJWo9UzOVEoSEjPx")
  const contractForNftt = new ethers.Contract(addresss, Alwrite.abi, providerr); 




  // Get post from Alwrite.sol smart contract

  const getMinted = async () => {
    const first = await contractForNftt.posts(getAllInfo.id);
    setTestZa(first.minted ** 10);
  }


  
  // Different colors for category buttons

  const categoryColors = ["#59B6DF", "#6FCBC1", "#2D60B1"];
  




  // Networks informations

  const networks = {
    polygon: {
      chainId: `0x${Number(137).toString(16)}`,
      chainName: "Polygon Mainnet",
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18
      },
      rpcUrls: ["https://polygon-rpc.com/"],
      blockExplorerUrls: ["https://polygonscan.com/"]
    },
    optimism: {
      chainId: `0x${Number(5).toString(16)}`,
      chainName: "Goerli Test Network",
      nativeCurrency: {
        name: "Goerli",
        symbol: "ETH",
        decimals: 18
      },
      rpcUrls: [
        "https://ethereum-goerli.publicnode.com",
        "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      ],
      blockExplorerUrls: ["https://goerli.etherscan.io//"]
      
    }
    
  };
  
  



  // Change network function

  const changeNetwork = async ({ networkName, setErrorr }) => {
    try {
      if (!window.ethereum) throw new Error("No crypto wallet found");
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            ...networks[networkName]
          }
        ]
      });
    } catch (err) {
      setErrorr(err.message);
    }
  };
  
  
  
  
  

    // Chain info

    const addressChain = useAddress();
    const switchChain = useSwitchChain();
    const isWrongNetwork = useNetworkMismatch();





  // Change network

    useEffect(() => {
        if (isWrongNetwork && switchChain) {
            switchChain(ChainId.Goerli)
        }
    }, [addressChain, switchChain, isWrongNetwork])





    // Switch to Dark mode

  const toggleNightMode = () => {
    setIsNightMode(!isNightMode);
  };




  // Dark mode vs Light mode

  const appStyle = {
    backgroundColor: isNightMode ? '#1B1B1B' : '#fff',
    color: isNightMode ? '#A0A0A0' : '#333',
  };

  const appStyleTwo = {
    backgroundColor: isNightMode ? '#262626' : '#F3F3F3',
    color: isNightMode ? '#757575' : '#666666',
  };

  const appStyleThree = {
    backgroundColor: isNightMode ? '#2b2b2b' : '#F3F4F6',
    color: isNightMode ? '#fff' : '#000000',
  };

  const appStyleFour = {
    backgroundColor: isNightMode ? '#383838' : '#E5E7EB',
    color: isNightMode ? '#fff' : '#000000',
  };

  const appStyleFive = {
    backgroundColor: isNightMode ? '#525252' : '#E5E7EB',
    color: isNightMode ? '#fff' : '#000000',
  };

  const appStyleSix = {
      borderColor: isNightMode ? '#262626' : '#F3F3F3', 
  }

  const appStyleSeven = {
    height: 522,
    backgroundColor: isNightMode ? "#111111" : "#F3F4F6"
}





  // Photo changes of what you get when you mint

  const mintPhotoCHange = () => {
    setMintNumber(mintNumber + 1)
      if (getMintNumber == 0) {
          setFirstCheck(true);
          setRoyaltySilver(false);
      }
      if (getMintNumber == 9 && getAllInfo.royalty) {
        setSecondCheck(true);
        setRoyaltySilver(true);
        setRoyaltySilverTwo(false);
      }
      if (getMintNumber == 19) {
          setThirdCheck(true);
          setRoyaltySilverTwo(true);
      }
      if (getMintNumber == 19 && !getAllInfo.royalty) {
        setRoyaltySilver(true);
        setRoyaltySilverTwo(false);
      }

  }





  
  // Interact with smart contract

  const addressss = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const providerrr = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");

  const contractAward = new ethers.Contract(addressss, Award.abi, providerrr); 



  


// Collect function

async function collect() {
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
          console.log(getAllInfo.address, getAllInfo.id, getAllInfo.oneofone, getAllInfo.urlOneofOne, getAllInfo.idOne, getAllInfo.royalty, getAllInfo.royaltyNumber, getAllInfo.quote, getAllInfo.urlQuote, getAllInfo.idTwo, getAllInfo.signature);
          const response = await contract.mintTwo("0x1b8163f3f7ae29af06c50df4ae5e0fe9375f8496", 9595, true, "https://timomarket.infura-ipfs.io/ipfs/QmSNrrge9Ut6M5U19tAkZUYgLMYv3bmqyNPHY1FciVPK9e", 7088, true, 5, true, "https://timomarket.infura-ipfs.io/ipfs/Qmbo9piTPyx4B9VWxdED2e5mawmNk6kHdgqcyzJGUm29gC", 8457, "0x388323e2011e601363ec071a8e5ff5f3bfa89b93466a25ba5cf34e29185c435e3efebb52020d5e181d9cfafa90729928c9feb03f6ab6420f43852f0322dbcf8c1c");
          const responseTwo = await contract.totalSupplyOf(9595);
          console.log(response);
          console.log(responseTwo);
          
      } catch (err) {
          console.log("error: ", err);
      }
  }

  mintPhotoCHange();
}







// Get Mint Number

useEffect(() => {

    const fetchData = async () => {
      const haha = await contractAward.totalSupplyOf(BigNumber.from(9595));
      setGetMintNumber(ethers.utils.formatEther(haha) * 10);
      console.log(ethers.utils.formatEther(haha) * 10);
    };

    if (postIds) {
      fetchData();
    }
  }, [postIds]);





  const mintOptions = [{
        id: 1,  
        title: "One of one NFT",
        desc: "One person gets a One-of-One collectible post.",
        show: getAllInfo.oneofone,
        sold: getMintNumber > 10 ? true : false || getAllInfo.sold,
  }, {
      id: 2,
      title: "5% royalties",
      desc: "Ten people share 5% royalties of sales.",
      show: getAllInfo.royalty,
      sold: false || getAllInfo.sold
  }, {
      id: 3,
      title: "Quotes, thoughts, ideas",
      desc: "Mint a unique NFT.",
      show: getAllInfo.quote,
      sold: false || getAllInfo.sold
  } , {
    id: 4,
    title: "Basic collectible",
    desc: "Mint collectible post of this article.",
    show: getAllInfo.quote,
    sold: false || getAllInfo.sold,
    basic: true,
}]


  const [selectedOption, setSelectedOption] = useState(4);


  


  const checkforsold = (prodano, data) => {
      if (!prodano) {
          setSelectedOption(data)
      }
  }
 


  return (
    <div className="">
        <Head>
        <meta property="og:image" content={"https://i.postimg.cc/XJ16n9s5/maxresdefault-5.jpg"} />
      </Head>
        <div>
      {isDarkOverlayVisible && (
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
          >
              <div className="trying"
            
        ><div className="collectRandom">
            <img onClick={handleDarkOverlayClick} src="https://i.postimg.cc/gJSYJMXn/Logo-Makr-2-YVf-U2.png" className="absolute top-4 right-4 h-8 hover:cursor-pointer" />
            <div className="flex-col items-center justify-center flex w-1/2">
                <p className="mt-0 text-center text-lg">Choose a category</p>
                <div className="flex mt-10 flex-wrap items-center justify-center w-80">
                   {
                       addressChain ? (
<div>
                            {
                                getCategories.length == 0 ? (
                                    <div className="items-center flex flex-col">
                                        <img src="https://i.postimg.cc/QtFQB8YW/undraw-No-data-re-kwbl-removebg-preview.png" className="h-36" />
                                        <p className="text-sm mt-2 text-gray-400">No current categories</p>
                                    </div>
                                ) : (
                                    getCategories.map((data, index) => {
                                        return <Category wrongColor={"gray"} wrong={isWrongNetwork} query={() => queryData(data)} key={index} data={isWrongNetwork ? "Switch to Goerli" : data} color={categoryColors[getNumber]} />
                                    })
                                )
                                
                            }</div>
                       ) : (
                        <ConnectWallet
                                    theme="dark"
                                    btnTitle="Connect to Metamask"
                                    style={{marginTop: 30, backgroundColor: "gray", color: "white"}}
                                    />
                       )
                   }
                            
                       
                    
                
                
                </div>
            </div>
            <div className="authorWritings">
            <div className="container flex justify-center items-center w-72 h-72 rounded-lg">
                        <img src="https://i.postimg.cc/02HwzXqj/bm-Ba6tj3-E7zj-ZKSJoq-F3-2-8fnt1.jpg" alt="Your Image" className="aiphoto" />
                        <div className="absolute text-white text-md font-bold w-60 text-center">Collect random thoughts, writings, quotes from the author</div>
                        </div>
                        <p className="text-xs text-gray-500 w-72 text-center mt-2">Collect author's ideas with AI generated background</p>
            </div>
            </div>
        </div>
        
        </div>
      )}

{isDarkOverlayVisibleTwo && (
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
          >
          
              <div className="tryingTwo"
            
        ><div className="flex-col items-center justify-center flex">
              <div className="flex flex-wrap items-center justify-center  flex-col mt-4">
                <img onClick={handleDarkOverlayClickTwo} src="https://i.postimg.cc/gJSYJMXn/Logo-Makr-2-YVf-U2.png" className="absolute top-4 right-4 h-8 hover:cursor-pointer" />
                <div className="collectTitle">
                          <img src="https://i.postimg.cc/TPJrPHJH/Logo-Makr-10.png" className="h-10 m-2 absolute top-0 left-0" />
                          {/*<p className="text-center px-12">{getAllInfo.title}</p>*/}
                          <p className="text-center px-12">{getAllInfo.title}</p>
                          {/*<p className="text-center px-12 text-xs mt-2 text-gray-500">{postIds}</p>*/}
                        </div>
                        
                            {
                                addressChain ? (
<button disabled={isWrongNetwork} onClick={handleMint} style={{backgroundColor: isWrongNetwork ? "gray" : "#33626d"}} className="mt-8 bg-[#33626d] text-white p-2 justify-center items-center flex px-10 py-3 rounded-xl cursor-pointer hover:bg-[#28555f]">{isWrongNetwork ? "Switch to Goerli Network" : "Collect"} </button>
                                ) : (
                                    <ConnectWallet
                                    theme="dark"
                                    btnTitle="Metamask"
                                    style={{marginTop: 30, backgroundColor: "gray", color: "white"}}
                                    />
                                )
                            }

                            
                       
                            
                        
                        
                </div>
                
                
                
            </div>
        </div>
        
        </div>
      )}
        <div className="flex">
        
            <div className="middleTwo" style={appStyle}>
                {/*<div className="absolute right-3 top-3 flex">
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
                    
                </div>*/}
                <Link href="/">
                <div className="absolute left-3 top-3 flex">
                    <img src="https://i.postimg.cc/KzSwXFDx/Logo-Makr-1xya-Fv.png" className="h-8" />
                    
                </div>
                </Link>
                <div className="flex items-center right-5 top-5 absolute">
                <SunIcon />
      <label className="toggle-switch">
      <input type="checkbox" checked={isNightMode} onChange={toggleNightMode} />
      <span className="switch" />
    </label>
      <MoonIcon />
                </div>
                <div className="mainMiddleTwo">
                    <div className="width">
                    <img src={getAllInfo.slika} className=" w-full rounded-xl" />
                    
                    
                    <p  dangerouslySetInnerHTML={{__html:getAllInfo.title}} className="text-5xl font-semibold mt-10" ></p>
                    <div className="items-end flex justify-between">
                        <div className="flex flex-col">
                            <div className="flex items-center">
                            <p className="mt-20 text-center rounded-full text-gray-500 p-1 text-md mr-2">Creator:</p>
                            <a target="_blank" href={`http://etherscan.io/address/${getAllInfo.address}`} style={appStyleTwo}  className="textCreator">{getAllInfo.address}</a>
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
                                    return <a style={appStyleTwo} target="_blank" href={`http://etherscan.io/address/${data.data.address}`} key={index} className="textCreatorCo">{data.data.address}</a>
                                })
                            }
                            </div>
                            
                            </div>
                            {/*<div className="flex mt-3">
                                <p className=" text-center rounded-full text-gray-500 p-1 text-md mr-2">NFT address:</p>
                                
                                <a target="_blank" href={`http://etherscan.io/address/${smartContract}`} className="bg-gray-100 text-center rounded-full text-gray-500 p-2 text-sm mr-2 hover:bg-gray-200 hover:cursor-pointer">{smartContract}</a>
                                
                        </div>*/}
                           
                        </div>
                        
                        {/*<div onClick={() => setSold(true)} className={`px-4 py-4 ${sold ? "bg-gray-400" : "bg-[#33626d]"} ${sold ? "hover:bg-gray-400" : "hover:bg-[#28525c]"} rounded-lg w-40 flex justify-center items-center text-white mt-10 mb-3 hover:cursor-pointer`}>{sold ? "Sold out" : "Collect"}</div>*/}
                    </div>
                    {
                        writings.map((data, index) => {
                            return <p key={index} dangerouslySetInnerHTML={{__html:data.writings}} style={appStyle} className="text-lg text-[#323232] mt-10" ></p>
                        })
                    }
                    <p  dangerouslySetInnerHTML={{__html:getAllInfo.writings}} style={appStyle} className="text-lg text-[#323232] mt-10" ></p>
                    {
                        writingsAdd.map((data, index) => {
                            return <div style={{borderLeftColor: data.co ? "lightblue" : "white", borderLeftWidth: 1, paddingLeft: data.co ? 10 : 0, paddingBottom: data.co ? 5 : 0}}>
                                        <p key={index} className="text-lg text-[#323232] mt-10 py-3" >{data.writings}</p>
                                       
                                   </div>
                        })
                    }
                    
                    <div ref={ref}></div>
                    <div className="downWritingS" style={appStyleSix}>
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
                    {/*<div className="collect" style={appStyleThree}>
                        <div className="collectWidth">
                          <div className="bg-gray-200 rounded-lg p-4" style={appStyleFour}>
                            <p className="font-bold text-xl">0.00 ETH</p>
                            <p className="text-sm text-gray-500">FREE</p>
                          </div>
                          <div className="bg-gray-200 rounded-lg p-4 mt-5" style={appStyleFour}>
                            {
                                accounts ? (
                                    <p className="font-bold text-xl">/</p>
                                ) : (
                                    <p>/</p>
                                )
                            }
                            <p className="text-sm text-gray-500">collection size</p>
                          </div>
                          <div onClick={handleDarkOverlayClick}  className={`px-4 py-4 ${sold ? "bg-gray-400" : "bg-[#33626d]"} ${sold ? "hover:bg-gray-400" : "hover:bg-[#28525c]"} rounded-lg w-40 flex justify-center items-center text-white mt-10 hover:cursor-pointer`}>{sold ? "Sold out" : "Collect"}</div>
                        </div>
                        <div className="container flex justify-center items-center w-72 h-72 rounded-lg">
                        <img src="https://i.postimg.cc/bY9G05HL/2-VJZq2m-Zkam-Heh-XTDRwd-4-vxtpo.jpg" alt="Your Image" className="imageCollect" />
                        <div className="absolute text-white text-md font-bold w-60 text-center">Collect random thoughts, writings, quotes from the author</div>
                        </div>
                        
                    </div>
                    <div className="bg-[#F3F4F6] mt-4 rounded-lg p-6">
                        <div className="flex items-center justify-between">
                            <div className="mt-2">
                                <h1 className="text-xl text-black font-semibold">One of one NFT</h1>
                                <p className="text-sm text-[#AFAFAF] mt-2">First person gets one of one collectable post</p>
                            </div>
                            <div className="flex items-center">
                                <p className="font-semibold text-2xl mr-7 text-black border-r border-gray-300 pr-7">1/1</p>
                                <img src="https://i.postimg.cc/VvxQ3L1t/5610944.png" className="w-8" />
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-8">
                            <div className="mt-2">
                                <h1 className="font-semibold text-xl text-black">5% royalties</h1>
                                <p className="text-sm text-[#AFAFAF] mt-2">First 10 people gets 5% royalties of sales</p>
                            </div>
                            <div className="flex items-center">
                                <p className="font-semibold text-2xl mr-7 text-black border-r border-gray-300 pr-7">4/10</p>
                                <img src="https://i.postimg.cc/VvxQ3L1t/5610944.png" className="w-8" />
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-8 mb-4">
                            <div className="mt-2">
                                <h1 className="font-semibold text-xl text-black">Quote, thoughts, ideas</h1>
                                <p className="text-sm text-[#AFAFAF] mt-2">First 100 people gets one of one collectable post</p>
                            </div>
                            <div className="flex items-center">
                                <p className="font-semibold text-2xl mr-7 text-black border-r border-gray-300 pr-7">/</p>
                                <div className="w-8 h-8 border-[#B3B3B3] border rounded-full"></div>
                            </div>
                        </div>
                        </div>*/}
                    <div className="mintInfo">
                        <div className="bg-[#F3F4F6] mt-4 rounded-lg p-6 w-full mr-2 justify-center flex flex-col items-center" style={{height: 520}}>
                        <div className="container flex justify-center items-center w-72 h-72 rounded-lg">
                        
                        {/*{
                            getMintNumber * 100000000000000000 == 0 && getAllInfo.oneofone ? (
                                <div className="collectTitle">
                          <img src="https://i.postimg.cc/TPJrPHJH/Logo-Makr-10.png" className="h-10 m-2 absolute top-0 left-0" />
                   
                          <p className="text-center px-12 text-yellow-500">{getAllInfo.title}</p>
                      
                        </div>
                            ) : getMintNumber * 100000000000000000 < 2 && getAllInfo.royalty ? (
                                <div className="flex flex-col items-center">
                                <div className="items-center flex justify-center">
                                    <img src="https://i.postimg.cc/bY9G05HL/2-VJZq2m-Zkam-Heh-XTDRwd-4-vxtpo.jpg" alt="Your Image" className="imageCollect" style={{width: 200}} />
                                    <div className="absolute text-white text-xs font-bold w-48 text-center">Collect random thoughts, writings, quotes from the author</div>
                                </div>
                                <p className="mt-2 text-2xl">+</p>
                                <p className="mt-2 text-lg text-center text-gray-700">5% royalties (100 mints above)</p>
                                </div>
                            ) : getMintNumber * 100000000000000000 >= 3 || (getMintNumber * 100000000000000000 >= 1 && !getAllInfo.quote && !getAllInfo.royalty) || (secondCheck && !getAllInfo.oneofone && !getAllInfo.quote) ? (
                                <p className="text-gray-400 text-xl ">Sold out</p>
                            ) : (
<>
                                <img src="https://i.postimg.cc/bY9G05HL/2-VJZq2m-Zkam-Heh-XTDRwd-4-vxtpo.jpg" alt="Your Image" className="imageCollect" />
                        <div className="absolute text-white text-md font-bold w-60 text-center">Collect random thoughts, writings, quotes from the author</div>
                                </>
                            )
                        }
                       */}

{
                            selectedOption == 1 ? (
                                <div className="collectTitle">
                          <img src="https://i.postimg.cc/TPJrPHJH/Logo-Makr-10.png" className="h-10 m-2 absolute top-0 left-0" />
                   
                          <p className="text-center px-12 text-yellow-500">{getAllInfo.title}</p>
                      
                        </div>
                            ) : selectedOption == 2 ? (
                                <div className="flex flex-col items-center">
                                <div className="collectTitle" style={{height: 200, width: 200}}>
                          <img src="https://i.postimg.cc/TPJrPHJH/Logo-Makr-10.png" className="h-10 m-2 absolute top-0 left-0" />
                          {/*<p className="text-center px-12">{getAllInfo.title}</p>*/}
                          <p className="text-center px-12">{getAllInfo.title}</p>
                          {/*<p className="text-center px-12 text-xs mt-2 text-gray-500">{postIds}</p>*/}
                        </div>
                                
                                <p className="mt-2 text-2xl font-bold">+</p>
                                <p className="mt-2 text-lg text-center text-gray-700 font-bold">5% royalties</p>
                                </div>
                            ) : getMintNumber > 111 || getAllInfo.sold ? (
                                <p className="text-gray-400 text-xl ">Sold out</p>
                            ) : selectedOption == 4 ? (
                                <div className="collectTitle" style={{height: 300, width: 300}}>
                          <img src="https://i.postimg.cc/TPJrPHJH/Logo-Makr-10.png" className="h-10 m-2 absolute top-0 left-0" />
                          {/*<p className="text-center px-12">{getAllInfo.title}</p>*/}
                          <p className="text-center px-12">{getAllInfo.title}</p>
                          {/*<p className="text-center px-12 text-xs mt-2 text-gray-500">{postIds}</p>*/}
                        </div>
                            ) : (
<>
                                <img src="https://i.postimg.cc/bY9G05HL/2-VJZq2m-Zkam-Heh-XTDRwd-4-vxtpo.jpg" alt="Your Image" className="imageCollect" />
                        <div className="absolute text-white text-md font-bold w-60 text-center">Collect random thoughts, writings, quotes from the author</div>
                                </>
                            )
                        }

                        </div>
                        <div className="border-t border-gray-300 w-full mt-10"></div>
                        <button onClick={collect} disabled={getAllInfo.sold}  className={`px-4 py-4 ${getAllInfo.sold ? "bg-gray-400" : "bg-[#589ead]"} ${getAllInfo.sold ? "hover:bg-gray-400" : "hover:bg-[#28525c]"} rounded-lg w-40 flex justify-center items-center text-white mt-4 hover:cursor-pointer`}>{sold ? "Sold out" : "Collect"}{" "}</button>
                        <p className="mt-3 text-xs text-gray-500">Number of collectibles sold: {getMintNumber * 100000000000000000}</p>
                        </div>
                        <div className="bg-[#F3F4F6]  mt-4 rounded-lg p-0 w-full ml-2 justify-center items-center flex" style={{height: 520}} >
                      
                       
                            
                            <div>
                        
                              {
                                  mintOptions.map((data, index) => {
                                      return <div onClick={() => checkforsold(data.sold, data.id)} key={index} className={`${data.show ? "flex" : "hidden"} items-center justify-between mb-4 mt-4 ${data.sold ? null : "hover:bg-gray-200"}  p-4  ${data.sold ? "cursor-no-drop" : "cursor-pointer"} ${data.basic ? "border-t" : null} border-gray-300`}>
                                                <div>
                                                    <h1 className={`font-semibold text-lg  ${data.sold ? "text-gray-400" : "text-black"}`}>{data.title}</h1>
                                                    <p className={`text-sm  mt-2 w-2/3 ${data.sold ? "text-[#c7c7c7]" : "text-[#919191]"}  `}>{data.desc}</p>
                                                </div>
                                                {
                                                    data.sold ? (
                                                        null
                                                    ) : (
                                                        <div>
                                                        {
                                                            selectedOption == data.id ? (
                                                                <img src="https://i.postimg.cc/VvxQ3L1t/5610944.png" className="w-8" /> 
                                                            ) : ( 
                                                                <div className="w-8 h-8 border-[#B3B3B3] border rounded-full"></div>
                                                            )
                                                        }
                                                       
                                                    </div>
                                                    )
                                                }
                                               
                                            </div>
                                  })
                              }
                              </div>
                        
                            {/*<div className="bg-[rgb(243,244,246)] mt-0 rounded-lg p-6">
                        {
                            getAllInfo.oneofone ? (
                        <div className={`flex items-center justify-between  mb-10 mt-10`}>
                            <div className="mt-0">
                                <h1 className={`text-lg ${getMintNumber >= 1 ? "text-gray-400" : "text-black"} font-semibold`}>One of one NFT</h1>
                                <p className={`text-sm mt-2 w-2/3 ${getMintNumber >= 1 ? "text-[#c7c7c7]" : "text-[#919191]"}`}>First person gets one of one collectable post</p>
                            </div>
                            <div className="flex items-center">
                                {
                                    getMintNumber * 100000000000000000 >= 1 ? (
<img src="https://i.postimg.cc/VvxQ3L1t/5610944.png" className="w-8" />
                                    ) : (
                                        <div className="w-8 h-8 border-[#B3B3B3] border rounded-full"></div>
                                    )
                                } 
                                
                            </div>
                        </div> ) : (
                            null
                        )
                        }
                        <div className={`${getAllInfo.royalty ? "flex" : "hidden"} items-center justify-between mb-10 mt-10`}>
                            {
                                getAllInfo.oneofone == false ? (
                            <div className="mt-0">      
                                <h1 className={`font-semibold text-lg ${royaltySilverTwo && getMintNumber < 10 ? "text-black" : "text-gray-400"}`}>5% royalties</h1>
                                <p className={`text-sm text-[#c7c7c7] mt-2 w-2/3 ${royaltySilverTwo && getMintNumber < 10 ? "text-[#919191]" : "text-[#c7c7c7]"}`}>First 10 people gets 5% royalties of sales</p>
                            </div>
                                ) : (
                            <div className="mt-0">
                                <h1 className={`font-semibold text-lg text-gray-400 ${getMintNumber * 100000000000000000 >= 1 ? "text-black" : "text-gray-400"} `}>5% royalties</h1>
                                <p className={`text-sm text-[#c7c7c7] mt-2 w-2/3 ${getMintNumber * 100000000000000000 >= 1 ? "text-[#919191]" : "text-[#c7c7c7]"}`}>First 10 people gets 5% royalties of sales</p>
                            </div>
                                )
                            }
                            
                            <div className="flex items-center">


                            {
                                getAllInfo.oneofone == false ? (
                            <div>
                           
                            {
                                    getMintNumber * 100000000000000000 >= 2 ? (
<img src="https://i.postimg.cc/VvxQ3L1t/5610944.png" className="w-8" />
                                    ) : (
                                        <div>
                                        <div className="w-8 h-8 border-[#B3B3B3] border rounded-full"></div>
                                        </div>
                                    )
                                } 
                            </div>) : (
                                <div>
                           
                                {
                                        getMintNumber * 100000000000000000 >= 2 ? (
    <img src="https://i.postimg.cc/VvxQ3L1t/5610944.png" className="w-8" />
                                        ) : (
                                            <div>
                                            {
                                                getMintNumber * 100000000000000000 >= 1 ? (
                                                    <div className="w-8 h-8 border-[#B3B3B3] border rounded-full"></div>
                                                ) : (
                                                    <div></div>
                                                )
                                            }
                                            </div>
                                        )
                                    } 
                                </div>
                            )}
                            </div>
                        </div>
                        <div className={`${getAllInfo.quote ? "flex" : "hidden"} items-center justify-between mb-10 mt-10`}>
                            {
                                getAllInfo.royalty == false && getAllInfo.oneofone == false ? (
                                    <div className="mt-0">
                                    <>
                                                <h1 className={`font-semibold text-lg  ${getMintNumber >= 20 ? "text-gray-400" : "text-black"}`}>Quote, thoughts, ideas</h1>
                                                <p className={`text-sm  mt-2 w-2/3 ${getMintNumber >= 20 ? "text-[#c7c7c7]" : "text-[#919191]"}`}>First 100 people gets one of one collectable post</p>
                                            </>
                                    
                                </div>
                                ) : (
                                    <div className="mt-0">
                                    {
                                        !getAllInfo.royalty ? (
                                            <>
                                                <h1 className={`font-semibold text-lg  ${royaltySilver ? "text-gray-400" : "text-black"}`}>Quote, thoughts, ideas</h1>
                                                <p className={`text-sm  mt-2 w-2/3 ${royaltySilver ? "text-[#c7c7c7]" : "text-[#919191]"}`}>First 100 people gets one of one collectable post</p>
                                            </>
                                        ) : (
    <>
                                                <h1 className={`font-semibold text-lg  ${getMintNumber * 100000000000000000 >= 2 ? "text-black" : "text-gray-400"}`}>Quote, thoughts, ideas</h1>
                                                <p className={`text-sm  mt-2 w-2/3 ${getMintNumber * 100000000000000000 >= 2 ? "text-[#919191]" : "text-[#c7c7c7]"}`}>First 100 people gets one of one collectable post</p>
                                            </>
                                        )
    
                                        
                                    }
                                    
                                </div>
                                )
                            }
                           
                            <div className="flex items-center">
                                {
                                    !getAllInfo.royalty && getMintNumber * 100000000000000000 >= 1 || (getAllInfo.royalty == false && getAllInfo.oneofone == false) ? (
                            <div>
                              
                            {
                                    thirdCheck ? (
<img src="https://i.postimg.cc/VvxQ3L1t/5610944.png" className="w-8" />
                                    ) : (
                                        <div>
                                        <div className="w-8 h-8 border-[#B3B3B3] border rounded-full"></div>
                                        </div>
                                    )
                                } 
                                </div> ) : (
                                    <div>
                              
                                    {
                                            getMintNumber * 100000000000000000 >= 3 ? (
        <img src="https://i.postimg.cc/VvxQ3L1t/5610944.png" className="w-8" />
                                            ) : (
                                                <div>
                                                {
                                                    getMintNumber * 100000000000000000 >= 2 ? (
                                                        <div className="w-8 h-8 border-[#B3B3B3] border rounded-full"></div>
                                                    ) : (
                                                        <div></div>
                                                    )
                                                }
                                                </div>
                                            )
                                        } 
                                        </div>
                                )}
                            </div>
                            
                        </div>
                                    </div>*/}</div>
                    </div>
                    <div style={appStyleThree} className="bg-gray-100 w-full mt-4 rounded-lg py-4 flex justify-between items-center hidden">
                        <div>
                        <div className="ml-5 font-bold">Collect this post</div>
                        <div className="ml-5 text-sm text-gray-600">{getAllInfo.title}</div>
                        </div>
                        <div style={appStyleFive} onClick={handleDarkOverlayClickTwo} className="mr-5 bg-gray-200 p-2 px-7 rounded-lg hover:bg-gray-300 text-gray-600 cursor-pointer hover:px-8 transition-all">Free</div>
                    </div>
                   {/* <div className="text-center mt-20 border-t border-gray-200 pt-10 flex flex-col items-center justify-center">
                        <p className="text-sm text-gray-500">Don`t have Goerli?</p>
                        <a href="https://goerlifaucet.com/" target="_blank" className="bg-[#4e4e4e] py-4 w-56 items-center justify-center text-center text-white p-0 mt-4 flex rounded-full">
                            <p className="text-sm text-white uppercase">Get Goerli for free</p>
                        </a>
                        <div>
                        
                        </div>
                        
                                </div>*/}
                   
                    {/*<div className="h-16 w-full bg-blue-600 bg-gradient-to-b from-gray-100 to-[#3E616C]"></div>
                    <div className="w-full h-80 bg-[#3E616C] rounded-b-lg justify-center items-center flex flex-col">
                        <img src="https://i.postimg.cc/9XbPzy3b/Logo-Makr-47n3jk-2.png" className="h-32" />
                        <p className="text-center w-64 text-white text-sm mt-2">Collect random thoughts, writings, quotes from the author</p>
                        <div onClick={() => setBucket(true)} className="border-[#F6E0C2] border px-10 py-2 mt-5 rounded-lg hover:cursor-pointer hover:bg-[#F6E0C2] hover:text-black text-white">
                            {bucket ? "Sold out" : "Collect"}
                        </div>
                        </div>*/}
                        </div>
                    
                    <div className="down">
                        
                        {
                            unlocked ? ( 
                                <>
                                <div className="inputComment">
                                    { accounts ? (
                                    <>
                                    <p className="text-3xl text-black">Join the discussion</p>
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
                                    <>
                                     {/*<p>Write something insightful and author of this post can add your comment to the article, making you a co-author.</p>*/}
                                     <p>Write something insightful 🙂</p>
                                     <div onClick={connectMetamask} className="border-gray-500 border rounded-lg justify-around flex p-2 items-center hover:cursor-pointer hover:bg-gray-200 px-4 w-36 mt-6">
                                        <img className="w-8" src="https://i.postimg.cc/mrT1hFKC/Meta-Mask-Fox-svg-2.png" />
                                        <p className="text-sm font-light ml-1">Comment</p>
                                    </div>
                                    </>
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
    </div>
  )
}

export default Own

  
