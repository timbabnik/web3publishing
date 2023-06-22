import React from 'react'
import Link from 'next/link'

function Blogs({onClick}) {
  return (
    <div className="items-center justify-center mt-52 mb-20 flex flex-col w-full">
      <div className="upperMain">

        
        <div className="upper">
            <div className="allUp">
                <p className="text-white font-bold text-4xl md:text-7xl text-center lg:text-left">UNLEASH YOUR<br/> WRITINGS POTENTIAL<br/>WITH WEB3 <br/>NEWSLETTER</p>
                {/*<p className="undertitle">Create mintable writings. Let your readers comment. Add their insights to your blog so they can become co-authors verified by the blockchain.</p>*/}
                <p className="undertitle">Monetize by selling collectable thoughts/quotes/ideas and give your readers a chance to become co-authors of your writings.</p>
                <div onClick={onClick} className="mt-5 bg-[#FFDFBA] w-32 justify-center items-center flex p-3 rounded-lg hover:bg-[rgb(255,191,119)] hover:cursor-pointer">
                    <p className="text-black">Learn more</p>
                </div>
            </div>
            <img src="https://i.postimg.cc/XYXkXvbN/Group-20-4-removebg-preview-2.png"  className="imageMain"/>
        </div>





        <div className="flex items-center  justify-between mt-32 bg-[#152e41] p-12 rounded-xl" className="widthMain" >
                <div className="mint">
                    <img src="https://i.postimg.cc/02HwzXqj/bm-Ba6tj3-E7zj-ZKSJoq-F3-2-8fnt1.jpg" alt="Your Image" className="mintPhoto" />
                    <div className="absolute text-white text-lg font-bold w-60 text-center">Collect random thoughts, writings, quotes from the author</div>
                </div>
                <div className="monetizee">
                  <div className="size">
                      <div className="monetize">
                          <div className="marginleft">
                            <img src="https://i.postimg.cc/hPZqVcrb/Logo-Makr-3-BE4yz.png" className="w-6" />
                          </div>
                          <p style={{width: 300}} className="text-3xl font-bold text-[#fff] ml-2">Paid</p>
                      </div>
                      <p className="textSize">Monetize by selling collectable thoughts/quotes/ideas. Create unique NFTs with your writings on AI generative background.</p>
                    </div>
                    <div className="mt-10"></div>
                    <div className="size">
                      <div className="monetize">
                          <div className="marginleft">
                            <img src="https://i.postimg.cc/hPZqVcrb/Logo-Makr-3-BE4yz.png" className="w-6" />
                          </div>
                          <p style={{width: 300}} className="text-3xl font-bold text-[#fff] ml-2">Free</p>
                      </div>
                      <p className="textSize">You can mint any post (NFT with a title of the article) for free, so you have a proof you were one of the first to read this article.</p>
                    </div>
                </div>  
                        
        </div>

       



       
       <div className="widthMainTwo" >
                        <div className="monetizee">
                        <div className="size">
                      <div className="monetize">
                          <div className="marginleftt">
                            <img src="https://i.postimg.cc/G2V6Mwz8/Logo-Makr-2-RJFSC.png" className="w-6" />
                          </div>
                          <p style={{width: 300}} className="text-3xl font-bold text-[#FFDFBA] ml-2">Become a co-author</p>
                      </div>
                      <p className="textSize">By commenting under the article everybody has a chance to become a co-author. If an author of the article finds your comment insightful, he/she can add your comment to the original writings.</p>
                    </div>
                    <div className="mt-10"></div>
                    <div className="size">
                      <div className="monetize">
                          <div className="marginleftt">
                            <img src="https://i.postimg.cc/G2V6Mwz8/Logo-Makr-2-RJFSC.png" className="w-6" />
                          </div>
                          <p style={{width: 300}} className="text-3xl font-bold text-[#FFDFBA] ml-2">Blockchain verified</p>
                      </div>
                      <p className="textSize">This process happens on-chain, which means you will have a proof you are a co-author of the specific article.</p>
                    </div>
                        
                       
                 
                         
                      
                        </div>
                       
                        
                        
                        <div className="">
                        
                        <div  className="writingThree" style={{borderWidth: 1, borderColor: "lightgray"}} >
        
            <div className="mainnn">
              <div className="flex items-center pl-3  border-b border-gray-100 rounded-t-xl py-2 w-full">
                <div className="flex items-center">
                  <div className="h-5 w-5 rounded-full bg-gray-800"></div>
                  <p className="ml-1 text-xs text-gray-500">{"0xF17C0dCf959B6988E6D8F9010ee954e18Ad8b97C".slice(0,4)}...{"0xF17C0dCf959B6988E6D8F9010ee954e18Ad8b97C".slice("0xF17C0dCf959B6988E6D8F9010ee954e18Ad8b97C".length - 4, "0xF17C0dCf959B6988E6D8F9010ee954e18Ad8b97C".length)}</p>
                </div>
                <div className="px-3 ml-4 text-xs py-1 rounded-full" style={{background: "#FFDFBA", color: "black"}}>Comment</div>
              </div>
              <p className="ml-2 text-md text-gray-600 p-2 mr-10 mt-2 mb-5">DAOs should prioritize inclusivity and diversity. Ensuring that various perspectives and voices are represented in the decision-making process is essential to prevent concentration of power and promote fairness. DAOs should prioritize inclusivity and diversity. Ensuring that various perspectives and voices are represented in the decision-making process is essential to prevent concentration of power and promote fairness. </p>
            </div>
        
        
    </div>
                        <div className="downWritingSS">
                    
                        </div>
                        
                    </div>
                        
       </div>





       </div>
      
    </div>
    
  )
}

export default Blogs