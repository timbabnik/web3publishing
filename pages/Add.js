import { addDoc, collection } from '@firebase/firestore';
import React, { useRef, useState } from 'react'
import { Row, Form, Button } from "react-bootstrap"
import { create } from 'ipfs-http-client'
import { ethers } from 'ethers'
import { db } from '../firebase';
import imagee from "../public/square.jpg";
import Link from 'next/link';
import LoadingSpinner from '../components/Loading';
import ai from "../public/ai2.jpg";
import Award from "./Award.json";

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

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTwo, setIsLoadingTwo] = useState(false);

  const [conf, setConf] = useState("Confirm");

  const [home, setHome] = useState(false);

  const uploadToIPFS = async (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    if (typeof file !== 'undefined') {
      try {
        const result = await client.add(file)
        console.log(result)
        setImage(`https://timomarket.infura-ipfs.io/ipfs/${result.path}`)
      } catch (error){
        console.log("ipfs image upload error: ", error)
      }
    }
  }

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

const SIGNING_DOMAIN_NAME = "Voucher-Domain"
const SIGNING_DOMAIN_VERSION = "1"
const chainId = 5
const contractAddress = "0xB20b2FE19a03F21ffBc31735fBF384DDdBec2fa9" // Put the address here from remix
const signerr = new ethers.Wallet("750340a0434805be897250489e813fa4ada53c2eff8b13f0a9f6888a5c4cfc41") // private key that I use for address 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4

async function handleMint() {
  console.log("fasdf")
  if (window.ethereum) {
          const account = await window.ethereum.request({
              method: "eth_requestAccounts",
          })
     
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      
      const address = signer.getAddress();
      
      
      console.log(address);
  }
}

const domain = {
  name: SIGNING_DOMAIN_NAME,
  version: SIGNING_DOMAIN_VERSION,
  verifyingContract: contractAddress,
  chainId
}

async function main() {
  const result = await client.add(JSON.stringify({image, pricee, namee, descriptionn}))
  console.log(result);
  const voucher = await createVoucher(tokenId, price, `https://timomarket.infura-ipfs.io/ipfs/${result.path}`) // the address is the address which receives the NFT
  console.log(`[${voucher.tokenId}, ${voucher.price}, "${voucher.uri}", "${voucher.signature}"]`)
  addDoc(collection(db, "blogs"), {
    id: voucher.tokenId,
    price: voucher.price,
    image: voucher.uri,
    signature: voucher.signature,
    slika: image,
    address: address,
  });
}

async function createVoucher(tokenId, price, uri) {
  const voucher = { tokenId, price, uri }
  const types = {
    LazyNFTVoucher: [
      {name: "tokenId", type: "uint256"},
      {name: "price", type: "uint256"},
      {name: "uri", type: "string"},
     
    ]
  }

  const signature = await signerr._signTypedData(domain, types, voucher)
  return {
    ...voucher,
    signature
  }
}

const addTest = () => {
  addDoc(collection(db, "test"), {
    text: inputTest,
  })
}

const handleUploadToIPFS = async () => {
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
  img.src = imagee.src;

  setIsLoadingTwo(false);

  
};

async function mainTwo() {
  setIsLoading(true);
  setConf("DONE ✅");
  const result = await client.add(JSON.stringify({image, price, title}))
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
    id: Math.floor(Math.random() * 10000),
    json: `https://timomarket.infura-ipfs.io/ipfs/${result.path}`,
    price: pricee,
    writings: text,
    oneofone: firstCheck,
    urlOneofOne: imageTwo,
    idOne: Math.floor(Math.random() * 10000),
    royalty: secondCheck,
    royaltyNumber: 5,
    quote: thirdCheck,
    urlQuote: imageThree,
    idTwo: Math.floor(Math.random() * 10000),
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
}

async function replacePeriodsWithLineBreaks() {

  
  // Get the textarea element
  var textarea = document.getElementById("textarea");
  
  // Get the text from the textarea
  var text = textarea.value;
  
  // Replace periods with line breaks
  text = text.replace(/\n/g, "</br>");
  
  // Update the textarea with the new text
  textarea.value = text;

  await handleUploadToIPFS();

  addDoc(collection(db, "accounts", accounts[0], "posts"), {
    title: title,
    writings: text,
  })

}

const connectMetamask = async() => {
  if (window.ethereum) {
      const account = await window.ethereum.request({
          method: "eth_requestAccounts",
      })
      setAccounts(account);
  }
}

const neki = async () => {
  await replacePeriodsWithLineBreaks();
  
}


async function mainTwoTest() {
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
    id: Math.floor(Math.random() * 10000),
    price: pricee,
    writings: text
  });

  const docId = docRef.id;
  console.log('Document ID:', docId);  

  addDoc(collection(db, "accounts", accounts[0], "posts"), {
    id: docId,
    title: title,
  });
}


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

function handleDarkOverlayClick() {
  setIsDarkOverlayVisible(!isDarkOverlayVisible);
  connectMetamask();
}

const hundredNFT = () => {
  setThirdCheck(true);
  setIsDarkOverlayVisibleTwo(false);
}

const firstNFT = () => {
  setFirstCheck(true);
  setIsDarkOverlayVisibleThird(false);
}






