import { addDoc, collection, doc, onSnapshot } from '@firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { Row, Form, Button } from "react-bootstrap"
import { create } from 'ipfs-http-client'
import { ethers } from 'ethers'
import { db } from '../firebase';
import imagee from "../public/square.jpg";
import basic from "../public/basic.png";
import basic2 from "../public/basicTwo.png";
import imageee from "../public/image.jpg";
import oneofoneimage from "../public/oneofone.png";
import Link from 'next/link';
import LoadingSpinner from '../components/Loading';
import ai from "../public/ai2.jpg";
import ai2 from "../public/ai.jpg";
import ai3 from "../public/ai3.jpg";
import ai4 from "../public/ai4.jpg";
import ai5 from "../public/ai5.jpg";
import Award from "./Award.json";
import check from "../public/check.png";

function Add() {

  const canvasRef = useRef(null);

  const [address, setAddress] = useState("")
  const [name, setName] = useState('')
  const [tokenId, setTokenId] = useState('')
  const [price, setPrice] = useState(0);
  const [pricee, setPricee] = useState(0);
  const [namee, setNamee] = useState("Timo Test");

  const [publish, setPublish] = useState(false);

  const [image, setImage] = useState("");
  const [imageTwo, setImageTwo] = useState("");
  const [imageThree, setImageThree] = useState("");

  const [accounts, setAccounts] = useState("");

  const [inputTest, setInputTest] = useState("");
  const [title, setTitle] = useState("");
  const [one, setOne] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTwo, setIsLoadingTwo] = useState(false);

  const [conf, setConf] = useState("Confirm");

  const [home, setHome] = useState(false);

  const [completed, setCompleted] = useState(false);

  const [whitelist, setWhitelist] = useState(["0xF17C0dCf959B6988E6D8F9010ee954e18Ad8b97C", "0x1B8163f3f7Ae29AF06c50dF4AE5E0Fe9375f8496", "0xFABB0ac9d68B0B445fB7357272Ff202C5651694a"]);

  const [isDarkOverlayVisible, setIsDarkOverlayVisible] = useState(false);
  const [isDarkOverlayVisibleTwo, setIsDarkOverlayVisibleTwo] = useState(false);
  const [isDarkOverlayVisibleThird, setIsDarkOverlayVisibleThird] = useState(false);
  const [firstCheck, setFirstCheck] = useState(false);
  const [secondCheck, setSecondCheck] = useState(false);
  const [thirdCheck, setThirdCheck] = useState(false);
  const [load, setLoad] = useState(false);
  const [input, setInput] = useState("");
  const [signature, setSignature] = useState("");
  const [titleNFT, setTitleNFT] = useState("Prvi NFT test");

  const [count, setCount] = useState(0);

  

  const projectId = '2JyR9CgkNwhqTpEUk0SMTqE733d';
  const projectSecret = '0f85d5460bbafd3f2aa6b79ceb46b03a';
  const auth =
  'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
  
  const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
  authorization: auth,
  },
  });










// Publish function - Create Free NFT and open other options

const publishPost = () => {
  if (title) {
    handleUploadToIPFS();
  } else {
    alert("You have to have a title");
  }
}







// You use this function in publishPost

