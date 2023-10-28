import React, { useEffect, useRef, useState } from 'react'


import Writing from "../../components/Writing"
import WritingTwo from '../../components/WritingTwo'
import WritingThree from '../../components/WritingThree'
import WritingD from '../../components/WritingD'
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, serverTimestamp, deleteDoc } from '@firebase/firestore';
import { db } from '../../firebase';
import { useRouter } from 'next/router';
import { ethers, BigNumber } from 'ethers';
import Alwrite from "../Alwrite.json";
import Gold from "../../components/Gold";
import Link from 'next/link'
import Category from '../../components/Category'
import { Goerli, Optimism } from "@thirdweb-dev/chains";

import { ConnectWallet, useAddress, useNetworkMismatch, ChainId, useChain, useChainId, useSwitchChain } from "@thirdweb-dev/react";
import SunIcon from '../../components/icons/Sunicon'
import { Switch } from 'antd'
import MoonIcon from '../../components/icons/Moonicon'
import {Helmet} from "react-helmet";
import Head from 'next/head'
import Award from "../Award.json";
import AlwriteGoerli from "../AlwriteGoerli.json";
import AlwriteContract from "../AlwriteContract.json"
import AlwriteTwo from "../AlwriteTwo.json"

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
    const [getMintNumberBasic, setGetMintNumberBasic] = useState(0);
    const [getMintNumberQuote, setGetMintNumberQuote] = useState(0);
    const [getMintNumberOne, setGetMintNumberOne] = useState(0);

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
    const [writeComment, setWriteComment] = useState(false);

   

  

    

 



// Add co-author function - Not used currently

const addTo = (e) => {
    if (add < 1 && accounts[0].toUpperCase() == getAllInfo.address.toUpperCase()) {
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
        AlwriteGoerli.abi,
        signer
    );
    try {
        const response = contract.addCoOwner(getAllInfo.idPost, getAddress[0]);
        console.log(response);
        setUnlocked(true);

        

        if (response) {
            if (accounts[0].toUpperCase() == getAllInfo.address.toUpperCase()) {
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
        } else {
            alert("Something went wrong");
        }

        
    } catch (err) {
        console.log("error: ", err);
    }
}    
    
}




