import "./headerScreen.css"
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from "react-router-dom"

export const HeaderScreen = ()=> {
  const navigate = useNavigate()
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
            <NavLink to={"/login"} className={({isActive})=> isActive ? "navbar_link navbar_link-active" : "navbar_link"}>
              <div className="navbar_item-text">
                <i className='bx bx-user'></i>
                <p>Login</p>
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