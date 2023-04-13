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

const addressTopics = ["0x1B8163f3f7Ae29AF06c50dF4AE5E0Fe9375f8496", "0xF17C0dCf959B6988E6D8F9010ee954e18Ad8b97C", "0x1c5783DF9f12df79E1506FEe70e0DE7c2404903f", "0x5b1b02f093259bD4bC9af21C34Ed784962d83E3e"];

  

  return (
    <div>
      <div className="bg-[#12333a] pb-52">
        <div className="w-full h-20 justify-between flex p-6 items-center pt-12">
          <img src="https://i.postimg.cc/TPJrPHJH/Logo-Makr-10.png" className="h-20 flex justify-center items-center text-2xl font-light p-3" />
          <div className="flex items-center">
          {
                        accounts ? (
                            <div onClick={accounts[0] == "0x1b8163f3f7ae29af06c50df4ae5e0fe9375f8496" ? () => setCreateNew(true) : null} className="flex items-center border-[#FFDFBA] border p-3 rounded-2xl hover:bg-black hover:cursor-pointer">
                            <div className="w-6 h-6 rounded-full bg-[#FFDFBA]"></div>
                            <div>
                                <p className="ml-2 text-sm text-[#FFDFBA]">{accounts[0].slice(0,4)}...{accounts[0].slice(accounts[0].length - 4, accounts[0].length)}</p>
                            </div>
                            </div>
                        ) : <div onClick={connectMetamask} className="border-[#FFDFBA] border rounded-lg justify-center flex p-4 items-center hover:cursor-pointer hover:bg-[#071f25]">
                                
                                <p className="text-sm font-bold ml-1 text-[#FFDFBA] uppercase">Connect Metamask</p>
                            </div>
                    }
                    
          </div>
        </div>
        <Blogs onClick={handleClick} />
        </div>
        <div className="explore">
        <p className="mt-12 text-4xl font-bold text-center px-10 text-gray-600">Read about interesting topics</p>
        <div className="most">
          <Link href="/test/ikkdc0JAMGimzcAVCbyX">
          <div className="flex mt-5">
            <div className="flex ml-10">
              <div className="h-20 w-20"></div>
              <img src="https://i.postimg.cc/1Xjj8dMQ/Group-21-2.png" className="h-20 w-20 rounded-xl" />
              <div className="ml-4">
                  <p className="text-xl font-medium w-60">The philosophy of DAO</p>
                  <p className="text-xs font-light ml-1 mt-3">{addressTopics[0].slice(0,4)}...{addressTopics[0].slice(addressTopics[0].length - 4, addressTopics[0].length)}</p>
              </div>
            </div>
              <div className="ml-4 justify-end flex">
                <p className="text-md font-light ml-10 w-full">The Decentralized Autonomous Organization, or DAO, is a relatively new concept that has emerged in the world of blockchain technology. At its core, the DAO is a decentralized entity that operates through a series of smart contracts, allowing for decision-making to be distributed among all members rather than being centralized ...</p>
              </div>
          </div>
          </Link>
          <Link href="/test/q1dprUJAp1GCt40caHoW">
          <div className="flex mt-16">
            <div className="flex ml-10">
              <div className="h-20 w-20 bg-red-300 rounded-xl"></div>
              <img src="https://i.postimg.cc/h4XWB82B/Group-22-2.png" className="h-20 w-20 rounded-xl" />
              <div className="ml-4">
                  <p className="text-xl font-medium w-60">Advantages and problems with Lindy effect</p>
                  <p className="text-xs font-light ml-1 mt-3">{addressTopics[1].slice(0,4)}...{addressTopics[1].slice(addressTopics[1].length - 4, addressTopics[1].length)}</p>
              </div>
            </div>
              <div className="ml-4 justify-end flex">
                <p className="text-md font-light ml-10 w-full">The Lindy Effect is a concept that has gained popularity in recent years, particularly in the world of business and investing. It is a theory that suggests that the longer something has been around, the more likely it is to continue to be around in the future. This can apply to a wide range of things, from technology to books to cultural phenomena.</p>
              </div>

          </div>
          </Link>
          <Link href="/test/mBucjcHUCENOixUZHA2i">
          <div className="flex mt-16">
            <div className="flex ml-10">
              <div className="h-20 w-20 bg-red-300 rounded-xl"></div>
              <img src="https://i.postimg.cc/zDbMMzfD/Group-23-2.png" className="h-20 w-20 rounded-xl" />
              <div className="ml-4">
                  <p className="text-xl font-medium w-60">ZK-proof examples</p>
                  <p className="text-xs font-light ml-1 mt-3">{addressTopics[2].slice(0,4)}...{addressTopics[2].slice(addressTopics[2].length - 4, addressTopics[2].length)}</p>
              </div>
            </div>
              <div className="ml-4 justify-end flex">
                <p className="text-md font-light ml-10 w-full">Zero-knowledge proofs (Zk-proofs) are a powerful cryptographic tool that allows two parties to interact with each other while preserving privacy. A Zk-proof enables one party to prove to another party that they know a secret value without revealing any information about that value. This technology has numerous applications in fields such as finance, voting systems, and identity management. In this blog post, we will explore some real-world examples of Zk-proofs.</p>
              </div>

          </div>
          </Link>
          <Link href="/test/q1jUo0rmwZWE48d3S13u">
          <div className="flex mt-16">
            <div className="flex ml-10">
              <div className="h-20 w-20 bg-red-300 rounded-xl"></div>
              <img src="https://i.postimg.cc/3JLvvTgp/Group-24-2.png" className="h-20 w-20 rounded-xl" />
              <div className="ml-4">
                  <p className="text-xl font-medium w-60">What makes blockchain even more powerful than you think?</p>
                  <p className="text-xs font-light ml-1 mt-3">{addressTopics[3].slice(0,4)}...{addressTopics[3].slice(addressTopics[3].length - 4, addressTopics[3].length)}</p>
              </div>
            </div>
              <div className="ml-4 justify-end flex">
                <p className="text-md font-light ml-10 w-full">Blockchain technology has been around for over a decade, and it has proven to be a powerful tool for a variety of applications. From supply chain management to digital identity, blockchain has disrupted traditional industries and provided new solutions to long-standing problems. However, there are still many aspects of blockchain that are not well understood, and there are ways in which it can be even more powerful than we currently realize. In this blog post, we will explore some of the reasons why blockchain technology is even more powerful than you might think.</p>
              </div>

          </div>
          </Link>
        </div>
        <div className=" mt-32 w-full items-center justify-center flex flex-col bg-[#fafafa]">
          <img src="https://i.postimg.cc/RFYSTGYn/undraw-Mindfulness-g40v-2-removebg-preview.png" className="h-52 mt-20" />
          <p className="mt-5 text-4xl font-bold text-center pt-10 text-gray-600">Build upon existing ideas</p>
          <p className="mt-3 font-light text-gray-600 text-lg">There is enough ideas for everybody. Join and build upon ideas and co-create the next blog.</p>
          <div className="flex items-center mt-10 pb-20">
            <div className="bg-[#FFDFBA] px-10 py-5 rounded-xl  justify-center items-center flex mx-3 font-bold hover:bg-[#f5cea2] hover:cursor-not-allowed">Let´s write</div>
          </div>
          
        </div>
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
        <Explore/>
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
                                                    return <div key={index} className={`text-xs border-[${data.color}] border rounded-full px-4 py-1 hover:cursor-pointer hover:bg-gray-200 mr-3`} style={{color: data.color}}>{data.type}</div>
                                                })
                                            }
                                            {/*<div className="text-[#05ad5d] text-xs border-[#05ad5d] border rounded-full px-4 py-1 hover:cursor-pointer hover:bg-gray-200">Creative</div>
                                            <div className="text-[#055fad] text-xs border-[#055fad] border rounded-full px-4 py-1 ml-2 hover:cursor-pointer hover:bg-gray-200">Character</div>
                                        <div className="text-[#ff5c5c] text-xs border-[#ff5c5c] border rounded-full px-4 py-1 ml-2 hover:cursor-pointer hover:bg-gray-200">Comment</div>*/}
                                        </div>
                                        <input value={inputComment} onChangeCapture={(e) => setInputComment(e.target.value)} className="w-full h-10 bg-gray-50 border border-gray-200 rounded-full mt-4 pl-4 text-sm" />
                                    </div>
                                </div>
                                 <div className="downWritin">
                                    <div className="upper">
                                      <div className="blogs">
                                        <WritingTwo color={"#ff5c5c"} desc={"Comment"} comment={"Great blog! I'm really excited about the possibilities of web3 publishing. The ability to mint posts and collaborate with co-authors is a game-changer for content creators. I think one area where web3 publishing could improve is in making it more user-friendly for those who are not yet familiar with blockchain technology. It would be great to see more educational resources and tutorials available to help people get started."} address={"0x1b8163f3f7ae29af06c50df4ae5e0fe9375f8496"} />
                                        <WritingTwo color={"#055fad"} desc={"Link"} comment={"Thanks for sharing this informative post! I love the idea of a decentralized publishing platform that empowers content creators and fosters collaboration. The mutual aid feature is especially interesting to me. It would be great to see more ways to support and reward content creators within the web3 ecosystem, perhaps through token-based incentives or other forms of community-driven funding"} address={"0x1b8163f3f7ae29af06c50df4ae5e0fe9375f8496"} />
                                      </div>
                                      <div className="blogs">
                                        <WritingTwo color={"#05ad5d"} desc={"Add something"} comment={"I really enjoyed reading about the potential of web3 publishing. The mintable posts and co-authoring features sound like a great way to encourage collaboration and creativity. One suggestion I have for improving web3 publishing is to make it more accessible to a wider range of content creators, especially those from underrepresented communities. This could involve partnering with community organizations or offering grants and other forms of support to help emerging artists and writers get their work out there."} address={"0x1b8163f3f7ae29af06c50df4ae5e0fe9375f8496"} />
                                        <WritingTwo comment={"This blog post is a fantastic overview of the benefits of web3 publishing! I'm especially excited about the potential for mutual aid and support within the platform. One area where web3 publishing could improve is in providing more opportunities for feedback and critique. While collaboration is great, sometimes it can be helpful to get a fresh perspective from someone outside your immediate circle. It would be great to see more tools and resources for peer review and constructive criticism within the platform."} address={"0x1b8163f3f7ae29af06c50df4ae5e0fe9375f8496"} />
                                      </div>
                                    </div>         
                        
                        </div>
                                </>
                            ) : (
                                <div className="downWriting">
                                    <p></p>
                                    {
                                        accounts ? (
                                            <div onClick={() => setUnlocked(true)} className="bg-gray-400 text-white px-10 py-4 rounded-lg hover:cursor-pointer hover:bg-gray-500">Unlock</div>
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
                    <div className="w-full h-28 bg-gradient-to-b from-[#eeeeee] to-white"></div>
        
        
        <div className="h-32"></div>
        <div className="flex justify-center items-center">
          <p className="text-[#33626d] pb-40 text-6xl font-bold text-center w-2/3">"Web3 Publishing - Unleashing Your Content's Potential."</p>
        </div>
        <div className="w-full h-8 bg-gray-100"></div>
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