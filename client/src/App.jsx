import React from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

// 컴포넌트
import Navbar from './components/Navbar'
// 페이지
import Auth from './pages/Auth'
import Home from './pages/Home'

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'))


  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/auth' element={(!user ? <Auth /> : <Navigate to="/" />)} />
        <Route path='/posts' element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
