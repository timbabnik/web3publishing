import React, { useEffect, useState } from 'react'
import DisplayedNfts from '../components/DisplayedNfts';
const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");

function New() {

    const [nfts, setNfts] = useState([]);
    const [getNfts, setGetNfts] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [accounts, setAccounts] = useState("");
    const [opensea, setOpensea] = useState([]);
    const [openseaTwo, setOpenseaTwo] = useState([]);

    const [color, setColor] = useState("rgba(0, 0, 0, 0.3)");
    const [colorTwo, setColorTwo] = useState("rgba(0, 0, 0, 0.3)");
    const [colorThree, setColorThree] = useState("rgba(0, 0, 0, 0.3)");
    const [colorFour, setColorFour] = useState("rgba(0, 0, 0, 0.3)");
    const [change, setChange] = useState(false);
    const [changeTwo, setChangeTwo] = useState(false);
    const [changeThree, setChangeThree] = useState(false);
    const [changeFour, setChangeFour] = useState("");

  
    

    const connectMetamask = async () => {
      if (window.ethereum) {
        const account = await window.ethereum.request({
          method: "eth_requestAccounts",
        })
        setAccounts(account[0]);
      }
      
    }

    const runApp = async () => {
        await Moralis.start({
          apiKey: "yLS1aWOPzndOGO8Uu8WiK1dFB8DGkBoKSAAtR3tlQN03fcrl5c51w6PIEVp3kDN8",
          // ...and any other configuration
        });
      
        const address = accounts;
      
        const chain = EvmChain.GOERLI;
      
        const response = await Moralis.EvmApi.nft.getWalletNFTs({
           address,
           chain,
        });

        if (response.toJSON().result) {
            nftProcessing(response.toJSON().result);
          }
    }

    function nftProcessing(t) {
        for (let i = 0; i < t.length; i++) {
          let meta = JSON.parse(t[i].metadata);
          if (meta && meta.image) {
            if (meta.image.includes("ipfs://")) {
              t[i].image = "https://ipfs.io/ipfs/" + meta.image.substring(7)
              console.log(meta.image);
            } else if (meta.image.includes(".")) {
              t[i].image = meta.image;
            }
          }
          if (t[i].token_uri.includes("https://testnets-api.opensea.io")) {
            getOpenApi();
            
          }
        }
        setNfts(t);
        
      }
    
    const consolee = () => {
        console.log(nfts);
    }

    const getNftt = (e) => {
      if (getNfts.length < 6) {
        getNfts.push(e);
        setRefresh(!refresh);
      } else {
        console.log("prevec")
      }
    }

    const deleteNft = (e) => {
      getNfts.splice(e, 1);
      setRefresh(!refresh);
    }

    const openseaApi = (t) => {
      const options = {method: 'GET', headers: {accept: 'application/json'}};
      for (let i = 0; i < t.length; i++) {
      fetch(t[i], options)
        .then(response => response.json())
        .then(response => setOpensea([response.image]))
        .catch(err => console.error(err));
      }
    }

    

    const firstClick = (e) => {
      setColor("rgba(0, 136, 8, 0.8)");
      if (change == "") {
        setChange(e);
      } else {
        setChange("");
      }
      console.log(e)
    }

    const secondClick = (e) => {
      setColorTwo("rgba(0, 132, 255, 1)");
      if (changeTwo == "") {
        setChangeTwo(e);
      } else {
        setChangeTwo("");
      }
      console.log(e)
    }

    const thirdClick = (e) => {
      setColorThree("rgba(255, 0, 49, 1)");
      if (changeThree == "") {
        setChangeThree(e);
      } else {
        setChangeThree("");
      }

      console.log(e)
    }

    const fourClick = (e) => {
      setColorFour("rgba(255, 0, 49, 1)");
      if (changeFour == "") {
        setChangeFour(e);
      } else {
        setChangeFour("");
      }
      console.log(changeFour)
    }


    const getOpenApi = () => {
      
      const options = {method: 'GET', headers: {accept: 'application/json'}};
      
      fetch(`https://testnets-api.opensea.io/api/v1/assets?owner=${accounts}&order_direction=desc&offset=0&limit=20&include_orders=false`, options)
        .then(response => response.json())
        .then(({assets}) => {
          setOpenseaTwo(assets);
        });
      

          }




  return (
    <div className="w-full h-full flex">
        <div className="bg-blue-300 w-96 flex flex-col items-center h-screen">
            <div className="bg-blue-500 p-3 rounded-lg mt-10 px-12" onClick={runApp}><p className="text-white">NEW!</p></div>
            <div className="bg-blue-500 p-3 rounded-lg mt-10 px-12" onClick={connectMetamask}><p className="text-white">Get!</p></div>
            <div className="bg-blue-500 p-3 rounded-lg mt-10 px-12" onClick={() => console.log(openseaTwo)}><p className="text-white">All!</p></div>
            <p>{accounts}</p>
            {nfts.length > 0 &&
                nfts.map((e, i) => {
                    return (
                        <>
                        {<img key={i} src={e.image} width={200} className="rounded-lg mt-10" onClick={() => getNftt(e.image)} />}
                        <p>{e.name}</p>
                    
                        <br />
                        </>
                    );
            })}
            
            {
              openseaTwo.map(({id, image_url}) => {
                return (
                  <>
                    <img src={image_url} key={id} width={200} className="my-10" onClick={() => getNftt(image_url)} />
                  </>
                )
              })
            }
            
        </div>
        <div className="ml-20 mt-20">
            <p className="text-3xl">Display your collection</p>
            <p className="mt-8">Describe yourself, your collection or your project.</p>
            <div className="display">
                {
                    getNfts.map((e, i) => {
                        return (
                            <DisplayedNfts key={i} image={e} />
                        );
                })}
                
            </div>
            <div>
              <p className="mt-10 text-2xl">My Blogs:</p>
            </div>
        </div>
    </div>
  )
}

export default New