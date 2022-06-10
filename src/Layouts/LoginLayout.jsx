import React from 'react'
import { Outlet } from 'react-router-dom'

const LoginLayout = () => {
  return (
    <div className='h-screen bg-slate-600 flex justify-center items-start overflow-scroll'>
        <Outlet />
    </div>
  )
}

export default LoginLayout