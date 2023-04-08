import "./user.css"

import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import userImg from "../../imgs/user.png"
import { FormImg } from "./FormImg"
import { BiCamera } from 'react-icons/bi'
import { useDispatch } from "react-redux"
import { getLocalData } from "../../utils"
import { setCartAmount } from "../../store/slices/carts.slice"

export const UserScreen = ()=> {
  const localData = getLocalData()
  const navigate = useNavigate()
  const [activeFrom, setActiveFrom] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const dispatch = useDispatch()

  useEffect(()=> {
    if(localData){
      if(localData.user.img) setImageUrl(localData.user.img)
    }
  }, [])

  function logOut(){
    localStorage.clear()
    dispatch(setCartAmount(0))
    navigate("/login")
  }

  function addImg(){
    setActiveFrom(true)
  }

  return (
    <section className="user">
      {activeFrom && <FormImg setActiveFrom={setActiveFrom} setImageUrl={setImageUrl} />}
      <div className="user_info">
        <div className="user_info-img">
          <img src={imageUrl || userImg} alt="User img" />
          <div className="user_info-camera">
            <BiCamera onClick={addImg} />
          </div>
        </div>
        <p className='user_info-name'>{`${localData?.user?.firstName} ${localData?.user.lastName}`}</p>
        <span onClick={logOut} className='user_info-logout' >Log out</span>
      </div>
    </section>
  )
}