import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { Product, Purchase } from '../../types'
import { ProductPurchase } from './ProductPurchase'

export const PurchaseCard = ({purchase}: {purchase: Purchase})=> {
  const products: Product[] = useSelector((state: RootState)=> state.products)
  const title = new Date(purchase.createdAt).toLocaleString()

  return (
    <article className='purchase_card'>
      <div className="purchase_card-title">
        <p>{title}</p>
      </div>
      <ul className='purchase_card-products'>
        {purchase.cart.products.map(pro=> <ProductPurchase key={pro.id} product={pro} img={products?.find(f=> f.id==pro.id)?.productImgs[0]} />)}
      </ul>
    </article>
  )
}