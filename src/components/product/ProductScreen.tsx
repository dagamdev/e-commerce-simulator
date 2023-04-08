import "./product.css"

import { useState } from 'react'
import { useSelector } from 'react-redux'
import {useParams, NavLink} from "react-router-dom"
import { RootState } from '../../store'
import { Product } from '../../types'
import { ProductDetails } from './ProductDetails'
import { ProductsSuggestion } from "./ProductSuggestions"
import { ProductImages } from "./ProductImages"

export const ProductScreen = ()=> {
  const [amountProduct, setAmountProduct] = useState(1)
  const {id} = useParams()
  const products: Product[] = useSelector((state: RootState)=> state.products)
  const product = products?.find(f=> f.id.toString()==id)

  return (
    <section className="product">
      {
        product ?
        (
          <>
            <div className="product_history">
              <NavLink className="product_history-home" to={"/"} >Home</NavLink>
              <div className="product_history-separator"></div>
              <b className="product_history-name">{product?.title}</b>
            </div>
            <article className="product_info">
              <ProductImages product={product} />
              <ProductDetails product={product} amountProduct={amountProduct} setAmountProduct={setAmountProduct} />
            </article> 
            <ProductsSuggestion products={products?.filter(f=> f.category.name == product?.category.name && f.id != product?.id)} setAmountProduct={setAmountProduct} />
          </>
        ) :
        <div>
          <i>No existe el producto con la id {id}</i>
        </div>
      }
    </section>
  )
}