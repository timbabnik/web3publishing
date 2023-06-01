import { Switch } from 'antd';
import Link from 'next/link';
import React, {useState, useEffect, useRef} from 'react'
import Blog from '../components/Blog';
import Idea from '../components/Idea';
import { db } from '../firebase';
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, serverTimestamp, where } from '@firebase/firestore';
import { create } from 'ipfs-http-client'
import imagee from "../public/ai.jpg";

function account() {

    const [accounts, setAccounts] = useState("");
    const [change, setChange] = useState(false);
    const [posts, setPosts] = useState([]);
    const [id, setId] = useState("7kBT4l8KJFkCL4qZW0CU");
    const [refresh, setRefresh] = useState(false);
    const [input, setInput] = useState("");
    const [ideas, setIdeas] = useState([]);

    const [deleteWarning, setDeleteWarning] = useState(false);

    const [defaultSwitch, setDefaultSwitch] = useState(false); 

    const [getCategory, setGetCategory] = useState("all");
    const [getCategoryy, setGetCategoryy] = useState("random");

    const [allCategory, setAllCategory] = useState(true);
    const [image, setImage] = useState("");
    const [publish, setPublish] = useState("");
    const [isLoadingTwo, setIsLoadingTwo] = useState("");
    const [isLoading, setIsLoading] = useState("");
    const [price, setPrice] = useState(0);

    const [enable, setEnable] = useState("a");

    const canvasRef = useRef(null);

    const connectMetamask = async() => {
        if (window.ethereum) {
            const account = await window.ethereum.request({
                method: "eth_requestAccounts",
            })
            setAccounts(account);
            setId(account);
            setEnable(account);
        }

        setRefresh(!refresh);
      }


    useEffect(() => {

        const fetchData = async () => {
            const ideasRef = collection(db, "accounts", id[0], "ideas");
            const q = query(ideasRef, where('category', '==', getCategory));
            const snapshot = await getDocs(q);
      
            const ideasData = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
      
            setIdeas(ideasData);
          };
          
          const fetchAllData = async () => {
            const ideasRef = collection(db, "accounts", id[0], "ideas");
            const snapshot = await getDocs(ideasRef);
      
            const ideasData = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
      
            setIdeas(ideasData);
          };

        if (getCategory == "all") {
            fetchAllData();
        } else {
            fetchData();
        }
        
          
      

    }, [refresh]);

    useEffect(() => {

        onSnapshot(collection(db, "accounts", id[0], "posts"),
    
        (snapshot) => setPosts(snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
        }))))

    }, [refresh]);


    const createDocumentAndGetId = async () => {
        try {
        
          // Add a new document to the specified collection
          const docRef = await addDoc(collection(db, "blogs"), {
            address: "hahaha",
          });
      
          // Get the ID of the newly created document
          const docId = docRef.id;
          console.log('Document ID:', docId);
      
          

          addDoc(collection(db, "accounts", id[0], "posts"), {
            id: docId,
            title: "Testeeekkk",
          });

        } catch (error) {
          console.error('Error creating document:', error);
          throw error;
        }
      };


    const addIdeas = () => {
        addDoc(collection(db, "accounts", id[0], "ideas"), {
            idea: input,
            timestamp: serverTimestamp(),
            category: getCategoryy
          });

        alert("Successful");

        addDoc(collection(db, "accounts", id[0], getCategoryy), {
            idea: input,
            timestamp: serverTimestamp(),
            address: id[0],
            image: "fsaf",
        })
    }

    const deleteIdea = async(idd) => {
        const docRef = doc(db, 'accounts', id[0], getCategory, idd);
        try {
            await deleteDoc(docRef)
            console.log("Entire Document has been deleted successfully.");
        } catch(ex) {
            console.log(ex); 
        }

        setRefresh(!refresh);

    }


    const categories = [{
        id: 1,
        category: "All 🤘",
        name: "all"
    },{
        id: 2,
        category: "Random 🤘",
        name: "random"
    }, {
        id: 3,
        category: "Thoughts 🧠",
        name: "thougts"
    },{
        id: 4,
        category: "Ideas 🔥",
        name: "ideas"
    },];

    const categoriesTwo = [{
        id: 1,
        category: "Random 🤘",
        name: "Random 🤘"
    }, {
        id: 2,
        category: "Thoughts 🧠",
        name: "thoughts"
    },{
        id: 3,
        category: "Ideas 🔥",
        name: "ideas"
    }];


    const categoriesThree = [{
      id: 1,
      category: "Random 🤘",
      name: "random"
  }, {
      id: 2,
      category: "Thoughts 🧠",
      name: "thoughts"
  },{
      id: 3,
      category: "Ideas 🔥",
      name: "ideas"
  }, {
      id: 4,
      category: "Thoughts 🧠",
      name: "thoughts"
  }, {
    id: 5,
    category: "Thoughts 🧠",
    name: "thoughts"
  }, {
    id: 6,
    category: "Thoughts 🧠",
    name: "thoughts"
  }, {
    id: 7,
    category: "Thoughts 🧠",
    name: "thoughts"
  }];

    const categoryChange = (id) => {
        setGetCategory(id)
        setRefresh(!refresh);
    }

    const categoryChangee = (id) => {
        setGetCategoryy(id)
        setRefresh(!refresh);
    }

    const [gories, setGories] = useState([]);
    const [goriesTwo, setGoriesTwo] = useState([]);

    useEffect(() => {
        // Initialize Firebase app

    
        // Retrieve categories from Firebase Firestore
        const fetchCategories = async () => {
            const ideasRef = collection(db, 'accounts', id[0], "ideas");
            const snapshot = await getDocs(ideasRef);
      
            const categoriesSet = new Set();
      
            snapshot.docs.forEach((doc) => {
              const category = doc.data().category; // Replace with your actual field name
              if (category ) {
                categoriesSet.add(category);
              }
            });
      
            const categoriesArray = Array.from(categoriesSet);
            setGories(categoriesArray);
          };
      

    fetchCategories();
  }, [refresh]);

  useEffect(() => {
    // Initialize Firebase app


    // Retrieve categories from Firebase Firestore
    const fetchCategories = async () => {
        const ideasRef = collection(db, 'accounts', id[0], "ideas");
        const snapshot = await getDocs(ideasRef);
  
        const categoriesSet = new Set();
  
        snapshot.docs.forEach((doc) => {
          const category = doc.data().category; // Replace with your actual field name
          if (category && category !== "random" && category !== "ideas" && category !== "thoughts") {
            categoriesSet.add(category);
          }
        });
  
        const categoriesArray = Array.from(categoriesSet);
        setGoriesTwo(categoriesArray);
      };
  

fetchCategories();
}, [refresh]);


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


  const handleUploadToIPFS = async () => {
    setIsLoadingTwo(true);
    connectMetamask();
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.onload = async () => {
    const aspectRatio = img.width / img.height;
    const canvasWidth = img.width * 2; // Increase canvas width for higher resolution
    const canvasHeight = canvasWidth / aspectRatio;
    const canvasPadding = canvasWidth * 0.1; // 10% padding
    const titleFontSize = canvasWidth / 20; // Adjust title font size proportionally

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    ctx.drawImage(
      img,
      canvasPadding,
      canvasPadding,
      canvasWidth - 2 * canvasPadding,
      canvasHeight - 2 * canvasPadding
    );

    ctx.font = `${titleFontSize}px Arial`;
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const textWidth = canvasWidth * 0.8;
    const words = input.split(" ");
    let line = "";
    let lines = [];
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + " ";
      const testWidth = ctx.measureText(testLine).width;
      if (testWidth > textWidth) {
        lines.push(line);
        line = words[i] + " ";
      } else {
        line = testLine;
      }
    }
    lines.push(line);

    const x = canvasWidth / 2;
    const y = canvasHeight / 2;
    const lineHeight = titleFontSize * 1.2;

    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], x, y + (i - lines.length / 2 + 0.5) * lineHeight);
    }
      const imageDataURL = canvas.toDataURL();
      const buffer = Buffer.from(imageDataURL.replace(/^data:image\/\w+;base64,/, ""), "base64");
      
      const result = await client.add(buffer); // Upload image buffer to IPFS
      setImage(`https://timomarket.infura-ipfs.io/ipfs/${result.cid.toString()}`);
      console.log(result);
  
      setPublish(true);
    };
    img.src = imagee.src;
  
    setIsLoadingTwo(false);

    handleDarkOverlayClick();
  };

  const handleUploadToIPFSTest = async () => {
    setIsLoadingTwo(true);

  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.onload = async () => {
    const aspectRatio = img.width / img.height;
    const canvasWidth = img.width * 2; // Increase canvas width for higher resolution
    const canvasHeight = canvasWidth / aspectRatio;
    const canvasPadding = canvasWidth * 0.1; // 10% padding
    const titleFontSize = canvasWidth / 20; // Adjust title font size proportionally

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    ctx.drawImage(
      img,
      canvasPadding,
      canvasPadding,
      canvasWidth - 2 * canvasPadding,
      canvasHeight - 2 * canvasPadding
    );

    ctx.font = `${titleFontSize}px Arial`;
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const textWidth = canvasWidth * 0.8;
    const words = input.split(" ");
    let line = "";
    let lines = [];
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + " ";
      const testWidth = ctx.measureText(testLine).width;
      if (testWidth > textWidth) {
        lines.push(line);
        line = words[i] + " ";
      } else {
        line = testLine;
      }
    }
    lines.push(line);

    const x = canvasWidth / 2;
    const y = canvasHeight / 2;
    const lineHeight = titleFontSize * 1.2;

    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], x, y + (i - lines.length / 2 + 0.5) * lineHeight);
    }

    const imageDataURL = canvas.toDataURL();
    setImage(imageDataURL);
    setPublish(true);
  };

  img.src = imagee.src;
  setIsLoadingTwo(false);
  handleDarkOverlayClick();

  };
  
  async function mainTwo() {
    setIsLoading(true);
    const result = await client.add(JSON.stringify({image, price, input}))
    console.log(result);
   
  
    addDoc(collection(db, "accounts", id[0], "ideas"), {
        idea: input,
        timestamp: serverTimestamp(),
        category: getCategoryy
      });

    alert("Successful");

    addDoc(collection(db, "accounts", id[0], getCategoryy), {
        id: Math.floor(Math.random() * 10000),
        idea: input,
        address: id[0],
        image: `https://timomarket.infura-ipfs.io/ipfs/${result.path}`,
        price: 0,
    })
  
    setIsLoading(false);
    
  }

  const [isDarkOverlayVisible, setIsDarkOverlayVisible] = useState(false);
  const [isDarkOverlayVisibleTwo, setIsDarkOverlayVisibleTwo] = useState(false);

  function handleDarkOverlayClick() {
    setIsDarkOverlayVisible(!isDarkOverlayVisible);
  }

  function handleDarkOverlayClickTwo() {
    setIsDarkOverlayVisibleTwo(!isDarkOverlayVisibleTwo);
  }

  const addCategory = () => {
    addDoc(collection(db, "accounts", id[0], "categories"), {
      category: getCategoryy
    });

    handleDarkOverlayClickTwo();
  }

  const [getCat, setGetCat] = useState([]);

  useEffect(() => {

    onSnapshot(collection(db, "accounts", id[0], "categories"),

    (snapshot) => setGetCat(snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
    }))))

}, [refresh]);





