import { Switch } from 'antd';
import Link from 'next/link';
import React, {useState, useEffect} from 'react'
import Blog from '../components/Blog';
import Idea from '../components/Idea';
import { db } from '../firebase';
import { addDoc, collection, deleteDoc, doc, onSnapshot } from '@firebase/firestore';

function account() {

    const [accounts, setAccounts] = useState("");
    const [change, setChange] = useState(false);
    const [posts, setPosts] = useState([]);
    const [id, setId] = useState("lMu4ZvgyVAy5NueT2KDy");
    const [refresh, setRefresh] = useState(false);
    const [input, setInput] = useState("");
    const [ideas, setIdeas] = useState([]);


    const connectMetamask = async() => {
        if (window.ethereum) {
            const account = await window.ethereum.request({
                method: "eth_requestAccounts",
            })
            setAccounts(account);
            setId(account);
        }

        setRefresh(!refresh);
      }


    useEffect(() => {

        onSnapshot(collection(db, "accounts", id[0], "ideas"),
    
        (snapshot) => setIdeas(snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
        }))))

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
          });

        alert("Successful");
    }

    const deleteIdea = async(id) => {
        const docRef = doc(db, 'accounts', accounts[0], "ideas", id);
        try {
            await deleteDoc(docRef)
            console.log("Entire Document has been deleted successfully.");
        } catch(ex) {
            console.log(ex); 
        }

    }


  return (
    <div class="acc">
        <div className="mainUp">
        <div className="relative left-3 top-3 flex">
            
                    {
                        accounts ? (
                            <>
                            <div className="w-9 h-9 rounded-full bg-blue-300"></div>
                            <div>
                                <p className="ml-2 text-sm">{accounts[0].slice(0,4)}...{accounts[0].slice(accounts[0].length - 4, accounts[0].length)}</p>
                            </div>
                            </>
                        ) : <div onClick={connectMetamask} className="border-gray-500 border text-gray-500 rounded-lg justify-center flex p-2 items-center hover:cursor-pointer hover:bg-gray-200">
                                <img className="w-6" src="https://i.postimg.cc/mrT1hFKC/Meta-Mask-Fox-svg-2.png" />
                                <p className="text-xs font-bold ml-1">Connect Metamask</p>
                            </div>
                    }
                    
                </div>
        </div>
        <Link href="/Add">
        <div className="absolute right-3 top-3 flex bg-[#3E616C] p-3 rounded-xl hover:bg-[#254149]">
            <p className="text-white text-sm">Create New Post</p>
        </div>
        </Link>
        {
            posts.length == 0 ? (
                <div className="posts">
                    <img src="https://i.postimg.cc/cHgkvZz1/undraw-writer-q06d-removebg-preview.png" className="h-64 mt-20" />
                    <p>You have no posts.</p>
                </div>
            ) : (
                <div className="posts">
            <Switch
                defaultChecked={false}
                checkedChildren="Ideas Bucket"
                unCheckedChildren="My Posts"
                onChange={() => {
                    setChange(!change);
                }}
                className="bg-gray-400"
            />
            <div className="postsTwo">
                {
                    change ? (
                        <>
                        
                    
                        {
                            ideas.map((data, index) => {
                                return <Idea click={() => deleteIdea(data.id)} title={data.data.idea} key={index} />
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
        
        <div className="bucketAddress"></div>
                    <div className="bucketAddressTwo">
                        <div className="items-center flex flex-col mr-5">
                        <img src="https://i.postimg.cc/9XbPzy3b/Logo-Makr-47n3jk-2.png" className="h-32" />
                        <p className="text-center w-64 text-white text-sm mt-2">Idea bucket is a place where you can write your thoughts, ideas, quotes, writings and your fans can mint them and own them.</p>
                        </div>
                        <div className="flex flex-col mt-6 justify-center items-center ml-5">
                            <textarea onChange={(e) => setInput(e.target.value)} className="bg-[#F6E0C2] rounded-lg mr-2 w-96 pl-3 h-28 pt-2" placeholder="Write your thoughts ..."></textarea>
                            <div className="flex items-center mt-2 w-full justify-end">
                                {
                                    accounts ? (
<div onClick={addIdeas} className="border-[#F6E0C2] h-10 border px-4 py-2 ml-0 mt-0 rounded-full hover:cursor-pointer hover:bg-[#F6E0C2] hover:text-black text-white">
                                    <p className="text-sm">Post</p>
                                </div>
                                    ) : (
                                        <div onClick={connectMetamask} className="border-[#F6E0C2] h-10 border px-4 py-2 ml-0 mt-0 rounded-full hover:cursor-pointer hover:bg-[#F6E0C2] hover:text-black text-white">
                                    <p className="text-sm">Connect Metamask</p>
                                </div>
                                    )
                                }
                                
                            </div>
                        </div>
                    </div>
    </div>
  )
}

export default account