import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

export const ProtectedRoutes = ({isLogged}: {isLogged: boolean})=> {
  return (
    <>
      {isLogged ? <Outlet /> : <Navigate to={"/login"} />}
    </>
  )
}