import { useState } from 'react'
import {Route, Routes} from "react-router-dom";
import './App.css'
import Login from './component/Login';
import Choosechat from './component/Choose';
import { Createchat } from './component/Chatpagehandle';
import { Joinchat } from './component/Chatpagehandle';
import { Chatui } from './component/Chatui';
import NotFound from './component/NotFound';
import About from './component/About';
import Contact from './component/Contact';
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Choosechat' element={<Choosechat />} />
        <Route path='/createchat' element={<Createchat />} />
        <Route path='/joinchat' element={<Joinchat />} />
        <Route path='/chat/:id' element={<Chatui />} />
        <Route path='/NotFound' element={<NotFound />} />
        <Route path='/About' element={<About />} />
        <Route path='/Contact' element={<Contact />} />
      </Routes>
    </>
  )
}

export default App
