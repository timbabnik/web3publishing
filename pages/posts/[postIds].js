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


async function handleMintz() {
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
const contractForNft = new ethers.Contract(address, Alwrite.abi, provider); 

const unlockGated = async () => {
    const first = await contractForNft.balanceOf(accounts[0], getAllInfo.id);
    if(ethers.utils.formatEther(first)* (10 ** 18) > 0){
        setUnlocked(true);
    } else {
        setError("You do not own an NFT")
    }
}

{/*useEffect(() => {
    
    const neki = async () => {
        const getTotalSupply =  await contractForNft.posts(50);
        console.log(ethers.utils.formatEther(getTotalSupply)* (10 ** 18)) 
    }

    if (postIds) {
        neki();
      }

}, [postIds, random])*/}



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

const addresss = "0x67a074B718114fbb3D98776bEA1d4E733f09f49E";
const realAddress = "0x19A5aC322861fA701F62a9039A1F81902f91b3b9";

const goerliAddress ="0xefb3892159deAf0cbF8E65D34B56788470e73D2d";

const [changeNet, setChangeNet] = useState(false);

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

const ideaMachine = () => {
    const random = Math.floor(Math.random() * 3);

}

useEffect(() => {

    const fetchData = async () => {
      
        onSnapshot(collection(db, "accounts", getAllInfo.address, "title"),
    
        (snapshot) => setAllIdeas(snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
        }))))
      
    };

    if (ideaChange) {
      fetchData();
    }
  }, [ideaChange]);

  const [isDarkOverlayVisible, setIsDarkOverlayVisible] = useState(false);
  const [isDarkOverlayVisibleTwo, setIsDarkOverlayVisibleTwo] = useState(false);
  const [getNumber, setGetNumber] = useState("");

  function handleDarkOverlayClick() {
    setIsDarkOverlayVisible(!isDarkOverlayVisible);
    fetchCategories();
    getMinted();
    setGetNumber(Math.floor(Math.random() * 3));
  }


  function handleDarkOverlayClickTwo() {
    setIsDarkOverlayVisibleTwo(!isDarkOverlayVisibleTwo);

    
  }

const [getCategories, setGetCategories] = useState([]);
const [randdd, setRanddd] = useState([]);

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

  const providerr = new ethers.providers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/mKlWQflwnRw-lMHtYJWo9UzOVEoSEjPx")
  const contractForNftt = new ethers.Contract(addresss, Alwrite.abi, providerr); 

  const [testZa, setTestZa] = useState("");

  const getMinted = async () => {
    const first = await contractForNftt.posts(getAllInfo.id);
    setTestZa(first.minted ** 10);
  }


  
  const categoryColors = ["#59B6DF", "#6FCBC1", "#2D60B1"];
  const [switchToOp, setSwitchToOp] = useState(false);


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
  
  const [errorr, setErrorr] = useState();

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
  
  
  
  
    const handleNetworkSwitch = async (networkName) => {
      setErrorr();
      await changeNetwork({ networkName, setError });
      setSwitchToOp(true);
    };
  

    const [changeNetNet, setChangeNetNet] = useState(false);

    const addressChain = useAddress();
    const switchChain = useSwitchChain();
    const isWrongNetwork = useNetworkMismatch();


    useEffect(() => {
        if (isWrongNetwork && switchChain) {
            switchChain(ChainId.Goerli)
        }
    }, [addressChain, switchChain, isWrongNetwork])

    const [isNightMode, setIsNightMode] = useState(false);

  const toggleNightMode = () => {
    setIsNightMode(!isNightMode);
  };

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
  

  return (
    <div className="">
        <Helmet>
            <meta property="og:image" content={getAllInfo.slika} />
        </Helmet>
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
                    
                    {
                        title.map((data, index) => {
                            return <p className="text-5xl font-semibold mt-10">{data.data.title}</p>
                        })
                    }
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
                                    return <a style={appStyleTwo} target="_blank" href={`http://etherscan.io/address/${data.data.address}`} key={index} className="bg-gray-100 mb-3 text-center rounded-full text-gray-500 p-2 text-sm mr-2 hover:bg-gray-200 hover:cursor-pointer">{data.data.address}</a>
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
                    <div className="collect" style={appStyleThree}>
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
                    
                    <div style={appStyleThree} className="bg-gray-100 w-full mt-4 rounded-lg py-4 flex justify-between items-center">
                        <div>
                        <div className="ml-5 font-bold">Collect this post</div>
                        <div className="ml-5 text-sm text-gray-600">{getAllInfo.title}</div>
                        </div>
                        <div style={appStyleFive} onClick={handleDarkOverlayClickTwo} className="mr-5 bg-gray-200 p-2 px-7 rounded-lg hover:bg-gray-300 text-gray-600 cursor-pointer hover:px-8 transition-all">Free</div>
                    </div>
                    <div className="text-center mt-20 border-t border-gray-200 pt-10 flex flex-col items-center justify-center">
                        <p className="text-sm text-gray-500">Don`t have Goerli?</p>
                        <a href="https://goerlifaucet.com/" target="_blank" className="bg-[#4e4e4e] py-4 w-56 items-center justify-center text-center text-white p-0 mt-4 flex rounded-full">
                            <p className="text-sm text-white uppercase">Get Goerli for free</p>
                        </a>
                        <div>
                        
                        </div>
                        
                    </div>
                   
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
                                     <p>Write something insightful and author of this post can add your comment to the article, making you a co-author.</p>
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

  