const handleUploadToIPFS = async () => {
  handleDarkOverlayClick();
  setIsLoadingTwo(true);
  connectMetamask();
const canvas = canvasRef.current;
const ctx = canvas.getContext("2d");
const img = new Image();
img.onload = async () => {
  const aspectRatio = img.width / img.height;
  const canvasWidth = img.width * 2; // Increase canvas width for higher resolution
  const canvasHeight = canvasWidth / aspectRatio;
  const canvasPadding = canvasWidth * 0.1; // 10% padding
  const titleFontSize = canvasWidth / 20; // Adjust title font size proportionally

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  ctx.drawImage(
    img,
    canvasPadding,
    canvasPadding,
    canvasWidth - 2 * canvasPadding,
    canvasHeight - 2 * canvasPadding
  );

  ctx.font = `${titleFontSize}px Arial`;
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const textWidth = canvasWidth * 0.8;
  const words = title.split(" ");
  let line = "";
  let lines = [];
  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + " ";
    const testWidth = ctx.measureText(testLine).width;
    if (testWidth > textWidth) {
      lines.push(line);
      line = words[i] + " ";
    } else {
      line = testLine;
    }
  }
  lines.push(line);

  const x = canvasWidth / 2;
  const y = canvasHeight / 2;
  const lineHeight = titleFontSize * 1.2;

  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], x, y + (i - lines.length / 2 + 0.5) * lineHeight);
  }
    const imageDataURL = canvas.toDataURL();
    const buffer = Buffer.from(imageDataURL.replace(/^data:image\/\w+;base64,/, ""), "base64");
    
    const result = await client.add(buffer); // Upload image buffer to IPFS
    setImage(`https://timomarket.infura-ipfs.io/ipfs/${result.cid.toString()}`);
    console.log(result);

    setPublish(true);
  };
  img.src = basic2.src;

  setIsLoadingTwo(false);

  
};




const imageObject = {
  image: image,
  price: 0.001,
  title: title,
};

const imageObjectTwo = {
  image: imageTwo,
  price: 0.001,
  title: title,
};

const imageObjectThree = {
  image: imageThree,
  price: 0.001,
  title: input,
};


// Complete function - Add all data to firebase (including signature)

async function completePublishing() {
  setIsLoading(true);
  setConf("DONE ✅");
  const result = await client.add(JSON.stringify(imageObject));
  const resultTwo = await client.add(JSON.stringify(imageObjectTwo));
  const resultThree = await client.add(JSON.stringify(imageObjectThree));
  console.log(result);

  var textarea = document.getElementById("textarea");
  
  // Get the text from the textarea
  var text = textarea.value;
  
  // Replace periods with line breaks
  text = text.replace(/\n/g, "</br>");
  
  // Update the textarea with the new text
  textarea.value = text;
  
  const docRef = await addDoc(collection(db, "blogs"), {
    address: accounts[0],
    title: title,
    idPost: Math.floor(Math.random() * 10000),
    json: `https://timomarket.infura-ipfs.io/ipfs/${result.path}`,
    idBasic: Math.floor(Math.random() * 10000),
    price: pricee,
    writings: text,
    oneofone: firstCheck,
    urlOneofOne: `https://timomarket.infura-ipfs.io/ipfs/${resultTwo.path}`,
    idOne: Math.floor(Math.random() * 10000),
    royalty: secondCheck,
    royaltyNumber: 5,
    quote: thirdCheck,
    urlQuote: `https://timomarket.infura-ipfs.io/ipfs/${resultThree.path}`,
    idQuote: Math.floor(Math.random() * 10000),
    signature: signature
  });

  
  const docId = docRef.id;
  console.log('Document ID:', docId);
      

  addDoc(collection(db, "accounts", accounts[0], "posts"), {
    id: docId,
    title: title,
  });

  setIsLoading(false);
  setHome(true);

  alert("Successful");
  setIsDarkOverlayVisible(false);
  setSignature("");
  setCompleted(true);
}






