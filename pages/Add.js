import { addDoc, collection } from '@firebase/firestore';
import React, { useState } from 'react'
import { Row, Form, Button } from "react-bootstrap"
import { create } from 'ipfs-http-client'
import { ethers } from 'ethers'
import { db } from '../firebase';

function Add() {

  const [address, setAddress] = useState("")
  const [name, setName] = useState('')
  const [tokenId, setTokenId] = useState('')
  const [price, setPrice] = useState(0);
  const [pricee, setPricee] = useState(0);
  const [namee, setNamee] = useState("Timo Test");

  const [inputTest, setInputTest] = useState("");

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



  return (
    <div>
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
      <div className="flex justify-center">
        <textarea className="text-center" placeholder="sasdf" onChange={(e) => setInputTest(e.target.value)}  />
      </div>
      <div onClick={handleMint} className="bg-blue-200 p-5">Heheh</div>
    </div>
  )
}

export default Add