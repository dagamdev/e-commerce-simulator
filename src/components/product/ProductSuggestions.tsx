import React from 'react'
import { CardProduct } from '../home/CardProduct'
import { Product } from '../../types'

export const ProductsSuggestion = ({products}: {products: Product[]|undefined})=> {
  console.log(products)
  return (
    <div className="product_suggestions">
      <strong className='product_suggestions-title'>Discover similar items</strong>
      <div className="product_suggestion-elements">
        {products?.map(product=> <CardProduct key={product.id} product={product} />)}
      </div>
    </div>
  )
}