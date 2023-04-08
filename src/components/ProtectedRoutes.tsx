import { Outlet, Navigate } from 'react-router-dom'
import { getLocalData } from '../utils'

const localData = getLocalData()

export const ProtectedRoutes = ()=> {

  return (
    <>
      {localData?.user.token ? <Outlet /> : <Navigate to={"/login"} />}
    </>
  )
}