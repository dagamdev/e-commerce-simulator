import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

export const ProtectedRoutes = ()=> {
  const obtaining = localStorage.getItem("e-commerce") || false
  const data = obtaining ? JSON.parse(obtaining) : false

  return (
    <>
      {data.user.token ? <Outlet /> : <Navigate to={"/login"} />}
    </>
  )
}