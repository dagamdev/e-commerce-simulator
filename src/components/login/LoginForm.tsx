import React, { useState, FormEvent } from 'react'
import {useNavigate} from "react-router-dom"

type FormValues = {
  email?: string
  phone?: string
  password?: string
  lastName?: string
  firstName?: string
}

const initialFormValues = {
  email: "",
  phone: "",
  password: "",
  lastName: "",
  firstName: "",
}

export const LoginForm = ()=> {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const [formElements, setFormElements] = useState<FormValues>(initialFormValues)

  function handleSubmit(event: FormEvent<HTMLFormElement>){
    event.preventDefault()

    if(isLogin){
      setFormElements({...formElements, ["email"]: event.currentTarget.email.value, ["password"]: event.currentTarget.password.value})    
      fetch("https://ecommerce-api-react.herokuapp.com/api/v1/users/login", {
        method: "POST",
        body: JSON.stringify({
          email: event.currentTarget.email.value,
          password: event.currentTarget.password.value
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(prom=> prom.json()).then(res=> {
        localStorage.setItem("e-commerce", JSON.stringify({user: {token: res.data.token, firstName: res.data.user.firstName, lastName: res.data.user.lastName, img: ""}}))
        navigate("/user")
      }).catch(err=> console.error(err))
    }
  }
  
  // console.log(formElements)

  return (  
    <form onSubmit={handleSubmit}  className="login_form">
      <div className='login_form-div'>
        <label htmlFor="email">Email</label>
        <input className='login_form-input' id='email' type="email" name='email' placeholder='Your email' autoFocus required />
      </div>
      <div className='login_form-div'>
        <label htmlFor="password">Password</label>
        <input className='login_form-input' id='password' type="password" name='password' placeholder='Your password' required />
      </div>
      <button className='login_form-btn'>Login</button>
    </form>
  )
}