const addNewOwnerGPT = async () => {
    if (window.ethereum) {
        const account = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        setAccounts(account);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            addressss,
            AlwriteContract.abi,
            signer
        );
        try {
            const transaction = await contract.addCoOwner(getAllInfo.idPost, getAddress[0]);
            const receipt = await transaction.wait(); // Wait for the transaction to be mined

            console.log("Transaction confirmed:", receipt.confirmations);

            setUnlocked(true);

            if (receipt.confirmations > 0) {
                if (accounts[0].toUpperCase() === getAllInfo.address.toUpperCase()) {
                    addDoc(collection(db, "blogs", postIds, "owners"), {
                        address: getAddress[0],
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
                    alert("You are not the owner of this blog");
                }
            } else {
                alert("Transaction confirmation failed");
            }
        } catch (err) {
            console.log("error:", err);
            alert("Something went wrong");
        }
    }
};


const addressTest = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const addNewOwnerGPTTest = async (id) => {


    if (window.ethereum) {
        const account = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        setAccounts(account);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            addressTest,
            AlwriteTwo.abi,
            signer
        );
        try {
            const transaction = await contract.addCoOwner(id);
            const receipt = await transaction.wait(); // Wait for the transaction to be mined

            console.log("Transaction confirmed:", receipt.confirmations);

            setUnlocked(true);

            if (receipt.confirmations > 0) {
                const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

                 
                    const firstDocRef = await addDoc(collection(db, "accounts", id, "groups"), {
                        groupId: getGroups[0].id,
                        owner: accounts[0],
                        color: randomColor
                    });
                    
                    // Get the ID of the first document
                    const groupId = firstDocRef.id;
                    
                    // Add the second document using the groupId
                    await addDoc(collection(db, "accounts", accounts[0], "team"), {
                        address: id,
                        color: randomColor,
                        groupId: groupId
                    });

                   
                
            } else {
                alert("Transaction confirmation failed");
            }
        } catch (err) {
            console.log("error:", err);
            alert("Something went wrong");
        }
    }
};





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
    const chainId = useChainId();




  // Change network

    useEffect(() => {
        if (isWrongNetwork && switchChain) {
            switchChain(Optimism.chainId)
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

  const appStyleEight = {
    backgroundColor: isNightMode ? "#171616" : "rgb(238, 238, 238)"
}

  const appStyleNine = {
    color: isNightMode ? '#A0A0A0' : '#333',
}

const appStyleTen = {
    color: isNightMode ? '#A0A0A0' : '#333',
    backgroundColor: isNightMode ? "#131212" : "#fff",
    borderColor: isNightMode ? "#171616" : "lightgray"
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

  const addressss = "0x3009CA11F3365AAE441e44A9c9D10e894843b041";
  const providerrr = new ethers.providers.JsonRpcProvider("https://opt-mainnet.g.alchemy.com/v2/bUbciamyFoaNmUlZh5Ubm8t4e-6xVl4H");

  const contractAward = new ethers.Contract(addressss, AlwriteContract.abi, providerrr); 



  


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
        AlwriteContract.abi,
          signer
      );
      try {
          if (selectedOption == 4) {
            const responseOne = await contract.basic(
                getAllInfo.address,
                getAllInfo.idPost,
                getAllInfo.urlOneofOne,
                getAllInfo.json,
                getAllInfo.urlQuote,
                getAllInfo.idBasic,
                {
                    value: ethers.utils.parseEther((0.001).toString()),
                }
              );
            console.log(responseOne)
          } else if (selectedOption == 1) {
            const responseTwo = await contract.oneOfOneMint(getAllInfo.address, getAllInfo.idPost, getAllInfo.urlOneofOne, getAllInfo.json, getAllInfo.urlQuote, getAllInfo.idOne,
                {
                    value: ethers.utils.parseEther((0.001).toString()),
                });
            console.log(responseTwo)
          } else if (selectedOption == 3) {
            const responseThree = await contract.quoteMint(getAllInfo.address, getAllInfo.idPost, getAllInfo.urlOneofOne, getAllInfo.json, getAllInfo.urlQuote, getAllInfo.idQuote,
                {
                    value: ethers.utils.parseEther((0.001).toString()),
                });
            console.log(responseThree)
          }
          //console.log(getAllInfo.address, getAllInfo.id, getAllInfo.oneofone, getAllInfo.urlOneofOne, getAllInfo.idOne, getAllInfo.royalty, getAllInfo.royaltyNumber, getAllInfo.quote, getAllInfo.urlQuote, getAllInfo.idTwo, getAllInfo.signature);
          //console.log(getAllInfo.address, getAllInfo.id, getAllInfo.urlOneofOne, getAllInfo.json, getAllInfo.urlQuote, getAllInfo.idTwo)
          //const response = await contract.mintTwo("0x1b8163f3f7ae29af06c50df4ae5e0fe9375f8496", 9595, true, "https://timomarket.infura-ipfs.io/ipfs/QmSNrrge9Ut6M5U19tAkZUYgLMYv3bmqyNPHY1FciVPK9e", 7088, true, 5, true, "https://timomarket.infura-ipfs.io/ipfs/Qmbo9piTPyx4B9VWxdED2e5mawmNk6kHdgqcyzJGUm29gC", 8457, "0x388323e2011e601363ec071a8e5ff5f3bfa89b93466a25ba5cf34e29185c435e3efebb52020d5e181d9cfafa90729928c9feb03f6ab6420f43852f0322dbcf8c1c");
          //const responseTwo = await contract.totalSupplyOf(9595);
          //console.log(response);
          //console.log(responseTwo);
          
      } catch (err) {
          console.log("error: ", err);
      }
  }

  mintPhotoCHange();
}







// Get Mint Number

useEffect(() => {

    const idPostt = getAllInfo.idPost || 0;

    const fetchData = async () => {
      

      const hahah = await contractAward.posts(BigNumber.from(idPostt));
      setGetMintNumber(ethers.utils.formatEther(hahah.minted) * (10 ** 18));
      setGetMintNumberOne(ethers.utils.formatEther(hahah.oneofoneMinted) * (10 ** 18));
      setGetMintNumberBasic(ethers.utils.formatEther(hahah.basicMinted) * (10 ** 18));
      setGetMintNumberQuote(ethers.utils.formatEther(hahah.quoteMinted) * (10 ** 18));
      console.log(getMintNumber)
      console.log(idPostt)
    };

    if (getAllInfo) {
      fetchData();
    }
  }, [getAllInfo]);




const getBalanceOf = async () => {
    if (window.ethereum) {
        const account = await window.ethereum.request({
            method: "eth_requestAccounts",
        })
        setAccounts(account);
        const getBasic = await contractAward.balanceOf(accounts[0], getAllInfo.idBasic); 
        const getOne = await contractAward.balanceOf(accounts[0], getAllInfo.idOne); 
        const getQuote = await contractAward.balanceOf(accounts[0], getAllInfo.idQuote); 
        
        if (ethers.utils.formatEther(getBasic) * 10  > 0) {
            console.log("Unlocked");
            setWriteComment(true);
        } else if (ethers.utils.formatEther(getOne) * 10  > 0) {
            console.log("Unlocked");
            setWriteComment(true);
        } else if (ethers.utils.formatEther(getQuote) * 10  > 0) {
            console.log("Unlocked");
            setWriteComment(true);
        } else if (accounts[0].toUpperCase() == getAllInfo.address.toUpperCase()) {
            setWriteComment(true);
        } else {
            alert("You do not own an NFT");
        }


        
    }

    if (getGroups.length == 0) {
        addDoc(collection(db, "accounts", accounts[0], "groups"), {
            owner: accounts[0]
        });
    }
}



  const mintOptions = [{
        id: 1,  
        title: "One of one NFT",
        desc: "One person gets a One-of-One collectible post.",
        show: getAllInfo.oneofone,
        sold: getMintNumberOne > 0 ? true : false || getAllInfo.sold,
  }, {
      id: 2,
      title: "5% royalties",
      desc: "Ten people share 5% royalties of sales.",
      show: false,
      sold: false || getAllInfo.sold
  }, {
      id: 3,
      title: "Quotes, thoughts, ideas",
      desc: "Mint a unique NFT.",
      show: getAllInfo.quote,
      sold: getMintNumberQuote > 99 ? true : false || getAllInfo.sold
  } , {
    id: 4,
    title: "Basic collectible",
    desc: "Mint collectible post of this article.",
    show: true,
    sold: getMintNumberBasic > 99 ? true : false || getAllInfo.sold,
    basic: false,
}]


  const [selectedOption, setSelectedOption] = useState(4);
  const [closeTab, setCloseTab] = useState(true);
  const [messageInput, setMessageInput] = useState("");
  const [getMessages, setGetMessages] = useState([]);

  const [refresh, setRefresh] = useState(false);

  


  const checkforsold = (prodano, data) => {
      if (!prodano) {
          setSelectedOption(data)
          console.log(selectedOption);
      }
  }


  const [getGroups, setGetGroups] = useState([]);
  const [getTeam, setGetTeam] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState(false);
  const colors = ["blue", "red", "green", "orange", "purple"];

  
  const createGroup = async (id) => {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

      if (getGroups.length == 0) {
        addDoc(collection(db, "accounts", accounts[0], "groups"), {
            owner: accounts[0]
          });
          
      } else {
        const firstDocRef = await addDoc(collection(db, "accounts", id, "groups"), {
            groupId: getGroups[0].id,
            owner: accounts[0],
            color: randomColor
          });
          
          // Get the ID of the first document
          const groupId = firstDocRef.id;
          
          // Add the second document using the groupId
          await addDoc(collection(db, "accounts", accounts[0], "team"), {
            address: id,
            color: randomColor,
            groupId: groupId
          });
      }

      
    }


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


      useEffect(() => {

        const fetchData = async () => {
          
            onSnapshot(collection(db, "accounts", accounts[0], "team"),
        
        (snapshot) => setGetTeam(snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
        }))))
          
        };
    
        if (accounts) {
          fetchData();
        }
      }, [accounts]);


      
