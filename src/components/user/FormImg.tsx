import { Dispatch, FormEvent, SetStateAction } from 'react'
import { BiX } from 'react-icons/bi'

const localData = localStorage.getItem('e-commerce')

export const FormImg = ({setActiveFrom, setImageUrl}: {setActiveFrom: Dispatch<SetStateAction<boolean>>, setImageUrl: Dispatch<SetStateAction<string>>})=> {
  const closeFomrImg = () => {
    setActiveFrom(false)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const url = e.currentTarget.url.value
    if(localData){
      const data = JSON.parse(localData)
      localStorage.setItem("e-commerce", JSON.stringify({user: {...data.user, img: url}}))
      setImageUrl(url)
      setActiveFrom(false)
    }
  }
  
  return (
    <div className="set-img">
      <form onSubmit={handleSubmit} className="form-img">
        <BiX onClick={closeFomrImg} className='form-close' />
        <input type="url" id='url' name='url' placeholder='Image URL' required autoComplete='off'  />
        <button className='from-btn'>Update</button>
      </form>
    </div>
  )
}