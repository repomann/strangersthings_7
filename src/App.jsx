import Posts from './Components/Posts'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Login from './Components/Login'
import PostForm from './Components/PostForm'

import './App.css'

function App() {
  

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/posts' element={<Posts/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
    </>
  )
}

export default App
