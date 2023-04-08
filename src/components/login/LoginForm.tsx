import { useState, FormEvent, useRef, Dispatch, SetStateAction } from 'react'
import {useNavigate} from "react-router-dom"
import { endPoint } from '../../utils/config'
import { BsEye, BsEyeSlash, BsX } from 'react-icons/bs'
import { useToasts } from '../../hooks/useToasts'

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
  const inputPasswordRef = useRef<HTMLInputElement>(null)
  const [formElements, setFormElements] = useState<FormValues>(initialFormValues)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const { createNotification } = useToasts()

  function handleSubmit(event: FormEvent<HTMLFormElement>){
    event.preventDefault()

    setFormElements({...formElements, ["email"]: event.currentTarget.email.value, ["password"]: event.currentTarget.password.value})    
    fetch(endPoint+"users/login", {
      method: "POST",
      body: JSON.stringify({
        email: event.currentTarget.email.value,
        password: event.currentTarget.password.value
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(prom=> prom.json()).then(res=> {
      if(res.token){
        createNotification({type: 'success', content: 'Successful login'})
        localStorage.setItem("e-commerce", JSON.stringify({user: {token: res.token, firstName: res.user.firstName, lastName: res.user.lastName, img: ""}}))
        navigate("/user")
      }else{
        setError('Invalid email or password')
      }
    }).catch(err=> console.error(err))
  }
  
  const toggleShowPassword = () => {
    if(inputPasswordRef.current){
      inputPasswordRef.current.type == 'password' ? inputPasswordRef.current.type = 'text' : inputPasswordRef.current.type = 'password'
    }
    setShowPassword(s=> !s)
  }

  const closeError = () => {
    setError('')
  }

  return (  
    <form onSubmit={handleSubmit}  className="login_form">
      <div className='login_form-div'>
        <label htmlFor="email">Email</label>
        <input className='login_form-input' id='email' type="email" name='email' placeholder='Your email' autoFocus required />
      </div>
      <div className='login_form-div'>
        <label htmlFor="password">Password</label>
        <input ref={inputPasswordRef} className='login_form-input' id='password' type="password" name='password' placeholder='Your password' minLength={6} maxLength={20} required />
        {showPassword ? <BsEye onClick={toggleShowPassword} className='login_form-icon' /> : <BsEyeSlash onClick={toggleShowPassword} className='login_form-icon' />}
      </div>
      {error && 
        <div className='login_form-error'>
          <BsX onClick={closeError} className='login_form-error-icon' />
          {error}
        </div>
      }
      <button className='login_form-btn'>Login</button>
    </form>
  )
}