import "./login.css"
import React, {useState} from 'react'
import { LoginForm } from './LoginForm'

export const LoginScreen = ()=> {
  const [login, setLogin] = useState(true)
  
  return (
    <div className="login">
      <div className="login-card">
        <h3 className='login-title'>Welcome! Enter your email and password continue</h3>
        <div className="login_test">
          <p className='login_test-title'>Test data</p>
          <ul className='login_test-elements'>
            <li className='login_test-element'><i className='bx bx-envelope'></i> mason@gmail.com</li>
            <li className='login_test-element'><i className='bx bx-lock-alt'></i> mason1234</li>
          </ul>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}