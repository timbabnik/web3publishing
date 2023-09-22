import React from 'react'
import Link from 'next/link'
import Collectables from "./Collectables";

function Homepage({onClick}) {
  return (
    <div className="items-center justify-center mt-52 mb-20 flex flex-col w-full">
      <div className="upperMain">

        
        <div className="upper">
            <div className="allUp">
                <p className="text-white font-bold text-4xl md:text-7xl text-center lg:text-left">MONETIZE <br/>YOUR WRITINGS<br/>IN A WEB3 WAY<br/></p>
                {/*<p className="undertitle">Create mintable writings. Let your readers comment. Add their insights to your blog so they can become co-authors verified by the blockchain.</p>*/}
                <p className="undertitle">With only one click create "Keys" for your readers (One-of-One collectible post, unique quote NFTs with an AI generated background, …) that will unlock their chances to co-write and co-earn with you.</p>
                <p className="undertitleTwo">Write great articles, get paid and reward your readers.</p>
                <div onClick={onClick} className="mt-5 bg-[#FFDFBA] w-32 justify-center items-center flex p-3 rounded-lg hover:bg-[rgb(255,191,119)] hover:cursor-pointer">
                    <p className="text-black">Learn more</p>
                </div>
            </div>
            <img src="https://i.postimg.cc/XYXkXvbN/Group-20-4-removebg-preview-2.png"  className="imageMain"/>
        </div>



        

       <Collectables />

       {/* <div className="widthMain" style={{backgroundColor: "#06141f", position: "relative"}} >
          <div className="corner">
            <img src="https://i.postimg.cc/nzfH7QCr/Group-4-23.png" className="w-12" />
          </div>
        <div className="collectTitle">
                          <img src="https://i.postimg.cc/TPJrPHJH/Logo-Makr-10.png" className="h-10 m-2 absolute top-0 left-0" />
                          <p className="text-center px-12">{getAllInfo.title}</p>
                          <p className="text-center px-12 text-yellow-500">The name of your post</p>
                          <p className="text-center px-12 text-xs mt-2 text-gray-500">{postIds}</p>
                        </div>
                <div className="monetizee">
                  <div className="size">
                    <div className="monetize">

                          <p style={{width: 300}} className="text-2xl font-bold text-[#FFDFBA] ml-0 border-b border-[#FFDFBA] pb-2">GIVE ONE OF YOUR FANS</p>
                      </div>
                      <div className="mt-10"></div>
                      <div className="monetize">
                          <div className="marginleftt">
                          <img src="https://i.postimg.cc/hjx0rkj0/Logo-Makr-3lno19.png" className="w-2" />
                          </div>
                          <p style={{width: 400}} className="text-3xl font-bold text-[#FFDFBA] ml-2">One of One Collectible Post</p>
                      </div>
                      <p className="textSize">Create a One-of-One collectible NFT of your post for one of your fans that likes your writing/blog/post.</p>
                      <p className="textSize"></p>
                    </div>
                    <div className="mt-10"></div>
                    
                </div>  
                        
        </div>



       
       <div className="widthMainTwo" style={{position: "relative"}} >
       <div className="cornerTwo">
            <img src="https://i.postimg.cc/5NgqRBJc/Group-5-7.png" className="w-12" />
          </div>
                        <div className="monetizee">
                        <div className="size">
                      <div className="monetize">

                          <p style={{width: 300}} className="text-2xl font-bold text-blue-200 ml-0 border-b border-blue-200 pb-2">GIVE 10 OF YOUR FANS</p>
                      </div>
                      
                    </div>
                    <div className="mt-10"></div>
                    <div className="size">
                      <div className="monetize">
                      <div className="mmarginleftt">
                          <img src="https://i.postimg.cc/G2V6Mwz8/Logo-Makr-2-RJFSC.png" className="w-6" />
                          </div>
                          
                          <p style={{width: 300}} className="text-3xl font-bold text-blue-200 ml-2">5% Royalty</p>
                      </div>
                      <p className="textSize">Give your fans a chance to earn with you. Put 10 of the people that mint your collectible post on your whitelist, where they will share a 5% royalty of all the sales.</p>

                    </div>
                        
                       
                 
                         
                      
                        </div>
                       
                        
                        <div>
                        <div className="mint">
                        <img src="https://i.postimg.cc/02HwzXqj/bm-Ba6tj3-E7zj-ZKSJoq-F3-2-8fnt1.jpg" alt="Your Image" className="mintPhoto" />
                        <div className="absolute text-white text-lg font-bold w-60 text-center">Go to the extreme - and stay there.</div>
                        
                        
                        
                    </div>
                        </div>
                        
                        
       </div>

       <div className="widthMain" style={{position: "relative"}}>
       <div className="cornerThree">
            <img src="https://i.postimg.cc/cH18YjKr/Group-6-4.png" className="w-12" />
          </div>
                <div className="mint">
                <img src="https://i.postimg.cc/bY9G05HL/2-VJZq2m-Zkam-Heh-XTDRwd-4-vxtpo.jpg" alt="Your Image" className="imageCollect" />
                    <div className="absolute text-white text-lg font-bold w-60 text-center">Collect random thoughts, writings, quotes from the author</div>
                </div>
                <div className="monetizee">
                  <div className="size">
                  <div className="monetize">

<p style={{width: 300}} className="text-2xl font-bold text-[#fcaa96] ml-0 border-b border-[#fcaa96] pb-2">GIVE 100 OF YOUR FANS</p>
</div>
                      <div className="monetize" style={{marginTop: 50}}>
                          <div className="marginleft" style={{backgroundColor: "#fcaa96"}}>
                            <img src="https://i.postimg.cc/Z5sttdLM/Logo-Makr-1r-Rry-N.png" className="w-6" />
                          </div>
                          <p style={{width: 300}} className="text-2xl font-bold text-[#fcaa96] ml-2">Quote, thoughts, ideas</p>
                      </div>
                      <p className="textSize"></p>
                    </div>
                    <div className="mt-0"></div>
                    <div className="size">
                      
                      <p className="textSize">Create unique NFTs with your writings on a AI generated background. People that like your writings want to read more from you - quotes, thoughts, ideas, ...</p>
                    </div>
                </div>  
                        
  </div>*/}



       </div>
      
    </div>
    
  )
}

export default Homepage