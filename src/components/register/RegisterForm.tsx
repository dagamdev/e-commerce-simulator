import { FormEvent, useRef, useState } from 'react'
import { BsEye, BsEyeSlash, BsX } from 'react-icons/bs'
import { endPoint } from '../../utils/config'
import { useNavigate } from 'react-router-dom'
import { useToasts } from '../../hooks/useToasts'

export default function RegisterForm(){
  const inputPasswordRef = useRef<HTMLInputElement>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { createNotification } = useToasts()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const firstName = e.currentTarget.firstName.value
    const lastName = e.currentTarget.lastName.value
    const email = e.currentTarget.email.value
    const password = e.currentTarget.password.value
    const phone = e.currentTarget.phone.value

    fetch(endPoint+"users", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        phone
      })
    }).then(prom=> prom.json()).then(res=> {
      if(res.id){
        createNotification({type: 'success', content: 'Registered Successfully'})
        fetch(endPoint+"users/login", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            password
          })
        }).then(prom=> prom.json()).then(user=> {
          console.log(user)
          if(user.token){
            localStorage.setItem("e-commerce", JSON.stringify({user: {token: user.token, firstName: user.user.firstName, lastName: user.user.lastName, img: ""}}))
            navigate("/user")
          }
        }).catch(err=> console.error(err))

      }else{
        setError(res.error)
      }
    }).catch(err=> console.error(err))
  }

  const toggleShowPassword = () => {
    if(inputPasswordRef.current){
      const inputEl = inputPasswordRef.current 
      inputEl.type == 'password' ? inputEl.type = 'text' : inputEl.type = 'password'
    }
    setShowPassword(s=> !s)
  }

  const closeError = () => {
    setError('')
  }

  return (
    <form onSubmit={handleSubmit}  className="register_form">
      <div className='register_form-subSection'>
        <div className='register_form-section'>
          <label className='register_form-label' htmlFor="firstName">Name</label>
          <input className='register_form-input' id='firstName' type="text" name='firstName' placeholder='Your name' autoFocus required min={3} maxLength={100} />
        </div>
        <div className='register_form-section'>
          <label className='register_form-label' htmlFor="lastName">Last name</label>
          <input className='register_form-input' id='lastName' type="text" name='lastName' placeholder='Your last name' required minLength={3} maxLength={100} />
        </div>
      </div>
      <div className='register_form-section'>
        <label className='register_form-label' htmlFor="email">Email</label>
        <input className='register_form-input' id='email' type="email" name='email' placeholder='Your email' required />
      </div>
      <div className='register_form-section'>
        <label className='register_form-label' htmlFor="password">Password</label>
        <input ref={inputPasswordRef} className='register_form-input' id='password' type="password" name='password' placeholder='Your password' minLength={6} maxLength={20} required />
        {showPassword ? <BsEye onClick={toggleShowPassword} className='register_form-icon' /> : <BsEyeSlash onClick={toggleShowPassword} className='register_form-icon' />}
      </div>
      <div className='register_form-section'>
        <label className='register_form-label' htmlFor="phone">Phone</label>
        <input className='register_form-input' id='phone' type="tel" name='phone' placeholder='Your phone number' minLength={10} required />
      </div>
      {error && 
        <div className='register_form-error'>
          <BsX onClick={closeError} className='register_form-error-icon' />
          {error}
        </div>
      }
      <button className='register_form-btn'>Register</button>
    </form>
  )
}