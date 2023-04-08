import "./user.css"

import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import userImg from "../../imgs/user.png"
import { FormImg } from "./FormImg"
import { BiCamera } from 'react-icons/bi'

const localData = localStorage.getItem('e-commerce')

export const UserScreen = ()=> {
  const navigate = useNavigate()
  const obtaining = localStorage.getItem("e-commerce") || false
  const user = obtaining ? JSON.parse(obtaining).user : false
  const [activeFrom, setActiveFrom] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  useEffect(()=> {
    if(localData){
      const data = JSON.parse(localData)
      if(data.user.img) setImageUrl(data.user.img)
    }
  }, [])

  function logOut(){
    localStorage.clear()
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
        <p className='user_info-name'>{`${user.firstName} ${user.lastName}`}</p>
        <span onClick={logOut} className='user_info-logout' >Log out</span>
      </div>
    </section>
  )
}