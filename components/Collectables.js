import React, {useState} from 'react'

function Collectables() {


  const [selected, setSelected] = useState("Key 1");

  const keys = [{
    id: 1,
    name: "Key 1",
  }, {
    id: 2,
    name: "Key 2",
  }, {
    id: 3,
    name: "Key 3"
  }];

  return (
    <>
    
        <div className="widthMain" style={{backgroundColor: "#0a2336", position: "relative", marginTop: 120}} >
        <div className="monetize">

<p style={{width: 300}} className={`text-4xl font-bold text-center ${selected == "Key 2" ? "text-[#FFDFBA]" : selected == "Key 3" ? "text-[#fcaa96]" : "text-blue-200"} ${selected == "Key 2" ? "border-[#ffd5a4]" : selected == "Key 3" ? "border-[#ffb09c]" : "border-blue-200"} ml-0 border-b border-blue-200 pb-2`}>CREATE KEYS ...</p>
</div>


          
        {  selected == "Key 1" ? <div className="flex items-center justify-between w-full mt-16">
          <div className="cornerr" style={{padding: 20}}>
            <img src="https://i.postimg.cc/8CtZFbj3/03f06w-Logo-Makr.png" className="w-12" />
          </div>
          <div className="collectTitle">
                        <img src="https://i.postimg.cc/02HwzXqj/bm-Ba6tj3-E7zj-ZKSJoq-F3-2-8fnt1.jpg" alt="Your Image" className="mintPhoto" />
                        <div className="absolute text-white text-lg font-bold w-60 text-center">Go to the extreme - and stay there.</div>
                        
                        
                        
                    </div>
                <div className="monetizee">
                  <div className="size">
                  <div className="flex">
            {
              keys.map((data, index) => {
                return <div onClick={() => setSelected(data.name)} className={`${selected == data.name ? "bg-[#103552]" : "bg-[#0d2c44]"} ${selected == data.name ? "text-blue-400" : "text-gray-400"}  p-4 w-28 justify-center items-center flex rounded-lg mr-6 cursor-pointer`}>{data.name}</div>
              })
            }
            
          </div>
                      <div className="mt-10"></div>
                      <div className="monetize">
                          <div className="mmarginleftt">
                          <img src="https://i.postimg.cc/Z5sttdLM/Logo-Makr-1r-Rry-N.png" className="w-6" />
                          </div>
                          <p style={{width: 400}} className="text-2xl font-medium text-blue-200 ml-2">Quote, thoughts, ideas</p>
                      </div>
                      <p className="textSize">Create unique NFTs with your writings on a AI generated background. People that like your writings want to read more from you - quotes, thoughts, ideas, ...

</p>
                      <p className="textSize"></p>
                    </div>
                    <div className="mt-10"></div>
                    
                </div>  
                        </div> : selected == "Key 2" ? (
                          <div className="flex items-center justify-between w-full mt-12">
          <div className="cornerr" style={{padding: 20, backgroundColor: "#e7bb88"}}>
            <img src="https://i.postimg.cc/8CtZFbj3/03f06w-Logo-Makr.png" className="w-12" />
          </div>
          <div className="collectTitle">
                          <img src="https://i.postimg.cc/TPJrPHJH/Logo-Makr-10.png" className="h-10 m-2 absolute top-0 left-0" />
                          {/*<p className="text-center px-12">{getAllInfo.title}</p>*/}
                          <p className="text-center px-12 text-yellow-500">The name of your post</p>
                          {/*<p className="text-center px-12 text-xs mt-2 text-gray-500">{postIds}</p>*/}
                        </div>
                <div className="monetizee">
                  <div className="size">
                  <div className="flex">
            {
              keys.map((data, index) => {
                return <div onClick={() => setSelected(data.name)} className={`${selected == data.name ? "bg-[#103552]" : "bg-[#0d2c44]"} ${selected == data.name ? "text-blue-400" : "text-gray-400"}  p-4 w-28 justify-center items-center flex rounded-lg mr-6 cursor-pointer`}>{data.name}</div>
              })
            }
            
          </div>
                    
                      <div className="mt-10"></div>
                      <div className="monetize">
                          <div className="mmarginleftt" style={{backgroundColor: "#FFDFBA"}}>
                          <img src="https://i.postimg.cc/hjx0rkj0/Logo-Makr-3lno19.png" className="w-2" />
                          </div>
                          <p style={{width: 400}} className="text-2xl font-medium text-[#FFDFBA] ml-2">One of One Collectible Post</p>
                      </div>
                      <p className="textSize">Create a One-of-One collectible NFT of your post for one of your fan that likes your writing/blog/post.</p>
                      <p className="textSize"></p>
                    </div>
                    <div className="mt-10"></div>
                    
                </div>  
                        </div>
                        ) : selected == "Key 3" ? (
                          <div className="flex items-center justify-between w-full mt-12">
          <div className="cornerr" style={{padding: 20, backgroundColor: "#fcaa96"}}>
            <img src="https://i.postimg.cc/8CtZFbj3/03f06w-Logo-Makr.png" className="w-12" />
          </div>
          <div className="collectTitle">
                          <img src="https://i.postimg.cc/TPJrPHJH/Logo-Makr-10.png" className="h-10 m-2 absolute top-0 left-0" />
                          {/*<p className="text-center px-12">{getAllInfo.title}</p>*/}
                          <p className="text-center px-12 text-black">The name of your post</p>
                          {/*<p className="text-center px-12 text-xs mt-2 text-gray-500">{postIds}</p>*/}
                        </div>
                <div className="monetizee">
                  <div className="size">
                  <div className="flex">
            {
              keys.map((data, index) => {
                return <div onClick={() => setSelected(data.name)} className={`${selected == data.name ? "bg-[#103552]" : "bg-[#0d2c44]"} ${selected == data.name ? "text-blue-400" : "text-gray-400"}  p-4 w-28 justify-center items-center flex rounded-lg mr-6 cursor-pointer`}>{data.name}</div>
              })
            }
            
          </div>
                      <div className="mt-10"></div>
                      <div className="monetize">
                          <div className="mmarginleftt" style={{backgroundColor: "#fcaa96"}}>
                          <img src="https://i.postimg.cc/FKJjmjpk/3-Dwk-Qm-Logo-Makr.png" className="w-8" />
                          </div>
                          <p style={{width: 400}} className="text-2xl font-medium text-[#fcaa96] ml-2">Basic Collectible Post</p>
                      </div>
                      <p className="textSize">Create collectible posts for your articles so that your fans who mint them will have proof that they were among the first. Imagine having proof that you were the 6th person to read the Bitcoin whitepaper 😮.</p>
                      <p className="textSize"></p>
                    </div>
                    <div className="mt-10"></div>
                    
                </div>  
                        </div>) : null}




                        
        </div>










        <div className="widthMainTwo" style={{position: "relative", backgroundColor: "#06141f"}} >
          
       <div className="cornerTwo" style={{padding:25, backgroundColor: "#FFDFBA"}}>
         
       <img src="https://i.postimg.cc/2yQwvdRq/6z9-Zn6-Logo-Makr.png" className="w-8" />
       
          </div>
          <p style={{width: 700}} className={`text-4xl font-bold text-center  text-[#FFDFBA] ml-0 border-b border-[#FFDFBA] pb-2`}>...THAT UNLOCK A COMMENT SECTION</p>
            <div className="flex items-center justify-between w-full mt-12">

                        <div className="monetizee">
                          
                        <div className="size">
                      <div className="monetize">


                      </div>
                      
                    </div>
                    <div className="mt-10"></div>
                    <div className="size">
                      <div className="monetize">
                      <div className="mmarginleftt" style={{backgroundColor: "#FFDFBA"}}>
                          <img src="https://i.postimg.cc/G2V6Mwz8/Logo-Makr-2-RJFSC.png" className="w-6" />
                          </div>
                          
                          <p style={{width: 500}} className="text-3xl font-bold text-[#FFDFBA] ml-2">Co-write/earn with you readers</p>
                      </div>
                      <p className="textSize" style={{width: 530}}>If you find one of the comment insightful, you can add the comment to your original writings. When that happens a co-author will get 10% of the royalties of all the keys sold for that article.</p>
                      <p className="textSize" style={{width: 530}}>If no one is chosen as a co-author, the 10% of the earnings will be allocated to a bonus section within a smart contract. When someone becomes a co-author for a future article, they will receive 10% of the article's earnings, in addition to all the previous bonuses.</p>

                    </div>      
                      </div>
                       
                        



                        
                        <div>
                        <div  className="writingThree" style={{borderWidth: 1, borderColor: "lightgray"}} >

<div className="mainnn" style={{width: 400}}>
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
                        </div>
                        
                        
       


        </div>

       
       

       
                        
        </div>
    </>
  )
}

export default Collectables