import React, { useEffect, useRef, useState } from 'react'
import Explore from '../components/Explore'
import Mint from '../components/Mint'
import Navbar from '../components/Navbar'
import { Row, Form, Button } from "react-bootstrap"
import { addDoc, collection, doc, getDoc, onSnapshot } from '@firebase/firestore'
import { db } from '../firebase'
import { ethers } from 'ethers'
import { create } from 'ipfs-http-client'

import { Buffer } from 'buffer';
import Blogs from '../components/Blogs'
import Writing from '../components/Writing'
import WritingTwo from '../components/WritingTwo'
import Link from 'next/link'
import Gold from "../components/Gold"


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

function Home() {

  const [image, setImage] = useState('')
  const [price, setPrice] = useState(0);
  const [address, setAddress] = useState("")
  const [name, setName] = useState('')
  const [tokenId, setTokenId] = useState('')
  const [pricee, setPricee] = useState(0);
  const [namee, setNamee] = useState("");
  const [description, setDescription] = useState("");
  const [nft, setNft] = useState([]);
  const [unlocked, setUnlocked] = useState(true);
  const [inputComment, setInputComment] = useState("");
  const [getComments, setGetComments] = useState([]);
  const [accounts, setAccounts] = useState("");
  const [selected, setSelected] = useState("");

  const [createNew, setCreateNew] = useState(false);


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






const SIGNING_DOMAIN_NAME = "Voucher-Domain"
const SIGNING_DOMAIN_VERSION = "1"
const chainId = 5
const contractAddress = "0xB20b2FE19a03F21ffBc31735fBF384DDdBec2fa9" // Put the address here from remix
const signer = new ethers.Wallet("750340a0434805be897250489e813fa4ada53c2eff8b13f0a9f6888a5c4cfc41") // private key that I use for address 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4

const domain = {
  name: SIGNING_DOMAIN_NAME,
  version: SIGNING_DOMAIN_VERSION,
  verifyingContract: contractAddress,
  chainId
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

  const signature = await signer._signTypedData(domain, types, voucher)
  return {
    ...voucher,
    signature
  }
}

async function main() {
  const result = await client.add(JSON.stringify({image, price, name, description}))
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

useEffect(() => {

  const fetchData = async () => {
    
      const docRef = doc(db, "blogs", "pRmdYSssAFBK72PJaTj7");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setNft(docSnap.data());
      } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      }
    
  };

  
    fetchData();
  
}, []);


const addMeta = async () => {
  if (window.ethereum) {
            const account = await window.ethereum.request({
                method: "eth_requestAccounts",
            })
        
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signerr = provider.getSigner();
        console.log(signer);
        };
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

useEffect(() => {

  
    
      onSnapshot(collection(db, "blogs", "CKI1I3pJDCMtVOMOiqjf", "comments"),
  
  (snapshot) => setGetComments(snapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
  }))))
    
  

  
}, []);

const connectMetamask = async() => {
  if (window.ethereum) {
      const account = await window.ethereum.request({
          method: "eth_requestAccounts",
      })
      setAccounts(account)
  }
}

const getData = (e) => {
  setSelected(e);
}

const ref = useRef(null);

const handleClick = () => {
  ref.current?.scrollIntoView({
    behavior: "smooth",
    
  });
}

const addressTopics = ["0x1B8163f3f7Ae29AF06c50dF4AE5E0Fe9375f8496", "0x1B8163f3f7Ae29AF06c50dF4AE5E0Fe9375f8496", "0x1c5783DF9f12df79E1506FEe70e0DE7c2404903f", "0xf17c0dcf959b6988e6d8f9010ee954e18ad8b97c"];

const [highlightedWord, setHighlightedWord] = useState("");

