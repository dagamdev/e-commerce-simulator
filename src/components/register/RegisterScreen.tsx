import './register.css'

import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import { BiCheck } from 'react-icons/bi'
import RegisterForm from './RegisterForm'


export default function RegisterScreen(){
  const localData = localStorage.getItem('e-commerce')
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(false)

  useEffect(()=> {
    if(localData){
      const data = JSON.parse(localData)
      console.log(data)
      if(data.user.token){
        setIsLogin(true)
        setTimeout(()=> navigate('/user'), 10000)
      }
    }
  }, [])

  return (
    <section className="register">
      <div className="register_container">
        {isLogin ?
          <p className="register_container-leged">
            <BiCheck className="register_container-leged-icon" /> You have already log in
          </p> :
          <>
            <h3 className='register_container-title'>Welcome! Register to continue</h3>
            <RegisterForm />
            <p className="register_container-register">Do you have an account?, <NavLink className='login-card-register-link' to={'/login'} >log in</NavLink></p>
          </>
        }
      </div>
    </section>
  )
}