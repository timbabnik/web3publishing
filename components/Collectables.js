import Link from 'next/link';
import React, {useState} from 'react'

function Collectables() {


  const [selected, setSelected] = useState("1. Publish");

  const keys = [{
    id: 1,
    name: "1. Publish",
  }, {
    id: 2,
    name: "2. Comment",
  }, {
    id: 3,
    name: "3. Writers group"
  }];

  return (
    <>
    



       

        <div className="widthMain" style={{backgroundColor: "#0a2336", position: "relative", marginTop: 120}} >
        <div className="monetize">


</div>


          
        {  selected == "1. Publish" ? (
                          <div className="createkeys">
          <div className="cornerr" style={{padding: 20}}>
            <img src="https://i.postimg.cc/hvGD598d/1-LNBpz-Logo-Makr.png" className="w-12" />
          </div>
          
                <div className="monetizee">
                  <div className="justify-center items-center flex flex-col" >
                  <div className="flex justify-between w-full">
            {
              keys.map((data, index) => {
                return <div onClick={() => setSelected(data.name)} className={`${selected == data.name ? "bg-[#103552]" : "bg-[#0d2c44]"} ${selected == data.name ? "text-blue-400" : "text-gray-400"}  p-4 w-1/3 mr-2 ml-2 h-16 justify-center items-center flex rounded-lg cursor-pointer`}>{data.name}</div>
              })
            }
            
          </div>
                      <div className="marginKey"></div>
                      <div className="monetize">
                          <div className="mmarginleftt">
                          <img src="https://i.postimg.cc/hjx0rkj0/Logo-Makr-3lno19.png" className="w-2" />
                          </div>
                          <p className="text-2xl font-medium text-blue-200 ml-2">Publish your articles.</p>
                      </div>
                      <p className="textSize">Use our platform and editor to publish your articles/posts for free.</p>
                      <p className="textSize">Every article is also a collectible post that can be minted, providing your fans with access to a comment section where they have the chance to be invited to the writers' group.</p>
                      <p className="textSize"></p>
                      <img src="https://i.postimg.cc/440dD2L3/Screenshot-2023-11-06-at-18-09-15.png" style={{width: 800, borderRadius: 10, marginTop: 50}} />
                    </div>
                    <div className="mt-10"></div>
                    
                </div>  
                        </div>) : selected == "2. Comment" ? (
                          <div className="createkeys">
          <div className="cornerr" style={{padding: 20, backgroundColor: "#e7bb88"}}>
            <img src="https://i.postimg.cc/hvGD598d/1-LNBpz-Logo-Makr.png" className="w-12" />
          </div>
          
                <div className="monetizee">
                  <div className="justify-center items-center flex flex-col" >
                  <div className="flex justify-between w-full">
            {
              keys.map((data, index) => {
                return <div onClick={() => setSelected(data.name)} className={`${selected == data.name ? "bg-[#103552]" : "bg-[#0d2c44]"} ${selected == data.name ? "text-blue-400" : "text-gray-400"}  p-4 w-1/3 mr-2 ml-2 h-16 justify-center items-center flex rounded-lg cursor-pointer`}>{data.name}</div>
              })
            }
            
          </div>
                      <div className="marginKey"></div>
                      <div className="monetize">
                          <div className="mmarginleftt" style={{backgroundColor: "#FFDFBA"}}>
                          <img src="https://i.postimg.cc/Z5sttdLM/Logo-Makr-1r-Rry-N.png" className="w-8" />
                          </div>
                          <p className="text-2xl font-medium text-[#FFDFBA] ml-2">Comment your thoughts, ideas, ...</p>
                      </div>
                      <p className="textSize">This is more than a comment section, it is an idea section.

</p>
                      <p className="textSize">It´s a place where holders of collectible posts can add their insights, criticize and share ideas for this or the next article. If you as an author of the article find any of them interesting enough, you can add them to your writers group, where you will communicate with them in real time.

</p>
                      <p className="textSize"></p>
                      <img src="https://i.postimg.cc/vZZLbBML/Screenshot-2023-11-06-at-23-21-25.png" style={{width: 800, borderRadius: 10, marginTop: 50}} />
                    </div>
                    <div className="mt-10"></div>
                    
                </div>  
                        </div>) : selected == "3. Writers group" ? (
                          <div className="createkeys">
          <div className="cornerr" style={{padding: 20, backgroundColor: "#fcaa96"}}>
            <img src="https://i.postimg.cc/hvGD598d/1-LNBpz-Logo-Makr.png" className="w-12" />
          </div>
          
                <div className="monetizee">
                  <div className="justify-center items-center flex flex-col" >
                  <div className="flex justify-between w-full">
            {
              keys.map((data, index) => {
                return <div onClick={() => setSelected(data.name)} className={`${selected == data.name ? "bg-[#103552]" : "bg-[#0d2c44]"} ${selected == data.name ? "text-blue-400" : "text-gray-400"}  p-4 w-1/3 mr-2 ml-2 h-16 justify-center items-center flex rounded-lg cursor-pointer`}>{data.name}</div>
              })
            }
            
          </div>
                      <div className="marginKey"></div>
                      <div className="monetize">
                          <div className="mmarginleftt" style={{backgroundColor: "#fcaa96"}}>
                          <img src="https://i.postimg.cc/FKJjmjpk/3-Dwk-Qm-Logo-Makr.png" className="w-8" />
                          </div>
                          <p className="text-2xl font-medium text-[#fcaa96] ml-2">Get help from your readers and earn with them.</p>
                      </div>
                      <p className="textSize">Writers group is a group chat where the author can seek new ideas, receive assistance for upcoming articles, gather opinions on their current work, or engage in any other discussions with group members.</p>
                     
                      <p className="textSize">All the members (max 5) of the group will share 10% of all the collectible posts sold. At any time an author can add or remove somebody from the group.</p>
                    
                      <p className="textSize"></p>
                      <img src="https://i.postimg.cc/0jY8rPG9/Screenshot-2023-11-07-at-00-06-57.png" style={{width: 800, borderRadius: 10, marginTop: 50}} />
                    </div>
                    <div className="mt-10"></div>
                    
                </div>  
                        </div>) : null}




                        
        </div>

        <img src="https://i.postimg.cc/Dz5cThkb/25-Ld-SO-Logo-Makr.png" className="h-40 mt-16" />
        <div className="flex items-center mt-10">
                      <Link href="/account">
                        <div  className="rounded-full">
                                
                                <p className="text-md font-bold ml-0 bg-blue-500 uppercase  text-white rounded-full p-6">Write your first post</p>
                            </div>
                        </Link>          
          </div>
    </>
  )
}

export default Collectables