async function completePublishingTest() {
  setIsLoading(true);
  setConf("DONE ✅");
  const result = await client.add(JSON.stringify(imageObject));
  const resultTwo = await client.add(JSON.stringify(imageObjectTwo));
  const resultThree = await client.add(JSON.stringify(imageObjectThree));
  
  console.log(result);

  var textarea = document.getElementById("textarea");
  
  // Get the text from the textarea
  var text = textarea.value;
  
  // Replace periods with line breaks
  text = text.replace(/\n/g, "</br>");
  
  // Update the textarea with the new text
  textarea.value = text;
  
  const docRef = await addDoc(collection(db, "timo"), {
    address: accounts[0],
    title: title,
    idPost: Math.floor(Math.random() * 10000),
    json: `https://timomarket.infura-ipfs.io/ipfs/${result.path}`,
    idBasic: Math.floor(Math.random() * 10000),
    price: pricee,
    writings: text,
    oneofone: firstCheck,
    urlOneofOne: `https://timomarket.infura-ipfs.io/ipfs/${resultTwo.path}`,
    idOne: Math.floor(Math.random() * 10000),
    royalty: secondCheck,
    royaltyNumber: 5,
    quote: thirdCheck,
    urlQuote: `https://timomarket.infura-ipfs.io/ipfs/${resultThree.path}`,
    idQuote: Math.floor(Math.random() * 10000),
    signature: signature
  });

  
  const docId = docRef.id;
  console.log('Document ID:', docId);
      

  addDoc(collection(db, "accounts", accounts[0], "posts"), {
    id: docId,
    title: title,
  });

  setIsLoading(false);
  setHome(true);

  alert("Successful");
  setIsDarkOverlayVisible(false);
  setSignature("");
  setCompleted(true);
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





// Award your fans overlay - Used inside handleUploadToIPFS and once to close the overlay

function handleDarkOverlayClick() {
  setIsDarkOverlayVisible(!isDarkOverlayVisible);
  connectMetamask();
}




// Use this AI generative photo with your text on top of it

const hundredNFT = () => {
  setThirdCheck(true);
  setIsDarkOverlayVisibleTwo(false);
  setCount(count + 1);
}



// Check for One of One NFT

const firstNFT = () => {
  setFirstCheck(true);
  setIsDarkOverlayVisibleThird(false);
  setCount(count + 1);
}



// Create One of One NFT for the first Minter

const ifFirst = () => {
  if (count < 2 && !firstCheck) {
    if (title) {
      oneOfOneIPFS();
    } else {
      alert("You need to have a title of your post");
    }
  }

  if (firstCheck) {
    setFirstCheck(false);
    setCount(count - 1);
  }
}



// Create One of One NFT used in ifFirst function

const oneOfOneIPFS = async () => {
  setIsDarkOverlayVisibleThird(!isDarkOverlayVisibleThird)
  setIsLoadingTwo(true);
  connectMetamask();
const canvas = canvasRef.current;
const ctx = canvas.getContext("2d");
const img = new Image();
img.onload = async () => {
  const aspectRatio = img.width / img.height;
  const canvasWidth = img.width * 2; // Increase canvas width for higher resolution
  const canvasHeight = canvasWidth / aspectRatio;
  const canvasPadding = canvasWidth * 0.1; // 10% padding
  const titleFontSize = canvasWidth / 20; // Adjust title font size proportionally

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  ctx.drawImage(
    img,
    canvasPadding,
    canvasPadding,
    canvasWidth - 2 * canvasPadding,
    canvasHeight - 2 * canvasPadding
  );

  ctx.font = `${titleFontSize}px Arial`;
  ctx.fillStyle = "#f0c390";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const textWidth = canvasWidth * 0.8;
  const words = title.split(" ");
  let line = "";
  let lines = [];
  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + " ";
    const testWidth = ctx.measureText(testLine).width;
    if (testWidth > textWidth) {
      lines.push(line);
      line = words[i] + " ";
    } else {
      line = testLine;
    }
  }
  lines.push(line);

  const x = canvasWidth / 2;
  const y = canvasHeight / 2;
  const lineHeight = titleFontSize * 1.2;

  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], x, y + (i - lines.length / 2 + 0.5) * lineHeight);
  }
    const imageDataURL = canvas.toDataURL();
    const buffer = Buffer.from(imageDataURL.replace(/^data:image\/\w+;base64,/, ""), "base64");
    
    const result = await client.add(buffer); // Upload image buffer to IPFS
    setImageTwo(`https://timomarket.infura-ipfs.io/ipfs/${result.cid.toString()}`);
    console.log(result);

    setPublish(true);
  };
  img.src = oneofoneimage.src;

  setIsLoadingTwo(false);

  
};




