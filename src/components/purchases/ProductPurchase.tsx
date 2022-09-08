import React from 'react'
import { ProductCart } from '../../types'
import { useNavigate } from 'react-router-dom'

export const ProductPurchase = ({product, img}: {product: ProductCart, img: string|undefined})=> {
  const navigate = useNavigate()

  return (
    <li onClick={()=> navigate("/product/"+product.id)} className='purchase_element'>
      <img className='purchase_element-img' src={img} alt={product.title} />
      <p className="purchase_element-title">{product.title}</p>
      <p className='purchase_element-quantity'>{product.productsInCart.quantity}</p>
      <p className='purchase_element-price'>$ {(parseInt(product.price) * product.productsInCart.quantity).toLocaleString()}</p>
    </li>
  )
}