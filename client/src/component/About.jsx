import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl">
        <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">About Echoo</h1>
        <p className="text-gray-700 mb-4">
          Echoo is a real-time chat application developed using the MERN (MongoDB, Express.js, React.js, Node.js) stack. The application allows users to create and join chat rooms, send and receive messages in real-time, and manage user authentication with JWT (JSON Web Tokens). 
        </p>
        <p className="text-gray-700 mb-4">
          We implemented Socket.IO for real-time communication between clients and the server. The application features a responsive UI built with React and Tailwind CSS, providing a seamless user experience across different devices.
        </p>
        <p className="text-gray-700 mb-4">
          Our team focused on ensuring data consistency and integrity by defining robust Mongoose schemas and handling edge cases such as duplicate room IDs. We also implemented security measures to protect user data and ensure a safe chatting environment.
        </p>
        <p className="text-gray-700 mb-4">
          We hope you enjoy using Echoo as much as we enjoyed building it!
        </p>
      </div>
    </div>
  );
};

export default About;