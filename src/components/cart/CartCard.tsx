import React, { Dispatch, SetStateAction } from 'react'
import { ProductCart } from '../../types'

interface CartCardType {
  product: ProductCart
  img: string|undefined
  setProducts: Dispatch<SetStateAction<ProductCart[]>>
}

export const CartCard = ({product, img, setProducts}: CartCardType)=> {
  const obtaining = localStorage.getItem("e-commerce") || ""
  const data = obtaining ? JSON.parse(obtaining) : false

  function deleteProduct(){
    fetch("https://ecommerce-api-react.herokuapp.com/api/v1/cart/"+product.id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${data.user.token}`
      }
    }).then(prom=> prom.json()).then(res=> {
      console.log("aa", res)
      fetch("https://ecommerce-api-react.herokuapp.com/api/v1/cart", {
        method: 'GET',  
        headers: {
          Authorization: `Bearer ${data.user.token}`
        }
      }).then(prom=> prom.json()).then(res=> setProducts(res.data.cart.products)).catch(err=> err)
    }).catch(err=> console.error(err))
  }

  return (
    <article className='cart_card'>
      <div className="cart_card-first">
        <div className="cart_card-img">
          <img src={img} alt={product.brand} />
        </div>
        <div className="cart_card-details">
          <p className='cart_card-brand CC_text-gray'>{product.brand}</p>
          <p className="cart_card-name CC_text-bold">{product.title}</p>
        </div>
      </div>

      <div className="cart_card-last">
        <div className="card_amount">
          <p className='card_amount-title CC_text-gray'>Amount</p>
          <div className="card_amount-value CC_text-bold">
            <samp>{product.productsInCart.quantity}</samp>
          </div>
        </div>
        <div className="card_total">
          <p className='card_total-title CC_text-gray'>Total</p>
          <samp className='card_total-value CC_text-bold'>{(parseInt(product.price) * product.productsInCart.quantity).toFixed(2)}</samp>
        </div>
        <div onClick={deleteProduct} className="cart_card-trash">
            <i className='bx bx-trash'></i>
        </div>
      </div>
    </article>
  )
}