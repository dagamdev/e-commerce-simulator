import { Outlet, Navigate } from 'react-router-dom'
import { getLocalData } from '../utils'
import { useToasts } from '../hooks/useToasts'
import { useEffect } from 'react'

export const ProtectedRoutes = ()=> {
  const localData = getLocalData()
  const { createNotification } = useToasts()

  useEffect(()=> {
    if(!localData?.user.token){
      createNotification({type: 'info', content: `Tienes que iniciar sesión o registrarte para tener acceso`})
    }
  })

  return (
    <>
      {localData?.user.token ? <Outlet /> : <Navigate to={"/login"} />}
    </>
  )
}