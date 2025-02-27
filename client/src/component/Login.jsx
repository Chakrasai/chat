import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [redirect,setredirect] = useState(false);
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        body: JSON.stringify({ username: formData.username, password: formData.password }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (response.ok) {
        setredirect(true);
      } else {
        setMessage("Wrong details. Try again.");
      }
      if (redirect) {
        navigate('/Choosechat');
      }
    } catch (err) {
      console.error("Login Error:", err);
      setMessage("An error occurred. Please try again.");
    }
  }

  async function handleSignupSubmit(ev) {
    ev.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        body: JSON.stringify({ username: formData.username, email: formData.email, password: formData.password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 201) {
        setMessage("Registration successful!");
      } else {
        setMessage("Registration failed.");
      }
    } catch (err) {
      console.error("Signup Error:", err);
      setMessage("An error occurred. Please try again.");
    }
    if(redirect){
      navigate('/')
    }
  }

  // Toggle Between Login and Signup
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 bg-[url('/messages_light_colour_background.jpg')]"
      style={{ backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-6">

        {/* Toggle Button */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={toggleForm}
            className={`w-1/2 py-2 text-white rounded-lg ${isLogin ? 'bg-blue-600' : 'bg-green-600'} focus:outline-none hover:opacity-80`}
          >
            {isLogin ? 'Go to Sign Up' : 'Go to Login'}
          </button>
        </div>

        {message && <p className="text-red-500 text-center">{message}</p>}

        {/* Login Form */}
        {isLogin ? (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <form onSubmit={handleLoginSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                Login
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
            <form onSubmit={handleSignupSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
              >
                Sign Up
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
