import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000', { withCredentials: true });
// const socket = io('http://localhost:3000', { withCredentials: true });

// Create Chat Component
export function Createchat() {
  const [formData, setFormData] = useState({ roomID: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function createroomSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/createchat', {
      // const response = await fetch('http://localhost:3000/createchat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomID: formData.roomID }),
        credentials: 'include'
      });

      if (!response.ok) throw new Error(await response.text());

      console.log('Room created successfully:', formData.roomID);
      navigate(`/chat/${formData.roomID}`);
    } catch (err) {
      console.error('Error creating chat:', err);
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-200'>
      <div className='bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6 relative overflow-hidden border border-purple-100'>
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-100 rounded-full opacity-50"></div>
        <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-indigo-100 rounded-full opacity-50"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-purple-600 p-3 rounded-xl shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">Create New Room</h2>
          <p className="text-center text-gray-500 mb-6">Create a private chat room with a unique ID</p>
          
          <form onSubmit={createroomSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">Room ID</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="roomID"
                  value={formData.roomID}
                  onChange={handleChange}
                  className="w-full pl-10 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-gray-50"
                  placeholder="Enter a unique room identifier"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-3 text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            >
              Create Room
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Already have a room ID? <a href="/join" className="text-purple-600 hover:text-purple-800 font-medium">Join an existing room</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Join Chat Component
export function Joinchat() {
  const [formData, setFormData] = useState({ roomID: "" });
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('http://localhost:3000/user', { credentials: 'include' });
        // const res = await fetch('http://localhost:3000/user', { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          setUsername(data.username);
        }
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    }
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function joinchatSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/joinchat', {
      // const response = await fetch('http://localhost:3000/joinchat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomID: formData.roomID, username }),
        credentials: 'include'
      });

      if (!response.ok) throw new Error(await response.text());

      console.log('Joined chat successfully:', formData.roomID);
      socket.emit('joinRoom', formData.roomID);
      navigate(`/chat/${formData.roomID}`);
    } catch (err) {
      console.error('Error joining chat:', err);
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-cyan-200'>
      <div className='bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6 relative overflow-hidden border border-blue-100'>
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-100 rounded-full opacity-50"></div>
        <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-cyan-100 rounded-full opacity-50"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-xl shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">Join Existing Room</h2>
          <p className="text-center text-gray-500 mb-6">Enter a room ID to join the conversation</p>
          
          <form onSubmit={joinchatSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">Room ID</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="roomID"
                  value={formData.roomID}
                  onChange={handleChange}
                  className="w-full pl-10 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-gray-50"
                  placeholder="Enter room ID to join"
                  required
                />
              </div>
              {username && (
                <p className="mt-2 text-xs text-gray-500">
                  You'll join as <span className="font-medium text-blue-600">{username}</span>
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full px-4 py-3 text-white bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Join Room
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Don't have a room ID? <a href="/create" className="text-blue-600 hover:text-blue-800 font-medium">Create a new room</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}