import React from 'react'
// import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import NavbarComponent from '../Navbar/NavbarComponent'

export default function Layout() {
  return <>
  <div className='min-h-[100vh] bg-slate-100'>
  <NavbarComponent/>
  <Outlet/>
  </div>
  
  
  </>
}
