
import Login from './Components/Login'
import Posts from './Components/Posts'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import PostForm from './Components/PostForm'
import './App.css'
import Register from './Components/Register'
import { useState, useEffect } from 'react'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState (false)
  useEffect(() => {
  console.log(isLoggedIn)
  },[isLoggedIn]);

  const [token, setToken] = useState (localStorage.getItem("token") ? localStorage.getItem("token") : "")
  

  return (
    <>
    {/* <form /> */}
    <Navbar setToken={setToken}/>
    <Routes>
      <Route path='/posts' element={<Posts/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} token = {token} setToken = {setToken} />}/>
      <Route path='/register' element={<Register/>}/>
    </Routes>
    </>
  )
}

export default App
