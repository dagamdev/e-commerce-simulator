import { Dispatch, SetStateAction } from 'react'
import { Product, Purchase } from '../../types'
import axios from "axios"
import { getConfig, getLocalData } from '../../utils'
import { endPoint } from '../../utils/config'
import { BiCartAdd } from 'react-icons/bi'
import { useToasts } from '../../hooks/useToasts'
import { useDispatch } from 'react-redux'
import { addCart } from '../../store/slices/carts.slice'


export const ProductDetails = ({product, amountProduct, setAmountProduct}: {product: Product, amountProduct: number, setAmountProduct: Dispatch<SetStateAction<number>>})=> {
  const localData = getLocalData()
  const { createNotification } = useToasts()
  const dispatch = useDispatch()

  function addition(){
    if(amountProduct < 40) setAmountProduct(amountProduct+1)
  }

  function subtraction(){
    if(amountProduct > 1) setAmountProduct(amountProduct-1)
  }

  function addToCart(){
    if(localData?.user.token){
      const { user: { token } } = localData

      axios.get(endPoint+'cart', getConfig(token)).then(({data: products}: {data: Purchase[]})=> {
        const prodCart = products.find(c=> c.productId == product?.id)
        if(prodCart){
          axios.put(endPoint+"cart/"+prodCart.id, {
              "quantity": prodCart.quantity+amountProduct
            },
            getConfig(token)
          ).then(()=> {
            setAmountProduct(1)
            createNotification({type: 'success', content: `${amountProduct} more ${product.title} were added to the cart`})
          }).catch(err=> console.error(err))
        
        }else{
          axios.post(endPoint+"cart", {
              "productId": product.id, 
              "quantity": amountProduct
            },
            getConfig(token)
          ).then(()=> {
            dispatch(addCart())
            setAmountProduct(1)
            createNotification({type: 'success', content: `${amountProduct} ${product.title} were added to the cart`})
          }).catch(err=> console.error(err))
        }
      }).catch(e=> console.error(e))

      
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
      <button onClick={addToCart} className='product_details-btn'>Add to cart <BiCartAdd className='product_details-btn-icon' /></button>
    </div>
  )
}