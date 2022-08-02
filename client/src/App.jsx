import React from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

// 컴포넌트
import Navbar from './components/Navbar'
// 페이지
import Auth from './pages/Auth'
import Home from './pages/Home'
import Posting from './pages/Posting'
import Detail from './pages/Detail'

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'))


  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/auth' element={(!user ? <Auth /> : <Navigate to="/" />)} />
        <Route path='/' element={<Navigate to="/posts" />} />
        <Route path='/posts' element={<Home />} />
        <Route path='/posts/search' element={<Home />} />
        <Route path='/posting' element={<Posting />} />
        <Route path='/detail/:id' element={<Detail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
