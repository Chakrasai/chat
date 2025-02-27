import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

export function Chatui() {
  const { id } = useParams(); // Capture the dynamic room ID
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('http://localhost:3000/user', { credentials: 'include' });
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

  useEffect(() => {
    async function fetchMessages() {
      try {
        const res = await fetch(`http://localhost:3000/chat/${id}`, { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          setMessages(data);
        }
      } catch (err) {
        console.error('Error fetching messages:', err);
      }
    }
    fetchMessages();
  }, [id]);

  useEffect(() => {
    if (username) {
      const newSocket = io('http://localhost:3000', { withCredentials: true });
      setSocket(newSocket);
      newSocket.emit('joinRoom', { roomID: id, username });

      // Listen for incoming messages
      newSocket.on('message', (msg) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [id, username]);

  const sendMessage = () => {
    if (message.trim() && socket) {
      socket.emit('chatMessage', { roomID: id, content: message, sender: username });
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Room: {id}</h1>

        <div className="h-64 overflow-y-auto border border-gray-300 rounded-lg p-3 space-y-2 mb-4">
          {messages.map((msg, index) => (
            <div key={index} className="bg-gray-200 p-2 rounded-lg">
              <span className="font-bold text-blue-600 mr-2">{msg.sender.username}:</span>
              <span>{msg.content}</span>
            </div>
          ))}
        </div>

        <div className="flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 border rounded-lg px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
