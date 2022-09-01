import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

export const ProtectedRoutes = ({isLogged}: {isLogged: boolean})=> {
  return (
    <>
      {isLogged ? <Outlet /> : <Navigate to={"/login"} />}
    </>
  )
}