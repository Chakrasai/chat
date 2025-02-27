import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {io} from 'socket.io-client';

const socket = io('http://localhost:3000',{withCredentials:true})

// Create Chat Component
export function Createchat() {
    const [formData, setFormData] = useState({ roomID: "" });
    const [redirect, setRedirect] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    async function createroomSubmit(ev) {
        ev.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/createchat', {   // Removed HTTPS since it's local
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ RoomID: formData.roomID }),
                credentials: 'include'
            });
            if (!response.ok) throw new Error(await response.text());

            const data = await response.json();
            setRedirect(true);
            console.log('Room created successfully:', data);
            socket.emit('joinRoom',formData.roomID);
            navigate(`/chat/${formData.roomID}`)
        } catch (err) {
            console.error('Error creating room:', err);
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100'>
            <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-6'>
                <h2 className="text-2xl font-bold mb-6 text-center">Create Room</h2>
                <form onSubmit={createroomSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Room ID</label>
                        <input
                            type="text"
                            name="roomID"  
                            value={formData.roomID}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                            placeholder="Enter your Room ID"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
                    >
                        Create
                    </button>
                </form>
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
                if (res.ok) {
                    const data = await res.json();
                    setUsername(data.username); // Store username in state
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

    async function JoinchatSubmit(ev) {
        ev.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/joinchat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ roomID: formData.roomID, username }),  // Send username from state
                credentials: 'include'
            });
            if (!response.ok) throw new Error(await response.text());

            const data = await response.json();
            console.log('Joined chat successfully:', data);

            socket.emit('joinRoom',formData.roomID);
            navigate(`/chat/${formData.roomID}`)
        } catch (err) {
            console.error('Error joining chat:', err);
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100'>
            <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-6'>
                <h2 className="text-2xl font-bold mb-6 text-center">Enter Room</h2>
                <form onSubmit={JoinchatSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Room ID</label>
                        <input
                            type="text"
                            name="roomID"  // Ensure this matches the key in formData
                            value={formData.roomID}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            placeholder="Enter your Room ID"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                        Join
                    </button>
                </form>
            </div>
        </div>
    );
}