// AI photo generator
const API_KEY = "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";
const generatePhoto = async () => {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        // Include any required headers for authentication or API key
      },
      body: JSON.stringify({
        prompt: "Mountain 2d",
        n: 2,
        size: "1024x1024"
      }),
    });

    const data = await response.json()
    console.log(data)
};





  return (
    <div class="acc">
        {isDarkOverlayVisible && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
          }}
          onClick={handleDarkOverlayClick}>
              <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "500px",
              height: "400px",
              backgroundColor: "#f2f2f2",
              borderRadius: "10px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center"
            }}
        ><div className="flex-col items-center justify-center flex">
                <img src={image} className="h-72" />
                <div onClick={mainTwo} className="p-2 px-5 bg-blue-600 justify-center items-center rounded-xl mt-5 hover:cursor-pointer">
                    <p className="text-white">Publish</p>
                </div>
            </div>
        </div>
        
        </div>
      )}
      {isDarkOverlayVisibleTwo && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
          }}
          >
              <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "500px",
              height: "400px",
              backgroundColor: "white",
              borderRadius: "10px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center"
            }}
        ><div className="flex-col items-center justify-center flex">
              <div className="flex flex-wrap items-center justify-center">
                <img onClick={handleDarkOverlayClickTwo} src="https://i.postimg.cc/gJSYJMXn/Logo-Makr-2-YVf-U2.png" className="absolute top-4 right-4 h-8 hover:cursor-pointer" />
                {
                                    categoriesThree.map((data, index) => {
                                        return <div onClick={() => categoryChangee(data.name)} key={index} className={`border ${getCategoryy == data.name ? "border-black" : "border-[#EDEDED]"} text-[#A0A4AA] px-4 py-2 rounded-xl mx-2 hover:border-gray-400 hover:cursor-pointer mt-3`}>{data.category}</div>
                                    })
                                }
                </div>
                <div className="flex items-center justify-center mt-12 w-full absolute bottom-4">
                  <input onChange={(e) => setGetCategoryy(e.target.value)} value={getCategoryy} placeholder="Write ..." className="border border-gray-200 rounded-full p-2 w-2/3" />
                  <div onClick={addCategory} className="p-2 px-5 bg-blue-600 justify-center items-center rounded-xl mt-0 hover:cursor-pointer ml-4">
                    <p className="text-white text-xs py-1">Add category</p>
                </div>
                </div>
                
            </div>
        </div>
        
        </div>
      )}
        
                    <div className="bucketAddressTwo">
                        <div className="items-center flex flex-col mr-5">
                        <div className="postsTwoBucket">
                       
                        <div className="flex flex-col items-center">
                            <div className="accIdea" style={{backgroundColor: ""}}>
                            <div className="items-center flex justify-center flex-col">
                            <img src="https://i.postimg.cc/9XbPzy3b/Logo-Makr-47n3jk-2.png" className="h-24 hidden" />
                            <p className="text-black text-center mt-20 w-full text-2xl font-bold">Idea bucket is a place where you can write your thoughts, ideas, quotes, writings and your fans can mint / own them.</p>
                            <div className="flex mt-10 w-2/3 flex-wrap items-center justify-center">
                                {
                                    categoriesTwo.map((data, index) => {
                                        return <div onClick={() => categoryChangee(data.name)} key={index} className={`border ${getCategoryy == data.name ? "border-black" : "border-[#EDEDED]"} text-[#A0A4AA] px-4 py-2 rounded-xl mx-2 hover:border-gray-400 hover:cursor-pointer mt-3`}>{data.category}</div>
                                    })
                                }
                                {
                                    getCat.map((data, index) => {
                                        return <div onClick={() => categoryChangee(data.data.category)} key={index} className={`border ${getCategoryy == data.data.category ? "border-black" : "border-[#EDEDED]"} bg-white text-[#A0A4AA] px-4 py-2 rounded-xl mx-2 hover:border-gray-400 hover:cursor-pointer mt-3`}>{data.data.category}</div>
                                    })
                                }
                                {
                                  accounts ? (
                                    <button onClick={handleDarkOverlayClickTwo} disabled={enable[0].toUpperCase() != "0x1B8163f3f7Ae29AF06c50dF4AE5E0Fe9375f8496".toUpperCase()}>
                                    <img src="https://i.postimg.cc/fRnmYKj0/Logo-Makr-75jaa-L.png" className="w-9 mt-3 ml-2 hover:border hover:cursor-pointer border-gray-400 rounded-full" />
                                    </button>
                                  ) : (
                                    null
                                  )
                                }
                  
                            </div>
                                </div>
                               
                                
                                
                            </div>
                            
                        </div>
                        </div>
                        </div>
                        <div className="inputDiv">
                            <textarea onChange={(e) => setInput(e.target.value)} className="textareaDiv" placeholder="Write your thoughts ..."></textarea>
                            <div className="flex items-center mt-0">
                                {
                                    accounts ? (
<button disabled={enable[0].toUpperCase() != "0x1B8163f3f7Ae29AF06c50dF4AE5E0Fe9375f8496".toUpperCase()} onClick={handleUploadToIPFS} className=" px-4 py-2 ml-0 mt-0 rounded-full hover:cursor-pointer hover:bg-blue-400 hover:text-black text-black flex items-center">

<img src="https://i.postimg.cc/YqYr7Qrj/Logo-Makr-15.png" className="h-8" />
                                </button>
                                    ) : (
                                        <button disabled={enable[0].toUpperCase() != "0x1B8163f3f7Ae29AF06c50dF4AE5E0Fe9375f8496".toUpperCase()} onClick={connectMetamask} className=" px-4 py-2 ml-0 mt-0 rounded-full hover:cursor-pointer hover:bg-black hover:text-black text-black flex items-center">
                                    
                                    <img src="https://i.postimg.cc/YqYr7Qrj/Logo-Makr-15.png" className="h-8" /> 
                                </button>
                                    )
                                }
                                
                            </div>
                            
                        </div>
                        
                        
                    </div>
                   
        <div className="mainUp">
        <div className="absolute left-3 top-3 flex">
            
                    {
                        accounts ? (
                            <>
                            <div className="w-9 h-9 rounded-full bg-blue-300"></div>
                            <div>
                                <p className="ml-2 text-sm text-black">{accounts[0].slice(0,4)}...{accounts[0].slice(accounts[0].length - 4, accounts[0].length)}</p>
                            </div>
                            </>
                        ) : <div onClick={connectMetamask} className="border-gray-500 border rounded-lg justify-center flex p-2 items-center hover:cursor-pointer hover:bg-gray-200 text-gray-500 hover:text-black">
                                <img className="w-6" src="https://i.postimg.cc/mrT1hFKC/Meta-Mask-Fox-svg-2.png" />
                                <p className="text-xs font-bold ml-1">Connect Metamask</p>
                            </div>
                    }
                    
                </div>
        </div>
        
        {
            posts.length == 0 ? (
                <div className="posts">
                    <img src="https://i.postimg.cc/cHgkvZz1/undraw-writer-q06d-removebg-preview.png" className="h-64 mt-20" />
                    <p>You have no posts.</p>
                </div>
            ) : (
                <div className="posts">
            {/*<Switch
                defaultChecked={defaultSwitch}
                checkedChildren="My Posts"
                unCheckedChildren="Idea Bucket"
                onChange={() => {
                    setChange(!change);
                }}
                className="bg-gray-400"
            />*/}
           
            <div className="flex mb-5">
                <p onClick={() => setChange(false)} className={`${change ? "text-[#9E9E9E]" : "text-[#46606B]"} mr-7 font-bold text-xl hover:cursor-pointer`}>My posts</p>
                <p onClick={() => setChange(true)} className={`${change ? "text-[#46606B]" : "text-[#9E9E9E]"} ml-7 font-bold text-xl hover:cursor-pointer`}>Idea bucket</p>
            </div>
            <div className="postsTwo">
                {
                    change ? (
                        <>
                        
                        <div className="flex mt-10 justify-center items-center">
                        <div onClick={() => categoryChange("all")}  className={`border ${getCategory == "all" ? "border-black" : "border-[#EDEDED]"} bg-white text-[#A0A4AA] px-4 py-2 rounded-xl mx-2 hover:border-gray-400 hover:cursor-pointer`}>All 🔥</div>
                                {
                                    gories.map((data, index) => {
                                        return <div onClick={() => categoryChange(data)} key={index} className={`border ${getCategory == data ? "border-black" : "border-[#EDEDED]"} bg-white text-[#A0A4AA] px-4 py-2 rounded-xl mx-2 hover:border-gray-400 hover:cursor-pointer`}>{data}</div>
                                    })
                                }
                                
                            </div>
                        {
                            ideas.map((data, index) => {
                                return <Idea color="white" click={() => setDeleteWarning(!deleteWarning)} deleteIdea={() => deleteIdea(data.id)} title={data.idea} key={index} categ={data.category} time={data.timestamp ? data.timestamp.toDate().toLocaleDateString() : ""                                } />
                            })
                        }
                        </>
                    ) : (
                        <>
                        {
                            posts.map((data, index) => {
                                return <Link href={`/posts/${data.data.id}`}><Blog title={data.data.title} key={index} /></Link>
                            })
                        }
                        
                        </>
                    )
                }
                
                
            </div>
        </div>
            )
        }
        
        
        <canvas ref={canvasRef} width="400" height="400" style={{ display: "none" }} />      
    </div>
  )
}

export default account