// Test





 



const oneOfOneIPFSF = async () => {
  setIsDarkOverlayVisibleThird(!isDarkOverlayVisibleThird);
  setIsLoadingTwo(true);
  connectMetamask();
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");
  const img = new Image();
  const smallImage = new Image(); // Create a new Image for the small image

  // Set the source of the small image
  smallImage.src = "data:image/png;base64,aHR0cHM6Ly9pLnBvc3RpbWcuY2MvQlFaSFpKd2svMy1Hdi1ZY2ktTG9nby1NYWtyLnBuZw=="; // Replace 'path_to_small_image.png' with the path to your small image

  img.onload = async () => {
    const aspectRatio = img.width / img.height;
    const canvasWidth = img.width * 2; // Increase canvas width for higher resolution
    const canvasHeight = canvasWidth / aspectRatio;
    const canvasPadding = canvasWidth * 0.1; // 10% padding
    const titleFontSize = canvasWidth / 20; // Adjust title font size proportionally

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Draw the small image in the top-left corner
    ctx.drawImage(smallImage, 0, 0, 50, 50); // Adjust size and position as needed

    ctx.drawImage(
      img,
      canvasPadding,
      canvasPadding,
      canvasWidth - 2 * canvasPadding,
      canvasHeight - 2 * canvasPadding
    );

    ctx.font = `${titleFontSize}px Arial`;
    ctx.fillStyle = "#EBB40A";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const textWidth = canvasWidth * 0.8;
    const words = title.split(" ");
    let line = "";
    let lines = [];
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + " ";
      const testWidth = ctx.measureText(testLine).width;
      if (testWidth > textWidth) {
        lines.push(line);
        line = words[i] + " ";
      } else {
        line = testLine;
      }
    }
    lines.push(line);

    const x = canvasWidth / 2;
    const y = canvasHeight / 2;
    const lineHeight = titleFontSize * 1.2;

    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], x, y + (i - lines.length / 2 + 0.5) * lineHeight);
    }
    const imageDataURL = canvas.toDataURL();
    const buffer = Buffer.from(imageDataURL.replace(/^data:image\/\w+;base64,/, ""), "base64");

    const result = await client.add(buffer); // Upload image buffer to IPFS
    setImageTwo(`https://timomarket.infura-ipfs.io/ipfs/${result.cid.toString()}`);
    console.log(result);

    setPublish(true);
  };
  img.src = imagee.src;

  setIsLoadingTwo(false);
};







// Create Quote, thoughts, ideas NFT with an AI generative background


const [randomPhoto, setRandomPhoto] = useState([ai4, ai5, ai3]);

const testPhoto = randomPhoto[Math.floor(Math.random() * randomPhoto.length)];

const ideasIPFS = async () => {
  setLoad(true);
const canvas = canvasRef.current;
const ctx = canvas.getContext("2d");
const img = new Image();
img.onload = async () => {
  const aspectRatio = img.width / img.height;
  const canvasWidth = img.width * 2; // Increase canvas width for higher resolution
  const canvasHeight = canvasWidth / aspectRatio;
  const canvasPadding = canvasWidth * 0.1; // 10% padding
  const titleFontSize = canvasWidth / 20; // Adjust title font size proportionally

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  ctx.drawImage(
    img,
    canvasPadding,
    canvasPadding,
    canvasWidth - 2 * canvasPadding,
    canvasHeight - 2 * canvasPadding
  );

  ctx.font = `${titleFontSize}px Arial`;
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const textWidth = canvasWidth * 0.8;
  const words = input.split(" ");
  let line = "";
  let lines = [];
  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + " ";
    const testWidth = ctx.measureText(testLine).width;
    if (testWidth > textWidth) {
      lines.push(line);
      line = words[i] + " ";
    } else {
      line = testLine;
    }
  }
  lines.push(line);

  const x = canvasWidth / 2;
  const y = canvasHeight / 2;
  const lineHeight = titleFontSize * 1.2;

  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], x, y + (i - lines.length / 2 + 0.5) * lineHeight);
  }
    const imageDataURL = canvas.toDataURL();
    const buffer = Buffer.from(imageDataURL.replace(/^data:image\/\w+;base64,/, ""), "base64");
    
    const result = await client.add(buffer); // Upload image buffer to IPFS
    setImageThree(`https://timomarket.infura-ipfs.io/ipfs/${result.cid.toString()}`);
    console.log(result);

    setPublish(true);
  };
  img.src = testPhoto.src;

  setLoad(false);

  
};




