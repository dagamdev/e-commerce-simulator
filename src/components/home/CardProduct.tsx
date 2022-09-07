import React, {MouseEvent, useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import { Product } from '../../types'
import { getConfigPost } from '../../utils'


export const CardProduct = ({product}: {product: Product})=> {
  const navigate = useNavigate()
  const {current} = useRef(product.id)
  const button = useRef<HTMLButtonElement>(null)

  const obtaining = localStorage.getItem("e-commerce") || ""
  const data = obtaining ? JSON.parse(obtaining) : false
  const token = data ? data.user.token : false

  function productSelect({target}: MouseEvent<HTMLElement>){
    if(button.current && button.current!=target && button.current.childNodes[0]!=target){
      console.log(current)
      navigate("/product/"+current)
    }
  }

  function addToCart(){
    if(data){
      fetch("https://ecommerce-api-react.herokuapp.com/api/v1/cart", {
        method: 'POST',
        body: JSON.stringify({id: 2, quantity: 1}),
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
        // getConfigPost({id: 1, quantity: 1}, token)
        ).then(prom=> prom.json()).then(res=> console.log(res)).catch(err=> console.error(err))
    }
  }
  
  return (
    <article onClick={productSelect} className='card-home'>
      <header className='card-home_header'>
        <img className='card-home_img' src={product.productImgs[0]} alt="" />
      </header>
      <div className="card-home_body">
        <h3 className='card-home_name'>{product.title}</h3>
        <section className="card-home_info">
          <div className="card-home_price">
            <h4 className="card-home_price-label">Price</h4>
            <span className='card-home_price-value'>$ {product.price}</span>
          </div>
          <button onClick={addToCart} ref={button} className='card-home_btn'>
            <i className='bx bx-cart-add card-home_btn-icon'></i>
          </button>
        </section>
      </div>
    </article>
  )
}