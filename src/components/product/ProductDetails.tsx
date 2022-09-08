import React, {useEffect, useRef, useState} from 'react'
import { Product } from '../../types'
import axios from "axios"
import { getConfig } from '../../utils'

export const ProductDetails = ({product}: {product: Product|undefined})=> {
  const [amountProduct, setAmountProduct] = useState(1)
  const obtaining = localStorage.getItem("e-commerce") || ""
  const data = obtaining ? JSON.parse(obtaining) : false
  
  // console.log(amountProduct)

  function addition(){
    if(amountProduct < 40) setAmountProduct(amountProduct+1)
  }

  function subtraction(){
    if(amountProduct > 1) setAmountProduct(amountProduct-1)
  }

  function addToCart(){
    if(data.user.token){
      axios.post("https://ecommerce-api-react.herokuapp.com/api/v1/cart", {
          "id": product?.id, 
          "quantity": amountProduct
        },
        getConfig(data.user.token)
      ).then(res=> {
        console.log(res)
      }).catch(err=> console.error(err))
    }
  }

  return (
    <div className="product_details">
      <h2 className='product_details-title'>{product?.title}</h2>
      <p className='product_details-description'>{product?.description}</p>
      <div className="product_details-status">
        <div className="product_details-price">
          <p>Price</p>
          <span>$ {product?.price ? parseInt(product?.price)*amountProduct : "0"}</span>
        </div>
        <div className="product_details-quantity">
          <p>Quantity</p>
          <div className="details_quantity-buttons">
            <button onClick={subtraction} >-</button>
            <div className='details_quantity-value'>
              <span>{amountProduct}</span>
            </div>
            <button onClick={addition}>+</button>
          </div>
        </div>
      </div>
      <button onClick={addToCart} className='product_details-btn'>Add to cart <i className='bx bx-cart-add'></i></button>
    </div>
  )
}