// Go back creating one more Quote, thoughts, ideas NFT

const anotherAI = () => {
  setImageThree("");
  setThirdCheck(false);
}




// Smart contract address

const addresss = "0x5FbDB2315678afecb367f032d93F642f64180aa3";



// Provider for smart contract
const providerr = "http://127.0.0.1:8545/";




// Check if the person that is creating new post is on the whitelist

const whitelistCheckerr = () => {
  for (let i = 0; i < whitelist.length ; i++) {
    if (whitelist[i].toUpperCase() === accounts[0].toUpperCase()) {
      mint();
    }
  }
}



const whitelistChecker = () => {
  for (let i = 0; i < allwhitelist.length ; i++) {
    if (allwhitelist[i].data.address.toUpperCase() === accounts[0].toUpperCase()) {
      completePublishing();
    } else {
      alert("You are not on the whitelist");
    }
  }
}

const whitelistCheckerTest = () => {
  let isOnWhitelist = false; // Initialize a flag variable

  for (let i = 0; i < allwhitelist.length ; i++) {
    if (allwhitelist[i].data.address.toUpperCase() === accounts[0].toUpperCase()) {
      completePublishing();
      isOnWhitelist = true; // Set the flag to true if your account is on the whitelist
      break; // Exit the loop since you found a match
    }
  }

  if (!isOnWhitelist) {
    alert("You are not on the whitelist");
  }
}






// Create a signature

async function mint() {

    

  if (window.ethereum) {
          const account = await window.ethereum.request({
              method: "eth_requestAccounts",
          })
      setAccounts(account);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        addresss,
        Award.abi,
          signer
      );
      try {
          const response = await contract.getMessageHash(firstCheck, imageTwo, secondCheck, 5, thirdCheck, imageThree);
          const neki = ethereum.request({method: "personal_sign", params: [accounts[0], response]})
            // 👇️ Example promise
          const p = Promise.resolve(neki);

          p.then(value => {
            setSignature(value);
            console.log(value); // 👉️ "bobbyhadz.com"
          }).catch(err => {
            console.log(err);
          });
          
      } catch (err) {
          console.log("error: ", err);
      }
  }
}






const roylaties = () => {
  if (count < 2) {  
    if (!secondCheck) {
      setSecondCheck(true);
      setCount(count + 1);
    }
  }

  if (secondCheck) {
    setSecondCheck(false);
    setCount(count - 1);
  }
}


const quotethoutgs = () => {
  if (count < 2 && !thirdCheck) {
    setIsDarkOverlayVisibleTwo(!isDarkOverlayVisibleTwo)
  }

  if(thirdCheck) {
    setCount(count - 1);
    setThirdCheck(false);
  }
}



const [allwhitelist, setAllwhitelist] = useState([]);

  useEffect(
    () => 
    onSnapshot(collection(db, "whitelist"),
    
    (snapshot) => setAllwhitelist(snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
    }))))

