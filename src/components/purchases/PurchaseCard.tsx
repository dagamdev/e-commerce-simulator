import React from 'react'
import { Purchase } from '../../types'
import { ProductPurchase } from './ProductPurchase'

export const PurchaseCard = ({purchase}: {purchase: Purchase})=> {

  console.log(purchase)

  const title = new Date(purchase.createdAt).toLocaleString()

  return (
    <article className='purchase_card'>
      <div className="purchase_card-title">
        <p>{title}</p>
      </div>
      <ul className='purchase_card-products'>
        {purchase.cart.products.map(m=> <ProductPurchase key={m.id} product={m} />)}
      </ul>
    </article>
  )
}