function handleHighlight(event) {
  const selection = window.getSelection().toString();
  if (selection) {
    setHighlightedWord(selection);
  }
}



  return (
    <div className="homepage">
      <div className="bg-[#1B3950] pb-52 w-full">
        <div className="w-full h-20 justify-between flex p-6 items-center pt-12">
          <div className="flex items-center">
            <img src="https://i.postimg.cc/TPJrPHJH/Logo-Makr-10.png" className="h-14 flex justify-center items-center text-2xl font-light p-3" />
            <p className="text-4xl font-thin text-[#FFDFBA]">alwrite</p>
          </div>
          <div className="flex items-center">
          {
                        accounts ? (
                            <div onClick={accounts[0] == "0x1b8163f3f7ae29af06c50df4ae5e0fe9375f8496" ? () => setCreateNew(true) : null} className="flex items-center border-[#FFDFBA] border p-3 rounded-2xl hover:bg-black hover:cursor-pointer">
                            <div className="w-6 h-6 rounded-full bg-[#FFDFBA]"></div>
                            <div>
                                <p className="ml-2 text-sm text-[#FFDFBA]">{accounts[0].slice(0,4)}...{accounts[0].slice(accounts[0].length - 4, accounts[0].length)}</p>
                            </div>
                            </div>
                            
                        ) : <></>
                    }
                    
          </div>
        </div>
        <Blogs onClick={handleClick} />
        </div>
        <div className="explore">
        <p className="mt-12 text-4xl font-bold text-center px-10 text-gray-600">Read about interesting topics</p>
        <div className="most">
          <Link href="/posts/ikkdc0JAMGimzcAVCbyX">
          <div className="topic">
            <div className="flex ml-0">
              <div className="h-20 w-20"></div>
              <img src="https://i.postimg.cc/1Xjj8dMQ/Group-21-2.png" className="h-20 w-20 rounded-xl" />
              <div className="ml-4">
                  <p className="text-xl font-medium w-60">The philosophy of DAO</p>
                  <p className="text-xs font-light ml-1 mt-3">{addressTopics[0].slice(0,4)}...{addressTopics[0].slice(addressTopics[0].length - 4, addressTopics[0].length)}</p>
              </div>
            </div>
              <div className="textBlog">
                <p className="text-md font-light ml-0 w-full">The Decentralized Autonomous Organization, or DAO, is a relatively new concept that has emerged in the world of blockchain technology. At its core, the DAO is a decentralized entity that operates through a series of smart contracts, allowing for decision-making to be distributed among all members rather than being centralized ...</p>
              </div>
          </div>
          </Link>
          <Link href="/posts/q1dprUJAp1GCt40caHoW">
          <div className="topic">
            <div className="flex ml-0">
              <div className="h-20 w-20 rounded-xl"></div>
              <img src="https://i.postimg.cc/h4XWB82B/Group-22-2.png" className="h-20 w-20 rounded-xl" />
              <div className="ml-4">
                  <p className="text-xl font-medium w-60">Advantages and problems with Lindy effect</p>
                  <p className="text-xs font-light ml-1 mt-3">{addressTopics[1].slice(0,4)}...{addressTopics[1].slice(addressTopics[1].length - 4, addressTopics[1].length)}</p>
              </div>
            </div>
              <div className="textBlog">
                <p className="text-md font-light ml-0 w-full">The Lindy Effect is a concept that has gained popularity in recent years, particularly in the world of business and investing. It is a theory that suggests that the longer something has been around, the more likely it is to continue to be around in the future. This can apply to a wide range of things, from technology to books to cultural phenomena.</p>
              </div>

          </div>
          </Link>
          <Link href="/posts/mBucjcHUCENOixUZHA2i">
          <div className="topic">
            <div className="flex ml-0">
              <div className="h-20 w-20 rounded-xl"></div>
              <img src="https://i.postimg.cc/zDbMMzfD/Group-23-2.png" className="h-20 w-20 rounded-xl" />
              <div className="ml-4">
                  <p className="text-xl font-medium w-60">ZK-proof examples</p>
                  <p className="text-xs font-light ml-1 mt-3">{addressTopics[2].slice(0,4)}...{addressTopics[2].slice(addressTopics[2].length - 4, addressTopics[2].length)}</p>
              </div>
            </div>
              <div className="textBlog">
                <p className="text-md font-light ml-0 w-full">Zero-knowledge proofs (Zk-proofs) are a powerful cryptographic tool that allows two parties to interact with each other while preserving privacy. A Zk-proof enables one party to prove to another party that they know a secret value without revealing any information about that value. This technology has numerous applications in fields such as finance, voting systems, and identity management. In this blog post, we will explore some real-world examples of Zk-proofs.</p>
              </div>

          </div>
          </Link>
          <Link href="/posts/q1jUo0rmwZWE48d3S13u">
          <div className="topic">
            <div className="flex ml-0">
              <div className="h-20 w-20 rounded-xl"></div>
              <img src="https://i.postimg.cc/3JLvvTgp/Group-24-2.png" className="h-20 w-20 rounded-xl" />
              <div className="ml-4">
                  <p className="text-xl font-medium w-60">What makes blockchain even more powerful than you think?</p>
                  <p className="text-xs font-light ml-1 mt-3">{addressTopics[3].slice(0,4)}...{addressTopics[3].slice(addressTopics[3].length - 4, addressTopics[3].length)}</p>
              </div>
            </div>
              <div className="textBlog">
                <p className="text-md font-light ml-0 w-full">Blockchain technology has been around for over a decade, and it has proven to be a powerful tool for a variety of applications. From supply chain management to digital identity, blockchain has disrupted traditional industries and provided new solutions to long-standing problems. However, there are still many aspects of blockchain that are not well understood, and there are ways in which it can be even more powerful than we currently realize. In this blog post, we will explore some of the reasons why blockchain technology is even more powerful than you might think.</p>
              </div>

          </div>
          </Link>
        </div>
        {/*<div className=" mt-32 w-full items-center justify-center flex flex-col bg-gradient-to-t from-[#152e41] to-[#20445f]">
         <div className=" items-center flex flex-col" style={{width: 900}}>
       <div className="flex items-center  justify-between w-full mt-32 bg-[#152e41] p-5 rounded-xl">
       <div className="container flex justify-center items-center w-96 h-96 rounded-lg">
                        <img src="https://i.postimg.cc/02HwzXqj/bm-Ba6tj3-E7zj-ZKSJoq-F3-2-8fnt1.jpg" alt="Your Image" className="w-full rounded-lg" />
                        <div className="absolute text-white text-lg font-bold w-60 text-center">Collect random thoughts, writings, quotes from the author</div>
                        </div>
                        <div>
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-blue-500 rounded-md flex justify-center items-center">
                            <img src="https://i.postimg.cc/hPZqVcrb/Logo-Makr-3-BE4yz.png" className="w-6" />
                          </div>
                        <p style={{width: 300}} className="text-3xl font-bold text-[#FFDFBA] ml-2">Monetize</p>
                        </div>
                        <p style={{width: 400}} className="text-md font-light mt-4 text-white">Monetize by selling collectable thoughts/quotes/ideas. Create unique NFTs with your writings on AI generative background.</p>
                        <div className="flex items-center mt-14">
                        <div className="h-10 w-10 bg-blue-500 rounded-md flex justify-center items-center">
                            <img src="https://i.postimg.cc/hPZqVcrb/Logo-Makr-3-BE4yz.png" className="w-6" />
                          </div>
                        <p style={{width: 300}} className="text-3xl font-bold text-[#FFDFBA] ml-2">Monetize</p>
                        </div>
                        <p style={{width: 400}} className="text-md font-light mt-4 text-white">Monetize by selling collectable thoughts/quotes/ideas. Create unique NFTs with your writings on AI generative background.</p>
                        </div>  
                        
       </div>
       <div className="flex justify-between w-full mt-32">
                        <div className="mt-14">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-green-500 rounded-md flex justify-center items-center">
                            <img src="https://i.postimg.cc/hPZqVcrb/Logo-Makr-3-BE4yz.png" className="w-6" />
                          </div>
                        <p style={{width: 300}} className="text-3xl font-bold text-[#FFDFBA] ml-2">Monetize</p>
                        </div>
                        <p style={{width: 400}} className="text-md font-light mt-4 text-white">Monetize by selling collectable thoughts/quotes/ideas. Create unique NFTs with your writings on AI generative background.</p>
                        <div className="flex items-center mt-14">
                          <div className="h-10 w-10 bg-green-500 rounded-md flex justify-center items-center">
                            <img src="https://i.postimg.cc/hPZqVcrb/Logo-Makr-3-BE4yz.png" className="w-6" />
                          </div>
                        <p style={{width: 300}} className="text-3xl font-bold text-[#FFDFBA] ml-2">Monetize</p>
                        </div>
                        <p style={{width: 400}} className="text-md font-light mt-4 text-white">Monetize by selling collectable thoughts/quotes/ideas. Create unique NFTs with your writings on AI generative background.</p>
                        </div>
                        
                        <div className="downWritingS">
                        
                        <div  className="writingThree" style={{borderWidth: 1, borderColor: "lightgray"}} >
        
            <div className="w-full flex flex-col" style={{width: 400}}>
              <div className="flex items-center pl-3  border-b border-gray-100 rounded-t-xl py-2 w-full">
                <div className="flex items-center">
                  <div className="h-5 w-5 rounded-full bg-gray-800"></div>
                  <p className="ml-1 text-xs text-gray-500">{"0xF17C0dCf959B6988E6D8F9010ee954e18Ad8b97C".slice(0,4)}...{"0xF17C0dCf959B6988E6D8F9010ee954e18Ad8b97C".slice("0xF17C0dCf959B6988E6D8F9010ee954e18Ad8b97C".length - 4, "0xF17C0dCf959B6988E6D8F9010ee954e18Ad8b97C".length)}</p>
                </div>
                <div className="px-3 ml-4 text-xs py-1 rounded-full" style={{background: "#FFDFBA", color: "black"}}>Comment</div>
              </div>
              <p className="ml-2 text-md text-gray-600 p-2 mr-10 mt-2 mb-5">DAOs should prioritize inclusivity and diversity. Ensuring that various perspectives and voices are represented in the decision-making process is essential to prevent concentration of power and promote fairness. DAOs should actively seek to include underrepresented groups and create mechanisms to ensure their meaningful participation.</p>
            </div>
        
        
    </div>
                        <div className="downWritingSS">
                    
                        </div>
                        
                    </div>
                        
       </div>
       </div>
        </div>
        <div className=" mt-32 w-full items-center justify-center flex flex-col bg-[#fafafa]">
          <img src="https://i.postimg.cc/RFYSTGYn/undraw-Mindfulness-g40v-2-removebg-preview.png" className="h-52 mt-20" />
          <p className="mt-5 text-4xl font-bold text-center pt-10 text-gray-600">Build upon existing ideas</p>
          <p className="mt-3 font-light text-gray-600 text-lg w-2/3 text-center">There is enough ideas for everybody. Join and build upon ideas and co-create the next blog.</p>
          <div className="flex items-center mt-10 pb-20">
            <div className="bg-[#FFDFBA] px-10 py-5 rounded-xl  justify-center items-center flex mx-3 font-bold hover:bg-[#f5cea2] hover:cursor-not-allowed">Let´s write</div>
          </div>
          
        </div>/*}
        {/*
        <div className="article" style={{marginTop: 100}}>
          <div className="blogs">
            <div className="w-96 h-80 bg-[#F9F9F9] rounded-3xl px-6 py-3 mx-5 flex flex-col hover:bg-[#f3f3f3] hover:cursor-pointer hover:transition-all mt-10">
              <div className="flex">
                <div className="bg-[#D9D9D9] rounded-full justify-center items-center h-6 flex px-3">
                  <p className="text-sm text-white">0x3b...8j65</p>
                </div>
                <div className="bg-[#05AD5D] rounded-full justify-center items-center h-6 flex ml-2 px-3">
                  <p className="text-sm text-white">Add something</p>
                </div>
              </div>
              <p className="mt-4 text-lg font-medium">How web3 works and how will it change everything?</p>
              <p className="mt-3 text-[#757575] font-light">Web3 refers to the third generation of the World Wide Web, which aims to create a decentralized and distributed web by using blockc hain technology. In contrast to the current centralized web...</p>
              <img src="https://i.postimg.cc/Z5vYD6fz/Arrow-1-4.png" className="w-8 mt-10 ml-72" />
            </div>
            <div className="w-96 h-80 bg-[#F9F9F9] rounded-3xl px-6 py-3 mx-5 flex flex-col hover:bg-[#f3f3f3] hover:cursor-pointer hover:transition-all mt-10">
              <div className="flex">
                <div className="bg-[#D9D9D9] rounded-full justify-center items-center h-6 flex px-3">
                  <p className="text-sm text-white">0x3b...8j65</p>
                </div>
                <div className="bg-[#FF5C5C] rounded-full justify-center items-center h-6 flex ml-2 px-3">
                  <p className="text-sm text-white">Comment</p>
                </div>
              </div>
              <p className="mt-4 text-lg font-medium">How web3 works and how will it change everything?</p>
              <p className="mt-3 text-[#757575] font-light">Web3 refers to the third generation of the World Wide Web, which aims to create a decentralized and distributed web by using blockc hain technology. In contrast to the current centralized web...</p>
              <img src="https://i.postimg.cc/Z5vYD6fz/Arrow-1-4.png" className="w-8 mt-10 ml-72" />
            </div>
          </div>
          <div className="blogs">
            <div className="w-96 h-80 bg-[#F9F9F9] rounded-3xl px-6 py-3 mx-5 flex flex-col hover:bg-[#f3f3f3] hover:cursor-pointer hover:transition-all mt-10">
              <div className="flex">
                <div className="bg-[#D9D9D9] rounded-full justify-center items-center h-6 flex px-3">
                  <p className="text-sm text-white">0x3b...8j65</p>
                </div>
              
              </div>
              <p className="mt-4 text-lg font-medium">How web3 works and how will it change everything?</p>
              <p className="mt-3 text-[#757575] font-light">Web3 refers to the third generation of the World Wide Web, which aims to create a decentralized and distributed web by using blockc hain technology. In contrast to the current centralized web...</p>
              <img src="https://i.postimg.cc/Z5vYD6fz/Arrow-1-4.png" className="w-8 mt-10 ml-72" />
            </div>
            <div className="w-96 h-80 bg-[#F9F9F9] rounded-3xl px-6 py-3 mx-5 flex flex-col hover:bg-[#f3f3f3] hover:cursor-pointer hover:transition-all mt-10">
              <div className="flex">
                <div className="bg-[#D9D9D9] rounded-full justify-center items-center h-6 flex px-3">
                  <p className="text-sm text-white">0x3b...8j65</p>
                </div>
                <div className="bg-[#055FAD] rounded-full justify-center items-center h-6 flex ml-2 px-3">
                  <p className="text-sm text-white">Link</p>
                </div>
              </div>
              <p className="mt-4 text-lg font-medium">How web3 works and how will it change everything?</p>
              <p className="mt-3 text-[#757575] font-light">Web3 refers to the third generation of the World Wide Web, which aims to create a decentralized and distributed web by using blockc hain technology. In contrast to the current centralized web...</p>
              <img src="https://i.postimg.cc/Z5vYD6fz/Arrow-1-4.png" className="w-8 mt-10 ml-72" />
            </div>
          </div>
        </div>
        */}
        </div>
        <div ref={ref}></div>
        {/*<Explore/>*/}
        
                    
        {/*<div>
      <p onMouseUp={handleHighlight}>
        This is a paragraph. Highlight any word to see it in the state.
      </p>
      <p>Highlighted word: {highlightedWord}</p>
        </div>*/}
        <div className="w-full bg-gray-300 mt-52 h-44 items-center flex justify-center flex-col">
          <p className="text-xl text-center w-full">Currently only selected writers can use our platform. If you are a writer contact us here:</p>
          <p className="text-xl">alwrite.publishing@gmail.com</p>
        </div>
        {
          createNew ? (
              <div className="mt-10 flex flex-col">
                <div className="flex flex-col">
                  <main role="main" className="flex flex-col" style={{ maxWidth: '1000px' }}>
                    <div className="content mx-auto">
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
                          <Form.Control onChange={(e) => setName(e.target.value)} size="lg" required placeholder="Name" />
                          <Form.Control onChange={(e) => setDescription(e.target.value)} size="lg" required placeholder="Description" />
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
          ) : (
            null
          )
        }
        
    </div>
  )
}

export default Home