, [])





  return (
    <div className="h-full flex-col flex">
      <div className="absolute left-3 top-3 flex">
                    {
                        accounts ? (
                            <>
                            <div className="w-9 h-9 rounded-full bg-blue-300"></div>
                            <div>
                                <p className="ml-2 text-sm">{accounts[0].slice(0,4)}...{accounts[0].slice(accounts[0].length - 4, accounts[0].length)}</p>
                            </div>
                            </>
                        ) : <div onClick={connectMetamask} className="border-gray-500 border text-gray-500 rounded-lg justify-center flex p-2 items-center hover:cursor-pointer hover:bg-gray-200">
                                <img className="w-6" src="https://i.postimg.cc/mrT1hFKC/Meta-Mask-Fox-svg-2.png" />
                                <p className="text-xs font-bold ml-1">Connect Metamask</p>
                            </div>
                    }
                    
                </div>
      {
        completed ? (
          
                <div disabled={!isLoading} className="absolute right-3 top-2 bg-[#33626d] p-3 px-10 rounded-xl hover:cursor-pointer hover:bg-[#204249]">
                  <Link href="/account"><p className="text-white">Go Home</p></Link>
                  
                  
                </div>
          
        ) : (
          <div onClick={publishPost} disabled={isLoadingTwo} className="absolute right-3 top-2 bg-[#536fca] p-3 px-10 rounded-xl hover:cursor-pointer hover:bg-[#1d2d63]">
            
            {isLoadingTwo ? <LoadingSpinner /> : <p className="text-white">Publish</p>}
          </div>
        )
      }
    
      <div className="flex justify-center mt-52">
        <textarea rows="2" className="inputTitle" placeholder="Write your title ..." onChange={(e) => setTitle(e.target.value)} value={title} />
      </div>
      <div className="flex justify-center mt-20">
        <textarea id="textarea" rows="60" className="inputAdd" placeholder="Paste your writings ..." onChange={(e) => setInputTest(e.target.value)}  />
      </div>
      
      <canvas ref={canvasRef} width="400" height="400" style={{ display: "none" }} />
      {isDarkOverlayVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          {
            signature ? (
              <div className="bg-white p-8 rounded-lg relative pl-10 pr-10">
                <img src="https://i.postimg.cc/mDg9Z0X4/5610944.png" className="h-36 w-36 mt-20 ml-20 mr-20" />
              <p onClick={completePublishing} className="text-center mt-10 text-xl mb-20 border-green-400 border-2 p-3 rounded-2xl text-green-400 hover:text-white hover:bg-green-400 cursor-pointer">Complete</p>
              </div>
            ) : (
          <div className="bg-white p-8 rounded-lg relative pl-10 pr-10">
            <p onClick={() => console.log(signature)} className="border-b border-gray-100 w-full pb-4 text-xl">How do you want to reward your fans? ({count}/2)</p>
            <img onClick={handleDarkOverlayClick} src="https://i.postimg.cc/gJSYJMXn/Logo-Makr-2-YVf-U2.png" className="absolute top-4 right-4 h-8 hover:cursor-pointer" />
            <div onClick={ifFirst} className="justify-between flex items-center bg-gray-50 p-5 rounded-lg mt-12 cursor-pointer hover:bg-gray-100">
              <div className="mt-0">
                <h1 className="text-xl font-bold mt-0">One-of-One collectible post</h1>
                <p className="mt-2 text-gray-500 w-96 text-sm">Create a One-of-One NFT for one of your fans that mints your collectible post.</p>
              </div>
              {
                firstCheck ? (
                  <img src="https://i.postimg.cc/mDg9Z0X4/5610944.png" className="h-8" />
                ) : (
                  <div className="rounded-full border border-gray-300 w-8 h-8 mt-0 ml-10"></div>
                )
              }
              
            </div>
            {/*<div onClick={roylaties} className="justify-between flex items-center bg-gray-50 p-5 rounded-lg mt-8 cursor-pointer hover:bg-gray-100">
              <div className="mt-0">
                <h1 className="text-xl font-bold mt-0">5% Royalties</h1>
                <p className="mt-2 text-gray-500 w-96 text-sm">Ten people that mints collectible post also share 5% royalties of all the sales.</p>
              </div>
              {
                secondCheck ? (
                  <img src="https://i.postimg.cc/mDg9Z0X4/5610944.png" className="h-8" />
                ) : (
                  <div className="rounded-full border border-gray-300 w-8 h-8 mt-0 ml-10"></div>
                )
              }

            </div>*/}
            <div onClick={quotethoutgs} className="justify-between flex items-center bg-gray-50 p-5 rounded-lg mt-8 cursor-pointer hover:bg-gray-100 mb-10">
              <div className="mt-0">
                <h1 className="text-xl font-bold mt-0">Quote/thoughts/ideas NFT</h1>
                <p className="mt-2 text-gray-500 w-96 text-sm">Create unique NFTs (collectable thoughts/quotes/ideas) with your writings on AI generated background.</p>
              </div>
              {
                thirdCheck ? (
                  <img src="https://i.postimg.cc/mDg9Z0X4/5610944.png" className="h-8 ml-10" />
                ) : (
                  <div className="rounded-full border border-gray-300 w-8 h-8 mt-0 ml-10"></div>
                )
              }
             
            </div>
            <div className="justify-end flex">
            <div onClick={whitelistCheckerTest} className="bg-blue-500 text-white p-3 rounded-lg w-28 justify-center items-center flex hover:bg-blue-600 cursor-pointer">Done</div>
            </div>
            
           
          </div>)}
        </div>
      )}
      {isDarkOverlayVisibleTwo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg relative pl-10 pr-10 items-center flex flex-col">
            <p className="text-xl font-medium text-gray-700 w-96 text-center">Create unique NFTs with your writings on AI generative background.</p>
            <img onClick={() => setIsDarkOverlayVisibleTwo(!isDarkOverlayVisibleTwo)} src="https://i.postimg.cc/gJSYJMXn/Logo-Makr-2-YVf-U2.png" className="absolute top-4 right-4 h-8 hover:cursor-pointer" />
            
            {load ? <LoadingSpinner /> : <>{
              imageThree ? (
                <img src={imageThree} className="w-72 h-72" />
              ) : (
                <div className="w-72 h-72 justify-center items-center bg-gray-100 flex mt-10 text-4xl text-gray-600">?</div>
              )
            }</>}
       
            <div className="flex items-center justify-center mt-10">
              {
                imageThree ? (
                  <div className="flex items-center">
                    <div onClick={anotherAI} className="bg-red-400 text-white p-3 cursor-pointer pl-5 pr-5 rounded-full ml-3">Another</div>
                    <div onClick={hundredNFT} className="bg-blue-400 text-white p-3 cursor-pointer pl-5 pr-5 rounded-full ml-3">Use this</div>
                  </div>
                ) : (
                  <>
                    <textarea onChange={(e) => setInput(e.target.value)} className="textareaDiv" style={{width: 500}} placeholder="Write your thoughts ..."></textarea>
                    {
                      load ? (
                        <LoadingSpinner />
                      ) : (
                        <div onClick={ideasIPFS} className="bg-blue-400 text-white p-3 cursor-pointer pl-5 pr-5 rounded-full ml-3">Create</div>
                      )
                    }
                   
                  </>
                )
              }
           
            </div>
          </div>
        </div>
      )}
      {isDarkOverlayVisibleThird && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-100 p-8 rounded-lg relative pl-10 pr-10 items-center flex flex-col">
            <p className="text-xl font-medium text-gray-700 w-96 ml-10 mr-10 text-center">Create One-of-one NFT of your collectable post for your first reader/minter.</p>
            <img onClick={() => setIsDarkOverlayVisibleThird(!isDarkOverlayVisibleThird)} src="https://i.postimg.cc/gJSYJMXn/Logo-Makr-2-YVf-U2.png" className="absolute top-4 right-4 h-8 hover:cursor-pointer" />
            
            <img src={imageTwo} className="w-72 h-72" />
            <div className="flex items-center justify-center mt-10">

            <div onClick={firstNFT} className="bg-blue-400 text-white p-3 cursor-pointer pl-5 pr-5 rounded-lg ml-3">Create</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Add