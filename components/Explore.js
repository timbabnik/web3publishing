import React, { forwardRef, useState } from 'react'
import Collection from './Collection'
import WritingThree from "./WritingThree"
import Gold from "./Gold"

function Explore({ref}) {

  const [sold, setSold] = useState(false);

  return (
    <div ref={ref} className="explore">
        
        {/*
        <div className="mt-10 flex w-full justify-center">
            <Collection 
              tag={"Favorite"} 
              tagTwo={"Creative"}
              tagThree={"Money"}
              tagFour={"Love"}
              image={"https://i.postimg.cc/8PSWqTxP/Group-3-11.png"} 
              imageTwo={"https://i.postimg.cc/MKP5dJvK/DJk5-FG-At-Li-Vz81-RISNa-Fn-i-Tv653n-ZC0-ZHCy-Snpz-IQd-KHDRuhg6-J76-DTjgr-L0ej-Y2-SIj-Axm-LNx9w-Pu-UWVEz-In-SDGj-Ix-GMSy8-Kr9.webp"} 
              imageThree={"https://i.postimg.cc/fLNfJwg5/gwpe-Pjc-Pm-NOUCYM6m06v-Rys-Y-2p-L971-GSMA7-JCf-KUDSA7-UZm-Uq-Luo4-Ud7hb7e-AEd-Hn4bu-UOQT8gnh-Ej-M7igmby-KARAl51k-Gq-IULh.webp"}
              imageFour={"https://i.postimg.cc/KvfGWJ2Y/O-Bj7g-DXBNsv-Cgeu2-I9no0-UAKIdz-ts-HYXQq-Tip1h-FY1f-Y2-VLikv2-YTJ-QYw79da5st-Ivh-MVGo-Gein61c-HBoz-BPVy4-D23q-T9fp2.webp"}
              />
            <Collection 
              tag={"Creative"} 
              tagTwo={"Money"}
              image={"https://i.postimg.cc/VLKRNPwP/plli-Fnbx-NYjoejm2-ZADp-N5-AJl2-a-T0cf-Vyc-YG89-LB-ew-Rww-I6-Vf-LBs-O-hpp792cq-WVCL7-A-u-Rh-Y9a5e8n-GZ-5y-Dhg046a5h5oa-SB.webp"} 
              imageTwo={"https://i.postimg.cc/YqC6ZDWn/r-HGt-Q0-Mi-Ke-Wl-X9-N9dk0-ZL9uf32vf-E58-Jz1-OD9v-Cvzg74-L46v-TXli-Vqa-DQ8g-K-b-DSf-CMfma-V87-Fmk-Lv-Ch1-G1qf-QVRyx-XFCCq8-Kwq4.png"} 
              imageThree={"https://i.postimg.cc/wx0JX5Gh/B5-LNTNAOBSmf-Xp-VCNsvp-JQK-1-Cc-A8-LU2vh-Uni1-BUFRIfv-My-YTp-IHEHo-LH-iw1x-Dk1-Ub0-R-Olt-TWfb5-QKHNYFQJh-H9-WQ0r-Cs-TSs-BB.webp"}
              imageFour={"https://i.postimg.cc/T1wK7S4n/awh-VRm-N6-K-df7zev-Xgmw-Gq7-V4-NHIKv6-Zu-FMc-b-F2-GGX2m5wewk-YJGHkwyw-V0-Lss3-T3-XNsq5r55j87v-SWRE3-TOplr-RC3dy-Uii-TS9i.webp"}
              />
            <Collection 
              tagTwo={"Creative"}
              tagThree={"Money"}
              tagFour={"Love"}
              image={"https://i.postimg.cc/8PSWqTxP/Group-3-11.png"} 
              imageTwo={"https://i.postimg.cc/MKP5dJvK/DJk5-FG-At-Li-Vz81-RISNa-Fn-i-Tv653n-ZC0-ZHCy-Snpz-IQd-KHDRuhg6-J76-DTjgr-L0ej-Y2-SIj-Axm-LNx9w-Pu-UWVEz-In-SDGj-Ix-GMSy8-Kr9.webp"} 
              imageThree={"https://i.postimg.cc/fLNfJwg5/gwpe-Pjc-Pm-NOUCYM6m06v-Rys-Y-2p-L971-GSMA7-JCf-KUDSA7-UZm-Uq-Luo4-Ud7hb7e-AEd-Hn4bu-UOQT8gnh-Ej-M7igmby-KARAl51k-Gq-IULh.webp"}
              imageFour={"https://i.postimg.cc/KvfGWJ2Y/O-Bj7g-DXBNsv-Cgeu2-I9no0-UAKIdz-ts-HYXQq-Tip1h-FY1f-Y2-VLikv2-YTJ-QYw79da5st-Ivh-MVGo-Gein61c-HBoz-BPVy4-D23q-T9fp2.webp"}
              />
            <Collection 
              image={"https://i.postimg.cc/8PSWqTxP/Group-3-11.png"} 
              imageTwo={"https://i.postimg.cc/MKP5dJvK/DJk5-FG-At-Li-Vz81-RISNa-Fn-i-Tv653n-ZC0-ZHCy-Snpz-IQd-KHDRuhg6-J76-DTjgr-L0ej-Y2-SIj-Axm-LNx9w-Pu-UWVEz-In-SDGj-Ix-GMSy8-Kr9.webp"} 
              imageThree={"https://i.postimg.cc/fLNfJwg5/gwpe-Pjc-Pm-NOUCYM6m06v-Rys-Y-2p-L971-GSMA7-JCf-KUDSA7-UZm-Uq-Luo4-Ud7hb7e-AEd-Hn4bu-UOQT8gnh-Ej-M7igmby-KARAl51k-Gq-IULh.webp"}
              imageFour={"https://i.postimg.cc/KvfGWJ2Y/O-Bj7g-DXBNsv-Cgeu2-I9no0-UAKIdz-ts-HYXQq-Tip1h-FY1f-Y2-VLikv2-YTJ-QYw79da5st-Ivh-MVGo-Gein61c-HBoz-BPVy4-D23q-T9fp2.webp"}
              />
        </div>
        <div className="bg-gray-100 w-full items-center justify-center flex flex-col mt-20">
            <p className="mt-20 text-5xl font-bold text-left">How does it work?</p>
            <div className="my-20 flex  w-2/3 items-center justify-around mt-20">
              <div className="w-1/3 text-center items-center flex flex-col">
                <img src="https://i.postimg.cc/C50wdbXm/Logo-Makr-2-Pcc-IR.png" className="h-28" />
                <p className="text-2xl font-extralight mt-5 text-[#6f6f6f] w-96">1. Buy a short story NFT.</p>
              </div>
              <div className="w-1/3 text-center items-center flex flex-col">
                <img src="https://i.postimg.cc/fy1jxT72/Logo-Makr-2-Pcc-IR-1.png" className="h-28" />
                <p className="text-2xl font-extralight mt-5 text-[#6f6f6f] w-96">2. Join DAO and start builidng on top of the story.</p>
              </div>
              <div className="w-1/3 text-center items-center flex flex-col">
                <img src="https://i.postimg.cc/9ffb5SfB/Logo-Makr-8ag9-HV.png" className="h-28" />
                <p className="text-2xl font-extralight mt-5 text-[#6f6f6f] w-96"s>3. Create the next big Intellectual property.</p>
              </div>
            </div>
      </div>
        */}
        
        <div className="mainMiddleTwo">
                    <div className="width">
                    <img src={"https://i.postimg.cc/tR3tcmSp/8-Qnxox-Aip-Px-Eo95l.png"} className="slikaImg" />
                    <div className="structure">
                        <div className="flex flex-col">
                            <div className="flex items-center">
                            <p className="mt-20 text-center rounded-full text-gray-500 p-1 text-md mr-2">Creator:</p>
                            <a target="_blank"  className="bg-gray-100 mt-20 text-center rounded-full text-gray-500 p-2 text-sm mr-2 hover:bg-gray-200 hover:cursor-pointer">0x1B8163f3f7Ae29AF06c50dF4AE5E0Fe9375f8496</a>
                            </div>
                            <div className="flex items-center">
                            <p className="mt-10 text-center rounded-full text-gray-500 p-1 text-md mr-2">Co-Creator:</p>
                            <a target="_blank"  className="bg-gray-100 mt-10 text-center rounded-full text-gray-500 p-2 text-sm mr-2 hover:bg-gray-200 hover:cursor-pointer">0xF17C0dCf959B6988E6D8F9010ee954e18Ad8b97C</a>
                            </div>
                            <div className="flex mt-6">
                                
                            
                            <div className="flex flex-col">
                            
                            </div>
                            
                            </div>
                            {/*<div className="flex mt-3">
                                <p className=" text-center rounded-full text-gray-500 p-1 text-md mr-2">NFT address:</p>
                                
                                <a target="_blank" href={`http://etherscan.io/address/${smartContract}`} className="bg-gray-100 text-center rounded-full text-gray-500 p-2 text-sm mr-2 hover:bg-gray-200 hover:cursor-pointer">{smartContract}</a>
                                
                        </div>*/}
                           
                        </div>
                        
                        <div onClick={() => setSold(true)}  className={`px-4 py-4 ${sold ? "bg-gray-400" : "bg-[#33626d]"} ${sold ? "hover:bg-gray-400" : "hover:bg-[#28525c]"} rounded-lg w-40 flex justify-center items-center text-white mt-10 hover:cursor-pointer`}>{sold ? "Sold out" : "Collect"}</div>
                    </div>
                    <p className="text-4xl font-semibold mt-10">Bringing ideas to life, forging new connections: the web3 way</p>
                    <p className="text-lg text-[#323232] mt-10">Web3 publishing enables us to unlock new avenues for monetizing creative writings and rewarding readers. Many of these features have already been implemented, with even more waiting to be utilized to transform the writer/reader relationship. However, most of these advancements only address the first step - improved transactions. By providing better monetization options for writers and supporting readers with verification as early adopters, as well as unique NFT rewards, more value is created. While this is commendable, blockchain technology offers more than just technical enhancements; it also introduces a new philosophy to redefine this relationship. So what are the next steps? The initial focus should be on community organizing and mutual aid.</p>
                    <p className="text-lg text-[#323232] mt-10">So let´s talk about these three things.</p>
                    <p className="text-lg text-[#323232] mt-10">1. BETTER TRANSACTION</p>
                    <p className="text-lg text-[#323232] mt-10">Innovation is driven by the desire to create and receive more value, and the same applies to technology. With Web3 publishing, writers now have the opportunity to mint and sell their posts to readers, offering a more appealing and attractive alternative to traditional subscriptions. On the readers' side, they not only receive verification as one of the early readers of the blog (imagine being the 16th person to read the bitcoin whitepaper - how exciting!), but also a unique NFT picture, while supporting the writer. Furthermore, readers can potentially sell the NFT later on if the blog gains popularity, adding another layer of value to the relationship between writers and readers.</p>
                    <p className="text-lg text-[#323232] mt-10">2. COMMUNITY ORGANIZING </p>
                    <p className="text-lg text-[#323232] mt-10">Everyone desires to be a part of something, and we could elaborate on this at length. However, let's delve straight into the initial features that are already available (with many more to come) on our Web3 publishing website. Users have the ability to comment on any post and share their thoughts, opinions, criticisms, and ideas. If the author finds a comment particularly noteworthy, they have an option to add the commenter as a co-author of the entire blog by including their comment.</p>
                    <p className="text-lg text-[#323232] mt-10">3. MUTUAL AID</p>
                    <p className="text-lg text-[#323232] mt-10">This is the ultimate idea-sharing machine, allowing writers and readers to collaborate on existing ideas and generate revenue together. There are multiple layers to this concept. The most basic one is the DAO version, where writers and readers create posts collaboratively. This is already being implemented in the second step of community organizing, but now it's expanded beyond the traditional writer-fan reader relationship to include anyone and everyone. Moreover, it now allows ideas to flow in both directions, not just from the writer to the reader, but also from the reader (or anyone) to someone who can expand on the idea. The final layer involves a combination of a marketplace and DEFI matrix, but we can discuss that in more detail as we progress.</p>
                    <p className="text-lg text-[#323232] mt-10">The most crucial aspect of this concept is the abundance of ideas on how to create a better platform for individuals who are passionate about writing, reading, discovering, and learning about new ideas.</p>
                    <p className="text-lg text-[#323232] mt-10">Thanks, Tim.</p>
                    
                    <div className="downWritingS">
                        <Gold desc={"Comment"} color={"#FFDFBA"} comment={"Can´t wait to see what the future holds for Web3 publishing."} address={"0xF17C0dCf959B6988E6D8F9010ee954e18Ad8b97C"} />
                        <div className="downWritingSS">
                    
                        </div>
                        
                    </div>
                    <div className="bg-gray-100 w-full py-10 mt-10 rounded-t-lg flex justify-around items-center">
                        <div className="w-1/2">
                          <div className="bg-gray-200 rounded-lg p-4">
                            <p className="font-bold text-xl">0.0025 ETH</p>
                            <p className="text-sm text-gray-500">$5</p>
                          </div>
                          <div className="bg-gray-200 rounded-lg p-4 mt-5">
                            <p className="font-bold text-xl">100/100</p>
                            <p className="text-sm text-gray-500">sold out</p>
                          </div>
                          <div onClick={() => setSold(true)}  className={`px-4 py-4 ${sold ? "bg-gray-400" : "bg-[#33626d]"} ${sold ? "hover:bg-gray-400" : "hover:bg-[#28525c]"} rounded-lg w-40 flex justify-center items-center text-white mt-10 hover:cursor-pointer`}>{sold ? "Sold out" : "Collect"}</div>
                        </div>
                        <div className=" rounded-lg w-72 h-72 bg-white justify-center items-center flex relative">
                          <img src="https://i.postimg.cc/TPJrPHJH/Logo-Makr-10.png" className="h-10 m-2 absolute top-0 left-0" />
                          <p className="text-center px-12">Bringing ideas to life, forging new connections: the web3 way</p>
                        </div>
                    </div>
                    <div className="h-16 w-full bg-blue-600 bg-gradient-to-b from-gray-100 to-[#3E616C]"></div>
                    <div className="w-full h-80 bg-[#3E616C] rounded-b-lg justify-center items-center flex flex-col">
                        <img src="https://i.postimg.cc/9XbPzy3b/Logo-Makr-47n3jk-2.png" className="h-32" />
                        <p className="text-center w-64 text-white text-sm mt-2">Collect random thoughts, writings, quotes from the author</p>
                        <div className="border-[#F6E0C2] border px-10 py-2 mt-5 rounded-lg hover:cursor-not-allowed hover:bg-[#F6E0C2] hover:text-black text-white">
                            <p className="text-sm">Collect</p>
                        </div>
                    </div>
                    </div>
                    
                    
                </div>
    </div>
  )
}

export default Explore;