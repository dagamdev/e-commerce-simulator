import React from 'react'
import { Product } from '../../types'

export const ProductDetails = ({product}: {product: Product|undefined})=> {
  return (
    <div className="product_details">
      <h2 className='product_details-title'>{product?.title}</h2>
      <p className='product_details-description'>{product?.description}</p>
      <div className="product_details-status">
        <div className="product_details-price">
          <p>Price</p>
          <span>$ {product?.price}</span>
        </div>
        <div className="product_details-quantity">
          <p>Quantity</p>
          <div className="details_quantity-buttons">
            <button>-</button>
            <div className='details_quantity-value'>
              <span>1</span>
            </div>
            <button>+</button>
          </div>
        </div>
      </div>
      <button className='product_details-btn'>Add to cart <i className='bx bx-cart-add'></i></button>
    </div>
  )
}