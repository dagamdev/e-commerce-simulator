import "./headerScreen.css"

import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import { AppDispatch, RootState } from "../../store"
import { getCartAmount } from "../../store/slices/carts.slice"
import { BiMenu, BiLogIn, BiUser, BiBox, BiCart, BiX } from 'react-icons/bi'

export const HeaderScreen = ()=> {
  const dispatch: AppDispatch = useDispatch()
  const carts = useSelector((state: RootState) => state.carts)
  const navigate = useNavigate()
  const obtaining = localStorage.getItem("e-commerce") || false
  const token = obtaining ? JSON.parse(obtaining).user.token ? true : false : false

  useEffect(()=> {
    dispatch(getCartAmount())
    
    document.addEventListener("scroll", ()=>{
      document.querySelector(".header")?.classList.toggle("header-scroll", window.scrollY > 80)
    })
  })

  function toggleShowNavbaar(){
    document.querySelector(".navbar")?.classList.toggle("navbar_open")
  }

  function clickHome(){
    navigate("/")
  }

  return (
    <header className="header">
      <h1 className='header_title' onClick={clickHome}>e-commerce</h1>
      <div onClick={toggleShowNavbaar} className="header_menu">
        <BiMenu className="header_menu-icon" />
        {Boolean(carts) && (
          <div className="header_menu-carts">
            {carts}
          </div>
        )}
      </div>
      <nav className="navbar">
        <BiX className='navbar_close' onClick={toggleShowNavbaar} />
        <ul className="navbar_list">
          <li className="navbar_item" onClick={toggleShowNavbaar}>
            <NavLink to={token ? "/user" : "/login"} className={({isActive})=> isActive ? "navbar_link navbar_link-active" : "navbar_link"}>
              <div className="navbar_item-text">
                {token ? <BiUser /> : <BiLogIn />}
                <p>{token ? "User" : "Login"}</p>
              </div>
            </NavLink>
          </li>
          <li className="navbar_item" onClick={toggleShowNavbaar}>
            <NavLink to={"/purchases"} className={({isActive})=> isActive ? "navbar_link navbar_link-active" : "navbar_link"}>
              <div className="navbar_item-text">
                <BiBox />
                <p>Purchases</p>
              </div>
            </NavLink>
            </li>
          <li className="navbar_item" onClick={toggleShowNavbaar}>
            <NavLink to={"/cart"} className={({isActive})=> isActive ? "navbar_link navbar_link-active" : "navbar_link"}>
              <div className="navbar_item-text">
                <BiCart />
                <p>Cart</p>
                {Boolean(carts) && (
                  <div className="navbar_item-carts">
                    {carts}
                  </div>
                )}
              </div>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}