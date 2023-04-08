import { Dispatch, SetStateAction } from 'react'
import { CardProduct } from '../home/CardProduct'
import { Product } from '../../types'

export const ProductsSuggestion = ({products, setAmountProduct}: {products: Product[]|undefined, setAmountProduct: Dispatch<SetStateAction<number>>})=> {
  
  return (
    <div className="product_suggestions">
      <strong className='product_suggestions-title'>Discover similar items</strong>
      <div className="product_suggestion-elements">
        {products?.map(product=> <CardProduct key={product.id} product={product} setAmountProduct={setAmountProduct} />)}
      </div>
    </div>
  )
}