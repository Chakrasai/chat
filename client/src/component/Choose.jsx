import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import { Navigate, useNavigate } from 'react-router-dom';
function Choosechat() {
    const [user,setuser] = useState(null);
    const navigate = useNavigate();
    useEffect(()=>{
        fetch('http://localhost:3000/user',{
            method:"GET",
            credentials:"include",
        })
        .then((res)=>res.json())
        .then((data)=>{
            if(data.username){
                setuser(data.username);
            }
        })
        .catch((err)=>console.log("not logged in",err));
    },[])

    const handlecreate = (e)=>{
        navigate('/createchat')
    }
    const handlejoin =(e)=>{
        navigate('/joinchat')
    }

  return (
        <>

        {user && <Navbar username={user} />}
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">

            <div className="text-center mt-10">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome to the Chat</h1>
                
                <div className="flex space-x-4">
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition" onClick={handlecreate}>
                        Create Chat
                    </button>
                    <button className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition" onClick={handlejoin}>
                        Join Chat
                    </button>
                </div>
            </div>
        </div>
        </>

  )
}

export default Choosechat
