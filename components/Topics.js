import Link from 'next/link'
import React from 'react'

function Topics() {

    // Read about interesting topics addresses
    
    const addressTopics = ["0x1B8163f3f7Ae29AF06c50dF4AE5E0Fe9375f8496", "0x1B8163f3f7Ae29AF06c50dF4AE5E0Fe9375f8496", "0x1c5783DF9f12df79E1506FEe70e0DE7c2404903f", "0xf17c0dcf959b6988e6d8f9010ee954e18ad8b97c"];

  return (
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
        </div>
  )
}

export default Topics