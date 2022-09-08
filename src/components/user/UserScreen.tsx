import "./user.css"
import React from 'react'
import { useNavigate } from "react-router-dom"
import userImg from "../../../public/user.png"

export const UserScreen = ()=> {
  const navigate = useNavigate()
  const obtaining = localStorage.getItem("e-commerce") || false
  const user = obtaining ? JSON.parse(obtaining).user : false

  function logOut(){
    localStorage.clear()
    navigate("/login")
  }

  return (
    <section className="user">
      <div className="user_info">
        <img className="user_info-img" src={userImg} alt="User img" />
        <p className='user_info-name'>{`${user.firstName} ${user.lastName}`}</p>
        <span onClick={logOut} className='user_info-logout' >Log out</span>
      </div>
    </section>
  )
}