const handleUploadToIPFSfirst = async () => {
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
  ctx.fillStyle = "gold";
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


const handleUploadToIPFSsecond = async () => {
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
  img.src = ai.src;

  setLoad(false);

  
};


const anotherAI = () => {
  setImageThree("");
  setThirdCheck(false);
}





const addresss = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const providerr = "http://127.0.0.1:8545/";

//const contractForNftt = new ethers.Contract(addresss, Award.abi, providerr); 


async function handleMint() {

    

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
          const response = await contract.getMessageHash(["0x1B8163f3f7Ae29AF06c50dF4AE5E0Fe9375f8496", 2, true, "test1", 1, true, 5, true, "test2", 2]);
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

const consoleAll = () => {
  console.log(accounts[0], Math.floor(Math.random() * 10000000), firstCheck, imageTwo, Math.floor(Math.random() * 10000000), secondCheck, 5, thirdCheck, imageThree, Math.floor(Math.random() * 10000000));
}

const signSig = () => {
  const add = "0x1c5783DF9f12df79E1506FEe70e0DE7c2404903f";
  const hash = "0xfdb44a80b5ecf556f15735b2a4403cb9cdf7461783cee2f293a9c21094ae5cee";
  const neki = ethereum.request({method: "personal_sign", params: [accounts[0], hash]})
  // 👇️ Example promise
const p = Promise.resolve(neki);

p.then(value => {
  console.log(value); // 👉️ "bobbyhadz.com"
}).catch(err => {
  console.log(err);
});

}


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
                        ) : <div onClick={handleDarkOverlayClick} className="border-gray-500 border text-gray-500 rounded-lg justify-center flex p-2 items-center hover:cursor-pointer hover:bg-gray-200">
                                <img className="w-6" src="https://i.postimg.cc/mrT1hFKC/Meta-Mask-Fox-svg-2.png" />
                                <p className="text-xs font-bold ml-1">Connect Metamask</p>
                            </div>
                    }
                    
                </div>
      {
        publish ? (
          
                <div onClick={mainTwo} disabled={!isLoading} className="absolute right-3 top-2 bg-[#33626d] p-3 px-10 rounded-xl hover:cursor-pointer hover:bg-[#204249]">
                  {
                    home ? (
                      <Link href="/account"><p className="text-white">Go Home</p></Link>
                    ) : (
                      <>{isLoading ? <LoadingSpinner /> : <p className="text-white">{conf}</p>}</>
                    )
                  }
                  
                  
                </div>
          
        ) : (
          <div onClick={handleUploadToIPFS} disabled={isLoadingTwo} className="absolute right-3 top-2 bg-[#536fca] p-3 px-10 rounded-xl hover:cursor-pointer hover:bg-[#1d2d63]">
            
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
              <p onClick={mainTwo} className="text-center mt-10 text-xl mb-20 border-green-400 border-2 p-3 rounded-2xl text-green-400 hover:text-white hover:bg-green-400 cursor-pointer">Complete</p>
              </div>
            ) : (
          <div className="bg-white p-8 rounded-lg relative pl-10 pr-10">
            <p onClick={() => console.log(signature)} className="border-b border-gray-100 w-full pb-4 text-xl">Award your fans</p>
            <img onClick={handleDarkOverlayClick} src="https://i.postimg.cc/gJSYJMXn/Logo-Makr-2-YVf-U2.png" className="absolute top-4 right-4 h-8 hover:cursor-pointer" />
            <div onClick={handleUploadToIPFSfirst} className="justify-between flex items-center bg-gray-50 p-5 rounded-lg mt-12 cursor-pointer hover:bg-gray-100">
              <div className="mt-0">
                <h1 className="text-xl font-bold mt-0">First person that mints</h1>
                <p className="mt-2 text-gray-500 w-96 text-sm">Create a One-of-One NFT for the first person that mints your collectable post</p>
              </div>
              {
                firstCheck ? (
                  <img src="https://i.postimg.cc/mDg9Z0X4/5610944.png" className="h-8" />
                ) : (
                  <div className="rounded-full border border-gray-300 w-8 h-8 mt-0 ml-10"></div>
                )
              }
              
            </div>
            <div onClick={() => setSecondCheck(!secondCheck)} className="justify-between flex items-center bg-gray-50 p-5 rounded-lg mt-8 cursor-pointer hover:bg-gray-100">
              <div className="mt-0">
                <h1 className="text-xl font-bold mt-0">First ten people that mints </h1>
                <p className="mt-2 text-gray-500 w-96 text-sm">Give 5% royalty (above 100 mints) to each of the first 10 people who mints your collectable post. </p>
              </div>
              {
                secondCheck ? (
                  <img src="https://i.postimg.cc/mDg9Z0X4/5610944.png" className="h-8" />
                ) : (
                  <div className="rounded-full border border-gray-300 w-8 h-8 mt-0 ml-10"></div>
                )
              }

            </div>
            <div onClick={() => setIsDarkOverlayVisibleTwo(!isDarkOverlayVisibleTwo)} className="justify-between flex items-center bg-gray-50 p-5 rounded-lg mt-8 cursor-pointer hover:bg-gray-100 mb-10">
              <div className="mt-0">
                <h1 className="text-xl font-bold mt-0">First hundred people that mints</h1>
                <p className="mt-2 text-gray-500 w-96 text-sm">Create unique NFTs (collectable thoughts/quotes/ideas) with your writings on AI generative background.</p>
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
            <div onClick={handleMint} className="bg-blue-500 text-white p-3 rounded-lg w-28 justify-center items-center flex hover:bg-blue-600 cursor-pointer">Done</div>
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
                    <div onClick={handleUploadToIPFSsecond} className="bg-blue-400 text-white p-3 cursor-pointer pl-5 pr-5 rounded-full ml-3">Create</div>
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