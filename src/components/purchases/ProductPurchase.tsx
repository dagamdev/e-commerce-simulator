import React from 'react'
import { ProductCart } from '../../types'

export const ProductPurchase = ({product}: {product: ProductCart})=> {

  console.log(product)


  return (
    <li className='purchase_element'>
      <p className="purchase_element-title">{product.title}</p>
      <p className='purchase_element-quantity'>{product.productsInCart.quantity}</p>
      <p className='purchase_element-price'>$ {parseInt(product.price) * product.productsInCart.quantity}</p>
    </li>
  )
}