const [checkOwner, setCheckOwner] = useState(false);

const testestes = (id) => {
    const messagesQuery = query(
      collection(db, "allGroups", id, "messages"),
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
  
  
  
  const testestestest = (idTwo) => {
      const messagesQuery = query(
        collection(db, "allGroups", idTwo, "messages"),
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


      const sendMessage = async () => {
          if (getGroups[0].data.owner.toUpperCase() == accounts[0].toUpperCase()) {
            addDoc(collection(db, "allGroups", getGroups[0].id, "messages"), {
                message: messageInput,
                owner: accounts[0],
                timestamp: serverTimestamp(),
                isOwner: true
              });
          } else {
            addDoc(collection(db, "allGroups", getGroups[0].data.groupId, "messages"), {
                message: messageInput,
                owner: accounts[0],
                timestamp: serverTimestamp(),
                color: getGroups[0].data.color,
                groupId: getGroups[0].id
              });
          }
        
        setMessageInput("");
      }

      const [yourGroup, setYourgroup] = useState(true);
      

      const openGroup = (id, idTwo) => {
        
        if (getGroups[0].data.owner.toUpperCase() == accounts[0].toUpperCase()) {
          testestes(id);
          setYourgroup(true);
        } else {
          testestestest(idTwo);
          setYourgroup(false);
        }

        setCloseTab(false);
    }


      const messagesEndRef = useRef(null); // Create a ref for the last message element

// ...

useEffect(() => {
  // Scroll to the last message when the component updates (i.e., when new messages arrive)
  if (messagesEndRef.current) {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }
}, [getMessages]);


const removePerson = async () => {
    if (window.ethereum) {
        const account = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        setAccounts(account);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            addressTest,
            AlwriteTwo.abi,
            signer
        );
        try {
            const transaction = await contract.deleteCoauthor(getPersonId);
            const receipt = await transaction.wait(); // Wait for the transaction to be mined

            console.log("Transaction confirmed:", receipt.confirmations);

            setUnlocked(true);

            if (receipt.confirmations > 0) {
                deleteDoc(doc(db, "accounts", getPersonId, "groups", deleteGroupId));
                deleteDoc(doc(db, "accounts", accounts[0], "team", teamId));
                
            } else {
                alert("Transaction confirmation failed");
            }
        } catch (err) {
            console.log("error:", err);
            alert("Something went wrong");
        }
    }

    
}

async function collectTest() {
    if (window.ethereum) {
            const account = await window.ethereum.request({
                method: "eth_requestAccounts",
            })
        setAccounts(account);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            addressTest,
          AlwriteTwo.abi,
            signer
        );
        try {
            if (selectedOption == 4) {
              const responseOne = await contract.basic(
                  getAllInfo.address,
                  getAllInfo.idPost,
                  getAllInfo.urlOneofOne,
                  getAllInfo.json,
                  getAllInfo.urlQuote,
                  getAllInfo.idBasic,
                  {
                      value: ethers.utils.parseEther((0.001).toString()),
                  }
                );
              console.log(responseOne)
            } else if (selectedOption == 1) {
              const responseTwo = await contract.oneOfOneMint(getAllInfo.address, getAllInfo.idPost, getAllInfo.urlOneofOne, getAllInfo.json, getAllInfo.urlQuote, getAllInfo.idOne,
                  {
                      value: ethers.utils.parseEther((0.001).toString()),
                  });
              console.log(responseTwo)
            } else if (selectedOption == 3) {
              const responseThree = await contract.quoteMint(getAllInfo.address, getAllInfo.idPost, getAllInfo.urlOneofOne, getAllInfo.json, getAllInfo.urlQuote, getAllInfo.idQuote,
                  {
                      value: ethers.utils.parseEther((0.001).toString()),
                  });
              console.log(responseThree)
            }
            //console.log(getAllInfo.address, getAllInfo.id, getAllInfo.oneofone, getAllInfo.urlOneofOne, getAllInfo.idOne, getAllInfo.royalty, getAllInfo.royaltyNumber, getAllInfo.quote, getAllInfo.urlQuote, getAllInfo.idTwo, getAllInfo.signature);
            //console.log(getAllInfo.address, getAllInfo.id, getAllInfo.urlOneofOne, getAllInfo.json, getAllInfo.urlQuote, getAllInfo.idTwo)
            //const response = await contract.mintTwo("0x1b8163f3f7ae29af06c50df4ae5e0fe9375f8496", 9595, true, "https://timomarket.infura-ipfs.io/ipfs/QmSNrrge9Ut6M5U19tAkZUYgLMYv3bmqyNPHY1FciVPK9e", 7088, true, 5, true, "https://timomarket.infura-ipfs.io/ipfs/Qmbo9piTPyx4B9VWxdED2e5mawmNk6kHdgqcyzJGUm29gC", 8457, "0x388323e2011e601363ec071a8e5ff5f3bfa89b93466a25ba5cf34e29185c435e3efebb52020d5e181d9cfafa90729928c9feb03f6ab6420f43852f0322dbcf8c1c");
            //const responseTwo = await contract.totalSupplyOf(9595);
            //console.log(response);
            //console.log(responseTwo);
            
        } catch (err) {
            console.log("error: ", err);
        }
    }
  
    mintPhotoCHange();
  }



const [getPersonId, setGetPersonId] = useState("");
const [deleteGroupId, setDeleteGroupId] = useState("");
const [teamId, setTeamId] = useState("");


const getPersonFromTeam = (id, idTwo, idThree) => {
    setGetPersonId(id);
    setDeleteGroupId(idTwo);
    setTeamId(idThree)
    setDeleteMessage(true);
}

const getPersonInfo = (id, idTwo) => {
    if (getGroups[0].data.owner.toUpperCase() == accounts[0].toUpperCase()) {
        setGetPersonId(id);
        setDeleteGroupId(idTwo);
    
        let isOnWhitelist = false
    
        for (let i = 0; i < getTeam.length ; i++) {
            if (getTeam[i].data.address.toUpperCase() === id.toUpperCase()) {
                setDeleteMessage(true);
              isOnWhitelist = true; // Set the flag to true if your account is on the whitelist
              break; // Exit the loop since you found a match
            }
        }
    
        if (!isOnWhitelist) {
            alert("This address is no longer a part of your writers group");
          }
    } else {
        alert("You are not the owner");
    }
    
}


const ownerGroup = getGroups.find(data => data.data.owner.toUpperCase() === accounts[0].toUpperCase());


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
                                        return <Category wrongColor={"gray"} wrong={isWrongNetwork} query={() => queryData(data)} key={index} data={isWrongNetwork ? "Switch to Optimism" : data} color={categoryColors[getNumber]} />
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

{deleteMessage && (
        <div
        onClick={() => setDeleteMessage(false)}
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

        <div className="tryingTwo" style={{alignItems: "center", flexDirection: "column"}}>
        <p className="text-xl text-center w-2/3">Do you want to remove this person from you Writers room?</p>
        <div className="flex items-center mt-10">
        <div className="border-blue-500 border p-3 w-24 justify-center items-center flex rounded-lg text-blue-500 mr-3 cursor-pointer">No</div>
        <div onClick={removePerson} className="bg-blue-500 p-3 w-24 justify-center items-center flex rounded-lg text-white ml-3 cursor-pointer">Yes</div>
        </div>
        </div>
          
          </div>)}
      
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
                {
                    accounts ? (
                        <Link href="/account">
                        <div className="absolute right-3 top-3 border-gray-500 border rounded-lg justify-around flex items-center hover:cursor-pointer hover:bg-gray-200 px-4 p-4 mt-0">
                                               
                                                <p className="text-sm font-light ml-1">Check your groups</p>
                        </div>
                        </Link>
                    ) : (
                        <div onClick={connectMetamask} className="absolute right-3 top-3 border-gray-500 border rounded-lg justify-around flex p-2 items-center hover:cursor-pointer hover:bg-gray-200 px-4 w-36 mt-0">
                                                <img className="w-8" src="https://i.postimg.cc/mrT1hFKC/Meta-Mask-Fox-svg-2.png" />
                                                <p className="text-sm font-light ml-1">Connect</p>
                        </div>
                    )
                }
                
                <div className="flex items-center right-5 top-5 absolute">
                {/*<SunIcon />
      <label className="toggle-switch">
      <input type="checkbox" checked={isNightMode} onChange={toggleNightMode} />
      <span className="switch" />
    </label>
                <MoonIcon />*/}
                </div>
                {
                    closeTab ? (
                        <div className="bottom-16 right-5 fixed">
                        {
  // Find the item that matches the condition
  

  // Render the owner group first if found
  ownerGroup && (
    <div onClick={() => openGroup(ownerGroup.id)} className=" bg-[#0f91ff] p-6 px-6 rounded-full hover:bg-blue-700 cursor-pointer">
    <img src="https://i.postimg.cc/NMHp0scc/9r-ANez-Logo-Makr.png" className="h-12" />
    </div>
  )
}

{/* Render the rest of the groups */}
{getGroups.map((data, index) => {
  if (data.data.owner.toUpperCase() === accounts[0].toUpperCase()) {
    // Skip the owner group as it has already been displayed
    return null;
  } else {
    return (
        <div key={index} onClick={() => openGroup(ownerGroup.id, data.data.groupId)} className=" bg-[#06c6df] p-6 px-6 rounded-full hover:bg-blue-700 cursor-pointer mt-4">
        <img src="https://i.postimg.cc/NMHp0scc/9r-ANez-Logo-Makr.png" className="h-12" />
        </div>
    );
  }
})}
                        </div>
                        
                    ) : (
                        <div className="chatInfo" >
                            <div className="bg-blue-500 w-full h-14 rounded-t-xl flex items-center">
                                <div className="w-full ml-3 text-white flex items-center">
                                {
                                    checkOwner && (
                                        <>
                                        <p className="mr-3">Your team ({getTeam.length}) :</p>
                                        {
                                            getTeam.map((data, index) => {
                                                return <div onClick={() => getPersonFromTeam(data.data.address, data.data.groupId, data.id)} key={index} style={{backgroundColor: data.data.color, width: 20, height: 20, borderRadius: "100%", marginRight: 10, cursor: "pointer"}}></div>
                                            })
                                        }
                                        </>
                                    )
                                }   
                                
                                </div>
                                <img onClick={() => setCloseTab(true)} src="https://i.postimg.cc/7LtNxMDJ/7-Fv-YXG-Logo-Makr.png" className="h-8 mr-3 cursor-pointer" />
                            </div>
                            <div className="flex h-96 flex-col overflow-scroll">
                                {getMessages.map((data, index) => {
                                    // Check if data.data.owner and accounts[0] are both strings and then compare them
                                    const isOwner =
                                    typeof data.data.owner === 'string' &&
                                    typeof accounts[0] === 'string' &&
                                    data.data.owner.toUpperCase() === accounts[0].toUpperCase();

                                    const messageClass = isOwner
                                    ? "bg-blue-500 text-white rounded-lg p-2 max-w-md self-end"
                                    : "bg-white text-black rounded-lg p-2 max-w-md self-start";

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
                                        {index === getMessages.length - 1 && <div ref={messagesEndRef}></div>}
                                    </div>
                                    );
                                })}
                            </div>

                            <form noValidate>
                                <div className="w-full bg-white h-14 rounded-b-xl absolute bottom-0 flex items-center">
                                <input
                                    value={messageInput} onChangeCapture={(e) => setMessageInput(e.target.value)}
                                    className="ml-3 w-full outline-none focus:border-gray-200"
                                    placeholder="Type here ..."
                                />
                                <img onClick={sendMessage} src="https://i.postimg.cc/xd1Swgpr/0-K3d-UI-Logo-Makr.png" className="h-6 mr-3 pl-3 cursor-pointer" />
                                </div>
                            </form>
                        </div>
                    )
                }
                
                

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
                                return <WritingD closed={() => removeFrom(index)} coAuthor={addNewOwnerGPT} key={index} desc={data.desc} color={data.color} comment={data.comment} address={data.address[0]} />
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
                        <div className="bg-[#F3F4F6] mt-4 rounded-lg p-6 w-full mr-2 justify-center flex flex-col items-center" style={{height: 480}}>
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
                   
                          <p className="text-center px-12 text-[#f0c390] font-medium">{getAllInfo.title}</p>
                      
                        </div>
                            ) : selectedOption == 2 ? (
                                <div className="flex flex-col items-center">
                                <div className="collectTitle" style={{height: 200, width: 200}}>
                          <img src="https://i.postimg.cc/TPJrPHJH/Logo-Makr-10.png" className="h-10 m-2 absolute top-0 left-0" />
                          {/*<p className="text-center px-12">{getAllInfo.title}</p>*/}
                          <p className="text-center px-12">{getAllInfo.title}</p>
                          {/*<p className="text-center px-12 text-xs mt-2 text-gray-500">{postIds}</p>*/}
                        </div>
                                
                                <p className="mt-2 text-2xl text-gray-700 font-bold">+</p>
                                <p className="mt-2 text-lg text-center text-gray-700 font-bold">5% royalties</p>
                                </div>
                            ) : getMintNumber > 111 || getAllInfo.sold ? (
                                <p className="text-gray-400 text-xl ">Sold out</p>
                            ) : selectedOption == 4 ? (
                                <div className="collectTitle" style={{height: 300, width: 300}}>
                          <img src="https://i.postimg.cc/BQZHZJwk/3-Gv-Yci-Logo-Makr.png" className="h-10 m-2 absolute top-0 left-0" />
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
                        {
                                addressChain ? (
<button disabled={isWrongNetwork} onClick={() => alert("Sold out")} style={{backgroundColor: isWrongNetwork ? "gray" : "#33626d"}} className="mt-8 bg-[#33626d] text-white p-2 justify-center items-center flex px-10 py-3 rounded-xl cursor-pointer hover:bg-[#28555f]">{isWrongNetwork ? "Switch to Optimism Network" : "Collect"} </button>
                                ) : (
                                    <ConnectWallet
                                    theme="dark"
                                    btnTitle="Metamask"
                                    style={{marginTop: 30, backgroundColor: "gray", color: "white"}}
                                    />
                                )
                            }
                        {/*<button onClick={collect} disabled={getAllInfo.sold}  className={`px-4 py-4 ${getAllInfo.sold ? "bg-gray-400" : "bg-[#589ead]"} ${getAllInfo.sold ? "hover:bg-gray-400" : "hover:bg-[#28525c]"} rounded-lg w-40 flex justify-center items-center text-white mt-4 hover:cursor-pointer`}>{sold ? "Sold out" : "Collect"}{" "}</button>*/}
                        <p className="mt-3 text-xs text-gray-500">Number of collectibles sold: {getMintNumber}</p>
                        </div>
                        <div className="bg-[#F3F4F6]  mt-4 rounded-lg p-0 w-full ml-2 justify-center items-center flex" style={{height: 480}} >
                      
                       
                            
                            <div>
                        
                              {
                                  mintOptions.map((data, index) => {
                                      return <div onClick={() => checkforsold(data.sold, data.id)} key={index} className={`${data.show ? "flex" : "hidden"} items-center justify-between mb-6 mt-6 rounded-lg ${data.sold ? null : "hover:bg-gray-200"}  p-4  ${data.sold ? "cursor-no-drop" : "cursor-pointer"} ${data.basic ? "border-t" : null} border-gray-300`}>
                                                <div className="pt-2 pb-2">
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
                    
                    <div className="down" style={appStyleEight}>
                        
                        {
                            unlocked ? ( 
                                <>
                                <div className="inputComment">
                                    { writeComment ? (
                                    <>
                                    <p className="text-3xl text-black" style={appStyleNine}>Join the discussion</p>
                                    <div className="w-full mt-12">
                                        <div className="flex items-center">
                                            {
                                                colored.map((data, index) => {
                                                    return <div key={index} onClick={() => getData(data.type, data.color)} className={`text-xs border-[${data.color}] border rounded-full px-4 py-1 hover:cursor-pointer hover:bg-gray-200 mr-3`} style={{color: selected == data.type ? "white" : data.color, backgroundColor: selected == data.type ? data.color : null}}>{data.type}</div>
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
                                            }} value={inputComment} onChangeCapture={(e) => setInputComment(e.target.value)} className="w-full h-10 bg-gray-50 border border-gray-200 rounded-full mt-4 pl-4 text-sm" style={appStyleTen} />
                                    </div>
                                    <div className="upper">
                                   
                        {
                            getComments.map((data, index) => {
                                return <WritingTwo onClick={() => addNewOwnerGPTTest(data.data.address[0])} author={accounts[0].toUpperCase() === getAllInfo.address.toUpperCase() ? true : false} key={index} color={data.data.color} desc={data.data.desc} comment={data.data.comment} address={data.data.address[0]} />
                            })
                        }
                        </div>
                                    </>) : (
                                    <>
                                     {/*<p>Write something insightful and author of this post can add your comment to the article, making you a co-author.</p>*/}
                                     <p className="uppercase text-blue-600 mt-6 font-semibold">Join author´s creative group</p>
                                     <p className="text-4xl font-bold mt-2">Idea section</p>
                                     <p className="ideasectiondesc">Write an insightful comment and get a chance to join the author's creative group, where you will help the author with ideas for the next article and share earnings.</p>
                                     <div>
                                     
                                     </div>
                                     {
                                         accounts ? (
                                            <div onClick={getBalanceOf} className="border-gray-500 border rounded-lg justify-around flex p-2 items-center hover:cursor-pointer hover:bg-gray-200 px-4 w-36 mt-6">
                                                <p className="text-sm font-light ml-1">Unlock</p>
                                            </div>
                                         ) : (
                                            <div onClick={connectMetamask} className="border-gray-500 border rounded-lg justify-around flex p-2 items-center hover:cursor-pointer hover:bg-gray-200 px-4 w-36 mt-6">
                                                <img className="w-8" src="https://i.postimg.cc/mrT1hFKC/Meta-Mask-Fox-svg-2.png" />
                                                <p className="text-sm font-light ml-1">Comment</p>
                                            </div>
                                         )
                                     }
                                     
                                    </>
                                    ) }
                                </div>
                                 <div className="upper">
                                   
                        
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

  
