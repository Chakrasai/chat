import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import { Navigate, useNavigate } from 'react-router-dom';

const apiurl = import.meta.env.VITE_API_ORIGIN;

function Choosechat() {
    const [user,setuser] = useState(null);
    const navigate = useNavigate();
    useEffect(()=>{
        fetch(`${apiurl}/user`, {
            method: "GET",
            credentials: "include",
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.username) {
          setuser(data.username);
            }
        })
        .catch((err) => console.log("not logged in", err));
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

    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-100 to-purple-100">
      <div className="text-center p-8 bg-white rounded-xl shadow-xl max-w-md w-full">
        <h1 className="text-4xl font-bold text-indigo-800 mb-3">Welcome to Chat</h1>
        <p className="text-gray-600 mb-8">Connect with friends and start chatting instantly</p>
        
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <button 
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg shadow-lg hover:from-indigo-600 hover:to-purple-700 transition duration-300 transform hover:scale-105 flex items-center justify-center"
            onClick={handlecreate}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Create Chat
          </button>
          
          <button 
            className="px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-lg shadow-lg hover:from-teal-600 hover:to-emerald-700 transition duration-300 transform hover:scale-105 flex items-center justify-center"
            onClick={handlejoin}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            Join Chat
          </button>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-gray-600 text-sm">Experience seamless communication with our modern chat platform</p>
      </div>
      <div className="absolute top-20 left-20 w-32 h-32 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"></div>
      <div className="absolute top-20 right-20 w-32 h-32 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000"></div>
    </div>
    </>
  )
}

export default Choosechat
