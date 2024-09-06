import React, { useState } from 'react'
import style from './Layout.module.css'
import Navbar from '../Navbar/Navbar.jsx'
import Footer from '../Footer/Footer.jsx'
import { Outlet } from 'react-router-dom'

export default function Layout() {




  return <>
    
    <Navbar/>

    <div className=' container w-[80%] mx-auto py-24'>
      <Outlet/>
    </div>
     <Footer/>
  </>
}
