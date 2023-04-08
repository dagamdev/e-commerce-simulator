import "./login.css"

import { MouseEvent, useState, useEffect } from 'react'
import { LoginForm } from './LoginForm'
import { NavLink } from "react-router-dom"
import { BiLock, BiEnvelope, BiCopy, BiCheck } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

export const LoginScreen = ()=> {
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

  const copyData = (e: MouseEvent<SVGAElement>) => {
    const value = e.currentTarget.dataset.value
    navigator.clipboard.writeText(value || '')
  }
  
  return (
    <div className="login">
      <div className="login-card">
        {isLogin ?
          <p className="login-card-leged">
            <BiCheck className="login-card-leged-icon" /> You have already log in
          </p> :
          <>
            <h3 className='login-title'>Welcome! Enter your email and password continue</h3>
            <div className="login_test">
              <p className='login_test-title'>Test data</p>
              <ul className='login_test-elements'>
                <li className='login_test-element'>
                  <BiEnvelope className='login_test-element-icon' /> userTesting@gmail.com 
                  <BiCopy onClick={copyData} className="login_test-element-copy" data-value='userTesting@gmail.com' />
                </li>
                <li className='login_test-element'>
                  <BiLock className="login_test-element-icon" /> user2442
                  <BiCopy onClick={copyData} className="login_test-element-copy" data-value='user2442' />
                </li>
              </ul>
            </div>
            <LoginForm />
            <p className="login-card-register">You don't have an account?, you can <NavLink className='login-card-register-link' to={'/register'} >register</NavLink></p>
          </>
        }
      </div>
    </div>
  )
}