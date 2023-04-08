import { Outlet, Navigate } from 'react-router-dom'
import { getLocalData } from '../utils'
import { useToasts } from '../hooks/useToasts'
import { useEffect } from 'react'

export const ProtectedRoutes = ()=> {
  const localData = getLocalData()
  const { createNotification } = useToasts()

  useEffect(()=> {
    if(!localData?.user.token){
      createNotification({type: 'info', content: `You have to login or register to have access`})
    }
  })

  return (
    <>
      {localData?.user.token ? <Outlet /> : <Navigate to={"/login"} />}
    </>
  )
}