import { useState } from 'react'
import {Route, Routes} from "react-router-dom";
import './App.css'
import Login from './component/Login';
import Choosechat from './component/Choose';
import { Createchat } from './component/chatpagehandle';
import { Joinchat } from './component/chatpagehandle';
import { Chatui } from './component/Chatui';
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Choosechat' element={<Choosechat />} />
        <Route path='/createchat' element={<Createchat />} />
        <Route path='/joinchat' element={<Joinchat />} />
        <Route path='/chat/:id' element={<Chatui />} />
      </Routes>
    </>
  )
}

export default App
