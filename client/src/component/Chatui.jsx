import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

export function Chatui() {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center py-6">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Room: {id}</h1>

        <div className="h-80 overflow-y-auto border border-gray-200 rounded-2xl p-4 flex flex-col space-y-2"> {/* space-y-2 for message spacing */}
          {messages.map((msg, index) => (
            <div key={index} className="bg-white p-3 rounded-xl shadow-sm break-words w-full max-w-full"> {/* Changed message background, shadow */}
              <div className="flex items-start">
                <span className="font-semibold text-blue-700 mr-3">{msg.sender.username}:</span>
                <span className="break-words overflow-hidden text-gray-700">{msg.content}</span>  {/* Improved text color */}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex space-x-3 mt-6"> {/* mt-6 for spacing from messages */}
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 border rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
            placeholder="Type your message..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 font-semibold shadow-md"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}