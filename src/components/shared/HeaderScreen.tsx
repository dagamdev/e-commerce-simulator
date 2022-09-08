import "./headerScreen.css"
import React, {useRef} from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from "react-router-dom"

export const HeaderScreen = ()=> {
  const navigate = useNavigate()
  const obtaining = localStorage.getItem("e-commerce") || false
  const token = obtaining ? JSON.parse(obtaining).user.token ? true : false : false

  function navBar(){
    document.querySelector(".navbar")?.classList.toggle("navbar_open")
  }

  document.addEventListener("scroll", ()=>{
    document.querySelector(".header")?.classList.toggle("header-scroll", window.scrollY > 80)
  })

  function clickHome(){
    navigate("/")
  }

  return (
    <header className="header">
      <h1 className='header_title' onClick={clickHome}>e-commerce</h1>
      <i className='bx bx-menu' onClick={navBar}></i>
      <nav className="navbar">
        <i className='bx bx-x navbar_close' onClick={navBar}></i>
        <ul className="navbar_list">
          <li className="navbar_item">
            <NavLink to={token ? "/user" : "/login"} className={({isActive})=> isActive ? "navbar_link navbar_link-active" : "navbar_link"}>
              <div className="navbar_item-text">
                <i className={`bx ${token ? "bx-user" : "bx-log-in"}`}></i>
                <p>{token ? "User" : "Login"}</p>
              </div>
            </NavLink>
          </li>
          <li className="navbar_item">
            <NavLink to={"/purchases"} className={({isActive})=> isActive ? "navbar_link navbar_link-active" : "navbar_link"}>
              <div className="navbar_item-text">
                <i className='bx bx-box'></i>
                <p>Purchases</p>
              </div>
            </NavLink>
            </li>
          <li className="navbar_item">
            <NavLink to={"/cart"} className={({isActive})=> isActive ? "navbar_link navbar_link-active" : "navbar_link"}>
              <div className="navbar_item-text">
                <i className='bx bx-cart'></i>
                <p>Cart</p>
              </div>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}