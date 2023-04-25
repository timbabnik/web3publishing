import { addDoc, collection } from '@firebase/firestore';
import React, { useRef, useState } from 'react'
import { Row, Form, Button } from "react-bootstrap"
import { create } from 'ipfs-http-client'
import { ethers } from 'ethers'
import { db } from '../firebase';
import imagee from "../public/image.jpg";
import Link from 'next/link';
import LoadingSpinner from '../components/Loading';

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
    const canvasWidth = canvas.width;
    const canvasHeight = canvasWidth / aspectRatio;
    const canvasPadding = canvasWidth * 0.1; // 10% padding
    ctx.drawImage(img, canvasPadding, canvasPadding, canvasWidth - 2 * canvasPadding, canvasHeight - 2 * canvasPadding);
    ctx.font = "30px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center"; // Set text alignment to center
    ctx.textBaseline = "middle"; // Set text baseline to middle
    const textWidth = canvasWidth * 0.8; // Set text width to 80% of canvas width
    let words = title.split(" ");
    let line = "";
    let lines = [];
    for (let i = 0; i < words.length; i++) {
      let testLine = line + words[i] + " ";
      let testWidth = ctx.measureText(testLine).width;
      if (testWidth > textWidth) {
        lines.push(line);
        line = words[i] + " ";
      } else {
        line = testLine;
      }
    }
    lines.push(line);
    const x = canvas.width / 2; // Get horizontal center of canvas
    const y = canvas.height / 2 - ((lines.length - 1) * 30) / 2; // Get vertical center of canvas, adjusted for number of lines
    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], x, y + i * 30);
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
    writings: text
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


  return (
    <div className=" h-full flex-col flex">
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
      <div onClick={replacePeriodsWithLineBreaks} className="bg-blue-200 p-5">Heheh</div>
      <div className="mt-10 flex flex-col">
          <div className="flex flex-col items-center">
            <p className="text-4xl font-medium mt-20">Create New NFT Article</p>
            <main role="main" className="flex flex-col" style={{ maxWidth: '1000px' }}>
              <div className="content mx-auto mt-10">
                  <Row className="g-4 flex flex-col">
                    <Form.Control
                      type="file"
                      required
                      name="file"
                      onChange={uploadToIPFS}
                    />
                    <Form.Control onChange={(e) => setTokenId(e.target.value)} size="lg" required type="number" placeholder="Token Id" />
                    <Form.Control onChange={(e) => setPrice(e.target.value)} size="lg" required type="number" placeholder="Price in ETH" />
                    <Form.Control onChange={(e) => setAddress(e.target.value)} size="lg" required placeholder="Address" />
                    <div className="d-grid px-0 bg-blue-300 w-36 justify-center items-center flex py-2 mb-36 rounded-lg mt-10">
                      <Button onClick={main} variant="primary" size="lg">
                        Create & List NFT!
                      </Button>
                    </div>
                  </Row>
                </div>
            </main>
        </div>
      </div>
    </div>
  )
}

export default Add