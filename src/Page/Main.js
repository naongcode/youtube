import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import Nav from '../components/Nav.js'
import Home from './Home.js'
import Short from './Short.js'
import Subscribe from './Subscribe.js'
import Mypage from './Mypage.js'

export default function Main() {
  return (
    <div>
        <Routes>
            <Route path="/" element={<MainLayout/>}>
                <Route index element={<Home/>}/>
                <Route path='home' element={<Home/>}/>
                <Route path='short' element={<Short/>}/>
                <Route path="subscribe" element={<Subscribe/>}/>
                <Route path='mypage' element={<Mypage/>}/>
            </Route>
        </Routes>
    </div>
  )
}
function MainLayout(){
    return (
        <div>
            <Nav/>
            <Outlet/>
        </div>
    )
}
